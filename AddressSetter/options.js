"use strict";
$(function() {
    var UPDATE_REQUEST = "update_context_menu";
    var storage = chrome.storage.local;
    storage.get(function(items) {
        var contextItems = items["contextItems"];
        
        var setOption = function() {
            $(this).attr("disabled", true);
            var titleBox = $(this).parent().prev().children("input:first");
            var oldTitle = titleBox.attr("id");
            var newTitle = titleBox.val();
            var newVal = $(this).prev().val();
            titleBox.attr("id", newTitle);
            var request = {
                status: "update",
                "oldTitle": oldTitle,
                "newTitle": newTitle,
                "newVal": newVal
            };
            delete contextItems[oldTitle];
            contextItems[newTitle] = newVal;
            storage.set({"contextItems":contextItems});
            chrome.runtime.sendMessage(request);
        };
        
        var dl = $("dl");
        var createItemSet = function(key, val) {
            var itemSetDiv = $("<div/>").addClass("itemSet");
            
            var dt = $("<dt/>");
            $("<input/>").attr("type", "text").addClass("key").attr("id", key).val(key).appendTo(dt);
            dt.append("：");
            
            var dd = $("<dd/>");
            $("<input/>").attr("type", "text").val(val).appendTo(dd);
            $("<button/>").addClass("setButton").text("設定").attr("disabled", true).appendTo(dd);
            $("<button/>").addClass("deleteButton").text("削除").appendTo(dd);
            
            itemSetDiv.append(dt);
            itemSetDiv.append(dd);
            dl.append(itemSetDiv);
        };
        
        var enableSetButton = function() {
            $(this).parent().parent().children("dd").children("button.setButton").attr("disabled", false);
        };
        
        var deleteItem = function() {
            var dd = $(this).parent();
            delete contextItems[dd.prev().children("input:first").attr("id")];
            storage.set({"contextItems":contextItems});
            dd.parent().remove();
        };
        
        $("button.setButton").attr("disabled", true);
        $(document).on("input", "input", enableSetButton);
        $(document).on("click", "button.setButton", setOption);
        $(document).on("click", "button.deleteButton", deleteItem);
        
        
        $("button.addButton").click(function() {
            createItemSet(null, null);
        });
        
        
        jQuery.each(contextItems, function(key, val) {
            createItemSet(key, val);
        });
    });
});