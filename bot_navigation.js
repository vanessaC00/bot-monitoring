/* Used for the functionality of the navigation to the bots */
//Testing
// window.botpressWebChat.init({
//     "botId": "a4acca45-aa89-4340-996f-e12b79cb2ab9",
//     "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
//     "messagingUrl": "https://messaging.botpress.cloud",
//     "clientId": "a4acca45-aa89-4340-996f-e12b79cb2ab9",
//     "webhookId": "4c21b14b-8607-465c-9412-e9e6524fd7de",
//     "frontendVersion": "v1",
//     "useSessionStorage": true,
//     "allowedOrigins": [],
//     userData: userPayload,
// });



//Testing
document.addEventListener('DOMContentLoaded', function () {
    var userPayload = window.userPayload;

    if (window.botpressWebChat) {
        window.botpressWebChat.init({
            "botId": "a4acca45-aa89-4340-996f-e12b79cb2ab9", 
            "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
            "messagingUrl": "https://messaging.botpress.cloud",
            "clientId": "a4acca45-aa89-4340-996f-e12b79cb2ab9",
            "webhookId": "4c21b14b-8607-465c-9412-e9e6524fd7de",
            "frontendVersion": "v1",
            "useSessionStorage": true,
            "allowedOrigins": [],
            userData: userPayload,
        });

        window.botpressWebChat.onEvent(
            function(event) {
                console.log('Received event:', event);
                if (event.event_name === 'pistachiobot_payload') {
                    console.log('Custom event data:', event.data);
                    console.log('Bot Version:', event.data.version);
                    console.log('Release Date:', event.data.release_date);
                    console.log('Bot Journey:', event.data.bot_journey);
                }
            },
            ['pistachiobot_payload']
        );

        console.log("User payload:", userPayload)
    } else {
        console.error('Botpress Web Chat script not loaded');
    }
});