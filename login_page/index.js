let x = false;

  //#region Example Of LocalStorage
    //   var users = {
    //     "user1": {
    //         "username": "giorgi",
    //         "email": "giorgi.kazishvili@gau.edu.ge",
    //         "password": "12345678",
    //     },
    //     "user2": {
    //         "username": "luka",
    //         "email": "luka.gulverdashvili@gau.edu.ge",
    //         "password": "12341234",
    //     }
    // };
  //#endregion


document.getElementById('submit').onclick = loginHandler;
const users = JSON.parse(localStorage.getItem('users')) || {};

// Function to handle login
function loginHandler() {
    var email = document.getElementById('email');
    var password = document.getElementById('password');

    // Email Validation
    if (email.value.length === 0) {
        document.getElementById('alert1').style.display = 'block';
        document.getElementById('alert2').style.display = 'none';
        email.previousElementSibling.style.color = 'red';
        x = false;
    } else {
        if (!email.validity.valid) {
            document.getElementById('alert2').style.display = 'block';
            document.getElementById('alert1').style.display = 'none';
            email.previousElementSibling.style.color = 'red';
            x = false;
        } else {
            document.getElementById('alert2').style.display = 'none';
            document.getElementById('alert1').style.display = 'none';
            email.style.borderBottom = '2px solid green';
            email.previousElementSibling.style.color = 'green';
            x = true;
        }
    }

    // Password Validation
    if (password.value.length === 0) {
        document.getElementById('alert3').style.display = 'block';
        document.getElementById('alert4').style.display = 'none';
        password.previousElementSibling.style.color = 'red';
        x = false;
    } else if (password.value.length < 8) {
        document.getElementById('alert4').style.display = 'block';
        document.getElementById('alert3').style.display = 'none';
        password.previousElementSibling.style.color = 'red';
        x = false;
    } else {
        document.getElementById('alert4').style.display = 'none';
        document.getElementById('alert3').style.display = 'none';
        password.style.borderBottom = '2px solid green';
        password.previousElementSibling.style.color = 'green';
        x = true;
    }

    // Logic For Actual Login
    function loginUser(email, password) {
        let isUserFound = false;

        // Check If User Exists & Move On
        Object.values(users).forEach(user => {
            if (user.email === email.value && user.password === password.value) {
                document.getElementById('alert5').style.display = 'none';
                password.previousElementSibling.style.color = 'green';
                email.previousElementSibling.style.color = 'green';
                email.style.borderBottom = '2px solid green';
                password.style.borderBottom = '2px solid green';
                localStorage.setItem('xIsTrue', 'true');
                localStorage.setItem('username', user.username); // Store username for later retrieval
                isUserFound = true;
            }
        });

        if (!isUserFound) {
            document.getElementById('alert5').style.display = 'block';
            password.previousElementSibling.style.color = 'red';
            email.previousElementSibling.style.color = 'red';
            password.style.borderBottom = 'red 2px solid';
            email.style.borderBottom = 'red 2px solid';
        }

        return isUserFound;
    }

    // If Successful return to page
    if (loginUser(email, password)) {
        console.log("Login successful!");
        setTimeout(function () {
            window.location.href = `../index.html`;  
            localStorage.setItem("activeTabId", "Main");
        }, 500);
    } else {
        console.log("Invalid credentials. Login failed.");
    }
}
// Triger Sumbit On Enter 
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        loginHandler(); // Trigger login
    }
});

// Redirect for left button
document.getElementById('left').onclick = function () {
    window.location.href = `../index.html`;
    localStorage.setItem("activeTabId", "Main");
};