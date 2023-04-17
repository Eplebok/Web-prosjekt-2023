const token = document.cookie.split(';').find(c => c.trim().startsWith('token='));
const isLoggedIn = token !== undefined;

if (isLoggedIn) {
  document.getElementById("login-link").style.display = "none";
  document.getElementById("logout-link").style.display = "inline-block";
} else {
  document.getElementById("login-link").style.display = "inline-block";
  document.getElementById("logout-link").style.display = "none";
}
