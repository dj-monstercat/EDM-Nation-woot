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
                icon: "i.imgur.com/8p5eoAu.png"
            });
            setTimeout(function() {
                notification.close();
            }, 10000);
        }
    });

    API.chatLog("Autowoot Version 1.3.24.7937 online",true);
    API.chatLog("Don't forget to visit our room: https://plug.dj/edmc-3");

    $("#woot").click();

    API.on(API.ADVANCE,function(){
    	setTimeout(function(){
    		$("#woot").click();
    	},1000);
    });
}());
