"use strict";
addEventListener("load", function(){
    chrome.bookmarks.getTree(function(root) {
        //ブックマークツリーのルートに当たるタグを作成
        var bookmarkList = document.createElement("ul");
        bookmarkList.id = root.id;
        document.body.appendChild(bookmarkList);

        root.forEach(parse);
    });
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
    li.setAttribute("class", "page");
    var a = document.createElement("a");
    a.href = node.url;
    var name = document.createTextNode(node.title);
    a.appendChild(name);
    li.appendChild(a);
    return li;
}

function makeDirTags(node) {
    //ディレクトリ名を持ったli
    var li = document.createElement("li");
    li.setAttribute("class", "dir");
    var name = document.createTextNode(node.title);
    li.appendChild(name);
    document.getElementById(node.parentId).appendChild(li);
    //自分の配下を、自分のIDをもたせたulに格納する
    var dir = document.createElement("ul");
    dir.id = node.id;
    document.getElementById(node.parentId).appendChild(dir);
    node.children.forEach(parse);
}
