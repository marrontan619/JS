"use strict";
$(function() {
    var UPDATE_REQUEST = "update_context_menu";
    var storage = chrome.storage.local;
    storage.get(function(items) {
        var contextItems = items["contextItems"];
        
        var sendRequest = function(titleBox) {
            var oldTitle = titleBox.attr("id");
            if (oldTitle != null) {
                delete contextItems[oldTitle];
            }
            storage.set({"contextItems":contextItems});
            var request = {
                "status": "update",
                "oldTitle": oldTitle
            };
            chrome.runtime.sendMessage(request);
        };
        
        var setOption = function() {
            $(this).attr("disabled", true);
            var titleBox = $(this).parent().prev().children("input:first");
            var newTitle = titleBox.val();
            var newVal = $(this).prev().val();
            contextItems[newTitle] = newVal;
            sendRequest(titleBox);
            titleBox.attr("id", newTitle);
        };
        
        var deleteItem = function() {
            var dd = $(this).parent();
            var titleBox = dd.prev().children("input:first");
            sendRequest(titleBox);
            dd.parent().remove();
        };
        
        var createItemSet = function(key, val) {
            var dl = $("dl");
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