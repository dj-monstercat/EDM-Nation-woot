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
                icon: "http://i.benzi.io/WGXI.png"
            });
            setTimeout(function() {
                notification.close();
            }, 10000);
        }
    });

    API.chatLog("Autowoot turned ON",true);
    API.chatLog("Auto woot running in beta mode!");

    $("#woot").click();

    API.on(API.ADVANCE,function(){
    	setTimeout(function(){
    		$("#woot").click();
    	},1000);
    });
}());
