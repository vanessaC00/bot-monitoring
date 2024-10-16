window.onload = function () {
    // Automatically send a message when the page loads.
    sendBotTriggerMessage();
};

function sendBotTriggerMessage() {
    window.botpressWebChat.sendEvent({
        type: 'message',
        text: 'Trigger data load',
        channel: 'web'
    });
}// end sendBotTriggerMessage()


let ellieData = {};
let pistachioData = {};
let studyGuideData = {};
let destinationGuideData = {};
let rankingSupportData = {};

function getEventData() {
    return new Promise((resolve, reject) => {
        window.botpressWebChat.onEvent(
            (event) => {
                if (event.type === 'TRIGGER') {
                    console.log('Received event:', event);
                    try {

                        ellieData = event.value.elli || {};
                        pistachioData = event.value.pistachio || {};
                        studyGuideData = event.value.study_guide || {};
                        destinationGuideData = event.value.destination_guide || {};
                        rankingSupportData = event.value.ranking_support || {};
                        
                        resolve();
                    } catch (error) {
                        reject('Error parsing event data');
                    }
                }
            }, ['TRIGGER']
        );
    });
}// end getEventData()

async function processEventData() {
    await getEventData(); 

    const page = window.location.pathname.split('/').pop();

    switch (page) {
        case 'analysis_ellibot.html':
            isEllieOffline();
            console.log('Ellie Bot (after event):', ellieData);
            updatePageForEllie();
            break;
        case 'analysis_pistachiobot.html':
            isPistachioOffline();
            console.log('Pistachio Bot (after event):', pistachioData);
            updatePageForPistachio();
            break;
        case 'analysis_studyguidebot.html':
            isStudyGuideOffline();
            console.log('Study Guide (after event):', pistachioData);
            updatePageForStudyGuide();
            break;
        case 'analysis_destinationguidebot.html':
            isDestinationGuideOffline();
            console.log('Destination Guide (after event):', pistachioData);
            updatePageForDestinationGuide();
            break;
        case 'analysis_rankingsupportbot.html':
            iRankingSupportOffline();
            console.log('QS Ranking Support (after event):', rankingSupportData);
            updatePageForRankingSupport();
            break;
        default:

            isEllieOffline();
            isPistachioOffline();
            isStudyGuideOffline();
            isDestinationGuideOffline();
            iRankingSupportOffline();
            console.log('Ellie Bot (after event):', ellieData);
            console.log('Pistachio Bot (after event):', pistachioData);
            console.log('Study Guide (after event):', studyGuideData);
            console.log('Destination Guide (after event):', destinationGuideData);
            console.log('QS Ranking Support (after event):', rankingSupportData);
            updateAll();
            break;
    }

}// end processEventData()


function isEllieOffline() {
    if(ellieData.status === 'offline'){
        alert('Ellie bot is offline!');
        console.log("Ellie")
    }
}// end isEllieOffline()

function isPistachioOffline() {
    if(pistachioData.status === 'offline'){
        alert('Pistachio bot is offline!');
        console.log("Pistachio")
    }
}// end isPistachioOffline()

function isStudyGuideOffline() {
    if(studyGuideData.status === 'offline'){
        alert('Study Guide bot is offline!');
        console.log("Study Guide")
    }
}// end isStudyGuideOffline()

function isDestinationGuideOffline() {
    if(destinationGuideData.status === 'offline'){
        alert('Destination Guide is offline!');
        console.log("Destination Guide")
    }
}// end isDestinationGuideOffline()

function iRankingSupportOffline() {
    if(destinationGuideData.status === 'offline'){
        alert('QS Ranking Support Bot is offline!');
        console.log("Ranking Support")
    }
}// end iRankingSupportOffline()


function updateAll() {
    document.getElementById('ellie-data').innerHTML = ellieData.version ? `Live Version:<br> ${ellieData.version}<br>Latest status:<br> ${ellieData.status}` : 'No data available';
    document.getElementById('pistachio-data').innerHTML = pistachioData.version ? `Live Version:<br> ${pistachioData.version}<br>Latest status:<br> ${pistachioData.status}` : 'No data available';
    document.getElementById('study-guide-data').innerHTML = studyGuideData.version ? `Live Version:<br> ${studyGuideData.version}<br>Latest status:<br> ${studyGuideData.status}` : 'No data available';
    document.getElementById('destination-guide-data').innerHTML = destinationGuideData.version ? `Live Version:<br> ${destinationGuideData.version}<br>Latest status:<br> ${destinationGuideData.status}` : 'No data available';
    document.getElementById('ranking-support-data').innerHTML = rankingSupportData.version ? `Live Version:<br> ${rankingSupportData.version}<br>Latest status:<br> ${rankingSupportData.status}` : 'No data available';

    updateStatusCircle('ellie-status-circle', ellieData.status);
    updateStatusCircle('pistachio-status-circle', pistachioData.status);
    updateStatusCircle('study-guide-status-circle', studyGuideData.status);
    updateStatusCircle('destination-guide-status-circle', destinationGuideData.status);
    updateStatusCircle('ranking-support-status-circle', rankingSupportData.status);

    attachClickEventToStatus('ellie-status-circle', ellieData.status);
    attachClickEventToStatus('pistachio-status-circle', pistachioData.status);
    attachClickEventToStatus('study-guide-status-circle', studyGuideData.status);
    attachClickEventToStatus('destination-guide-status-circle', destinationGuideData.status);
    attachClickEventToStatus('ranking-support-status-circle', rankingSupportData.status);
}// end updateAll()

function updatePageForEllie() {
    document.getElementById('ellie-data').innerHTML = ellieData.version ? `Live Version:<br> ${ellieData.version}<br>Latest release version:<br> ${ellieData.updatedAt}` : 'No data available';
    updateStatusCircle('ellie-status-circle', ellieData.status);
    attachClickEventToStatus('ellie-status-circle', ellieData.status);
}// end updatePageForEllie()

function updatePageForPistachio() {
    document.getElementById('pistachio-data').innerHTML = pistachioData.version ? `Live Version:<br> ${pistachioData.version}<br>Latest release version:<br> ${pistachioData.status}` : 'No data available';
    updateStatusCircle('pistachio-status-circle', pistachioData.status);
    attachClickEventToStatus('pistachio-status-circle', pistachioData.status);
}// end updatePageForPistachio()

function updatePageForStudyGuide() {
    document.getElementById('study-guide-data').innerHTML = studyGuideData.version ? `Live Version:<br> ${studyGuideData.version}<br>Latest release version:<br> ${studyGuideData.status}` : 'No data available';
    updateStatusCircle('study-guide-status-circle', studyGuideData.status);
    attachClickEventToStatus('study-guide-status-circle', studyGuideData.status);
}// end updatePageForStudyGuide()

function updatePageForDestinationGuide() {
    document.getElementById('destination-guide-data').innerHTML = destinationGuideData.version ? `Live Version:<br> ${destinationGuideData.version}<br>Latest release version:<br> ${destinationGuideData.status}` : 'No data available';
    updateStatusCircle('destination-guide-status-circle', destinationGuideData.status);
    attachClickEventToStatus('destination-guide-status-circle', destinationGuideData.status);
}// updatePageForDestinationGuide()

function updatePageForRankingSupport() {
    document.getElementById('ranking-support-data').innerHTML = rankingSupportData.version ? `Live Version:<br> ${rankingSupportData.version}<br>Latest status:<br> ${rankingSupportData.status}` : 'No data available';
    updateStatusCircle('ranking-support-status-circle', rankingSupportData.status);
    attachClickEventToStatus('ranking-support-status-circle', rankingSupportData.status);
}// updatePageForRankingSupport()

function updateStatusCircle(elementId, status) {
    const element = document.getElementById(elementId).firstElementChild; 
    
    element.classList.remove('bg-success', 'bg-danger', 'bg-dark');

    if (status === 'online') {
        element.classList.add('bg-success');
    } else if (status === 'offline') {
        element.classList.add('bg-danger');
    } else if (status === 'error') {
        element.classList.add('bg-dark'); 
    }
}// end updateStatusCircle()

function attachClickEventToStatus(elementId, status) {
    const statusCircle = document.getElementById(elementId);
    
    statusCircle.addEventListener('click', function() {
        openModal(status);
    });
}// end attachClickEventToStatus()

function openModal(status) {
    const modal = document.getElementById('statusModal');
    const statusMessage = document.getElementById('statusMessage');

    if (status === 'online') {
        statusMessage.textContent = 'The bot is currently online.';
    } else if (status === 'offline') {
        statusMessage.textContent = 'The bot is currently offline.';
    } else if (status === 'error') {
        statusMessage.textContent = 'There is an error with the bot.';
    } else {
        statusMessage.textContent = 'It appears that there is no payload for this bot';
    }

    modal.style.display = 'flex';

    document.querySelector('.close').onclick = function() {
        modal.style.display = 'none';
    }

    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }
}// end openModal()

processEventData();
