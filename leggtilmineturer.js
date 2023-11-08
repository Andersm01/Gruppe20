function moveArticle(articleId) {
    // Get the article element by its ID
    const article = document.getElementById(articleId);

    // Find the target location where you want to move the article
    const targetLocation = document.getElementById('targetLocation'); // Replace with the actual ID of the target location

    // Append the article to the target location
    targetLocation.appendChild(article);
}