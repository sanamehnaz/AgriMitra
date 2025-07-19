console.log('Script loaded!');
const chatbox = document.getElementById('chatbox');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');
const imageInput = document.getElementById('image-input');
const languageSelect = document.getElementById('language');
const heroHeading = document.getElementById('hero-heading');
const startChatBtn = document.getElementById('start-chat');
const chatSection = document.getElementById('chat-section');
const featuresSection = document.querySelector('.features');
const heroSection = document.querySelector('.hero');
const featureCropTitle = document.getElementById('feature-crop-title');
const featureCropDesc = document.getElementById('feature-crop-desc');
const featureDiseaseTitle = document.getElementById('feature-disease-title');
const featureDiseaseDesc = document.getElementById('feature-disease-desc');
const featurePesticideTitle = document.getElementById('feature-pesticide-title');
const featurePesticideDesc = document.getElementById('feature-pesticide-desc');
const footerMsg = document.getElementById('footer-msg');

// Modal elements - declare all modal variables at the top
const cropModal = document.getElementById('crop-modal');
const openCropModalBtn = document.getElementById('open-crop-modal');
const closeCropModalBtn = document.getElementById('close-crop-modal');
const cropForm = document.getElementById('crop-form');
const cropModalTitle = document.getElementById('crop-modal-title');
const cropResult = document.getElementById('crop-result');

const diseaseModal = document.getElementById('disease-modal');
const openDiseaseModalBtn = document.getElementById('open-disease-modal');
const closeDiseaseModalBtn = document.getElementById('close-disease-modal');
const diseaseForm = document.getElementById('disease-form');
const diseaseResult = document.getElementById('disease-result');
const diseaseModalTitle = document.getElementById('disease-modal-title');

const pesticideModal = document.getElementById('pesticide-modal');
const openPesticideModalBtn = document.getElementById('open-pesticide-modal');
const closePesticideModalBtn = document.getElementById('close-pesticide-modal');
const pesticideForm = document.getElementById('pesticide-form');
const pesticideResult = document.getElementById('pesticide-result');

const diseaseSelect = document.getElementById('disease-select');

// Disease data arrays
const diseaseClassNames = [
    "Apple___Apple_scab",
    "Apple___Black_rot",
    "Apple___Cedar_apple_rust",
    "Apple___healthy",
    "Corn_(maize)___Cercospora_leaf_spot Gray_leaf_spot",
    "Corn_(maize)___Common_rust_",
    "Corn_(maize)___Northern_Leaf_Blight",
    "Corn_(maize)___healthy",
    "Grape___Black_rot",
    "Grape___Esca_(Black_Measles)",
    "Grape___Leaf_blight_(Isariopsis_Leaf_Spot)",
    "Grape___healthy",
    "Pepper,_bell___Bacterial_spot",
    "Pepper,_bell___healthy",
    "Potato___Early_blight",
    "Potato___Late_blight",
    "Potato___healthy"
];
const diseaseDisplayNames = [
    "Apple Scab",
    "Apple Black Rot",
    "Apple Cedar Apple Rust",
    "Apple Healthy",
    "Corn Cercospora Leaf Spot / Gray Leaf Spot",
    "Corn Common Rust",
    "Corn Northern Leaf Blight",
    "Corn Healthy",
    "Grape Black Rot",
    "Grape Esca (Black Measles)",
    "Grape Leaf Blight (Isariopsis Leaf Spot)",
    "Grape Healthy",
    "Pepper Bell Bacterial Spot",
    "Pepper Bell Healthy",
    "Potato Early Blight",
    "Potato Late Blight",
    "Potato Healthy"
];

const translations = {
    en: {
        hero: 'Your Smart Farming Assistant',
        startChat: 'Start Chat',
        cropTitle: 'Crop Recommendation',
        cropDesc: 'Get the best crops for your climate and soil.',
        diseaseTitle: 'Disease Detection',
        diseaseDesc: 'Upload a photo to identify plant diseases.',
        pesticideTitle: 'Pesticide Advice',
        pesticideDesc: 'Get safe and effective pesticide suggestions.',
        userPlaceholder: 'Type your message...',
        send: 'Send',
        footer: 'Made with ❤️ for farmers | రైతుల కోసం ప్రేమతో | किसानों के लिए प्यार से',
        cropModalTitle: 'Crop Recommendation',
        cropLabels: [
            'Nitrogen (N):',
            'Phosphorus (P):',
            'Potassium (K):',
            'Temperature (°C):',
            'Humidity (%):',
            'pH:',
            'Rainfall (mm):'
        ],
        cropSubmit: 'Get Recommendation',
        cropGetting: 'Getting recommendation...',
        cropResult: 'Recommended crop: ',
        cropError: 'Error: ',
        cropUnknown: 'Could not get recommendation.'
    },
    te: {
        hero: 'మీ స్మార్ట్ వ్యవసాయ సహాయకుడు',
        startChat: 'చాట్ ప్రారంభించండి',
        cropTitle: 'పంట సిఫార్సు',
        cropDesc: 'మీ వాతావరణం మరియు నేలకి అనుగుణంగా ఉత్తమ పంటలు పొందండి.',
        diseaseTitle: 'రోగ నిర్ధారణ',
        diseaseDesc: 'పంట రోగాలను గుర్తించడానికి ఫోటోను అప్‌లోడ్ చేయండి.',
        pesticideTitle: 'పెస్టిసైడ్ సలహా',
        pesticideDesc: 'సురక్షితమైన మరియు ప్రభావవంతమైన పెస్టిసైడ్ సూచనలు పొందండి.',
        userPlaceholder: 'మీ సందేశాన్ని టైప్ చేయండి...',
        send: 'పంపండి',
        footer: 'రైతుల కోసం ప్రేమతో ❤️ | Made with love for farmers | రైతుల కోసం ప్రేమతో',
        cropModalTitle: 'పంట సిఫార్సు',
        cropLabels: [
            'నత్రజని (N):',
            'ఫాస్ఫరస్ (P):',
            'పొటాషియం (K):',
            'ఉష్ణోగ్రత (°C):',
            'ఆర్ద్రత (%):',
            'పిహెచ్ (pH):',
            'వర్షపాతం (mm):'
        ],
        cropSubmit: 'సిఫార్సు పొందండి',
        cropGetting: 'సిఫార్సు పొందుతున్నాం...',
        cropResult: 'సిఫార్సు చేసిన పంట: ',
        cropError: 'లోపం: ',
        cropUnknown: 'సిఫార్సు పొందలేకపోయాం.'
    },
    hi: {
        hero: 'आपका स्मार्ट कृषि सहायक',
        startChat: 'चैट शुरू करें',
        cropTitle: 'फसल सिफारिश',
        cropDesc: 'अपने मौसम और मिट्टी के अनुसार सर्वोत्तम फसलें प्राप्त करें।',
        diseaseTitle: 'रोग पहचान',
        diseaseDesc: 'पौधों के रोगों की पहचान के लिए फोटो अपलोड करें।',
        pesticideTitle: 'कीटनाशक सलाह',
        pesticideDesc: 'सुरक्षित और प्रभावी कीटनाशक सुझाव प्राप्त करें।',
        userPlaceholder: 'अपना संदेश लिखें...',
        send: 'भेजें',
        footer: 'किसानों के लिए प्यार से ❤️ | Made with love for farmers | రైతుల కోసం ప్రేమతో',
        cropModalTitle: 'फसल सिफारिश',
        cropLabels: [
            'नाइट्रोजन (N):',
            'फॉस्फोरस (P):',
            'पोटैशियम (K):',
            'तापमान (°C):',
            'आर्द्रता (%):',
            'पीएच (pH):',
            'वर्षा (mm):'
        ],
        cropSubmit: 'सिफारिश प्राप्त करें',
        cropGetting: 'सिफारिश प्राप्त की जा रही है...',
        cropResult: 'सिफारिशित फसल: ',
        cropError: 'त्रुटि: ',
        cropUnknown: 'सिफारिश प्राप्त नहीं कर सके।'
    }
};

// Add greeting messages for all languages
const greetings = {
    en: {
        title: '🌱 Welcome to AgriMitra!',
        message: "I'm your smart farming assistant. Ask me anything about crops, diseases, pesticides, or farming techniques. I'm here to help you with all your agricultural needs!"
    },
    te: {
        title: '🌱 AgriMitra కి స్వాగతం!',
        message: 'నేను మీ స్మార్ట్ వ్యవసాయ సహాయకుడు. పంటలు, రోగాలు, పెస్టిసైడ్లు లేదా వ్యవసాయ సాంకేతికతల గురించి నన్ను అడగండి. మీ వ్యవసాయ అవసరాలకు నేను సహాయం చేయడానికి ఇక్కడ ఉన్నాను!'
    },
    hi: {
        title: '🌱 AgriMitra में आपका स्वागत है!',
        message: 'मैं आपका स्मार्ट कृषि सहायक हूँ। फसल, रोग, कीटनाशक या कृषि तकनीकों के बारे में मुझसे पूछें। मैं आपकी सभी कृषि आवश्यकताओं में मदद करने के लिए यहाँ हूँ!'
    }
};

// Dynamic translation utility
async function dynamicTranslate(text, lang) {
    if (lang === 'en') return text;
    try {
        const res = await fetch('/translate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text, target_lang: lang })
        });
        const data = await res.json();
        return data.translated_text || text;
    } catch {
        return text;
    }
}

// Update all UI elements dynamically
async function updateLanguageUI(lang) {
    const isInChat = chatSection.style.display === 'flex';
    heroHeading.textContent = await dynamicTranslate(translations.en.hero, lang);
    startChatBtn.textContent = await dynamicTranslate(translations.en.startChat, lang);
    await updateFeatureCardsAndModals(lang);
    userInput.placeholder = await dynamicTranslate(translations.en.userPlaceholder, lang);
    document.querySelector('.send-btn').textContent = await dynamicTranslate(translations.en.send, lang);
    footerMsg.textContent = await dynamicTranslate(translations.en.footer, lang);
    await updateCropModalLang(lang);
    await updatePesticideModalLang(lang);
    await populateDiseaseDropdown(lang);
    if (isInChat) {
        heroSection.style.display = 'none';
        featuresSection.style.display = 'none';
        chatSection.style.display = 'flex';
    } else {
        heroSection.style.display = 'flex';
        featuresSection.style.display = 'flex';
        chatSection.style.display = 'none';
    }
}

// Language change event listener
languageSelect.addEventListener('change', async (e) => {
    const lang = e.target.value;
    await updateLanguageUI(lang);
    if (chatSection.style.display === 'flex') {
        await updateChatGreeting(lang);
    }
});

// Start chat button event listener
startChatBtn.addEventListener('click', async () => {
    heroSection.style.display = 'none';
    featuresSection.style.display = 'none';
    chatSection.style.display = 'flex';
    await updateChatGreeting(languageSelect.value);
    // Clear any existing messages except welcome message
    const chatbox = document.getElementById('chatbox');
    const welcomeMessage = chatbox.querySelector('.welcome-message');
    chatbox.innerHTML = '';
    if (welcomeMessage) {
        chatbox.appendChild(welcomeMessage);
    }
});

// Back button function
function goBack() {
    chatSection.style.display = 'none';
    heroSection.style.display = 'flex';
    featuresSection.style.display = 'flex';
}

// Set initial language
updateLanguageUI(languageSelect.value);

// Refactor appendMessage for dynamic translation
async function appendMessage(sender, text) {
    const chatbox = document.getElementById('chatbox');
    if (sender === 'user') {
        const welcomeMessage = chatbox.querySelector('.welcome-message');
        if (welcomeMessage) welcomeMessage.remove();
    }
    const lang = languageSelect.value;
    const translatedText = await dynamicTranslate(text, lang);
    const msgDiv = document.createElement('div');
    msgDiv.className = sender;
    msgDiv.innerHTML = translatedText;
    chatbox.appendChild(msgDiv);
    chatbox.scrollTop = chatbox.scrollHeight;
}

// Chat form submission
chatForm.addEventListener('submit', async (e) => {
    e.preventDefault(); // Prevent form submission
    const text = userInput.value.trim();
    const lang = languageSelect.value;
    const imageFile = imageInput.files[0];
    if (!text && !imageFile) return;

    await appendMessage('user', text || '[Image]');
    userInput.value = '';
    imageInput.value = '';

    if (imageFile) {
        // Disease detection
        const formData = new FormData();
        formData.append('image', imageFile);
        try {
            const res = await fetch('/detect_disease', {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            if (data.disease) {
                await appendMessage('bot', lang === 'te' ? 'గుర్తించిన రోగం: ' + data.disease : `Detected disease: ${data.disease}`);
                // Pesticide recommendation
                const pestRes = await fetch('/recommend_pesticide', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ disease: data.disease })
                });
                const pestData = await pestRes.json();
                let pestMsg = (lang === 'te'
                    ? '<b>సిఫార్సు చేసిన పెస్టిసైడ్:</b> '
                    : '<b>Recommended pesticide:</b> '
                ) + pestData.pesticide;

                if (pestData.description)
                    pestMsg += '<br>' + (lang === 'te' ? '<b>వివరణ:</b> ' : '<b>Description:</b> ') + pestData.description;

                if (pestData.safety_tips)
                    pestMsg += '<br>' + (lang === 'te' ? '<b>భద్రతా సూచనలు:</b> ' : '<b>Safety tips:</b> ') + pestData.safety_tips;

                await appendMessage('bot', pestMsg);
            } else {
                await appendMessage('bot', data.error || (lang === 'te' ? 'రోగాన్ని గుర్తించలేకపోయాం.' : 'Could not detect disease.'));
            }
        } catch (err) {
            await appendMessage('bot', lang === 'te' ? 'రోగాన్ని గుర్తించడంలో లోపం.' : 'Error detecting disease.');
        }
    } else if (text) {
        // Use Cohere API for intelligent responses
        try {
            const res = await fetch('/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ 
                    message: text, 
                    language: lang 
                })
            });
            const data = await res.json();
            if (data.response) {
                await appendMessage('bot', data.response);
            } else if (data.error) {
                await appendMessage('bot', translations[lang].cropError + data.error);
            } else {
                await appendMessage('bot', translations[lang].cropUnknown);
            }
        } catch (err) {
            await appendMessage('bot', translations[lang].cropError + (err.message || 'Unknown error'));
        }
    }
});

// Crop Recommendation Modal Logic
openCropModalBtn.addEventListener('click', () => {
    console.log('Crop modal open handler called!');
    cropModal.style.display = 'flex';
    cropResult.textContent = '';
});
closeCropModalBtn.addEventListener('click', () => {
    cropModal.style.display = 'none';
});
window.addEventListener('click', (e) => {
    if (e.target === cropModal) cropModal.style.display = 'none';
});

cropForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const lang = languageSelect.value;
    cropResult.textContent = translations[lang].cropGetting;
    // Collect form values
    const N = parseFloat(document.getElementById('N').value);
    const P = parseFloat(document.getElementById('P').value);
    const K = parseFloat(document.getElementById('K').value);
    const temperature = parseFloat(document.getElementById('temperature').value);
    const humidity = parseFloat(document.getElementById('humidity').value);
    const ph = parseFloat(document.getElementById('ph').value);
    const rainfall = parseFloat(document.getElementById('rainfall').value);
    // Send to backend
    try {
        const res = await fetch('/recommend_crop', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ N, P, K, temperature, humidity, ph, rainfall })
        });
        const data = await res.json();
        if (data.recommended_crop) {
            cropResult.textContent = translations[lang].cropResult + data.recommended_crop;
        } else if (data.error) {
            cropResult.textContent = translations[lang].cropError + data.error;
        } else {
            cropResult.textContent = translations[lang].cropUnknown;
        }
    } catch (err) {
        cropResult.textContent = translations[lang].cropError + (err.message || 'Unknown error');
    }
    // Do NOT close the modal or reset the form here
});

function updateCropModalLang(lang) {
    cropModalTitle.textContent = translations[lang].cropModalTitle;
    const labels = cropForm.querySelectorAll('label');
    translations[lang].cropLabels.forEach((label, i) => {
        if (labels[i]) labels[i].textContent = label;
    });
    cropForm.querySelector('button[type="submit"]').textContent = translations[lang].cropSubmit;
}

// Disease Detection Modal Logic
openDiseaseModalBtn.addEventListener('click', () => {
    diseaseModal.style.display = 'flex';
    diseaseResult.textContent = '';
});
closeDiseaseModalBtn.addEventListener('click', () => {
    diseaseModal.style.display = 'none';
});
window.addEventListener('click', (e) => {
    if (e.target === diseaseModal) diseaseModal.style.display = 'none';
});

diseaseForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const lang = languageSelect.value;
    
    // Translate loading message
    let loadingMsg = 'Detecting disease...';
    if (lang === 'te') {
        try {
            const res = await fetch('/translate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: loadingMsg, target_lang: 'te' })
            });
            const data = await res.json();
            loadingMsg = data.translated_text || 'రోగాన్ని గుర్తిస్తున్నాం...';
        } catch (err) {
            loadingMsg = 'రోగాన్ని గుర్తిస్తున్నాం...';
        }
    }
    diseaseResult.textContent = loadingMsg;
    
    const fileInput = document.getElementById('disease-image');
    const imageFile = fileInput.files[0];
    if (!imageFile) {
        let selectMsg = 'Please select an image.';
        if (lang === 'te') {
            try {
                const res = await fetch('/translate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text: selectMsg, target_lang: 'te' })
                });
                const data = await res.json();
                selectMsg = data.translated_text || 'దయచేసి ఒక చిత్రాన్ని ఎంచుకోండి.';
            } catch (err) {
                selectMsg = 'దయచేసి ఒక చిత్రాన్ని ఎంచుకోండి.';
            }
        }
        diseaseResult.textContent = selectMsg;
        return;
    }
    
    const formData = new FormData();
    formData.append('image', imageFile);
    try {
        const res = await fetch('/detect_disease', {
            method: 'POST',
            body: formData
        });
        const data = await res.json();
        if (data.disease) {
            let successMsg = 'Detected disease: ' + data.disease;
            if (lang === 'te') {
                try {
                    const res = await fetch('/translate', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ text: 'Detected disease:', target_lang: 'te' })
                    });
                    const transData = await res.json();
                    successMsg = (transData.translated_text || 'గుర్తించిన రోగం:') + ' ' + data.disease;
                } catch (err) {
                    successMsg = 'గుర్తించిన రోగం: ' + data.disease;
                }
            }
            diseaseResult.textContent = successMsg;
        } else if (data.error) {
            let errorMsg = 'Error: ' + data.error;
            if (lang === 'te') {
                try {
                    const res = await fetch('/translate', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ text: errorMsg, target_lang: 'te' })
                    });
                    const transData = await res.json();
                    errorMsg = transData.translated_text || 'లోపం: ' + data.error;
                } catch (err) {
                    errorMsg = 'లోపం: ' + data.error;
                }
            }
            diseaseResult.textContent = errorMsg;
        } else {
            let noDiseaseMsg = 'Could not detect disease.';
            if (lang === 'te') {
                try {
                    const res = await fetch('/translate', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ text: noDiseaseMsg, target_lang: 'te' })
                    });
                    const transData = await res.json();
                    noDiseaseMsg = transData.translated_text || 'రోగాన్ని గుర్తించలేకపోయాం.';
                } catch (err) {
                    noDiseaseMsg = 'రోగాన్ని గుర్తించలేకపోయాం.';
                }
            }
            diseaseResult.textContent = noDiseaseMsg;
        }
    } catch (err) {
        let errorMsg = 'Error detecting disease.';
        if (lang === 'te') {
            try {
                const res = await fetch('/translate', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ text: errorMsg, target_lang: 'te' })
                });
                const transData = await res.json();
                errorMsg = transData.translated_text || 'రోగాన్ని గుర్తించడంలో లోపం.';
            } catch (err) {
                errorMsg = 'రోగాన్ని గుర్తించడంలో లోపం.';
            }
        }
        diseaseResult.textContent = errorMsg;
    }
});

// Pesticide Advice Modal Logic
openPesticideModalBtn.addEventListener('click', () => {
    pesticideModal.style.display = 'flex';
    pesticideResult.textContent = '';
});
closePesticideModalBtn.addEventListener('click', () => {
    pesticideModal.style.display = 'none';
});
window.addEventListener('click', (e) => {
    if (e.target === pesticideModal) pesticideModal.style.display = 'none';
});

pesticideForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const lang = languageSelect.value;
    
    // Translate loading message
    let loadingMsg = 'Getting advice...';
    if (lang === 'te' || lang === 'hi') {
        try {
            loadingMsg = await dynamicTranslate(loadingMsg, lang);
        } catch (err) {
            loadingMsg = lang === 'te' ? 'సలహా పొందుతున్నాం...' : 'सलाह प्राप्त की जा रही है...';
        }
    }
    pesticideResult.textContent = loadingMsg;
    
    const disease = document.getElementById('disease-select').value;
    if (!disease) {
        let selectMsg = 'Please select a disease.';
        if (lang === 'te' || lang === 'hi') {
            try {
                selectMsg = await dynamicTranslate(selectMsg, lang);
            } catch (err) {
                selectMsg = lang === 'te' ? 'దయచేసి ఒక రోగాన్ని ఎంచుకోండి.' : 'कृपया एक रोग चुनें।';
            }
        }
        pesticideResult.textContent = selectMsg;
        return;
    }
    
    try {
        const res = await fetch('/recommend_pesticide', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ disease })
        });
        const data = await res.json();
        if (data.pesticide) {
            // Translate result labels
            let pesticideLabel = 'Recommended pesticide:';
            let descriptionLabel = 'Description:';
            let safetyLabel = 'Safety tips:';
            
            if (lang === 'te' || lang === 'hi') {
                try {
                    const labelsToTranslate = [pesticideLabel, descriptionLabel, safetyLabel];
                    const res = await fetch('/translate', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({ text: labelsToTranslate.join('\n'), target_lang: lang })
                    });
                    const transData = await res.json();
                    if (transData.translated_text) {
                        const translatedLabels = transData.translated_text.split('\n');
                        pesticideLabel = translatedLabels[0] || 'సిఫార్సు చేసిన పెస్టిసైడ్:';
                        descriptionLabel = translatedLabels[1] || 'వివరణ:';
                        safetyLabel = translatedLabels[2] || 'భద్రతా సూచనలు:';
                    }
                } catch (err) {
                    pesticideLabel = 'సిఫార్సు చేసిన పెస్టిసైడ్:';
                    descriptionLabel = 'వివరణ:';
                    safetyLabel = 'భద్రతా సూచనలు:';
                }
            }
            
            let msg = `<b>${pesticideLabel}</b> ${data.pesticide}`;
            if (data.description) {
                msg += `<br><b>${descriptionLabel}</b> ${data.description}`;
            }
            if (data.safety_tips) {
                msg += `<br><b>${safetyLabel}</b> ${data.safety_tips}`;
            }
            pesticideResult.innerHTML = msg;
        } else if (data.error) {
            let errorMsg = 'Error: ' + data.error;
            if (lang === 'te' || lang === 'hi') {
                try {
                    errorMsg = await dynamicTranslate(errorMsg, lang);
                } catch (err) {
                    errorMsg = lang === 'te' ? 'లోపం: ' + data.error : 'त्रुटि: ' + data.error;
                }
            }
            pesticideResult.textContent = errorMsg;
        } else {
            let noAdviceMsg = 'No advice found.';
            if (lang === 'te' || lang === 'hi') {
                try {
                    noAdviceMsg = await dynamicTranslate(noAdviceMsg, lang);
                } catch (err) {
                    noAdviceMsg = lang === 'te' ? 'సలహా కనుగొనబడలేదు.' : 'सलाह नहीं मिली।';
                }
            }
            pesticideResult.textContent = noAdviceMsg;
        }
    } catch (err) {
        let errorMsg = 'Error getting advice.';
        if (lang === 'te' || lang === 'hi') {
            try {
                errorMsg = await dynamicTranslate(errorMsg, lang);
            } catch (err) {
                errorMsg = lang === 'te' ? 'సలహా పొందడంలో లోపం.' : 'सलाह प्राप्त करने में त्रुटि।';
            }
        }
        pesticideResult.textContent = errorMsg;
    }
});

// Update pesticide modal language
async function updatePesticideModalLang(lang) {
    const pesticideModalTitle = document.querySelector('#pesticide-modal h2');
    const diseaseLabel = document.querySelector('#pesticide-modal label');
    const submitBtn = document.querySelector('#pesticide-form button[type="submit"]');
    
    if (lang === 'te' || lang === 'hi') {
        // Use deep-translator for dynamic translation
        try {
            const textsToTranslate = ['Pesticide Advice', 'Select Disease:', 'Get Advice'];
            const res = await fetch('/translate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: textsToTranslate.join('\n'), target_lang: lang })
            });
            const data = await res.json();
            if (data.translated_text) {
                const translatedTexts = data.translated_text.split('\n');
                pesticideModalTitle.textContent = translatedTexts[0] || 'పెస్టిసైడ్ సలహా';
                diseaseLabel.textContent = translatedTexts[1] || 'రోగాన్ని ఎంచుకోండి:';
                submitBtn.textContent = translatedTexts[2] || 'సలహా పొందండి';
            }
        } catch (err) {
            // Fallback to hardcoded translations
            pesticideModalTitle.textContent = 'పెస్టిసైడ్ సలహా';
            diseaseLabel.textContent = 'రోగాన్ని ఎంచుకోండి:';
            submitBtn.textContent = 'సలహా పొందండి';
        }
    } else {
        pesticideModalTitle.textContent = 'Pesticide Advice';
        diseaseLabel.textContent = 'Select Disease:';
        submitBtn.textContent = 'Get Advice';
    }
}

// Disease dropdown translation and dynamic population
async function populateDiseaseDropdown(lang) {
    diseaseSelect.innerHTML = '<option value="">--Select--</option>';
    let names = [...diseaseDisplayNames];
    if (lang === 'te') {
        // Translate all names to Telugu using backend
        try {
            const res = await fetch('/translate', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: names.join('\n'), target_lang: 'te' })
            });
            const data = await res.json();
            if (data.translated_text) {
                names = data.translated_text.split('\n');
            }
        } catch (err) {
            // fallback to English if translation fails
        }
    }
    for (let i = 0; i < diseaseClassNames.length; i++) {
        const option = document.createElement('option');
        option.value = diseaseClassNames[i];
        option.textContent = names[i];
        diseaseSelect.appendChild(option);
    }
}

// Update all feature cards and modal labels/buttons dynamically
async function updateFeatureCardsAndModals(lang) {
    featureCropTitle.textContent = await dynamicTranslate(translations.en.cropTitle, lang);
    featureCropDesc.textContent = await dynamicTranslate(translations.en.cropDesc, lang);
    featureDiseaseTitle.textContent = await dynamicTranslate(translations.en.diseaseTitle, lang);
    featureDiseaseDesc.textContent = await dynamicTranslate(translations.en.diseaseDesc, lang);
    featurePesticideTitle.textContent = await dynamicTranslate(translations.en.pesticideTitle, lang);
    featurePesticideDesc.textContent = await dynamicTranslate(translations.en.pesticideDesc, lang);
    // Crop modal
    cropModalTitle.textContent = await dynamicTranslate(translations.en.cropModalTitle, lang);
    const cropLabels = cropForm.querySelectorAll('label');
    for (let i = 0; i < translations.en.cropLabels.length; i++) {
        if (cropLabels[i]) cropLabels[i].textContent = await dynamicTranslate(translations.en.cropLabels[i], lang);
    }
    cropForm.querySelector('button[type="submit"]').textContent = await dynamicTranslate(translations.en.cropSubmit, lang);
    // Disease modal
    diseaseModalTitle.textContent = await dynamicTranslate(translations.en.diseaseTitle, lang);
    const diseaseLabels = diseaseForm.querySelectorAll('label');
    if (diseaseLabels[0]) diseaseLabels[0].textContent = await dynamicTranslate('Upload Leaf Image:', lang);
    diseaseForm.querySelector('button[type="submit"]').textContent = await dynamicTranslate('Detect Disease', lang);
    // Pesticide modal
    const pesticideModalTitleEl = document.querySelector('#pesticide-modal h2');
    const pesticideLabel = document.querySelector('#pesticide-modal label');
    const pesticideBtn = document.querySelector('#pesticide-form button[type="submit"]');
    if (pesticideModalTitleEl) pesticideModalTitleEl.textContent = await dynamicTranslate(translations.en.pesticideTitle, lang);
    if (pesticideLabel) pesticideLabel.textContent = await dynamicTranslate('Select Disease:', lang);
    if (pesticideBtn) pesticideBtn.textContent = await dynamicTranslate('Get Advice', lang);
}

// Dynamically update the chat welcome message
async function updateChatGreeting(lang) {
    const chatbox = document.getElementById('chatbox');
    chatbox.innerHTML = '';
    const welcomeDiv = document.createElement('div');
    welcomeDiv.className = 'welcome-message';
    const title = await dynamicTranslate(greetings.en.title, lang);
    const message = await dynamicTranslate(greetings.en.message, lang);
    welcomeDiv.innerHTML = `<h3>${title}</h3><p>${message}</p>`;
    chatbox.appendChild(welcomeDiv);
}

// Patch: Always show greeting on chat open and on language change
startChatBtn.addEventListener('click', async () => {
    heroSection.style.display = 'none';
    featuresSection.style.display = 'none';
    chatSection.style.display = 'flex';
    await updateChatGreeting(languageSelect.value);
});
languageSelect.addEventListener('change', async (e) => {
    const lang = e.target.value;
    await updateLanguageUI(lang);
    if (chatSection.style.display === 'flex') {
        await updateChatGreeting(lang);
    }
});

// Initialize everything after all functions are defined
setTimeout(() => {
    updateCropModalLang(languageSelect.value);
    populateDiseaseDropdown(languageSelect.value);
}, 100);