$(document).ready(function() {

    var channel = 'pelilegacy';
    var timeOut = 60000; // Set this for a one minute to prevent notified going true / false many times since Hitbox API does not always know it has changed :)

    var urls = {
        api: 'http://api.hitbox.tv/media/live/' + channel,
        live: {
            hitbox: 'http://www.hitbox.tv/' + channel,
            alt: 'http://live.pelilegacy.fi'
        }
    };

    var strings = {
        title: "Lähetys on käynnissä!",
        body: "Seuraa osoitteessa " + urls.live.alt
    };

    var notify = function (title, options) {

        // If the browser version is unsupported, remain silent.
        if (!'Notification' in window) return;

        // Log current permission level
        console.log(Notification.permission);

        /**
         * If the user has not been asked to grant or deny notifications
         * from this domain
         */

        if (Notification.permission === 'default') {

            Notification.requestPermission(function () {

                /**
                 * Callback this function
                 * once a permission level has been set.
                 */

                notify(title, options);
            });

        } else if (Notification.permission === 'granted') {

            /**
             * If the user has granted permission for this domain to send
             * notifications
             */

            var notification = new Notification(title, options);

            // Remove the notification from Notification Center when clicked.
            notification.onclick = function () {
                window.open(urls.live.alt);
            };

            // Callback function when the notification is closed.
            notification.onclose = function () {
                console.log("Notification closed.");
            };

        } else if (Notification.permission === 'denied') {

            /**
             * If the user does not want notifications
             * to come from this domain
             */

            return;
        }
    };

    var notified = false;

    var repeat = function () {

        /**
         * This script uses Hitbox.tv API
         * For full documentation, see: http://developers.hitbox.tv/
         */

        $.getJSON(urls.api, function (response) {

            if (response.livestream[0].media_is_live == "1") {

                if (!notified) {

                    notified = true;
                    notify(strings.title, {
                        icon: "icon128.png", body: strings.body
                    });
                }
            }
            else {
                notified = false;
            }
        });
    };

    var updateInterval = setInterval(repeat, timeOut);
});
