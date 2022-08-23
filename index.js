import app from "./main.js";

if (window.innerWidth < window.innerHeight) {
  var q = document.querySelector("#phone");
  q.classList.remove("hide");
  q.classList.add("potrait");
  document.querySelector("#main").style.height = window.innerHeight;
} else {
  document.querySelector("#main").style.height = "5000px";
  app();
}
