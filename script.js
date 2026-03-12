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
        { id: 1, end: "2026-03-15T23:59:59", link: "https://pay.sumup.com/b2c/QI3ZWCYT", name: "1º Lote" },
        { id: 2, end: "2026-03-20T23:59:59", link: "https://pay.sumup.com/b2c/QHHGZGFP", name: "2º Lote" },
        { id: 3, end: "2026-03-25T23:59:59", link: "https://pay.sumup.com/b2c/QBKDD65A", name: "Lote Final" }
    ];

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

        // Update UI for each card
        LOTES.forEach((lote, index) => {
            const card = document.getElementById(`card-lote-${lote.id}`);
            const btn = document.getElementById(`btn-lote-${lote.id}`);
            const waitBtn = document.getElementById(`wait-lote-${lote.id}`);
            const fixedBtn = document.getElementById("fixed-cta-btn");

            if (index < activeIndex) {
                // Past lote
                card.style.opacity = "0.5";
                card.classList.remove('highlighted');
                if (btn) btn.style.display = "none";
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
                if (waitBtn) waitBtn.style.display = "none";
                
                // Update fixed bar CTA link to current lote
                if (fixedBtn) {
                    fixedBtn.href = lote.link;
                    fixedBtn.innerText = `Garantir Ingresso (${lote.name})`;
                }
            } else {
                // Future lote
                card.style.opacity = "0.7";
                card.classList.remove('highlighted');
                if (btn) btn.style.display = "none";
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
});
