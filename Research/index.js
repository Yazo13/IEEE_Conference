function dropdown() {
  let coll = document.getElementsByClassName("collapse");
  let index;
  for (index = 0; index < coll.length; index++) {
    coll[index].addEventListener("click", function () {
      this.classList.toggle("active");
      var content = this.nextElementSibling;
      if (content.style.maxHeight) {
        content.style.padding = null;
        content.style.maxHeight = null;
      } else {
        content.style.padding = "30px";
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  }
}

/// Loading screen logic

document.addEventListener("DOMContentLoaded", function () {
  let loading = document.getElementById("loading");
  let main = document.getElementById("main");

  // Initially show loading screen, hide main content
  loading.style.display = "block";
  main.style.display = "none";

  // After 1.5 seconds, switch to main content
  setTimeout(() => {
    loading.style.display = "none"; // Hide loading screen
    main.style.display = "flex";
    // Show main content
  }, 600);
});
