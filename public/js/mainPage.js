var backgroundImage = document.getElementById("backgroundImage");
var body = document.getElementById("body");
var clicked = false;

document.getElementById("csgoShade").onclick = (event) => {
    backgroundImage.style.animation = "activateCSGO 0.25s forwards";
    document.getElementById("shaders").style.display = "none";
    document.getElementById("csgoButtonContainer").style.display = "flex";
    document.getElementById("csgoButtonContainer").style.animation =
        "showForms 1s forwards";
};

document.getElementById("valorantShade").onclick = (event) => {
    backgroundImage.style.animation = "activateValorant 0.25s forwards";
    document.getElementById("shaders").style.display = "none";
    document.getElementById("valorantButtonContainer").style.display = "flex";
    document.getElementById("csgoButtonContainer").style.display = "flex";
    document.getElementById("valorantButtonContainer").style.animation =
        "showForms 1s forwards";
};

document.getElementById("soloCSGO").onclick = (event) => {
    window.location.replace("/createPlayerValorant");
};

setInterval(() => window.scrollTo(0, 0), 0);
