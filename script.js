const accesskey = "0LOJw7xlFLcAeDvcfA9DP1ra5skpYlj83UqigzlJV0I";
const formel = document.querySelector("form");
const inputel = document.getElementById("search-input");
const searchresults = document.querySelector(".search-results");
const showmore = document.getElementById("show-more-button");

let inputData = "";
let page = 1;

async function searchImages() {
    inputData = inputel.value;
    const url = `https://api.unsplash.com/search/photos?page=${page}&query=${inputData}&client_id=${accesskey}`;
    
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Network response was not ok");
        }
        
        const data = await response.json();
        const results = data.results;

        if (page === 1) {
            // Clear previous search results
            searchresults.innerHTML = "";
        }

        results.forEach((result) => {
            const imagewrapper = document.createElement('div');
            imagewrapper.classList.add("search-result");
            const image = document.createElement('img');
            image.src = result.urls.small;
            image.alt = result.alt_description;
            const imageLink = document.createElement('a');
            imageLink.href = result.links.html;
            imageLink.target = "_blank";
            imageLink.textContent = result.alt_description;
            imageLink.appendChild(image);
            imagewrapper.appendChild(imageLink);
            searchresults.appendChild(imagewrapper);
        });

        page++;
        if (page > 1) {
            showmore.style.display = "block";
        }
    } catch (error) {
        console.error("An error occurred:", error);
    }
}

formel.addEventListener("submit", (event) => {
    event.preventDefault();
    page = 1;
    searchImages();
});

showmore.addEventListener("click", () => {
    searchImages();
});
