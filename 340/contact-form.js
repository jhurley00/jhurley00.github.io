const form = document.getElementById('contact-form');
const errorMsg = document.getElementById('error-msg');

form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;

    if (!name || !email || !message) {
        errorMsg.textContent = 'All fields are required!';
    } else if (!email.includes('@')) {
        errorMsg.textContent = 'Please enter a valid email address!';
    } else {
        errorMsg.textContent = 'Form submitted successfully!';
        form.reset();
    }
});