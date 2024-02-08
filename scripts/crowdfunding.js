function Scroll() {
    var scrollTop = window.scrollY || document.documentElement.scrollTop;
    if (scrollTop > 100) {
        document.getElementById("ulule").classList.add("small");
        //change image
        document.getElementById("ulule_img").src = "resources/ulule_square.png";
        document.getElementById("support_title").textContent = "Support us!";
        document.getElementById("ulule").classList.remove("large");
    } else {
        document.getElementById("ulule").classList.add("large");
        //change image
        document.getElementById("ulule_img").src = "resources/ulule_plain.png";
        document.getElementById("support_title").textContent = "Support us on Ulule";
        document.getElementById("ulule").classList.remove("small");
    }
}

document.addEventListener("scroll", Scroll);
