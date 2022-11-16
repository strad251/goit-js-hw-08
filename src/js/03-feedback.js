import throttle from 'lodash.throttle';

const feedbackFormEl = document.querySelector('.feedback-form');

const fillFeedbackForm = () => {
  let fillFeedbackFormDataFromLS;

  try {
     fillFeedbackFormDataFromLS = JSON.parse(localStorage.getItem("feedback-form-state")); 
     
    if (fillFeedbackFormDataFromLS === null) {
      return;
     }
  } catch (error) {
    console.log(error)
  }

  for (const prop in fillFeedbackFormDataFromLS) {
    if (fillFeedbackFormDataFromLS.hasOwnProperty(prop)) {
      feedbackFormEl.elements[prop].value = fillFeedbackFormDataFromLS[prop];
    }
  }

  console.log(fillFeedbackFormDataFromLS);
}

fillFeedbackForm();

const inputChange = event => {
  const { name, value } = event.target;

  let userData = JSON.parse(localStorage.getItem('feedback-form-state')) ?? {};

  userData = {
    ...userData,
  [name]: value
  };

  console.log(userData)
  localStorage.setItem("feedback-form-state", JSON.stringify(userData));
}

const feedbackSubmit = event => {
  event.preventDefault();

  let finalUserData = {};
  const formData = new FormData(feedbackFormEl);
  for (const [name, value] of formData.entries()) {
    finalUserData[name] = value;
  }

  localStorage.removeItem('feedback-form-state');
  feedbackFormEl.reset();
  console.log(finalUserData)
}

feedbackFormEl.addEventListener('input', throttle((inputChange), 500));
feedbackFormEl.addEventListener('submit', feedbackSubmit)

