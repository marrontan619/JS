"use strict";
addEventListener("load", function(){
    chrome.bookmarks.getTree(function(root) {
        var parse = function (previousValue, currentValue, index, array) {
            var li = document.createElement("li");
            if (currentValue.children) {
                li.textContent = currentValue.title;
                li.classList.add("dir");
                li.addEventListener("click", function (ev) {
                    ev.stopPropagation();
                    this.classList.toggle("hidden");
                });
                var ul = document.createElement("ul");
                ul.id = currentValue.id;
                li.appendChild(currentValue.children.reduce(parse, ul));
            } else {
                var a = document.createElement("a");
                a.textContent = currentValue.title;
                a.href = currentValue.url;
                li.classList.add("page");
                li.appendChild(a);
            }
            previousValue.appendChild(li);
            return previousValue;
        };
        var ul = document.createElement("ul");
        ul.id = "undefined";
        document.body.appendChild(root.reduce(parse, ul));
    });
});
