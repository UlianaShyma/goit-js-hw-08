import throttle from 'lodash.throttle';

const formEl = document.querySelector('.feedback-form');
const STORAGE_KEY = 'feedback-form-state';

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
  let userFeedback = localStorage.getItem(STORAGE_KEY);
  userFeedback = userFeedback ? JSON.parse(userFeedback) : {};
  userFeedback[event.target.name] = event.target.value;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(userFeedback));
};

const onFeedbackFormSubmit = event => {
  event.preventDefault();
  const {
    elements: { email, message },
  } = event.target;

  if (email.value === '' || message.value === '') {
    return window.alert('Please fill in all the fields!');
  }
  console.log({ Email: email.value, Message: message.value });
  formEl.reset();
  localStorage.removeItem(STORAGE_KEY);
};

formEl.addEventListener('input', throttle(onFeedbackFormItemInput, 500));
formEl.addEventListener('submit', onFeedbackFormSubmit);
