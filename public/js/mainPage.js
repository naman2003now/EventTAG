var backgroundImage = document.getElementById("backgroundImage");
var body = document.getElementById("body");
var clicked = false;

document.getElementById("csgoShade").onclick = (event) => {
    backgroundImage.style.animation = "activateCSGO 0.25s forwards";
    document.getElementById("shaders").style.display = "none";
    document.getElementById("csgoFormContainer").style.display = "flex";
    document.getElementById("csgoFormContainer").style.animation =
        "showForms 1s forwards";
    document.getElementById("introText").style.display = "none";
};

document.getElementById("valorantShade").onclick = (event) => {
    backgroundImage.style.animation = "activateValorant 0.25s forwards";
    document.getElementById("shaders").style.display = "none";
    document.getElementById("valorantFormContainer").style.display = "flex";
    document.getElementById("csgoFormContainer").style.display = "flex";
    document.getElementById("valorantFormContainer").style.animation =
        "showForms 1s forwards";

    document.getElementById("introText").style.display = "none";
};

setInterval(() => window.scrollTo(0, 0), 0);
