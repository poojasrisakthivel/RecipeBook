/*function showAddForm() {
    hideAllForms();
    document.getElementById('addRecipeForm').style.display = 'block';
}

function showSearchForm() {
    hideAllForms();
    document.getElementById('searchRecipeForm').style.display = 'block';
}

function showDeleteForm() {
    hideAllForms();
    document.getElementById('deleteRecipeForm').style.display = 'block';
}

function hideAllForms() {
    document.getElementById('addRecipeForm').style.display = 'none';
    document.getElementById('searchRecipeForm').style.display = 'none';
    document.getElementById('deleteRecipeForm').style.display = 'none';
}

// Handle search form submission
document.getElementById('searchRecipeFormAction').onsubmit = async function (e) {
    e.preventDefault();  // Prevent form from refreshing the page

    // Get the input value for the recipe name
    const recipeName = document.querySelector('input[name="name"]').value;

    console.log('Sending search request for:', recipeName);

    // Send the search request to the server
    const response = await fetch('/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: recipeName })  // Send the recipe name in JSON format
    });

    const data = await response.json();  // Parse the response as JSON
    const searchResultContainer = document.getElementById('searchResult');  // Container to display results
    
    if (data.name) {
        // If recipe found, display its details
        searchResultContainer.innerHTML = `
            <h2>Recipe Found: ${data.name}</h2>
            <p><strong>Ingredients:</strong> ${data.ingredients}</p>
            <p><strong>Instructions:</strong> ${data.instructions}</p>
        `;
    } else {
        // If recipe not found
        searchResultContainer.innerHTML = 'Recipe not found';
    }
};
*/


// Show the add form
function showAddForm() {
    hideAllForms();
    document.getElementById('addRecipeForm').style.display = 'block';
}

// Show the search form
function showSearchForm() {
    hideAllForms();
    document.getElementById('searchRecipeForm').style.display = 'block';
}

// Show the delete form
function showDeleteForm() {
    hideAllForms();
    document.getElementById('deleteRecipeForm').style.display = 'block';
}

// Hide all forms
function hideAllForms() {
    document.getElementById('addRecipeForm').style.display = 'none';
    document.getElementById('searchRecipeForm').style.display = 'none';
    document.getElementById('deleteRecipeForm').style.display = 'none';
}

// Handle the search form submission
document.getElementById('searchRecipeFormAction').onsubmit = async function (e) {
    e.preventDefault();  // Prevent form from refreshing the page
    const recipeName = e.target.name.value;  // Get the recipe name input value
    console.log('Sending search request for:', recipeName);

    // Send the search request to the server
    const response = await fetch('/search', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name: recipeName })  // Send the recipe name in JSON format
    });

    const data = await response.json();  // Parse the response as JSON
    const searchResultContainer = document.getElementById('searchResult');  // Container to display results
    
    if (data.name) {
        // If recipe found, display its details
        searchResultContainer.innerHTML = `
            <h2>Recipe Found: ${data.name}</h2>
            <p><strong>Ingredients:</strong> ${data.ingredients}</p>
            <p><strong>Instructions:</strong> ${data.instructions}</p>
        `;
    } else {
        // If recipe not found
        searchResultContainer.innerHTML = 'Recipe not found';
    }
};
