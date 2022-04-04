var gradient = document.getElementById("backgroundGradient");
var body = document.getElementById("body");
var animating = false;
var clicked = false;

var mouseMove = (event) => {
    if (!animating) {
        let translateDirection = 5;
        if (event.clientX < window.innerWidth / 2) {
            gradient.style.animation = "hoverCSGO 0.2s forwards";
            animating = true;
        } else {
            gradient.style.animation = "hoverValo 0.2s forwards";
            animating = true;
            translateDirection = -5;
        }
        setTimeout(() => {
            gradient.style.animation = "none";
            animating = false;
            gradient.style.transform =
                "translateX(" + translateDirection + "vw)";
        }, 200);
    }
};

window.addEventListener("mousemove", mouseMove, false);

window.onclick = (event) => {
    window.removeEventListener("mousemove", mouseMove);
    if (!clicked) {
        let translateDirection = 150;
        document.getElementById("background").style.display = "none";
        if (event.clientX < window.innerWidth / 2) {
            gradient.style.animation = "activateCSGO 0.2s forwards";
            clicked = true;
            body.style.backgroundColor = "#de9b35";
            document.getElementById("main").style.animation =
                "activateCSGO 0.2s forwards";
        } else {
            gradient.style.animation = "activateValo 0.2s forwards";
            clicked = true;
            translateDirection = -150;
            body.style.backgroundColor = "#fd4556";

            document.getElementById("main").style.animation =
                "activateValo 0.2s forwards";
            setTimeout(() => {
                document.getElementById("valorantFormContainer").style.display =
                    "flex";
                document.getElementById(
                    "valorantFormContainer"
                ).style.animation = "showForm 0.2s forwards";
            }, 200);
        }
        setTimeout(() => {
            gradient.style.animation = "none";
            gradient.style.left = translateDirection + "vw";
            gradient.style.width = "100vw";
        }, 200);
    }
};
