const grid = document.querySelector('.grid');
const spanPlayer = document.querySelector('.player');
const timer = document.querySelector('.timer');

const coisas = [
    'bolsa',
    'cadeira',
    'caneta',
    'celular',
    'chave',
    'chinelo',
    'faca',
    'garrafa',
    'oculos',
    'relogio',
];

const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
}

let firstCard = '';
let secondCard = '';

const checkEndGame = () => {
    const disabledCards = document.querySelectorAll('.disabled-card');

    if (disabledCards.length === 20) {
        clearInterval(this.loop);
        alert(`Parabéns, ${spanPlayer.innerHTML}! Seu tempo foi de: ${timer.innerHTML}`);
    }
}

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-coisa');
    const secondCharacter = secondCard.getAttribute('data-coisa');

    if (firstCharacter === secondCharacter) {

        firstCard.firstChild.classList.add('disabled-card');
        secondCard.firstChild.classList.add('disabled-card');

        firstCard = '';
        secondCard = '';

        checkEndGame();

    } else {
        setTimeout(() => {

            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');

            firstCard = '';
            secondCard = '';

        }, 500);
    }

}

const revealCard = ({ target }) => {

    if (target.parentNode.className.includes('reveal-card')) {
        return;
    }

    if (firstCard === '') {

        target.parentNode.classList.add('reveal-card');
        firstCard = target.parentNode;

    } else if (secondCard === '') {

        target.parentNode.classList.add('reveal-card');
        secondCard = target.parentNode;

        checkCards();

    }
}

const createCard = (coisa) => {

    const card = createElement('div', 'card');
    const front = createElement('div', 'face front');
    const back = createElement('div', 'face back');

    front.style.backgroundImage = `url('../images/${coisa}.png')`;

    card.appendChild(front);
    card.appendChild(back);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-coisa', coisa)

    return card;
}

const loadGame = () => {

    const duplicateCoisas = [...coisas, ...coisas];

    const shuffledArray = duplicateCoisas.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((coisa) => {

        const card = createCard(coisa);
        grid.appendChild(card);

    });

}

const startTimer = () => {

    this.loop = setInterval(() => {
        const currentTime = +timer.innerHTML;
        timer.innerHTML = currentTime + 1;
    }, 1000);

}

window.onload = () => {
    spanPlayer.innerHTML = localStorage.getItem('player');
    startTimer();
    loadGame();
}