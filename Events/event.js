addEventListener("load", function(){
    var one = document.getElementById("one");
    var two = document.getElementById("two");
    var three = document.getElementById("three");
    var four = document.getElementById("four");
    
    addEvent(one, "click", oneAlert);
    addEvent(two, "click", twoAlert);
    addEvent(three, "click", threeAlert);
    addEvent(four, "click", fourAlert);
    
    function oneAlert(ev) {
        alert("one " + ev.srcElement);
    }
    
    function twoAlert(ev) {
        alert("two " + ev.srcElement);
    }
    
    function threeAlert(ev) {
//        ev.preventDefault();
        ev.stopPropagation();
        alert("three " + ev.srcElement);
    }
    
    function fourAlert(ev) {
        alert("four " + ev.srcElement);
    }
    
    function addEvent(obj, ev, fn) {
        if (obj.addEventListener) {
            obj.addEventListener(ev, fn);
        }else if (obj.attachEvent) {
            ob.attachEvent("on" + ev, fn, false);
        }
    }
    
});