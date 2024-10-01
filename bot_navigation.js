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
// document.addEventListener('DOMContentLoaded', function () {
//     var userPayload = window.userPayload;

//     if (window.botpressWebChat) {
//         window.botpressWebChat.init({
//             "botId": "a4acca45-aa89-4340-996f-e12b79cb2ab9", 
//             "hostUrl": "https://cdn.botpress.cloud/webchat/v1",
//             "messagingUrl": "https://messaging.botpress.cloud",
//             "clientId": "a4acca45-aa89-4340-996f-e12b79cb2ab9",
//             "webhookId": "4c21b14b-8607-465c-9412-e9e6524fd7de",
//             "frontendVersion": "v1",
//             "useSessionStorage": true,
//             "allowedOrigins": [],
//             userData: userPayload,
//         });

//         window.botpressWebChat.onEvent(
//             function(event) {
//                 console.log('Received event:', event);
//                 if (event.event_name === 'pistachiobot_payload') {
//                     console.log('Custom event data:', event.data);
//                     console.log('Bot Version:', event.data.version);
//                     console.log('Release Date:', event.data.release_date);
//                     console.log('Bot Journey:', event.data.bot_journey);
//                 }
//             },
//             ['pistachiobot_payload']
//         );

//         console.log("User payload:", userPayload)
//     } else {
//         console.error('Botpress Web Chat script not loaded');
//     }
// });

// document.getElementById('messageFormTesting').addEventListener('submit', function(event) {
//   event.preventDefault();  // Prevent the form from submitting the traditional way

//   // Call the webhook using fetch
//   fetch('https://webhook.botpress.cloud/13c45b40-830d-48a3-a3d9-875c6bc3c15f', {
//       method: 'POST',
//       mode: 'no-cors',
//       headers: {
//           'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({ "version": "0.2",
//                     "release_date": "31/02/2024" ,
//                     "bot_journey": "elli_bot",
//                     "bot_id": "bp_vd8922fd...",
//                     "timestamp": "58534274242",
//                     "conversation_id": "dnasjdjasbascsac...",
//                     "status": "success", }), 
//   })
//   .then(() => {
//       console.log('Request sent successfully!');
//   })
//   .catch(error => {
//       console.error('Error:', error);
//   });

// });


// window.botpressWebChat.onEvent(
//     (event) => {
//       if(event.type === 'TRIGGER'){
//         console.log(event)
//         }
//     },
//     ['TRIGGER']
//   )
window.botpressWebChat.onEvent(
    (event) => {
      if (event.type === 'TRIGGER') {
        console.log('Received event:', event);
        
        try {
            const ellieData = event.value.elli;
            const pistachioData = event.value.pistachio;
            const studyGuideData = event.value.study_guide;
            const destinationGuideData = event.value.destination_guide;
            
            console.log('Ellie Bot:', ellieData);
            console.log('Pistachio Bot:', pistachioData);
            console.log('Study Guide:', studyGuideData);
            console.log('Destination Guide:', destinationGuideData);
  
        } catch (error) {
          console.error('Error parsing event data:', error);
        }
      }
    },['TRIGGER']
  );