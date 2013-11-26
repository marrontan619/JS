var allElems = document.querySelectorAll("*");
var length = allDivs.length;
var nowPx;
for(i = 0; i < length; i++) {
    nowPx = allElems[i].style.fontSize;
    allElems[i].style.fontSize = nowPx + "px";
}