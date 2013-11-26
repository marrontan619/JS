"use strict";
addEventListener("load", function(){
    chrome.bookmarks.getTree(function(root) {
        //ブックマークツリーのルートに当たるタグを作成
        var bookmarkList = document.createElement("ul");
        bookmarkList.id = root.id;
        document.body.appendChild(bookmarkList);

        root.forEach(parse);
        
        var dir = document.querySelectorAll("li.dir");
        var dirLength = dir.length;
        for(var i = 0; i < dirLength; i++) {
            dir[i].addEventListener("click", function(ev) {
                ev.stopPropagation();
                this.classList.toggle("hidden"); 
            });
        }
    })
});

function parse(node) {
    //ディレクトリのとき
    if(!node.url) {
        makeDirTags(node);
    //ページの時
    } else {
        var li = makePageTag(node);
        document.getElementById(node.parentId).appendChild(li);
    }
}

function makePageTag(node) {
    var li = document.createElement("li");
    li.classList.add("page");
    var a = document.createElement("a");
    a.href = node.url;
    a.textContent = node.title;
    li.appendChild(a);
    return li;
}

function makeDirTags(node) {
    //ディレクトリ名を持ったli
    var li = document.createElement("li");
    li.classList.add("dir");
    li.textContent = node.title;
    document.getElementById(node.parentId).appendChild(li);
    //自分の配下を、自分のIDをもたせたulに格納する
    var dir = document.createElement("ul");
    li.appendChild(dir);
    dir.id = node.id;
    document.getElementById(node.parentId).appendChild(li);
    node.children.forEach(parse);
}

function showToggle(elem) {
    elem.addEventListener("click", function() {
        elem.classList.toggle("hidden");
    });
}
