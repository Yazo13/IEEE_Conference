
let x = false

document.getElementById('submit').onclick = function(){
    var email = document.getElementById('email');
    var username = document.getElementById('username');
    var password = document.getElementById('password')
    var confirmPassword = document.getElementById('confirmPassword');

    // Validate Username
    if (username.value.length === 0) {
        document.getElementById('alertUsername').style.display = 'block';
        username.previousElementSibling.style.color = 'red';
        x = false;
    } else {
        document.getElementById('alertUsername').style.display = 'none';
        username.style.borderBottom = '2px solid green';
        username.previousElementSibling.style.color = 'green';
        x = true;
    }

    //Validate Email
    if(email.value.length === 0) {
        document.getElementById('alert1').style.display = 'block';
        document.getElementById('alert2').style.display = 'none';
        email.previousElementSibling.style.color = 'red'
        x = false


    } else {
        var emailInput = document.getElementById('email');
        if (emailInput.validity.valid != true) {
            document.getElementById('alert2').style.display = 'block';
            document.getElementById('alert1').style.display = 'none';
            emailInput.previousElementSibling.style.color = 'red'
        x = false


        }else{
            document.getElementById('alert2').style.display = 'none';
            document.getElementById('alert1').style.display = 'none';
            emailInput.style.borderBottom = '2px solid green'
            email.previousElementSibling.style.color = 'green'
            x = true
        }
    }

    //Validate Password
    if(password.value.length === 0){
        document.getElementById('alert3').style.display = 'block';
        document.getElementById('alert4').style.display = 'none';
        password.previousElementSibling.style.color = 'red'
        x = false

    }
    else if(password.value.length < 8){
        document.getElementById('alert4').style.display = 'block';
        document.getElementById('alert3').style.display = 'none';
        password.previousElementSibling.style.color = 'red'
        x = false
    }
    else{
        document.getElementById('alert4').style.display = 'none';
        document.getElementById('alert3').style.display = 'none';
        password.style.borderBottom = '2px solid green'
        password.previousElementSibling.style.color = 'green'
       
    }

    //Validate ConfirmPassword
    if (confirmPassword.value !== password.value && password.value.length !== 0) {
        document.getElementById('alert5').style.display = 'block';
        confirmPassword.previousElementSibling.style.color = 'red';
        x = false;
    } else if(password.value.length == 0) {
        document.getElementById('alert5').style.display = 'block';
        confirmPassword.previousElementSibling.style.color = 'red';
        x = false;
    }else{
        document.getElementById('alert5').style.display = 'none';
        confirmPassword.style.borderBottom = '2px solid green';
        confirmPassword.previousElementSibling.style.color = 'green';
    }


    if (x) {
        const users = JSON.parse(localStorage.getItem('users'))
        let isUserFound = false;
        const alert = document.getElementById('alert6')
        
        if(users){
            Object.values(users).forEach(user => {
                if (user.email === email.value) {
                    isUserFound = true;
                }
            });
        }else{
            isUserFound = false;
        }
        
        if (!isUserFound) {
            registerUser(username.value, email.value, password.value);
            window.location.href = './../login_page/index.html';
            alert.style.display = 'none';
        }else{
            alert.style.display = 'block';
        }

    }

    // Actual Registration
    function registerUser(username, email, password) {
        var users = JSON.parse(localStorage.getItem('users')) || {};
        const newUserKey = `user${Object.keys(users).length + 1}`;
        users[newUserKey] = {
            "username": username,   
            "email": email,
            "password": password
        };

        localStorage.setItem('users', JSON.stringify(users));
    }
};

document.getElementById('left').onclick = function () {
    window.location.href = '../index.html'
    localStorage.setItem("activeTabId", "Main");
}


document.addEventListener('keydown', function (event) {
    if (event.key === 'Enter') {
        event.preventDefault();
        document.getElementById('submit').click();
    }
});