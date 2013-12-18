$(function() {
    var storage = chrome.storage.local;
    var setOption = function() {
        $(this).attr("disabled", true);
        var elem = $(this).prev();
        var item = {};
        var id = elem.attr("id");
        var value = elem.val();
        item[id] = value;
        storage.set(item);
    };
    
    var buttons = $("button.setButton")
    
    buttons.attr("disabled", true);
    buttons.click(setOption);
    buttons.prev().keydown(function() {
        $(this).next().attr("disabled", false);
    })
    
    storage.get(function(items) {
        var contexts = ["name", "e_mail_1", "e_mail_2", "address", "template"];
        var counter = 0;
        var setVal = function() {
            $(this).val(items[contexts[counter++]]);
        };
        $("button.setButton").prev().each(setVal);
    });
});