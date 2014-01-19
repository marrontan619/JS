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
    
    var enableSetButton = function() {
        $(this).next().attr("disabled", false);
    }
    
    var setButtons = $("button.setButton");
    
    setButtons.attr("disabled", true);
    setButtons.click(setOption);
    setButtons.prev().bind("input", enableSetButton);
    
    
    $("button.deleteButton").click(function() {
        $(this).parent().parent().remove();
    });
    
    var dl = $("dl");
    $("button.addButton").click(function() {
        var itemSetDiv = $("<div/>").addClass("itemSet");
        
        var dt = $("<dt/>");
        $("<input/>").attr("type", "text").appendTo(dt);
        dt.append("：");
        
        var dd = $("<dd/>");
        $("<input/>").attr("type", "text").attr("id", "id").bind("input", enableSetButton).appendTo(dd);
        $("<button/>").addClass("setButton").text("設定").attr("disabled", true).appendTo(dd);
        $("<button/>").addClass("deleteButton").text("削除").appendTo(dd);
        
        itemSetDiv.append(dt);
        itemSetDiv.append(dd);
        dl.append(itemSetDiv);
    });
    
    
    storage.get(function(items) {
        var contexts = ["name", "e_mail_1", "e_mail_2", "address", "template"];
        var counter = 0;
        var setVal = function() {
            $(this).val(items[contexts[counter++]]);
        };
        $("button.setButton").prev().each(setVal);
    });
});