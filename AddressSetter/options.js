$(function() {
    var contexts = ["name", "e_mail_1", "e_mail_2", "address", "template"];
    var storage = chrome.storage.local;
    var setOption = function() {
        var elem = $(this).prev();
        var item = {};
        var id = elem.attr("id");
        var value = elem.val();
        item[id] = value;
        storage.set(item);
    };
    
    $("button.setButton").click(setOption);
    
    storage.get(function(items) {
        var counter = 0;
        var setVal = function() {
            $(this).val(items[contexts[counter++]]);
        };
        $("button.setButton").prev().each(setVal);
    });
});