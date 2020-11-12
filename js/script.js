// Создаём переменную, в которую положим кнопку меню
let menuToggle = document.querySelector('#menu-toggle');
// Создаём переменную, в которую положим меню
let menu = document.querySelector('.sidebar');

const regExpValidEmail = /^\w+@\w+\.\w{2,}$/;

const loginElem = document.querySelector('.login');
const loginForm = document.querySelector('.login-form');
const emailInput = document.querySelector('.login-email');
const passwordInput = document.querySelector('.login-password');
const loginSignup = document.querySelector('.login-signup');

const userElem = document.querySelector('.user');
const userNameElem = document.querySelector('.user-name');

const exitElem = document.querySelector('.exit');
const editElem = document.querySelector('.edit');
const editContainer = document.querySelector('.edit-container');

const editUsername = document.querySelector('.edit-username');
const editPhotoURL = document.querySelector('.edit-photo');

const userAvatarElem = document.querySelector('.user-avatar');

const postsWrapper = document.querySelector('.posts');

const listUsers = [{
        id: '01',
        email: 'dima@gmail.com',
        password: '12345',
        displayName: 'DimaG'
    },
    {
        id: '02',
        email: 'amid@gmail.com',
        password: '54321',
        displayName: 'Amid'
    },
];

const setUsers = {
    user: null,
    logIn(email, password, handler) {
        if (!regExpValidEmail.test(email)) {
            alert('Email not valid');
            return;
        }
        const user = this.getUser(email);
        if (user && user.password === password) {
            this.authorizedUser(user);
            handler();
        } else {
            alert('Invalid email or password');
        }
    },
    logOut(handler) {
        this.user = null;
        handler();
    },
    signUp(email, password, handler) {
        if (!regExpValidEmail.test(email)) {
            alert('Email not valid');
            return;
        }
        if (!email.trim() || !password.trim()) {
            alert('Введите данные');
            return;
        }
        if (!this.getUser(email)) {
            const user = {
                email,
                password,
                displayName: email.substring(0, email.search('@'))
            };
            listUsers.push(user);
            this.authorizedUser(user);
            handler();
        } else {
            alert('Пользователь с таким email уже зарегистрирован');
        }
    },
    editUser(userName, userPhoto, handler) {
        if (userName) {
            this.user.displayName = userName;
        }
        if (userPhoto) {
            this.user.photo = userPhoto;
        }
        handler();
    },
    getUser(email) {
        return listUsers.find(item => item.email === email);
    },
    authorizedUser(user) {
        this.user = user;
    }
};

const setPosts = {
    allPosts: [{
            title: 'Заголовок поста',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab distinctio sit consequuntur. Sed optio suscipit cumque possimus! Nesciunt, ipsum enim.',
            tags: ['#xiaomi', ' #mi10', ' #top', ' #mobile'],
            author: 'dima@gmail.com',
            date: '11.11.2020, 20:54:00',
            likes: 15,
            comments: 20
        },
        {
            title: 'Заголовок поста2',
            text: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab distinctio sit consequuntur. Sed optio suscipit cumque possimus! Nesciunt, ipsum enim.',
            tags: ['#xiaomi', ' #mi10', ' #top', ' #mobile'],
            author: 'amid@gmail.com',
            date: '11.11.2020, 20:54:00',
            likes: 15,
            comments: 20
        }
    ]
};

const toggleAuthDom = () => {
    const user = setUsers.user;
    console.log('user: ', user);
    if (user) {
        loginElem.style.display = 'none';
        userElem.style.display = '';
        userNameElem.textContent = user.displayName;
        userAvatarElem.src = user.photo || userAvatarElem.src;
    } else {
        loginElem.style.display = '';
        userElem.style.display = 'none';
    }
};

const showAllPosts = () => {
    let postsHTML = '';
    setPosts.allPosts.forEach(post => {
        const {
            title,
            text,
            tags,
            likes,
            comments,
            date,
            author
        } = post;
        postsHTML += `
            <section class = "post">
                <div class = "post-body">
                <h2 class = "post-title">${title}</h2> 
                <img class = "img-post"
                    src = "img/mi10ultra.jpg"
                    width = "300px"
                    height = "200px"
                    alt = "mi10ultra">
                    <p class = "post-text">${text}</p>
                    <div class = "tags">
                        <a href = "#" class = "tag">${tags}</a> 
                    </div> 
                </div> 
                <div class = "post-footer">
                    <div class = "post-buttons">
                        <button class = "post-button likes">
                            <svg width = "19" height = "20" class = "icon icon-like">
                                <use xlink: href = "img/icons.svg#Like"> </use> 
                            </svg> 
                            <span class = "likes-counter">${likes}</span> 
                        </button> 
                        <button class = "post-button comments">
                            <svg width = "21" height = "21" class = "icon icon-comment">
                                <use xlink: href = "img/icons.svg#comment"> </use> 
                            </svg> 
                            <span class = "comments-counter">${comments}</span> 
                        </button> 
                        <button class = "post-button save">
                            <svg width = "19" height = "19" class = "icon icon-save">
                                <use xlink: href = "img/icons.svg#Save"> </use> 
                            </svg> 
                        </button> 
                        <button class = "post-button share">
                            <svg width = "17" height = "19" class = "icon icon-share">
                                <use xlink: href = "img/icons.svg#share-alt"> </use> 
                            </svg> 
                        </button> 
                    </div> 
                    <div class = "post-author">
                        <div class = "author-about">
                            <a href = "" class = "author-username">${author}</a> 
                            <span class = "post-time">${date}</span> 
                        </div> 
                        <div class = "a author-link"> <img src = "img/avatar.jpg" alt = "avatar" class = "author-avatar"> </div> 
                    </div> 
                </div> 
            </section>
        `;
    });
    postsWrapper.innerHTML = postsHTML;
};

const init = () => {
    loginForm.addEventListener('submit', event => {
        event.preventDefault();
        const emailValue = emailInput.value;
        const passwordValue = passwordInput.value;
        setUsers.logIn(emailValue, passwordValue, toggleAuthDom);
        loginForm.reset();
    });
    loginSignup.addEventListener('click', event => {
        event.preventDefault();
        const emailValue = emailInput.value;
        const passwordValue = passwordInput.value;
        setUsers.signUp(emailValue, passwordValue, toggleAuthDom);
        loginForm.reset();
    });
    exitElem.addEventListener('click', event => {
        event.preventDefault();
        setUsers.logOut(toggleAuthDom);
    });
    editElem.addEventListener('click', event => {
        event.preventDefault();
        editContainer.classList.toggle('visible');
        editUsername.value = setUsers.user.displayName;
    });
    editContainer.addEventListener('submit', event => {
        event.preventDefault();
        setUsers.editUser(editUsername.value, editPhotoURL.value, toggleAuthDom);
        editContainer.classList.remove('visible');
    });
    // Отслеживаем клик по кнопе меню и запускаем функцию
    menuToggle.addEventListener('click', function (event) {
        // отменяем стандартное поведение ссылки
        event.preventDefault();
        // вешаем класс на меню, когда кликаем по кнопке меню
        menu.classList.toggle('visible');
    });
    showAllPosts();
    toggleAuthDom();
};
document.addEventListener('DOMContentLoaded', init);