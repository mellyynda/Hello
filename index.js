const form = document.querySelector('form');
const messageWrapper = document.querySelector('form ~ div');
const cover = document.querySelector('.cover');
const title = document.querySelector('H1');
const callToAct = document.querySelector('H2');
const clickMe = document.querySelector('.cover div span');

let user = '';
let firstVisit = 0;
let quoteDay = null;

const getQuotes = async () => {
    const quotes = await fetch('https://type.fit/api/quotes');
    const quotesObj = await quotes.json();
    return quotesObj;
}

function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min);
}



document.addEventListener('DOMContentLoaded', () => {
    checkUser();
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    user = event.target.querySelector('input[type=text]').value;
    if (user.trim()) {
        localStorage.setItem('user', user);
        firstVisit++;
        localStorage.setItem('firstVisit', firstVisit);
        getQuotes()
            .then(quotesObj => {
                const rand = randomIntFromInterval(0, 1643);
                const quote = quotesObj[rand].text;
                messageWrapper.innerHTML = setMessage('Nice to meet you', user, quote);
            });
        form.classList.add('hidden');
        callToAct.classList.add('hidden');
    } else messageWrapper.innerHTML = `error please provide a name`;
});

const setMessage = (message, user, quote) => {
    quoteDay = new Date();
    return `<p class="greeting">${message} ${user}!</p><p>Quote of the day:</p><h2><q>${quote}</q></h2>`
}

const checkUser = () => {
    firstVisit = localStorage.getItem('firstVisit');
    if (firstVisit == 1) {
        console.log('visit is 1');
        form.classList.add('hidden');
        callToAct.classList.add('hidden');
        messageWrapper.innerHTML = setMessage('Welcome back', localStorage.getItem('user'));
        animateTitle();
    }
}



const animateTitle = () => {
    title.classList.toggle('clicked');
    clickMe.classList.add('hidden');
}

title.addEventListener('click', animateTitle);