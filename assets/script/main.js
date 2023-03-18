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
                  <li id="leftlink" ><a id="test" href="index.html">Home</a></li>
                  <li><a href="tools.html">Tools</a></li>
                  <li><a href="booking.html">Booking</a></li>
                  <li><a href="about.html">About Us</a></li>
                  <li><a href="feedback.html">Feedback</a></li>
                  <li><a href="login.html">Log In</a></li>         
              </ul>
          </div>  
        </nav>
        </header>
      `;
    }
  }
  
  customElements.define('nav-component', NavComponent);


  // log in/ register js 
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






