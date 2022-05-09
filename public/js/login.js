const display = $('#display')

display.text('');


try {
const loginHandler = async (event) => {
    event.preventDefault();    
    const email = $('#login-email').val().trim();
    const password = $('#login-password').val().trim();
    // if email and password have been entered
    if(email && password) {
        const response = await fetch('/api/user/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json '},
        });
    const data = await response.json();
    if(response.status === 400 || response.status === 401) { 
        display.text(`${data.message}`)
    return  $('#display-div').append(display);
    }

    document.location.replace('/');
    
    }
}

$('#login-form').on('submit', loginHandler);
} catch (error) {
    console.log(error)
}

$('#signupBtn').on('click', () => {
    document.location.replace('/api/signup')
})