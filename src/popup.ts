document.addEventListener('DOMContentLoaded', function() {
    const promptTextarea = document.getElementById('prompt') as HTMLTextAreaElement;
    const apiKeyInput = document.getElementById('apiKey') as HTMLInputElement;
    const sendButton = document.getElementById('sendRequest') as HTMLButtonElement;
    const responseDiv = document.getElementById('response') as HTMLDivElement;
  
    // Load saved API key
    chrome.storage.sync.get(['apiKey'], function(result: { apiKey?: string }) {
      if (result.apiKey) {
        apiKeyInput.value = result.apiKey;
      }
    });
  
    sendButton.addEventListener('click', function() {
      const prompt = promptTextarea.value;
      const apiKey = apiKeyInput.value;
  
      // Save API key
      chrome.storage.sync.set({apiKey: apiKey});
  
      // Send message to background script
      chrome.runtime.sendMessage({action: "sendRequest", prompt: prompt, apiKey: apiKey}, function(response: { result: string }) {
        responseDiv.textContent = response.result;
      });
    });
  });