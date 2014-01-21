"use strict";
$(function() {
    var storage = chrome.storage.local;
    storage.get(function(items) {
        var contextItems = items["contextItems"];
        
        var setOption = function() {
            $(this).attr("disabled", true);
            var key = $(this).parent().prev().children("input:first").val();
            var val = $(this).prev().val();
            contextItems[key] = val;
            storage.set({"contextItems":contextItems});
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
            $(this).next().attr("disabled", false);
        };
        
        var deleteItem = function() {
            var dd = $(this).parent();
            delete contextItems[dd.prev().children("input:first").attr("id")];
            storage.set({"contextItems":contextItems});
            dd.parent().remove();
        };
        
        $("button.setButton").attr("disabled", true);
        $(document).on("input", "input, textarea", enableSetButton);
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