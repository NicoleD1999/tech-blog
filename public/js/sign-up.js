let errorMessage = $('#error-msg')



const signUpHandler = async (event) => {
    event.preventDefault();
    const user_name = $('#signup-username').val().trim();
    const email = $('#signup-email').val().trim();
    const password = $('#signup-password').val().trim();
  
    // if username, email, and password entered
    if (user_name == "") {
        $('#signup-username').attr("style", "border-color: red;")
        $('#signup-username').attr("placeholder", "Please enter a username")
    } 
    if (email == "") {
        $('#signup-email').attr("style", "border-color: red;")
        $('#signup-email').attr("placeholder", "Please enter a valid email")
    } 
    if (password.length < 6) {
        $('#signup-password').attr("style", "border-color: red;")
        $('#signup-password').attr("placeholder", "Please enter a valid password with a minimum of six characters")
    } 
   
    if(user_name && email && password) {
        const response = await fetch('/api/user/signup', {
            method: 'POST',
            body: JSON.stringify({ user_name, email, password  }),
            headers: {'Content-Type': 'application/json'},
        });

        const signData = await response.json();
        if(response.status === 401 || response.status === 404) { 
            errorMessage.text(signData.message)
           return $('error-div').append(errorMessage)
            }
        if(response.ok){
            //replaces current page with home page
            document.location.replace('/api/user/login');
        } else {
            errorMessage.text('Email or username already exist in our database. Try another email and username.')
            return $('error-div').append(errorMessage)
        }
    }
};
$('#signup-form').on('submit', signUpHandler)

$('#loginBtn').on('click', () => {
    document.location.replace('/api/user/login')
});