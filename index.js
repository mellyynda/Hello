const form = document.querySelector('form');
const messageWrapper = document.querySelector('form ~ div');
let quotes = [];

let user = '';
let firstVisit = 0;

document.addEventListener('DOMContentLoaded', () => {
    checkUser();
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    user = event.target.querySelector('input[type=text]').value;
    if(user.trim()) {
        localStorage.setItem('user', user);
        firstVisit++;
        localStorage.setItem('firstVisit', firstVisit);
        messageWrapper.innerHTML = setMessage('Nice to meet you', user);
        form.classList.add('hidden');
    } else messageWrapper.innerHTML = `error please provide a name`;
});

const setMessage = (message, user) => {
    return `<p class="greeting">${message} ${user}!</p><p>Quote of the day:</p><h2><q>Today is the tomorrow we worried about yesterday.</q></h2>`
}

const checkUser = () => {
    firstVisit = localStorage.getItem('firstVisit');
    if (firstVisit == 1) {
        console.log('visit is 1');
        form.classList.add('hidden');
        messageWrapper.innerHTML = setMessage( 'Welcome back', localStorage.getItem('user'));
    }
}