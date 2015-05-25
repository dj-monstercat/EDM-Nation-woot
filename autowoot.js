(function() {
    var room = $("#room-name > span").text();
    var notify = false;
    if ("Notification" in window) {
        if (Notification.permission === "granted") {
            notify = true;
        } else if (Notification.permission === "default") {
            Notification.requestPermission(function(permission) {
                if (!("permission" in Notification && permission === "granted")) {
                    Notification.permission = permission;
                    notify = true;
                }
            });
        }
    }

    API.on(API.ADVANCE, function(data) {
        if (notify) {
            var notification = new Notification(room + " > Now playing:", {
                body: data.media.author + " - " + data.media.title,
                icon: "http://i.imgur.com/n3TnQ2a.png"
            });
            setTimeout(function() {
                notification.close();
            }, 10000);
        }
    });

    API.chatLog("Autowoot Version 1.3.25.7970 online",true);

    $("#woot").click();

    API.on(API.ADVANCE,function(){
    	setTimeout(function(){
    		$("#woot").click();
    	},1000);
    });
}());
