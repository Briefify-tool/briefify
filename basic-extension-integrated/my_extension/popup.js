document.getElementById('summarizeBtn').addEventListener('click', function () {
  let videoId = document.getElementById('videoId').value;
  fetch(`https://web-production-3356.up.railway.app/v1/api/${videoId}`)
    .then(response => response.json())
    .then(data => {
      document.getElementById('summary').innerText = data.summary;
    })
    .catch(error => {
      console.error('Error:', error);
      document.getElementById('summary').innerText = 'Failed to fetch summary';
    });
});

