const pages = document.querySelectorAll('.page');
const getStarted = document.querySelector('.start__btn');
const backBtn = document.querySelectorAll('.buttons__back');
const nextBtn = document.querySelectorAll('.buttons__next');
let validated = true;

let counter = 0;

getStarted.addEventListener('click', () => {
  pages[counter].classList.remove('active');
  counter++;
  pages[counter].classList.add('active');
});

const knowledgeBtn = document.querySelector('.knowledge__title');
const knowledgeOption = document.querySelector('.knowledge__options');
const knowledgeOptionText = document.querySelector('.knowledge__title > span');

knowledgeBtn.addEventListener('click', () => {
  knowledgeOption.classList.toggle('active');
  knowledgeBtn.classList.toggle('active');
});

knowledgeOption.addEventListener('click', (e) => {
  if (e.target.classList.contains('knowledge__select')) {
    knowledgeOption.classList.remove('active');
    knowledgeBtn.classList.remove('active');
    knowledgeOptionText.textContent = e.target.textContent;
  }
});

document.addEventListener('click', (e) => {
  if (!e.target.closest('.knowledge__title')) {
    knowledgeOption.classList.remove('active');
    knowledgeBtn.classList.remove('active');
  }
});

const experianceBtn = document.querySelector(
  '.option__experiance .knowledge__title'
);

const experianceOption = document.querySelector(
  '.option__experiance .knowledge__options'
);

const experianceOptionText = document.querySelector(
  '.option__experiance .knowledge__title > span'
);

experianceBtn.addEventListener('click', () => {
  experianceOption.classList.toggle('active');
  experianceBtn.classList.toggle('active');
});

experianceOption.addEventListener('click', (e) => {
  if (e.target.classList.contains('knowledge__select')) {
    experianceOption.classList.remove('active');
    experianceBtn.classList.remove('active');
    experianceOptionText.textContent = e.target.textContent;
  }
});
// ======================================== // page-2
const inputName = document.querySelector('.input__name input');
const inputEmail = document.querySelector('.input__email input');
const inputTell = document.querySelector('.input__phone input');
const inputDate = document.querySelector('.input__date input');
let data;

if (!localStorage.data) {
  data = {};
} else {
  data = JSON.parse(localStorage.getItem('data'));
  addText();
}
function addText() {
  if (data.name) inputName.value = data.name;
  document.querySelector('.input__name').classList.add('check');
  if (data.email) inputEmail.value = data.email;
  document.querySelector('.input__email').classList.add('check');

  if (data.tell) inputTell.value = data.tell;
  document.querySelector('.input__phone').classList.add('check');

  if (data.date) inputDate.value = data.date;
  document.querySelector('.input__date').classList.add('check');
}

const tellReg = /\d\d\d\d\d\d\d\d\d/gm;
const mailReg = /\S+@redberry\.ge/;
backBtn.forEach((item) =>
  item.addEventListener('click', () => {
    pages[counter].classList.remove('active');
    counter--;
    pages[counter].classList.add('active');
  })
);

document.querySelector('.form__inputs').addEventListener('keyup', () => {
  if (inputName.value.length > 1) {
    document.querySelector('.input__name').classList.add('check');
  } else {
    document.querySelector('.input__name').classList.remove('check');
  }
  if (inputEmail.value.match(mailReg)) {
    document.querySelector('.input__email').classList.add('check');
  } else {
    document.querySelector('.input__email').classList.remove('check');
  }
  if (inputTell.value.match(tellReg)) {
    document.querySelector('.input__phone').classList.add('check');
  } else {
    document.querySelector('.input__phone').classList.remove('check');
  }
  if (inputDate.value.length !== 0) {
    document.querySelector('.input__date').classList.add('check');
  } else {
    document.querySelector('.input__date').classList.remove('check');
  }
  if (
    inputName.value.length > 1 &&
    inputEmail.value.match(mailReg) &&
    inputTell.value.match(tellReg) &&
    inputDate.value.length !== 0
  ) {
    document.querySelector(
      '.pages-form__num'
    ).innerHTML = `<img src="./images/icons/check.png" alt="">`;
  } else {
    document.querySelector('.pages-form__num').innerHTML = `1`;
  }
});

nextBtn.forEach((item) =>
  item.addEventListener('click', () => {
    if (inputName.value.length < 2) {
      return;
    }
    if (!inputEmail.value.match(mailReg)) {
      return;
    }
    if (!inputTell.value.match(tellReg)) {
      return;
    }
    if (inputDate.value.length === 0) {
      return;
    }

    data.name = inputName.value;
    data.email = inputEmail.value;
    data.tell = inputTell.value;
    data.date = inputDate.value;

    localStorage.setItem('data', JSON.stringify(data));
    pages[counter].classList.remove('active');
    counter++;
    pages[counter].classList.add('active');
  })
);

if (data.name && data.email && data.tell && data.date) {
  document.querySelector(
    '.pages-form__num'
  ).innerHTML = `<img src="./images/icons/check.png" alt="">`;
}

// =================================== //
let dataChess = [];

function send(url) {
  fetch(url).then((res) => {
    let fetchData = res
      .json()
      .then((data) => data.forEach((item) => dataChess.push(item)));
    return fetchData;
  });
}

dataChess.forEach((item) => {
  experianceOption.innerHTML += `${item.name}`;
});
