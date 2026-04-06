import './style.css'
import { createIcons, Menu, Target, ShieldCheck, Linkedin, Smartphone, Briefcase, Users, CalendarDays, Gem, ConciergeBell, Quote, ArrowRight, Mic, CheckCircle, Mail, MapPin, Send, Instagram, Youtube } from 'lucide';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, Parallax } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

// Initialize Lucide Icons
createIcons({
  icons: {
    Menu,
    Target,
    ShieldCheck,
    Linkedin,
    Smartphone,
    Briefcase,
    Users,
    CalendarDays,
    Gem,
    ConciergeBell,
    Quote,
    ArrowRight,
    Mic,
    CheckCircle,
    Mail,
    MapPin,
    Send,
    Instagram,
    Youtube
  }
});

// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const mobileMenu = document.getElementById('mobile-menu');
const mobileLinks = document.querySelectorAll('.mobile-link');

mobileMenuBtn.addEventListener('click', () => {
  mobileMenu.classList.toggle('hidden');
});

// Close mobile menu on link click
mobileLinks.forEach(link => {
  link.addEventListener('click', () => {
    mobileMenu.classList.add('hidden');
  });
});

// Navbar Scroll Effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('shadow-lg');
    navbar.classList.replace('bg-brand-black/80', 'bg-brand-black/95');
  } else {
    navbar.classList.remove('shadow-lg');
    navbar.classList.replace('bg-brand-black/95', 'bg-brand-black/80');
  }
});

// LGPD Cookie Banner Logic
document.addEventListener('DOMContentLoaded', () => {
  const cookieBanner = document.getElementById('cookie-banner');
  const acceptBtn = document.getElementById('cookie-accept');
  const rejectBtn = document.getElementById('cookie-reject');

  // Check if user already accepted/rejected
  const cookieConsent = localStorage.getItem('aunis_cookie_consent');

  if (!cookieConsent && cookieBanner) {
    // Show banner after a short delay
    setTimeout(() => {
      cookieBanner.classList.remove('translate-y-full');
    }, 1000);
  }

  const hideBanner = (status) => {
    localStorage.setItem('aunis_cookie_consent', status);
    if (cookieBanner) {
      cookieBanner.classList.add('translate-y-full');
    }
  };

  if (acceptBtn) acceptBtn.addEventListener('click', () => hideBanner('accepted'));
  if (rejectBtn) rejectBtn.addEventListener('click', () => hideBanner('rejected'));

  // Initialize Hero Swiper
  new Swiper(".heroSwiper", {
    modules: [Autoplay, Navigation, Parallax],
    speed: 1000,
    parallax: true,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // --- NEW INFINITY MARQUEE v2 (Seamless & Interactive) ---
  const marqueeContainer = document.getElementById('marquee-container');
  const marqueeTrack = document.getElementById('marquee-track');
  
  if (marqueeContainer && marqueeTrack) {
    let speedSlow = 0.6; // Speed when mouse is OUT
    let speedFast = 2.0; // Speed when mouse is IN (Left/Right)
    let currentSpeed = speedSlow;
    let targetSpeed = speedSlow;
    let scrollPos = 0;
    
    // Get the width of ONE set of logos
    const firstSet = marqueeTrack.querySelector('.marquee-content');
    let contentWidth = firstSet.offsetWidth;

    // Control Zones Logic
    marqueeContainer.addEventListener('mousemove', (e) => {
      const rect = marqueeContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      const percent = (x / width) * 100;

      if (percent < 35) {
        targetSpeed = -speedFast; // Reverse & Faster
      } else if (percent > 65) {
        targetSpeed = speedFast;  // Forward & Faster
      } else {
        targetSpeed = 0;            // Brake in the middle
      }
    });

    marqueeContainer.addEventListener('mouseleave', () => {
      targetSpeed = speedSlow; // Return to slow default
    });

    // Touch Interactions (Mobile/Tablet)
    let isDragging = false;
    let startX = 0;
    let scrollStart = 0;
    let lastDirection = 1; // 1 for right, -1 for left

    marqueeContainer.addEventListener('touchstart', (e) => {
      isDragging = true;
      startX = e.touches[0].clientX;
      scrollStart = scrollPos;
      targetSpeed = 0; // Stop auto-scroll on touch
    }, { passive: true });

    marqueeContainer.addEventListener('touchmove', (e) => {
      if (!isDragging) return;
      const currentX = e.touches[0].clientX;
      const deltaX = startX - currentX;
      
      // Update position manually
      scrollPos = scrollStart + deltaX;
      
      // Track direction for resumption
      lastDirection = deltaX > 0 ? 1 : -1;
    }, { passive: true });

    marqueeContainer.addEventListener('touchend', () => {
      isDragging = false;
      // Resume in swipe direction
      targetSpeed = lastDirection * speedSlow;
    });

    function renderMarquee() {
      // Smooth Acceleration/Braking (Lerp)
      if (!isDragging) {
        currentSpeed += (targetSpeed - currentSpeed) * 0.05;
        scrollPos += currentSpeed;
      }
      
      // SEAMLESS LOOP LOGIC
      if (scrollPos >= contentWidth) {
        scrollPos = 0;
        if (isDragging) scrollStart -= contentWidth; // Offset start for smooth drag
      }
      if (scrollPos < 0) {
        scrollPos = contentWidth;
        if (isDragging) scrollStart += contentWidth; // Offset start for smooth drag
      }

      // Apply transform
      marqueeTrack.style.transform = `translate3d(${-scrollPos}px, 0, 0)`;

      requestAnimationFrame(renderMarquee);
    }

    // Recalculate on resize
    window.addEventListener('resize', () => {
      contentWidth = firstSet.offsetWidth;
    });

    // Start
    renderMarquee();
  }
});
