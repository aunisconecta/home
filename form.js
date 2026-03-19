document.addEventListener('DOMContentLoaded', () => {
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

        // A URL será preenchida assim que o usuário enviá-la
        const WEBHOOK_URL = "";

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

        // Simula análise de 3 segundos para a experiência do usuário
        setTimeout(() => {
            loadingScreen.style.display = 'none';
            successContainer.style.display = 'block';
            
            // Update Progress to 100% just in case
            progressFill.style.width = '100%';
            progressPercent.innerText = '100%';
        }, 3000);
    };

    setupCardSelectors();
});
