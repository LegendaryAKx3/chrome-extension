"use strict";
chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
    if (request.action === "sendRequest") {
        fetch('https://api.openai.com/v1/engines/davinci-codex/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${request.apiKey}`
            },
            body: JSON.stringify({
                prompt: request.prompt,
                max_tokens: 100
            })
        })
            .then(response => response.json())
            .then(data => {
            sendResponse({ result: data.choices[0].text });
        })
            .catch(error => {
            sendResponse({ result: `Error: ${error.message}` });
        });
        return true; // Indicates that the response is sent asynchronously
    }
});
