// script.js - реализация интерактивных элементов

// 1. Счетчик посещений с использованием localStorage
document.addEventListener('DOMContentLoaded', function () {
    // Инициализация счетчика посещений
    initVisitCounter();

    // Инициализация слайдера проектов
    initProjectSlider();

    // Инициализация кнопки показа/скрытия команды
    initTeamToggle();
});

// Функция для счетчика посещений
function initVisitCounter() {
    let visitCount = localStorage.getItem('visitCount');

    if (visitCount === null) {
        // Первое посещение
        visitCount = 1;
    } else {
        // Увеличиваем счетчик
        visitCount = parseInt(visitCount) + 1;
    }

    // Сохраняем в localStorage
    localStorage.setItem('visitCount', visitCount);

    // Отображаем счетчик на странице
    document.getElementById('visitCount').textContent = visitCount;
}

// 2. Слайдер проектов
function initProjectSlider() {
    const projects = [
        {
            title: "Интернет-магазин электроники",
            description: "Полнофункциональный онлайн-магазин с системой управления заказами, интеграцией платежей и рекомендательной системой.",
            tech: "React, Node.js, MongoDB",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        {
            title: "Мобильное приложение для доставки еды",
            description: "Кроссплатформенное приложение с функциями заказа, отслеживания доставки в реальном времени и системой оценок.",
            tech: "React Native, Firebase, Google Maps API",
            image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        {
            title: "Корпоративный портал для управления проектами",
            description: "Веб-приложение для управления задачами, отслеживания времени и командного collaboration.",
            tech: "Vue.js, Express.js, PostgreSQL",
            image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        {
            title: "Образовательная платформа с курсами",
            description: "Система онлайн-обучения с видеоуроками, тестированием и отслеживанием прогресса студентов.",
            tech: "Angular, Django, AWS S3",
            image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        },
        {
            title: "Приложение для планирования путешествий",
            description: "Сервис для планирования маршрутов, бронирования отелей и составления itineraries.",
            tech: "Next.js, NestJS, Redis",
            image: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
        }
    ];

    const slider = document.getElementById('projectSlider');
    const dotsContainer = document.getElementById('projectDots');

    // Создаем слайды и точки навигации
    projects.forEach((project, index) => {
        // Создаем слайд
        const slide = document.createElement('div');
        slide.className = 'slide';
        slide.style.backgroundImage = `linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.5)), url(${project.image})`;

        const slideContent = document.createElement('div');
        slideContent.className = 'slide-content';
        slideContent.innerHTML = `
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <p><strong>Технологии:</strong> ${project.tech}</p>
        `;

        slide.appendChild(slideContent);
        slider.appendChild(slide);

        // Создаем точку навигации
        const dot = document.createElement('div');
        dot.className = `dot ${index === 0 ? 'active' : ''}`;
        dot.dataset.index = index;

        dot.addEventListener('click', function () {
            goToSlide(parseInt(this.dataset.index));
        });

        dotsContainer.appendChild(dot);
    });

    let currentSlide = 0;
    const slides = document.querySelectorAll('.slide');
    const dots = document.querySelectorAll('.dot');

    // Функция для перехода к конкретному слайду
    function goToSlide(n) {
        currentSlide = n;

        // Обновляем позицию слайдера
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;

        // Обновляем активную точку
        dots.forEach((dot, index) => {
            dot.classList.toggle('active', index === currentSlide);
        });
    }

    // Обработчики для кнопок навигации
    document.getElementById('prevBtn').addEventListener('click', function () {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        goToSlide(currentSlide);
    });

    document.getElementById('nextBtn').addEventListener('click', function () {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    });

    // Автоматическое переключение слайдов каждые 5 секунд
    setInterval(() => {
        currentSlide = (currentSlide + 1) % slides.length;
        goToSlide(currentSlide);
    }, 5000);
}

// 3. Кнопка показа/скрытия команды
function initTeamToggle() {
    const toggleBtn = document.getElementById('toggleTeamBtn');
    const teamDetails = document.getElementById('teamDetails');

    toggleBtn.addEventListener('click', function () {
        // Переключаем видимость блока с деталями
        teamDetails.classList.toggle('active');

        // Меняем текст кнопки
        if (teamDetails.classList.contains('active')) {
            toggleBtn.innerHTML = '<i class="fas fa-users"></i> Скрыть подробности о команде';
        } else {
            toggleBtn.innerHTML = '<i class="fas fa-users"></i> Показать подробности о команде';
        }
    });
}
