document.addEventListener('DOMContentLoaded', () => {
    // Grab URL parameter for auto-selecting Lote
    const urlParams = new URLSearchParams(window.location.search);
    const preselectedLote = urlParams.get('lote');

    if (preselectedLote) {
        // Find the input matching the lote value and check it before UI initialization
        const loteInput = document.querySelector(`input[name="lote"][value="${preselectedLote}"]`);
        if (loteInput) loteInput.checked = true;
    }

    const form = document.getElementById('mapa-form');
    const steps = document.querySelectorAll('.step-block');
    const btnNext = document.getElementById('btn-next');
    const btnPrev = document.getElementById('btn-prev');
    const progressFill = document.getElementById('progress-fill');
    const progressPercent = document.getElementById('progress-percent');
    
    const loadingScreen = document.getElementById('loading-screen');
    const successContainer = document.getElementById('success-container');
    const formSection = document.getElementById('form-section');

    let currentStep = 1;
    const totalSteps = steps.length;

    // Initialize Progress
    const updateProgress = () => {
        const percent = Math.round(((currentStep - 1) / (totalSteps - 1)) * 100);
        progressFill.style.width = `${percent}%`;
        progressPercent.innerText = `${percent}%`;
    };

    const showStep = (stepNumber) => {
        steps.forEach(step => {
            step.classList.remove('active');
            if (parseInt(step.dataset.step) === stepNumber) {
                step.classList.add('active');
            }
        });

        // Toggle navigation buttons
        btnPrev.style.display = stepNumber === 1 ? 'none' : 'block';
        
        if (stepNumber === totalSteps) {
            btnNext.innerText = 'Concluir Diagnóstico';
            btnNext.classList.add('btn-submit');
        } else {
            btnNext.innerText = 'Próxima Etapa';
            btnNext.classList.remove('btn-submit');
        }

        updateProgress();
        
        // Scroll to top of form
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    // Validation
    const validateStep = (stepNumber) => {
        const currentBlock = document.querySelector(`.step-block[data-step="${stepNumber}"]`);
        const requiredInputs = currentBlock.querySelectorAll('[required]');
        let isValid = true;

        requiredInputs.forEach(input => {
            if (input.type === 'radio') {
                const name = input.name;
                const checked = currentBlock.querySelector(`input[name="${name}"]:checked`);
                if (!checked) {
                    isValid = false;
                    // Add subtle visual shake or highlight to the group
                    const group = input.closest('.form-group');
                    group.classList.add('error-pulse');
                    setTimeout(() => group.classList.remove('error-pulse'), 500);
                }
            } else if (!input.value.trim()) {
                isValid = false;
                input.style.borderColor = '#ff0000';
                setTimeout(() => input.style.borderColor = 'rgba(255, 255, 255, 0.1)', 2000);
            }
        });

        return isValid;
    };

    // Card Selection Logic (Visual)
    const setupCardSelectors = () => {
        const cards = document.querySelectorAll('.select-card');
        cards.forEach(card => {
            const input = card.querySelector('input');
            
            // Check initial state
            if (input.checked) {
                card.classList.add('selected');
            }

            card.addEventListener('click', () => {
                if (input.type === 'radio') {
                    // Deselect others in the same group
                    const name = input.name;
                    document.querySelectorAll(`input[name="${name}"]`).forEach(i => {
                        i.closest('.select-card').classList.remove('selected');
                    });
                    input.checked = true;
                    card.classList.add('selected');
                } else if (input.type === 'checkbox') {
                    input.checked = !input.checked;
                    card.classList.toggle('selected');
                }
            });
        });
    };

    // Navigation Events
    btnNext.addEventListener('click', () => {
        if (!validateStep(currentStep)) return;

        if (currentStep < totalSteps) {
            currentStep++;
            showStep(currentStep);
        } else {
            submitForm();
        }
    });

    btnPrev.addEventListener('click', () => {
        if (currentStep > 1) {
            currentStep--;
            showStep(currentStep);
        }
    });

    const submitForm = () => {
        // Collect Data
        const formData = new FormData(form);
        const data = {};
        
        // Handle multiple values (checkboxes like 'desafios')
        for (let [key, value] of formData.entries()) {
            if (data[key]) {
                if (!Array.isArray(data[key])) {
                    data[key] = [data[key]];
                }
                data[key].push(value);
            } else {
                data[key] = value;
            }
        }
        data.timestamp = new Date().toLocaleString('pt-BR');

        // Show Loading Screen
        formSection.style.display = 'none';
        loadingScreen.style.display = 'flex';
        window.scrollTo({ top: 0, behavior: 'smooth' });

        // URL real do Webhook gerado pelo usuário
        const WEBHOOK_URL = "https://script.google.com/macros/s/AKfycbxRWEK7L16mR2DLYoECLJ_jVngK1WrPV09vn87Upo5EttEmtGnAGf1Vfuj-_cT52a3L/exec";

        // Send Data to Google Sheets Webhook without blocking the UI
        if (WEBHOOK_URL) {
            fetch(WEBHOOK_URL, {
                method: 'POST',
                mode: 'no-cors', // Evita bloqueios de CORS do Google Apps Script
                headers: {
                    'Content-Type': 'text/plain', // Mime correto para não-cors script
                },
                body: JSON.stringify(data)
            }).catch(console.error);
        }

        // Simula análise rápida e redireciona (reduzido de 3s para 1.5s)
        setTimeout(() => {
            // Hotmart Checkout Config
            const loteEscolhido = data.lote;
            const nomeStr = data.nome ? encodeURIComponent(data.nome) : '';
            const emailStr = data.email ? encodeURIComponent(data.email) : '';
            
            // Clean non-digits from WhatsApp
            const whatsRaw = data.whatsapp || '';
            let whatsLimpo = whatsRaw.replace(/\D/g, '');
            // Hotmart expects phonenumber format often without +55 if it's already local, 
            // but providing just numbers is fine.
            const whatsStr = encodeURIComponent(whatsLimpo);
            
            let baseUrl = "https://pay.hotmart.com/Y104989828L"; // Base fallback
            if (loteEscolhido === "1") baseUrl += "?off=b9l40edb";
            else if (loteEscolhido === "2") baseUrl += "?off=yf390xfr";
            else if (loteEscolhido === "3") baseUrl += "?off=i0alzxio";
            else if (loteEscolhido === "duo") baseUrl += "?off=z62aokix";
            
            // Append buyer data
            const connectChar = baseUrl.includes("?") ? "&" : "?";
            const finalUrl = `${baseUrl}${connectChar}name=${nomeStr}&email=${emailStr}&phonenumber=${whatsStr}`;
            
            // Log for debugging
            console.log("Redirecting to:", finalUrl);
            
            // Execute Redirect
            window.location.href = finalUrl;
            
        }, 1500);
    };

    setupCardSelectors();
});
