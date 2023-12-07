document.addEventListener("DOMContentLoaded", function () {
    fetch("https://dog.ceo/api/breeds/list/all")
        .then(response => response.json())
        .then(data => {
            const breedSelect = document.getElementById("breedSelect");
            for (const breed in data.message) {
                if (data.message.hasOwnProperty(breed)) {
                    const option = document.createElement("option");
                    option.value = breed;
                    option.textContent = breed;
                    breedSelect.appendChild(option);
                }
            }
        })
        .catch(error => console.error("Error fetching dog breeds:", error));
});

function loadImages(event) {
    const selectedBreed = document.getElementById("breedSelect").value;
    const imageCount = document.getElementById("imageCount").value;
    
    fetch(`https://dog.ceo/api/breed/${selectedBreed}/images/random/${imageCount}`)
        .then(response => {
            if (!response.ok) {
                if (response.status === 404) {
                    console.error(`Breed not found: ${selectedBreed}`);
                } else {
                    throw new Error(`Failed to fetch images. Status: ${response.status}`);
                }
            }

            const contentType = response.headers.get("content-type");
            if (contentType && !contentType.includes("application/json")) {
                console.error(`Unexpected content type: ${contentType}`);
                return null;
            }

            return response.json();
        })
        .then(data => {
            if (!data) {
                
                return;
            }

            const dogImagesContainer = document.getElementById("dogImages");

            
            dogImagesContainer.innerHTML = "";

            
            data.message.forEach(imageUrl => {
                const imgContainer = document.createElement("div");
                const img = document.createElement("img");
                const breedName = document.createElement("p");

                img.onload = function () {
                   
                    imgContainer.appendChild(img);
                    imgContainer.appendChild(breedName);
                    dogImagesContainer.appendChild(imgContainer);
                };

                img.onerror = function () {
                   
                    console.error(`Error loading image: ${imageUrl}`);
                    console.error(`Invalid URL: ${imageUrl}`);
                };

                img.src = imageUrl;
                breedName.textContent = selectedBreed; 
            });
        })
        .catch(error => console.error("Error fetching dog images:", error));

    
    event.preventDefault();
}


function isValidUrl(url) {
    const img = new Image();
    img.src = url;
    return img.complete && img.naturalWidth !== 0;
}


document.getElementById("breedSelect").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        loadImages(event);
    }
});

document.getElementById("imageCount").addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        loadImages(event);
    }
});


