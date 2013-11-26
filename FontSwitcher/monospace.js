var allDivs = document.querySelectorAll("div");
var length = allDivs.length;
for(i = 0; i < length; i++) {
    allDivs[i].style.fontFamily = "monospace";
    allDivs[i].style.fontSize = 15 + "px";
}