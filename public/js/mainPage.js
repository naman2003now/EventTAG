var backgroundImage = document.getElementById("backgroundImage");
var body = document.getElementById("body");
var clicked = false;

document.getElementById("csgoShade").onclick = (event) => {
    backgroundImage.style.animation = "activateCSGO 0.25s forwards";
    document.getElementById("shaders").style.display = "none";
    document.getElementById("csgoButtonContainer").style.display = "flex";
    setInterval(() => {
        document.getElementById("csgoButtonContainer").style.animation =
            "showForms 0.2s forwards";
    }, 200);

    document.getElementById("clubLogo").style.animation =
        "gocesgo 0.2s forwards";

    document.getElementById("clubLogo").style.backgroundColor = "#efbf2f";
    document.getElementById("clubLogoBackground").style.animation =
        "colorCSGO 0.2s forwards";
};

document.getElementById("valorantShade").onclick = (event) => {
    backgroundImage.style.animation = "activateValorant 0.25s forwards";
    document.getElementById("shaders").style.display = "none";
    document.getElementById("valorantButtonContainer").style.display = "flex";
    document.getElementById("csgoButtonContainer").style.display = "flex";
    setInterval(() => {
        document.getElementById("valorantButtonContainer").style.animation =
            "showForms 0.2s forwards";
    }, 200);
    document.getElementById("clubLogo").style.animation =
        "gotoTop 0.2s forwards";
    document.getElementById("clubLogo").style.animation = "#bd3944";
    document.getElementById("clubLogoBackground").style.animation =
        "colorValo 0.2s forwards";
};

document.getElementById("soloCSGO").onclick = (event) => {
    window.location.href = "/CSGOSolo";
};
document.getElementById("teamCSGO").onclick = (event) => {
    window.location.href = "/createPlayerCSGO";
};
document.getElementById("soloValo").onclick = (event) => {
    window.location.href = "/ValorantSolo";
};
document.getElementById("teamValo").onclick = (event) => {
    window.location.href = "/createPlayerValorant";
};

setInterval(() => window.scrollTo(0, 0), 0);
