const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const password2 = document.getElementById('password2');


function showMeErrors(input, message) {
  const formControl = input.parentElement;
  formControl.className = 'form-control error';
  const small = formControl.querySelector('small');
  small.innerText = message;
}


function showMeSuccesses(input) {
  const formControl = input.parentElement;
  formControl.className = 'form-control success';
}


function checkEmail(input) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  if (re.test(input.value.trim())) {
    showSuccess(input);
  } else {
    showMeErrors(input, 'Email is not valid');
  }
}

function checkRequired(inputArr) {
  let isRequired = false;
  inputArr.forEach(function(input) {
    if (input.value.trim() === '') {
      showMeErrors(input, `${getFieldName(input)} is required`);
      isRequired = true;
    } else {
      showMeSuccesses(input);
    }
  });

  return isRequired;
}


function checkLength(input, min, max) {
  if (input.value.length < min) {
    showMeErrors(
      input,
      `${getFieldName(input)} must be at least ${min} characters`
    );
  } else if (input.value.length > max) {
    showMeErrors(
      input,
      `${getFieldName(input)} dürfen nicht mehr als ${max} Zeichen haben`
    );
  } else {
    showMeSuccesses(input);
  }
}


function checkPasswordsMatch(input1, input2) {
  if (input1.value !== input2.value) {
    showMeErrors(input2, 'Passwörter stimmen nicht überein');
  }
}


function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}


form.addEventListener('submit', function(e) {
  e.preventDefault();

  if(!checkRequired([username, email, password, password2])){
    checkLength(username, 3, 15);
    checkLength(password, 6, 25);
    checkEmail(email);
    checkPasswordsMatch(password, password2);
  }

});
