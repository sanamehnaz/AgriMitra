# 🌾 AgriMitra: Smart Multilingual Agricultural Assistant

AgriMitra is a smart, web-based assistant designed to help farmers and agricultural enthusiasts with **crop recommendations**, **plant disease detection**, and **pesticide advice**. Built with accessibility in mind, AgriMitra supports **English**, **Telugu**, and **Hindi**, making it truly useful across India.

---

## 🚀 Features

### 🧠 AI-Powered Crop Recommendation
- Suggests the best crops to grow based on:
  - Soil nutrients (N, P, K)
  - Temperature
  - Humidity
  - pH level
  - Rainfall
- Powered by a trained **Random Forest** model.

### 🌿 Plant Disease Detection
- Upload leaf images to detect diseases.
- Uses **MobileNetV2** deep learning model.
- Trained on the **PlantVillage** dataset.

### 🧪 Pesticide Advice
- Recommends safe and effective pesticides based on detected diseases.
- Includes safety guidelines and detailed descriptions.

### 🗣️ Multilingual Chatbot
- Interact in **English**, **Telugu**, or **Hindi**.
- Dynamically translates chatbot responses and UI elements.
- Provides expert advice on:
  - Crop management
  - Pest control
  - Farming practices

### 💻 User-Friendly Web Interface
- Modern, responsive design.
- All major features accessible from the main page.
- Real-time translations for seamless use in regional languages.

---

## 🗂️ Project Structure

AgriMitra/
└── AgriBot_Final/
├── app.py # Flask backend app
├── requirements.txt # Python dependencies
├── train_crop_rf.ipynb # Crop model training notebook
├── train_disease_mobilenetv2.ipynb # Disease model training notebook
├── data/
│ ├── crops.csv
│ ├── pesticides.csv
│ └── plantvillage_subset/ # Leaf image dataset
├── models/
│ ├── crop_rf.pkl
│ ├── disease_class_names.json
│ └── disease_mobilenetv2.h5
├── static/ # CSS, JS, images
├── templates/
│ └── index.html # Main web interface

---

## 🔧 Installation & Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/YOUR_USERNAME/AgriMitra.git
   cd AgriMitra/AgriBot_Final

2. Create a virtual environment:
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate

3. Install dependencies:
   pip install -r requirements.txt

4. Run the app
   python app.py

5. Open your browser and visit: http://127.0.0.1:5000

🌟 Why AgriMitra?
🇮🇳 Made for Indian farmers, supporting regional languages.

🤖 AI-backed, giving real, data-driven insights.

🌐 Accessible, modern, and built to scale.