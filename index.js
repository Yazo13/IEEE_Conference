//#region Logic When Site Is Loaded
  document.addEventListener("DOMContentLoaded", function () {
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
    // localStorage.setItem('users', JSON.stringify(users));
  //#endregion

    // Get Element & Value "Username" 
    const usernameValue = localStorage.getItem('username');
    const usernameElement = document.getElementById('Username');

    // Cheking If They Exist & Putting Value To Element
    if (usernameElement && usernameValue) {
      usernameElement.innerText = usernameValue;
    }

    // Get the box elements for Register and Logout
    const box1 = document.getElementById('box1');
    const box2 = document.getElementById('box2');

    // Check if the xIsTrue flag exists in localStorage and update the visibility of the buttons
    const xIsTrue = localStorage.getItem('xIsTrue');

    if (xIsTrue === 'true') {
      if (box1) box1.style.display = 'none'; // Hide Register button
      if (box2) box2.style.display = 'block'; // Show Logout button
      if(usernameElement) usernameElement.href = "index.html";
    } else {
      if (box1) box1.style.display = 'flex'; // Show Register button
      if (box2) box2.style.display = 'none'; // Hide Logout button
    }

    // logout action
    const logoutLink = document.querySelector('.Register1');
    if (logoutLink) {
      logoutLink.addEventListener('click', function () {
        localStorage.removeItem('xIsTrue'); // Remove the state on logout
        localStorage.removeItem('username'); // Remove username on logout
        // redirect to the homepage after logout
        window.location.href = './index.html';
      });
    }


    // Tabs Changing
    const activeTabId = localStorage.getItem("activeTabId");
    if (activeTabId) {
      document.getElementById(activeTabId)?.classList.add("active");
    }

    document.querySelectorAll(".menu a").forEach(tab => {
      tab.addEventListener("click", function () {
        document.querySelectorAll(".menu a").forEach(t => t.classList.remove("active"));
        tab.classList.add("active");
        localStorage.setItem("activeTabId", tab.id);
      });
    });
  });
//#endregion

//#region Burger-Menu Logic
  function toggleMenu() {
    const menu = document.querySelector('.menu');
    const register = document.querySelector('.register');
    const burgerIcon = document.querySelector('.burger-menu');
    
    menu.classList.toggle('active');
    register.classList.toggle('active');
    burgerIcon.classList.toggle('open');

    // Toggle between burger icon and "X"
    if (burgerIcon.classList.contains('open')) {
        burgerIcon.innerHTML = "&times;"; 
        burgerIcon.style.fontSize = '40px';
    } else {
        burgerIcon.innerHTML = "&#9776;"
        burgerIcon.style.fontSize = '28px';
    }
  }
//#endregion

//#region Logic In Case If We Need Delete Of User
  function deleteUser(usernameOrEmail) {
    // Retrieve users from localStorage
    let users = JSON.parse(localStorage.getItem('users')) || {};

    // Find the user key based on the provided username or email
    const userKey = Object.keys(users).find(key => 
        users[key].username === usernameOrEmail || users[key].email === usernameOrEmail
    );

    // If the user is found, delete them from the object
    if (userKey) {
        delete users[userKey]; // Delete the user from the users object
        localStorage.setItem('users', JSON.stringify(users)); // Save updated users back to localStorage
        console.log(`User ${usernameOrEmail} deleted successfully.`);
    } else {
        console.log(`User ${usernameOrEmail} not found.`);
    }
  }
//#endregion
