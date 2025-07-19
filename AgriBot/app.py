from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import joblib
import numpy as np
import tensorflow as tf
from PIL import Image
import io
import pandas as pd
import json
import cohere
import os
from deep_translator import GoogleTranslator

app = Flask(__name__)
CORS(app)

# Initialize Cohere client
cohere_api_key = "hoOvuBLBb3t0TRvqFqqd2zV3lkYmkTLctnoc6ZRb"
print(f"API Key found: {cohere_api_key[:10]}...")  
if cohere_api_key and cohere_api_key.strip():
    try:
        co = cohere.Client(cohere_api_key)
        print("Cohere API configured successfully!")
    except Exception as e:
        print(f"Error initializing Cohere client: {e}")
        co = None
else:
    print("Warning: COHERE_API_KEY not found or empty")
    co = None

crop_model = joblib.load('models/crop_rf.pkl')
# Load pesticide recommendations
pesticide_df = pd.read_csv('data/pesticides.csv')
# Load disease detection model and class names
disease_model = tf.keras.models.load_model('models/disease_mobilenetv2.h5')
with open('models/disease_class_names.json') as f:
    class_names = json.load(f)

# System prompt for the agricultural assistant
AGRICULTURAL_SYSTEM_PROMPT = """You are AgriMitra, a helpful agricultural assistant. You provide expert advice on farming, crop management, pest control, and agricultural best practices. 

Your responses should be:
- Informative and practical
- Based on agricultural science and best practices
- Helpful for farmers of all experience levels
- Focused on sustainable farming methods
- Clear and easy to understand

You can help with:
- Crop selection and planning
- Soil health and management
- Pest and disease identification
- Fertilizer and pesticide recommendations
- Weather-related farming advice
- General agricultural questions

Always provide safe, practical advice and recommend consulting local agricultural experts when appropriate."""

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/chat', methods=['POST'])
def chat():
    """Handle chat messages using Cohere API"""
    print(f"Chat endpoint called. Cohere client: {co}")
    if not co:
        print("Cohere client is None!")
        return jsonify({'error': 'Cohere API not configured'}), 500
    
    data = request.get_json() or {}
    user_message = data.get('message', '')
    language = data.get('language', 'en')
    
    if not user_message.strip():
        return jsonify({'error': 'No message provided'}), 400
    
    try:
        # Create the conversation context
        conversation = f"{AGRICULTURAL_SYSTEM_PROMPT}\n\nUser: {user_message}\nAgriMitra:"
        
        # Generate response using Cohere
        response = co.generate(
            model='command',
            prompt=conversation,
            max_tokens=300,
            temperature=0.7,
            k=0,
            stop_sequences=[],
            return_likelihoods='NONE'
        )
        
        bot_response = response.generations[0].text.strip()
        
        # Translate response if needed
        if language == 'te':
            try:
                translator = GoogleTranslator(source='en', target='te')
                bot_response = translator.translate(bot_response)
            except Exception as e:
                print(f"Translation error: {e}")
                # Keep original response if translation fails
        elif language == 'hi':
            try:
                translator = GoogleTranslator(source='en', target='hi')
                bot_response = translator.translate(bot_response)
            except Exception as e:
                print(f"Translation error: {e}")
                # Keep original response if translation fails
        
        return jsonify({'response': bot_response})
        
    except Exception as e:
        print(f"Error in chat endpoint: {e}")
        return jsonify({'error': 'Failed to generate response'}), 500

@app.route('/recommend_crop', methods=['POST'])
def recommend_crop():
    data = request.get_json() or {}
    print("Received data for crop recommendation:", data, flush=True)
    features = [
        data.get('N', 0),
        data.get('P', 0),
        data.get('K', 0),
        data.get('temperature', 0),
        data.get('humidity', 0),
        data.get('ph', 0),
        data.get('rainfall', 0)
    ]
    print("Features used for prediction:", features, flush=True)
    try:
        features = np.array(features).reshape(1, -1)
        prediction = crop_model.predict(features)[0]
        print("Predicted crop:", prediction, flush=True)
        return jsonify({'recommended_crop': prediction})
    except Exception as e:
        print("Error during prediction:", e, flush=True)
        return jsonify({'error': str(e)}), 500

@app.route('/detect_disease', methods=['POST'])
def detect_disease():
    if 'image' not in request.files:
        return jsonify({'error': 'No image uploaded'}), 400
    image = request.files['image']
    try:
        img = Image.open(image.stream).convert('RGB')
        img = img.resize((224, 224))  # MobileNetV2 default input size
        img_array = np.array(img) / 255.0
        img_array = np.expand_dims(img_array, axis=0)
        preds = disease_model.predict(img_array)
        pred_idx = np.argmax(preds[0])
        disease = class_names[pred_idx]
        return jsonify({'disease': disease})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/recommend_pesticide', methods=['POST'])
def recommend_pesticide():
    data = request.get_json() or {}
    disease = data.get('disease', '')
    row = pesticide_df.loc[pesticide_df['disease'] == disease]
    if not row.empty:
        result = row.iloc[0]
        return jsonify({
            'pesticide': result['pesticide'],
            'description': result['description'],
            'safety_tips': result['safety_tips']
        })
    else:
        return jsonify({
            'pesticide': 'No specific pesticide found.',
            'description': '',
            'safety_tips': 'Consult your local expert.'
        })

@app.route('/translate', methods=['POST'])
def translate():
    data = request.get_json() or {}
    text = data.get('text', '')
    target_lang = data.get('target_lang', 'te')  # 'te' for Telugu, 'en' for English, 'hi' for Hindi
    
    try:
        if target_lang == 'te':
            translator = GoogleTranslator(source='en', target='te')
            translated = translator.translate(text)
        elif target_lang == 'hi':
            translator = GoogleTranslator(source='en', target='hi')
            translated = translator.translate(text)
        elif target_lang == 'en':
            # Try to detect if the text is in Telugu or Hindi, and translate accordingly
            # For simplicity, try Telugu first, then Hindi
            try:
                translator = GoogleTranslator(source='te', target='en')
                translated = translator.translate(text)
            except Exception:
                translator = GoogleTranslator(source='hi', target='en')
                translated = translator.translate(text)
        else:
            translated = text
        return jsonify({'translated_text': translated})
    except Exception as e:
        print(f"Translation error: {e}")
        return jsonify({'translated_text': text})  # Return original text if translation fails

if __name__ == '__main__':
    app.run(debug=True) 