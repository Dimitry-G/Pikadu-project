// Создаём переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаём переменную, в которую положим меню
let menu = document.querySelector('.sidebar');

// Отслеживаем клик по кнопе меню и запускаем функцию
menuToggle.addEventListener('click', function (event) {
    // отменяем стандартное поведение ссылки
    event.preventDefault();
    // вешаем класс на меню, когда кликаем по кнопке меню
    menu.classList.toggle('visible');
})