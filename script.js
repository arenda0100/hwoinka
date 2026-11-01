'use strict';
document.addEventListener('DOMContentLoaded', () => { // 1. Мобильное меню (Бургер) const burgerBtn = document.getElementById('burger-btn'); const navMenu = document.getElementById('nav-menu'); const navLinks = document.querySelectorAll('.nav a');
if (burgerBtn && navMenu) {
    burgerBtn.addEventListener('click', () => {
        burgerBtn.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach((link) => {
        link.addEventListener('click', () => {
            burgerBtn.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
}

// 2. Изменение шапки при скролле
const header = document.getElementById('header');

if (header) {
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// 3. Плавное появление элементов
const revealElements = document.querySelectorAll('.reveal');

if (revealElements.length > 0) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach((el) => {
        revealObserver.observe(el);
    });
}

// 4. Обработка формы
const form = document.getElementById('booking-form');
const submitBtn = document.getElementById('submit-btn');

if (form && submitBtn) {
    form.addEventListener('submit', (event) => {
        event.preventDefault();
        
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Отправлено!';
        submitBtn.style.backgroundColor = '#2C4234';
        submitBtn.disabled = true;

        setTimeout(() => {
            submitBtn.textContent = originalText;
            submitBtn.style.backgroundColor = '';
            submitBtn.disabled = false;
            form.reset();
        }, 3000);
    });
}
});