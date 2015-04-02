$(document).ready(function () {
    loadSettings();

    function loadSettings() {
        var channel;
        var delay;

        chrome.storage.sync.get('channel', function (result) {
            channel = result.channel;
            console.log(channel);

            if (channel) {
                document.getElementById('channel').value = channel;
            }
        });

        chrome.storage.sync.get('delay', function (result) {
            delay = result.delay;
            console.log(delay);

            if (delay) {
                document.getElementById('delay').value = delay;
            }
        });
    }

    function saveSettings() {
        // Get a value saved in a form.
        var channel = document.getElementById('channel').value;
        var delay = document.getElementById('delay').value;
        // Check that there's some code there.
        if (!channel || !delay) {
            console.log('Error: All values not specified');
            return;
        }
        // Save it using the Chrome extension storage API.
        chrome.storage.sync.set({ 'channel': channel }, function () {
            console.log('Channel set to "' + channel + '"');
        });

        chrome.storage.sync.set({ 'delay': delay }, function () {
            console.log('Delay set to "' + delay + '"');
        });
    }

    /*function getNewDelay() {
        var delay = slider_delay.value;
        if (delay >= 1 <= 60) {
            return delay;
        }
    }
    
    function showNewDelay(newValue) {
        document.getElementById("range").innerHTML = newValue;
    }*/

    $('#save').on('click', function () {
        saveSettings();
    });
});
