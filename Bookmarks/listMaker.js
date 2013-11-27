"use strict";
addEventListener("load", function(){
    chrome.bookmarks.getTree(function(root) {
        var parse = function (array) {
            return array.reduce(function (previousValue, currentValue, index, array) {
                var li = document.createElement("li");
                if (currentValue.children) {
                    li.textContent = currentValue.title;
                    li.classList.add("dir");
                    li.addEventListener("click", function (ev) {
                        ev.stopPropagation();
                        this.classList.toggle("hidden");
                    });
                    li.appendChild(parse(currentValue.children));
                } else {
                    var a = document.createElement("a");
                    a.textContent = currentValue.title;
                    a.href = currentValue.url;
                    li.classList.add("page");
                    li.appendChild(a);
                }
                previousValue.appendChild(li);
                return previousValue;
            }, document.createElement("ul"));
        };
        document.body.appendChild(parse(root));
    });
});
