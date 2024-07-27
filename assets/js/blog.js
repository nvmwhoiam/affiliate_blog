import generateSEOSafeProductName from "./functions.js";

const urlParams = new URLSearchParams(window.location.search);
const itemID = urlParams.get("itemID");

// Check if the URL contains the itemID parameter
if (!urlParams.has('itemID')) {
    // Redirect to a new URL
    window.location.href = '404.html'; // Replace 'newURL' with the desired URL
}

window.addEventListener("DOMContentLoaded", async function () {
    try {
        const response = await fetch('./assets/js/blog.json');
        const data = await response.json();

        // mainUI(data);

        for (const itemData of data) {

            if (itemData.itemID === itemID) {

                systemUI(itemData);

                createDiv(itemData);
            }
        }

    } catch (error) {
        console.error('Error during fetching data:', error);
    }
});

async function systemUI(itemData) {

    const cta_btn = document.querySelector("[data-itemData='cta_btn']");

    document.title = `${itemData.itemShortName} | EcoAffiliatesHub`;

    // Get the meta tag with name="description"
    const metaTag = document.querySelector('meta[name="description"]');

    // Set the content attribute of the meta tag
    metaTag.setAttribute('content', `${itemData.itemName} | EcoAffiliatesHub`);

    cta_btn.setAttribute('href', itemData.itemHref);

}

function createDiv(e) {
    const specsContainer = document.querySelector(".specs");

    // window.addEventListener("DOMContentLoaded", function () {

    // Set the href attribute of an element with itemData='href'
    document.querySelector("[data-itemData='href']").setAttribute('href', e.itemHref);

    // Set the src attribute of an image element with itemData='pic'
    document.querySelector("[data-itemData='pic']").setAttribute('src', e.itemPic);

    document.querySelector("[data-itemData='itemName']").innerText = e.itemName;

    document.querySelector("[data-itemData='itemShortName']").innerText = e.itemShortName;

    // });

    for (const key in e.specs) {
        if (e.specs.hasOwnProperty(key)) {
            const value = e.specs[key];
            let itemsHTML = '';

            // Check if value.items is an array
            if (Array.isArray(value.items)) {
                // If it's an array, generate <li> elements for each item
                itemsHTML = value.items.map(item => `<li>${item}</li>`).join('');
            } else {
                // If it's not an array, directly include it in the HTML
                itemsHTML = `<li>${value.items}</li>`;
            }

            // Generate HTML for the item
            specsContainer.insertAdjacentHTML("beforeend", `
                <div class="item">
                    <div class="title">
                        <b>${value.name}</b>
                    </div>
                    <ul class="body">
                        ${itemsHTML}
                    </ul>
                </div>
            `);
        }
    }
} 