"use strict";
document.addEventListener('DOMContentLoaded', function () {
    const promptTextarea = document.getElementById('prompt');
    const apiKeyInput = document.getElementById('apiKey');
    const sendButton = document.getElementById('sendRequest');
    const responseDiv = document.getElementById('response');
    // Load saved API key
    chrome.storage.sync.get(['apiKey'], function (result) {
        if (result.apiKey) {
            apiKeyInput.value = result.apiKey;
        }
    });
    sendButton.addEventListener('click', function () {
        const prompt = promptTextarea.value;
        const apiKey = apiKeyInput.value;
        // Save API key
        chrome.storage.sync.set({ apiKey: apiKey });
        // Send message to background script
        chrome.runtime.sendMessage({ action: "sendRequest", prompt: prompt, apiKey: apiKey }, function (response) {
            responseDiv.textContent = response.result;
        });
    });
});
