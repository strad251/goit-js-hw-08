import throttle from 'lodash.throttle';

const feedbackFormEl = document.querySelector('.feedback-form');
const userData = {};
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

  // feedbackFormEl.elements['email'].value = 'hello';
  // feedbackFormEl.elements['message'].value = 'hellosss';
  console.log(fillFeedbackFormDataFromLS);
}

fillFeedbackForm();

const inputChange = event => {
  const { target } = event;
  const inputName = target.name;
  const inputValue = target.value;
  
  userData[inputName] = inputValue;

  console.log(userData)
  localStorage.setItem("feedback-form-state", JSON.stringify(userData))
}

const feedbackSubmit = event => {
  event.preventDefault();

  localStorage.removeItem('feedback-form-state');
  feedbackFormEl.reset();
}

feedbackFormEl.addEventListener('input', throttle((inputChange), 500));
feedbackFormEl.addEventListener('submit', feedbackSubmit)

