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
});
