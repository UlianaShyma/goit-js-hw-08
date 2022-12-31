import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

const userFeedback = {};

const fillFeedbackFormFields = () => {
  try {
    const userFeedbackFromLS = JSON.parse(localStorage.getItem(STORAGE_KEY));
    if (userFeedbackFromLS === null) {
      return;
    }

    for (const prop in userFeedbackFromLS) {
      formEl.elements[prop].value = userFeedbackFromLS[prop];
    }
  } catch (err) {
    console.log(err);
  }
};

fillFeedbackFormFields();

const onFeedbackFormItemInput = event => {
  const { target } = event;

  const name = target.name;
  const value = target.value;

  userFeedback[name] = value;

  localStorage.setItem(STORAGE_KEY, JSON.stringify(userFeedback));
};

const onFeedbackFormSubmit = event => {
  event.preventDefault();

  formEl.reset();
  localStorage.removeItem(STORAGE_KEY);
  console.log(userFeedback);
};

formEl.addEventListener('input', throttle(onFeedbackFormItemInput, 500));
formEl.addEventListener('submit', onFeedbackFormSubmit);
