const pages = document.querySelectorAll('.page');
const getStarted = document.querySelector('.start__btn');
const backBtn = document.querySelectorAll('.buttons__back');
const nextBtn = document.querySelector('.buttons__next');

const doneBtn = document.querySelector('.buttons__done');

const inputName = document.querySelector('.input__name input');
const inputEmail = document.querySelector('.input__email input');
const inputTell = document.querySelector('.input__phone input');
const inputDate = document.querySelector('.input__date input');

const error = document.querySelector('.error');
const errorTitle = document.querySelector('.error__title span');
const errorMessage = document.querySelector('.error__message');

let hasKnoladgeValue = false;

let hasExperianceValue = false;

let data;

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
    data.experience_level = e.target.textContent;
    hasKnoladgeValue = true;
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
    data.character_id = e.target.id;
    data.experience = e.target.textContent;
    hasExperianceValue = true;
  }
});
// ======================================== // page-2

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

  if (data.phone) inputTell.value = data.phone;
  document.querySelector('.input__phone').classList.add('check');

  if (data.date_of_birth) inputDate.value = data.date_of_birth;
  document.querySelector('.input__date').classList.add('check');

  if (data.experience) {
    experianceOptionText.textContent = data.experience;
    hasExperianceValue = true;
  }
  if (data.experience_level) {
    knowledgeOptionText.textContent = data.experience_level;
    hasKnoladgeValue = true;
  }

  if (data.already_participated !== undefined) {
    if (data.already_participated) {
      document.getElementById('radioYes').checked = true;
    } else {
      document.getElementById('radioNo').checked = true;
    }
  }
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

function showError(title, message) {
  errorTitle.textContent = title;
  errorMessage.textContent = message;
  error.classList.add('active');
  setTimeout(() => {
    error.classList.remove('active');
  }, 5000);
}

nextBtn.addEventListener('click', () => {
  if (inputName.value.length < 2) {
    showError('Invalid Name', 'Please enter valid name');
    return;
  }
  if (!inputEmail.value.match(mailReg)) {
    showError('Invalid email', 'Please enter valid email');

    return;
  }
  if (!inputTell.value.match(tellReg)) {
    showError('Invalid phone number', 'Please enter valid phone number');

    return;
  }
  if (inputDate.value.length === 0) {
    showError('Invalid date of birth', 'Please enter valid date of birth');

    return;
  }

  data.name = inputName.value;
  data.email = inputEmail.value;
  data.phone = inputTell.value;
  data.date_of_birth = inputDate.value;

  localStorage.setItem('data', JSON.stringify(data));
  pages[counter].classList.remove('active');
  counter++;
  pages[counter].classList.add('active');
});

doneBtn.addEventListener('click', () => {
  if (!hasKnoladgeValue) {
    return;
  }
  if (!hasExperianceValue) {
    return;
  }
  if (
    document.getElementById('radioYes').checked === false &&
    document.getElementById('radioNo').checked === false
  ) {
    return;
  } else if (document.getElementById('radioYes').checked === true) {
    console.log(1);
    data.already_participated = true;
  } else if (document.getElementById('radioNo').checked === true) {
    console.log(2);

    data.already_participated = false;
  }

  localStorage.setItem('data', JSON.stringify(data));
  pages[counter].classList.remove('active');
  counter++;
  pages[counter].classList.add('active');
});

if (data.name && data.email && data.phone && data.date_of_birth) {
  document.querySelector(
    '.pages-form__num'
  ).innerHTML = `<img src="./images/icons/check.png" alt="">`;
}

// =================================== //

fetch('https://chess-tournament-api.devtest.ge/api/grandmasters').then(
  (res) => {
    res.json().then((data) => {
      data.forEach(
        (item) =>
          (experianceOption.innerHTML += `
            <div class="knowledge__select" id="${item.id}">
              ${item.name}
              <img
                src="./images/people${item.image}"
                alt=""
                width="50"
                height="50"
              />
            </div>`)
      );
    });
  }
);
