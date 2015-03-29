var notify = function (title, options) {
    // Check for notification compatibility.
    if (!'Notification' in window) {
        // If the browser version is unsupported, remain silent.
        return;
    }
    // Log current permission level
    console.log(Notification.permission);
    // If the user has not been asked to grant or deny notifications
    // from this domain...
    if (Notification.permission === 'default') {
        Notification.requestPermission(function () {
            // ...callback this function once a permission level has been set.
            notify(title, options);
        });
    }
        // If the user has granted permission for this domain to send notifications...
    else if (Notification.permission === 'granted') {

        var n = new Notification(
                    title,
                    options
                );
        // Remove the notification from Notification Center when clicked.
        n.onclick = function () {
            window.open("http://www.hitbox.tv/pelilegacy");
        };
        // Callback function when the notification is closed.
        n.onclose = function () {
            console.log('Notification closed');
        };
    }
        // If the user does not want notifications to come from this domain...
    else if (Notification.permission === 'denied') {
        // ...remain silent.
        return;
    }
};

var notified = false;

repeat();
var myVar = setInterval(function () { repeat() }, 5000);

function repeat() {

    jQuery(document).ready(function ($) {

        /**
         * This script uses Hitbox.tv API
         * For full documentation, see: http://developers.hitbox.tv/
         */

        var endpoint = 'http://api.hitbox.tv/media/live/';
        var channel = 'pelilegacy';
        var url = endpoint + channel;
        var liveMsg = "Lähetys on päällä. Tule katsomaan!";

        $.getJSON(url, function (response) {

            if (response.livestream[0].media_is_live == "1") {

                //var viewers = response.livestream[0].media_views;
                if (notified == false) {
                    notified = true;
                    notify('Lähetys on käynnissä!', { icon: "icon.png", body: 'tule seuraamaan osoitteeseen http://www.hitbox.tv/pelilegacy' });
                }
            }
            else {
                notified = false;
            }
        });
    });
}