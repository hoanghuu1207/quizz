var popoverTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="popover"]'))
var popoverList = popoverTriggerList.map(function (popoverTriggerEl) {
  return new bootstrap.Popover(popoverTriggerEl)
})

const alerts = document.querySelectorAll("button[class='btn-close']");

if (alerts.length > 0) {
  alerts.forEach((alert) => {
    const Alert = alert.parentElement;
    setTimeout(() => {
      Alert.classList.add('alert-hidden');
    }, 3000);
  });
}

const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');

togglePassword.addEventListener('click', function () {
  // toggle the type attribute
  const type =
    password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);

  // toggle the eye icon
  this.classList.toggle('fa-eye');
});

const toggleConfirmPassword = document.querySelector('#toggleConfirmPassword');
const confirmPassword = document.querySelector('#confirmPassword');

toggleConfirmPassword.addEventListener('click', function () {
  console.log("oke")
  // toggle the type attribute
  const type =
  confirmPassword.getAttribute('type') === 'password' ? 'text' : 'password';
  confirmPassword.setAttribute('type', type);

  // toggle the eye icon
  this.classList.toggle('fa-eye');
});