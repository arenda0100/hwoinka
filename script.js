/* =====================================
   HVOINKA — INTERACTIVE EXPERIENCE
===================================== */


/* LOADER */

window.addEventListener('load', () => {

    const loader = document.getElementById('loader');

    setTimeout(() => {
        loader.classList.add('hide');
        document.body.classList.add('loaded');
    }, 700);

});


/* HEADER SCROLL EFFECT */

const header = document.getElementById('header');

function updateHeader() {

    if (window.scrollY > 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

}

window.addEventListener('scroll', updateHeader);

updateHeader();


/* MOBILE MENU */

const menuToggle = document.getElementById('menuToggle');
const nav = document.getElementById('nav');
const navLinks = document.querySelectorAll('.nav a');

function closeMenu() {

    menuToggle.classList.remove('active');
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');

}

menuToggle.addEventListener('click', () => {

    menuToggle.classList.toggle('active');
    nav.classList.toggle('open');
    document.body.classList.toggle('menu-open');

});

navLinks.forEach(link => {

    link.addEventListener('click', closeMenu);

});


/* SCROLL REVEAL ANIMATION */

const observer = new IntersectionObserver((entries) => {

    entries.forEach(entry => {

        if (entry.isIntersecting) {

            entry.target.classList.add('visible');

            observer.unobserve(entry.target);

        }

    });

}, {

    threshold: 0.12

});


document.querySelectorAll('.reveal').forEach(element => {

    observer.observe(element);

});


/* CUSTOM CURSOR */

const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');

if (window.matchMedia('(pointer: fine)').matches) {

    let mouseX = 0;
    let mouseY = 0;

    let outlineX = 0;
    let outlineY = 0;

    document.addEventListener('mousemove', (e) => {

        mouseX = e.clientX;
        mouseY = e.clientY;

        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';

    });


    function animateCursor() {

        outlineX += (mouseX - outlineX) * 0.13;
        outlineY += (mouseY - outlineY) * 0.13;

        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';

        requestAnimationFrame(animateCursor);

    }

    animateCursor();


    document.querySelectorAll('a, button').forEach(element => {

        element.addEventListener('mouseenter', () => {
            cursorOutline.classList.add('active');
        });

        element.addEventListener('mouseleave', () => {
            cursorOutline.classList.remove('active');
        });

    });

}


/* PARALLAX HERO */

const hero = document.querySelector('.hero');
const heroTitle = document.querySelector('.hero-title');

if (window.matchMedia('(pointer: fine)').matches) {

    window.addEventListener('mousemove', (e) => {

        if (!heroTitle) return;

        const x = (e.clientX / window.innerWidth - 0.5) * 12;
        const y = (e.clientY / window.innerHeight - 0.5) * 12;

        heroTitle.style.transform =
            `translate(${x}px, ${y}px)`;

    });

}


/* BOOKING DATE: DISABLE PAST DATES */

const dateInput = document.getElementById('date');

const today = new Date();

const localDate = [
    today.getFullYear(),
    String(today.getMonth() + 1).padStart(2, '0'),
    String(today.getDate()).padStart(2, '0')
].join('-');

dateInput.min = localDate;


/* BOOKING FORM */

const bookingForm = document.getElementById('bookingForm');
const formMessage = document.getElementById('formMessage');

bookingForm.addEventListener('submit', async (e) => {

    e.preventDefault();

    const name = document.getElementById('name').value.trim();

    const phone = document.getElementById('phone').value.trim();

    const date = document.getElementById('date').value;

    const guests = document.getElementById('guests').value;

    const service = document.getElementById('service').value;


    if (!name || !phone || !date || !guests) {

        formMessage.textContent =
            'Пожалуйста, заполните все обязательные поля.';

        return;

    }


    const formattedDate = new Date(date + 'T12:00:00')
        .toLocaleDateString('ru-RU', {
            day: 'numeric',
            month: 'long',
            year: 'numeric'
        });


    const message = `
Здравствуйте! Хочу узнать о бронировании усадьбы «Хвоинка».

Имя: ${name}
Телефон: ${phone}
Желаемая дата: ${formattedDate}
Количество гостей: ${guests}
Интересующая услуга: ${service}

Подскажите, пожалуйста, свободна ли дата?
    `.trim();


    try {

        await navigator.clipboard.writeText(message);

        formMessage.innerHTML =
            '✓ Заявка скопирована! Сейчас откроется Instagram. Вставьте сообщение в Direct.';

    } catch (error) {

        formMessage.textContent =
            'Не удалось автоматически скопировать заявку. Попробуйте ещё раз или напишите нам напрямую в Instagram.';

        return;

    }


    window.open(
        'https://www.instagram.com/khvoyinka_usadba/',
        '_blank',
        'noopener,noreferrer'
    );

});


/* SMOOTH ANCHOR SCROLL */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {

    anchor.addEventListener('click', function(e) {

        const target = document.querySelector(this.getAttribute('href'));

        if (!target) return;

        e.preventDefault();

        target.scrollIntoView({

            behavior: 'smooth',
            block: 'start'

        });

    });

});


/* CURRENT YEAR */

const footerText = document.querySelector('.footer p');

if (footerText) {

    footerText.textContent =
        `© ${new Date().getFullYear()} ХВОИНКА. МЕСТО ДЛЯ ОТДЫХА.`;

}
