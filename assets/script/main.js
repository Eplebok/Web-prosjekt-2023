let navLinks = document.getElementById("nav_links");
let leftlink = document.getElementById("test");
const error1 = document.getElementById("error");
const error2 = document.getElementById("error2");
const error3 = document.getElementById("error3");
const error4 = document.getElementById("error4");
let myname = document.getElementById("name");
let mytextarea = document.getElementById("textarea");


let form = document.getElementById("myForm");
    

function showMenu(){
    navLinks.style.right = "0" + "px";
}

function hideMenu(){
    navLinks.style.right = "-200" + "px";
    
}


        function checkForblank() {
            if ( myname.value == "" && mytextarea.value == ""){
                error3.style.color = "red";
                error2.style.color = "red";
                error4.textContent = "You are missing some required input fields plese try again.";
                error2.textContent = "message from your previous attempt: You have forgotten to input your name!"
                error3.textContent = "message from your previous attempt: You have forgotten to input your message!";
                error4.focus();
                return false;  
            }
            else if (myname.value == "") {
                error4.textContent = "You are missing some required input fields plese try again.";
                error2.textContent = "message from your previous attempt: You have forgotten to input your name!"
                error2.style.color = "red";
                error4.focus();
                return false; 
            }
            else if (mytextarea.value == "") {
                error4.textContent = "You are missing some required input fields plese try again.";              
                error3.style.textIndent = 0 + "px";
                error3.style.color = "red";
                error3.textContent = "message from your previous attempt: You have forgotten to input your message!";
                error4.focus();
                return false;   
            } 
        }

       






