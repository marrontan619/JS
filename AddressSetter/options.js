addEventListener("load", function() {
    var contexts = ["name", "e_mail_1", "e_mail_2", "address", "template"];
    var storage = chrome.storage.local;
    var setOption = function() {
        var item = {};
        var id = this.id;
        var value = this.value;
        item[id] = value;
        storage.set(item);
    };
    
    for (var i = 0; i < contexts.length; i++) {
        var context = contexts[i];
        document.getElementById(context).addEventListener("change", setOption);
    }
    storage.get(function(items) {
        for(var i = 0; i < contexts.length; i++) {
            var context = contexts[i];
            document.getElementById(context).value = items[context];
        }
    });
});