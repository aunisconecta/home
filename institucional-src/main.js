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

  // Initialize Swiper Hero
  new Swiper(".mySwiper", {
    modules: [Navigation, Pagination, Autoplay, Parallax],
    speed: 1000,
    loop: true,
    parallax: true,
    autoplay: {
      delay: 6000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  });

  // Initialize Logos Swiper (Infinite Marquee)
  const logosSwiper = new Swiper(".logosSwiper", {
    modules: [Autoplay],
    slidesPerView: "auto",
    spaceBetween: 0,
    loop: true,
    speed: 5000,
    allowTouchMove: false,
    autoplay: {
      delay: 0,
      disableOnInteraction: false,
    },
  });

  // Advanced Mouse Interactive Logic (Smooth Braking)
  const logosContainer = document.querySelector('.logosSwiper');
  if (logosContainer) {
    let speed = 1.5; // Base speed
    let currentSpeed = speed;
    let targetSpeed = speed;
    let isMouseOver = false;

    logosContainer.addEventListener('mousemove', (e) => {
      isMouseOver = true;
      const rect = logosContainer.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const width = rect.width;
      const percent = (x / width) * 100;

      if (percent < 35) {
        // Left Area -> Target scroll Right (Positive speed)
        targetSpeed = -speed; 
      } else if (percent > 65) {
        // Right Area -> Target scroll Left (Negative speed)
        targetSpeed = speed;
      } else {
        // Center Area -> Brake
        targetSpeed = 0;
      }
    });

    logosContainer.addEventListener('mouseleave', () => {
      isMouseOver = false;
      targetSpeed = speed; // Default scroll Left
    });

    function animateLogos() {
      // Smooth interpolation (Lerp) for braking/acceleration
      currentSpeed += (targetSpeed - currentSpeed) * 0.05;

      if (Math.abs(currentSpeed) > 0.01 || !isMouseOver) {
         // Stop Swiper internal autoplay to take manual control
         if (logosSwiper.autoplay.running) {
           logosSwiper.autoplay.stop();
         }
         
         const currentTranslate = logosSwiper.getTranslate();
         let newTranslate = currentTranslate - currentSpeed;
         
         // Loop logic (Simple version for infinite feel)
         const wrapperWidth = logosSwiper.wrapperEl.scrollWidth / 2;
         if (newTranslate > 0) newTranslate = -wrapperWidth;
         if (newTranslate < -wrapperWidth) newTranslate = 0;
         
         logosSwiper.setTranslate(newTranslate);
      }
      
      requestAnimationFrame(animateLogos);
    }

    // Start manual animation loop
    animateLogos();
  }
});
