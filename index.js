document.addEventListener("DOMContentLoaded", function () {
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
  
    const usernameValue = localStorage.getItem('username');
    const usernameElement = document.getElementById('Username');

    if (usernameElement && usernameValue) {
      usernameElement.innerText = usernameValue;
      localStorage.setItem('username', usernameValue);
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

    // Add event listener for logout action (optional)
    const logoutLink = document.querySelector('.Register1');
    if (logoutLink) {
      logoutLink.addEventListener('click', function () {
        localStorage.removeItem('xIsTrue'); // Remove the state on logout
        localStorage.removeItem('username');
        // Optionally redirect to the homepage or login page after logout
        window.location.href = './index.html';
      });
    }


    // Tab state from localStorage
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


  function showSchedule(day) {
    const scheduleContents = document.querySelectorAll('.schedule-content');
    scheduleContents.forEach(content => {
        content.style.display = 'none';
    });

    const selectedDay = document.getElementById(day);
    selectedDay.style.display = 'block';

    const buttons = document.querySelectorAll('.schedule-tabs button');
    buttons.forEach(button => {
        button.classList.remove('active');
    });

    const activeButton = Array.from(buttons).find(button => button.innerText.toLowerCase() === day.replace('day', '').toUpperCase());
    if (activeButton) {
        activeButton.classList.add('active');
    }
} 


//--------------------- LEAVE FEEDBACK -----------------------

function checkLoginStatus() {
  const usernameValue = localStorage.getItem('username');
  return usernameValue;
}

// Function to toggle the modal visibility (by ID)
function toggleModal(modalId) {
  const modal = document.getElementById(modalId);
  modal.classList.toggle('show');  // Toggle the 'show' class to show or hide the modal
}




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