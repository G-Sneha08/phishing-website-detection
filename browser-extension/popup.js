document.getElementById('scanBtn').addEventListener('click', async () => {
    const statusDiv = document.getElementById('status');
    statusDiv.textContent = 'Scanning...';

    // Get current tab
    const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });

    try {
        const response = await fetch('http://localhost:5000/scan', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ url: tab.url })
        });

        const result = await response.json();

        statusDiv.className = 'status-box ' + (result.prediction === 'Phishing' ? 'status-phish' : 'status-safe');
        statusDiv.innerHTML = `
            <strong>${result.prediction}</strong><br/>
            <small>Risk: ${result.probability}</small>
        `;
    } catch (error) {
        statusDiv.textContent = 'Error: Backend offline';
        statusDiv.style.color = '#f43f5e';
    }
});
