document.getElementById('summarizeBtn').addEventListener('click', function () {
  chrome.tabs.query({ active: true, lastFocusedWindow: true }, tabs => {
    let url = tabs[0].url;
    let videoId = new URL(url).searchParams.get('v');

    // Check if on YouTube video page
    if (url.includes('youtube.com/watch?v=') && videoId) {
      document.getElementById('Briefify').innerText = 'Loading the summary...';
      document.getElementById('spinner').style.display = 'inline-block'; 
      document.getElementById('errorIcon').style.display = 'none'; 

      var xhr = new XMLHttpRequest();
      xhr.onreadystatechange = function() {
        if (xhr.readyState == 4) {
          document.getElementById('spinner').style.display = 'none'; 
          if(xhr.status == 200) {
            let data = JSON.parse(xhr.responseText);
            document.getElementById('Briefify').innerText = data.summary;
          } else {
            document.getElementById('errorIcon').style.display = 'inline-block'; 
            document.getElementById('Briefify').innerText = ' Failed to fetch summary';
          }
        }
      }
      xhr.open('GET', `https://web-production-3356.up.railway.app/v1/api/${videoId}`, true);
      xhr.send();

    } else {
      // If not on YouTube video page
      document.getElementById('errorIcon').style.display = 'inline-block'; 
      document.getElementById('Briefify').innerText = ' Please navigate to a YouTube video page';
    }
  });
});
