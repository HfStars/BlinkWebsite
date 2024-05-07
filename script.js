document.getElementById('imageInput').addEventListener('change', function(event) {
    const file = event.target.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const imageContainer = document.getElementById('imageContainer');
            imageContainer.innerHTML = `<img src="${e.target.result}" alt="Uploaded Image" style="width: 1px; height: 1px;">`;
            document.getElementById('removeBgButton').style.display = 'block';
            document.getElementById('imageInput').style.display = 'none'; // Hide choose button
        };
        reader.readAsDataURL(file);
    }
});

document.getElementById('removeBgButton').addEventListener('click', function() {
    const fileInput = document.getElementById('imageInput');
    if (fileInput.files.length > 0) {
        const formData = new FormData();
        formData.append('image_file', fileInput.files[0]);

        fetch('https://api.remove.bg/v1.0/removebg', {
            method: 'POST',
            headers: {
                'X-Api-Key': 'PExDAJpVBko9oBQQtQe1qCtb'
            },
            body: formData
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok.');
            }
            return response.blob();
        })
        .then(blob => {
            const imageContainer = document.getElementById('imageContainer');
            const imageUrl = URL.createObjectURL(blob);
            imageContainer.innerHTML = `<img src="${imageUrl}" alt="Background Removed" style="width: 100%; max-width: 600px;">`;
            document.getElementById('removeBgButton').style.display = 'none';
            document.getElementById('saveImageButton').style.display = 'block';
        })
        .catch(error => {
            console.error('Error:', error);
        });
    }
});

document.getElementById('saveImageButton').addEventListener('click', function() {
    const img = document.querySelector('#imageContainer img');
    const imageUrl = img.src;
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = 'saved-image.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    // Reset UI
    document.getElementById('imageInput').style.display = 'block';
    document.getElementById('imageContainer').innerHTML = '';
    document.getElementById('saveImageButton').style.display = 'none';
});
