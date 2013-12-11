addEventListener("load", function() {
    var contexts = ["name", "e_mail_1", "e_mail_2", "address", "template"];
    var storage = chrome.storage.local;
    
    for (var i = 0; i < contexts.length; i++) {
        var context = contexts[i];
        var elem = document.getElementById(context);
        storage.get(function(items) {
            elem.value = items[context];
        });
        elem.addEventListener("change", function() {
            var item = {};
            var id = this.id;
            var value = this.value;
            item[id] = value;
            storage.set(item);
        });
    }
});