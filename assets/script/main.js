let navLinks = document.getElementById("nav_links");

function checkForblank() {

    let leftlink = document.getElementById("test");
    const error1 = document.getElementById("error");
    const error2 = document.getElementById("error2");
    const error3 = document.getElementById("error3");
    const error4 = document.getElementById("error4");
    let myname = document.getElementById("name");
    let mytextarea = document.getElementById("textarea");

   let form = document.getElementById("myForm");

  if (myname.value === "" && mytextarea.value === "") {
    error3.style.color = "red";
    error2.style.color = "red";
    error4.textContent = "You are missing some required input fields please try again.";
    error2.textContent = "You have forgotten to input your name!";
    error3.textContent = "You have forgotten to input your message!";
    error4.focus();
    return false;
  } else if (myname.value == "") {
    error4.textContent = "You are missing some required input fields please try again.";
    error2.textContent = "You have forgotten to input your name!";
    error2.style.color = "red";
    error4.focus();
    return false;
  } else if (mytextarea.value == "") {
    error4.textContent = "You are missing some required input fields please try again.";
    error3.style.textIndent = 0 + "px";
    error3.style.color = "red";
    error3.textContent = "You have forgotten to input your message!";
    error4.focus();
    return false;
  }
}

function validateForm() {
  let e = document.forms["myForm"]["quantity"].value;
  var x = document.forms["myForm"]["electric"].value;
  if (isNaN(e)) {
    alert("Quantity field must be a number");
    return false;
  }
  if (x != "true" && x != "false" && x != "") {
    alert("Electric field must be either true or false");
    return false;
  }      
}

function showMenu(){
    navLinks.style.right = "0" + "px";
}

function hideMenu(){
    navLinks.style.right = "-200" + "px"; 
}


class FooterComponent extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
    <footer>
    <img src="/assets/images/logo_ntnu_tag_norsk.svg" alt="picture of NTNU logo" class="footer-img">
    <div class="footer-container">  
        <div class="footer-top">      
            <p class="footer-top-info">Kontakt Info</p>
                <ul>
                    <li><a href="https://www.ntnu.no/" class="footer-list">NTNU Homepage</a></li>
                    <li><a href="email@test.no" class="footer-list">NTNU mail</a></li>
                    <li><a href="https://www.ntnu.no/ansatte/ida.parelius" class="footer-list">Person responsible for the workshop</a></li>
                    <li><a href="email@test.no" class="footer-list">Idas mail</a></li>
                    <li><a href="73595000" class="footer-list">Telefon sentralbord: 73 59 50 00</a></li>
                </ul>
        </div>

        <div class="footer-top">
            <p class="footer-top-info">Andre medier</p>
                <ul>
                    <li><a href="https://www.instagram.com/" class="fa fa-instagram"></a></li>
                    <li><a href="https://www.facebook.com/" class="fa fa-facebook"></a></li>
                </ul>
        </div>
    </div>
    </footer>
    `;

    // create a new map element
    const mapElement = document.createElement('div');
    mapElement.setAttribute('id', 'map');
    mapElement.style.height = '200px'; // set the height of the map
    mapElement.style.padding = "relative"
    mapElement.style.margin = "40px"

    // append the map element to the footer container
    const footerContainer = this.querySelector('.footer-container');
    footerContainer.appendChild(mapElement);

    // initialize the map
    const map = new google.maps.Map(mapElement, {
      center: { lat: 60.789619024489895, lng: 10.675773229350039}, // set the initial center of the map
      zoom: 14, // set the initial zoom level
    });

    const location = new google.maps.LatLng(60.78962992090764, 10.675766849946319);

    // Create a marker at the specified location
      const marker = new google.maps.Marker({
        position: location,
        map: map,
        title: 'Verkstedet' // You can set a title to display when hovering over the marker
      });

  }
}

customElements.define('footer-component', FooterComponent);

class NavComponent extends HTMLElement {
    connectedCallback() {
      this.innerHTML = `
        <header class="header">
        <nav tabindex="0">
           <div class="nav_links" id="nav_links">
                
              <ul role="navigation">
                  <div id="logo">
                  <a href="index.html"><img src="/assets/images/logo_ntnu.svg"></a>
                  </div>
                  <div id="mylinks">
                  <li id="leftlink"><a href="index.html" id="test">Home</a></li>
                  <li><a href="tools.html">Tools</a></li>
                  <li><a href="booking.html">Booking</a></li>
                  <li><a href="about.html">About Us</a></li>
                  <li><a href="feedback.html">Feedback</a></li>
                  <li id="login-link"><a href="login.html">Log In</a></li>
                  <li id="logout-link"><a>Log out</a></li>  
                  <li id="user-email"><a></a></li>
                  </div>
              </ul>
          </div>  
        </nav>
        </header>
      `;

    }
  }
  
  customElements.define('nav-component', NavComponent);
  
  function getCookie(name) {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) {
      return parts.pop().split(';').shift();
    }
  }

  function getEmailFromToken(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const decodedToken = JSON.parse(atob(base64));
    return decodedToken.email;
  }

  // named function to update nav bar based on login state
  // need to import/require jwt in order to decode the token
  function updateNavBar() {
    const token = getCookie('token');
    if (token) {
        console.log('User is logged in');
        document.getElementById("login-link").style.display = "none";
        document.getElementById("logout-link").style.display = "inline-block";
        document.getElementById("user-email").style.display = "inline-block";
        document.getElementById("user-email").getElementsByTagName("a")[0].innerHTML = getEmailFromToken(token) ; 
    } else {
      console.log('User is logged out');
      document.getElementById("login-link").style.display = "inline-block";
      document.getElementById("logout-link").style.display = "none";
      document.getElementById("user-email").style.display = "none";
      document.getElementById("user-email").getElementsByTagName("a")[0].innerHTML = "";
    }
  }

// add event listener to update nav bar based on login state
window.addEventListener("message", (event) => {
  if (event.data.loggedIn) {
    updateNavBar();
  } else {
    updateNavBar();
  }
});

// add event listener to update nav bar when the page loads
window.addEventListener("load", updateNavBar);

  
  // add event listener to log out the user when the logout link is clicked
  const logoutLink = document.getElementById("logout-link");
  if (logoutLink) {
    logoutLink.addEventListener("click", () => {
      // delete the cookie
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      // redirect the user to the login page
      window.location.href = "login.html";
    });
  }



  // log in/ register js code for the login.html page below.
    // this is for the functionality of the visual parts of the login/register form
    // where if you press login, it "slides" to the login part, and if you press "register" it "slides" to register
      document.getElementById("signup").addEventListener("click", function() {
      var message = document.querySelector(".message");
      message.style.transform = "translateX(100%)";
      if (message.classList.contains("login")) {
        message.classList.remove("login");
      }
      message.classList.add("signup");
    });

    document.getElementById("login").addEventListener("click", function() {
      var message = document.querySelector(".message");
      message.style.transform = "translateX(0)";
      if (message.classList.contains("login")) {
        message.classList.remove("signup");
      }
      message.classList.add("login");
    });


//  functions below are for displaying error msg or success msg when filling out the login/register form in the login.html

// submitForm for register part
  async function submitRegisterForm(event) {
    event.preventDefault();
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    try {
      const response = await fetch("/register", {
        method: "POST",
        body: JSON.stringify({ email, password }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (response.status === 200) {
        document.getElementById("status").innerHTML = "User created successfully!";
        document.getElementById("error-message").innerHTML = ""; // clear any previous error messages
      } else {
        const errorMessage = await response.text();
        document.getElementById("status").innerHTML = "";
        document.getElementById("error-message").innerHTML = errorMessage;
      }
    } catch (err) {
      console.error(err);
    }
  } 

// submitLoginForm for login part
async function submitLoginForm(event) {
  event.preventDefault();
  const email = document.getElementById("email2").value;
  const password = document.getElementById("password2").value;

  try {
    const response = await fetch("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: {
        "Content-Type": "application/json",
      },
    });

    if (response.status === 200) {
      // Send a message to the parent window with the user's email and login state
      window.parent.postMessage({
        loggedIn: true,
        email: email,
      }, "*");
   //   window.alert("You logged in!")
      document.getElementById("status-msg-login").innerHTML = `You logged in!`;
   //   window.location.href = "index.html"; // redirects the user to the home page
    } else {
      document.getElementById("status-msg-login").innerHTML = "Wrong email or password!";
    }
  } catch (err) {
    console.error(err);
  }
};


  // function to display different messages based on the success/error when uploading a tool
    async function addTool(event) {
      event.preventDefault();
      const form = document.querySelector(".uploadTool");
      const formData = new FormData(form);
    
      try {
        const response = await fetch("/tools/upload", {
          method: "POST",
          body: formData,
        });
    
        if (response.status === 200) {
          document.getElementById("success").innerHTML = "Tool added!";
          document.getElementById("notsuccess").innerHTML = ""; // clear any previous error messages
        } else {
          const errorMessage = await response.text();
          document.getElementById("success").innerHTML = "";
          document.getElementById("notsuccess").innerHTML = "Please fill out the required form!";
        }
      } catch (err) {
        console.error(err);
      }
    }

  // function to display different message based on if booking was successfull / error
    async function submitBookingForm(event) {
      event.preventDefault();
      const email = document.getElementById("booking-email").value;
      const startBookingDate = document.getElementById("bookingStart").value;
      const endBookingDate = document.getElementById("bookingEnd").value;

      try {
        const response = await fetch("/booking/uploadBooking", {
          method: "POST",
          body: JSON.stringify({ email, startBookingDate, endBookingDate }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200) {
          document.getElementById("booking-success").innerHTML = `Booking appointment sent!`;
         // document.getElementById("booking-notsuccess").innerHTML = ""; // clear any previous error messages
        } else {
          const errorMessage = await response.text();
          document.getElementById("booking-success").innerHTML = "Booking not success!";
          //document.getElementById("booking-notsuccess").innerHTML = "Booking not success!";
        }
      } catch (err) {
        console.error(err);
      }
    };

  
  
  






