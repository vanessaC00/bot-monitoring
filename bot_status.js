

// const options = {method: 'GET', headers: {accept: 'application/json'}};

// fetch('https://api.botpress.cloud/v1/admin/bots/a4acca45-aa89-4340-996f-e12b79cb2ab9/versions/versionId', options)
//   .then(response => response.json())
//   .then(response => console.log(response))
//   .catch(err => console.error(err));


// document.addEventListener('DOMContentLoaded', function () {
//     var userPayload = window.userPayload || {};

//     if (window.botpressWebChat) {
//         window.botpressWebChat.init({
//             "botId": "9e71a24c-6a0e-4471-ad00-8c4064552e08", 
//             "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
//             "messagingUrl": "https://messaging.botpress.cloud",
//             "clientId": "9e71a24c-6a0e-4471-ad00-8c4064552e08",
//             "webhookId": "13c45b40-830d-48a3-a3d9-875c6bc3c15f",
//             "frontendVersion": "v1",
//             "useSessionStorage": true,
//             "allowedOrigins": [],
//             userData: userPayload,
//         });

//         // window.botpressWebChat.onEvent(
//         //     function(event) {
//         //         console.log('Received event:', event);
//         //         if (event.event_name === 'pistachiobot_payload') {
//         //             console.log('Custom event data:', event.data);
//         //             console.log('Bot Version:', event.data.version);
//         //             console.log('Release Date:', event.data.release_date);
//         //             console.log('Bot Journey:', event.data.bot_journey);
//         //         }
//         //     },
//         //     ['pistachiobot_payload']
//         // );

//         console.log("User payload:", userPayload)
//     } else {
//         console.error('Botpress Web Chat script not loaded');
//     }
// });