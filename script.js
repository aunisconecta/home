document.addEventListener('DOMContentLoaded', () => {
    // 1. Reveal Animations on Scroll
    const revealElements = document.querySelectorAll('.reveal');

    const revealOnScroll = () => {
        const windowHeight = window.innerHeight;
        const elementVisible = 150;

        revealElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            if (elementTop < windowHeight - elementVisible) {
                element.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
    revealOnScroll(); // Trigger immediately on load

    // 2. Fixed CTA Bar visibility
    const fixedBar = document.querySelector('.fixed-bar');
    const heroSection = document.querySelector('.hero');

    const toggleFixedBar = () => {
        // Show bar after scrolling past 50% of the hero section
        if (window.scrollY > heroSection.offsetHeight * 0.5) {
            fixedBar.classList.add('visible');
        } else {
            fixedBar.classList.remove('visible');
        }
    };

    window.addEventListener('scroll', toggleFixedBar);

    // 3. Automated Lote Transition & Countdown Logic
    const LOTES = [
        { 
            id: 1, 
            end: "2026-03-18T23:59:59", 
            link: "https://pay.hotmart.com/Y104989828L?off=b9l40edb", 
            name: "1º Lote",
            price: "298,00",
            pix: "00020126730014br.gov.bcb.pix0126jkabreualmeida77@gmail.com0221AUNIS Jkabreueventos 5204000053039865406298.005802BR592561637836 JANNE KELLE DE A6007Goiania62290525SU202603120457338265166326304625A"
        },
        { 
            id: 2, 
            end: "2026-03-22T23:59:59", 
            link: "https://pay.hotmart.com/Y104989828L?off=yf390xfr", 
            name: "2º Lote",
            price: "348,00",
            pix: "00020126650014br.gov.bcb.pix0126jkabreualmeida77@gmail.com0213AUNIS Jkabreu5204000053039865406348.005802BR592561637836 JANNE KELLE DE A6007Goiania62290525SU20260312135903043378632630409EB"
        },
        { 
            id: 3, 
            end: "2026-03-25T23:59:59", 
            link: "https://pay.hotmart.com/Y104989828L?off=i0alzxio", 
            name: "Lote Final",
            price: "398,00",
            pix: "00020126650014br.gov.bcb.pix0126jkabreualmeida77@gmail.com0213AUNIS Jkabreu5204000053039865406398.005802BR592561637836 JANNE KELLE DE A6007Goiania62290525SU2026031214015242822263263041024"
        }
    ];

    const OFFERS = {
        duo: {
            id: 'duo',
            name: "Combo Duo (2 Ingressos)",
            price: "496,00",
            link: "https://pay.hotmart.com/Y104989828L?off=z62aokix",
            pix: "00020126710014br.gov.bcb.pix0126jkabreualmeida77@gmail.com0219AUNISconectaeventos5204000053039865406496.005802BR592561637836 JANNE KELLE DE A6007Goiania62290525SU202603171148128792436326304B7D7"
        }
    };

    let currentLoteIndex = 0;
    let countdownDate = new Date(LOTES[0].end).getTime();

    const updateLotesUI = () => {
        const now = new Date().getTime();
        
        // Find current active lote
        let activeIndex = -1;
        for (let i = 0; i < LOTES.length; i++) {
            const loteEnd = new Date(LOTES[i].end).getTime();
            if (now < loteEnd) {
                activeIndex = i;
                break;
            }
        }

        // If all lotes expired
        if (activeIndex === -1) {
            document.getElementById("timer-mini").innerHTML = "VENDAS ENCERRADAS";
            return;
        }

        currentLoteIndex = activeIndex;
        countdownDate = new Date(LOTES[activeIndex].end).getTime();

        // Update Duo PIX buttons across all lotes
        const duoPixBtns = document.querySelectorAll(".btn-pix-duo");
        duoPixBtns.forEach(btn => {
            btn.onclick = () => openPixModal(OFFERS.duo);
        });

        // Update UI for each card
        LOTES.forEach((lote, index) => {
            const card = document.getElementById(`card-lote-${lote.id}`);
            const btn = document.getElementById(`btn-lote-${lote.id}`);
            const waitBtn = document.getElementById(`wait-lote-${lote.id}`);
            const fixedBtn = document.getElementById("fixed-cta-btn");
            const pixBtn = document.getElementById(`btn-pix-lote-${lote.id}`);

            if (index < activeIndex) {
                // Past lote
                card.style.opacity = "0.5";
                card.classList.remove('highlighted');
                if (btn) btn.style.display = "none";
                
                if (pixBtn) {
                    pixBtn.style.display = "block";
                    pixBtn.style.opacity = "0.3";
                    pixBtn.style.pointerEvents = "none";
                    pixBtn.onclick = null;
                }
                
                if (waitBtn) {
                    waitBtn.style.display = "block";
                    waitBtn.innerText = "LOTE ENCERRADO";
                }
            } else if (index === activeIndex) {
                // Active lote
                card.style.opacity = "1";
                card.classList.add('highlighted');
                if (btn) {
                    btn.style.display = "block";
                    btn.classList.add('pulse');
                    btn.classList.remove('btn-outline');
                    btn.classList.add('btn-primary');
                }
                
                if (pixBtn) {
                    pixBtn.style.display = "block";
                    pixBtn.style.opacity = "1";
                    pixBtn.style.pointerEvents = "auto";
                    pixBtn.onclick = () => openPixModal(lote);
                }
                if (waitBtn) waitBtn.style.display = "none";
                
                // Update fixed bar CTA to scroll to tickets instead of direct link
                if (fixedBtn) {
                    fixedBtn.href = "#tickets";
                    fixedBtn.innerText = `Garantir Ingresso (${lote.name})`;
                    fixedBtn.onclick = (e) => {
                        e.preventDefault();
                        document.querySelector('#tickets').scrollIntoView({ behavior: 'smooth' });
                    };
                }
            } else {
                // Future lote
                card.style.opacity = "0.7";
                card.classList.remove('highlighted');
                if (btn) btn.style.display = "none";
                
                if (pixBtn) {
                    pixBtn.style.display = "block";
                    pixBtn.style.opacity = "0.3";
                    pixBtn.style.pointerEvents = "none";
                    pixBtn.onclick = null;
                }
                if (waitBtn) {
                    waitBtn.style.display = "block";
                    waitBtn.innerText = "Aguardando Virada";
                }
            }
        });
    };

    const updateTimer = () => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        if (distance < 0) {
            updateLotesUI(); // Re-check lotes when one ends
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        // Update Mini Timer in Fixed Bar
        const formattedMini = `${days.toString().padStart(2, '0')}d ${hours.toString().padStart(2, '0')}h ${minutes.toString().padStart(2, '0')}m ${seconds.toString().padStart(2, '0')}s`;
        document.getElementById("timer-mini").innerText = formattedMini;

        // Update Large Timer in Footer
        document.getElementById("days").innerText = days.toString().padStart(2, '0');
        document.getElementById("hours").innerText = hours.toString().padStart(2, '0');
        document.getElementById("mins").innerText = minutes.toString().padStart(2, '0');
        document.getElementById("secs").innerText = seconds.toString().padStart(2, '0');
    };

    setInterval(updateTimer, 1000);
    updateLotesUI();
    updateTimer(); // Initial call

    // 4. PIX Modal Logic
    const pixModal = document.getElementById('pix-modal');
    const pixPriceEl = pixModal.querySelector('p strong');
    const pixCodeEl = document.getElementById('pix-code');
    const btnCopyPix = document.getElementById('btn-copy-pix');
    const closeModal = document.querySelector('.close-modal');
    const copyStatus = document.getElementById('copy-status');

    function openPixModal(lote) {
        pixPriceEl.innerText = `R$ ${lote.price}`;
        pixCodeEl.innerText = lote.pix;
        pixModal.classList.add('active');
    }

    if (closeModal) {
        closeModal.onclick = () => pixModal.classList.remove('active');
    }

    window.onclick = (event) => {
        if (event.target == pixModal) {
            pixModal.classList.remove('active');
        }
    }

    if (btnCopyPix) {
        btnCopyPix.onclick = () => {
            const pixValue = pixCodeEl.textContent.trim();
            navigator.clipboard.writeText(pixValue).then(() => {
                copyStatus.innerText = "Código copiado com sucesso!";
                btnCopyPix.innerText = "Copiado!";
                setTimeout(() => {
                    copyStatus.innerText = "";
                    btnCopyPix.innerText = "Copiar Código PIX";
                }, 3000);
            });
        };
    }
});
