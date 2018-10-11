var searchTerm

function nytAPI() {
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm + "&page=0&sort=newest&api-key=";
    queryURL += "f24bf054f5db44779f0720799fb8f1ce";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var numberRecords = 5
        clearResultsNYT();
        for (var i = 0; i < numberRecords; i++) {
            appendArticleNYT(response.response.docs[i]);
        }
    });
}
function clearResultsNYT() {
    $(".articleNYT").remove();
}
function clearResultsNewsAPI() {
    $(".articlenewsAPI").remove();
}
function appendArticleNYT(articleData) {
    var article = $("<div>", { class: "articleNYT" });
    var title = $("<h2>").text(articleData.headline.main);
    var snippet = $("<p>").text(articleData.snippet);
    var articleLink = $("<a>", {
        class: " btn btn-info",
        text: "Read More",
        target: "_blank",
        href: articleData.web_url
    })
    article.append(title);
    article.append(snippet);
    article.append(articleLink);
    $("#resultsNYT").append(article);
}
function newsAPI() {
    var queryURL = "https://newsapi.org/v2/everything?q="+searchTerm+"&language=en&sortBy=relevancy&excludeDomains=nytimes.com&apiKey=";
    queryURL += "c9f4e5891f6f4075a2b9dc9b999ef672";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var numberRecords = 5
        clearResultsNewsAPI();
        for (var i = 0; i < numberRecords; i++) {
            appendArticleNewsAPI(response.articles[i]);
        }
    });
}
function appendArticleNewsAPI(articleData) {
    var article = $("<div>", { class: "articlenewsAPI" });
    var title = $("<h2>").text(articleData.title);
    var snippet = $("<p>").text(articleData.description);
    var articleLink = $("<a>", {
        class: " btn btn-info",
        text: "Read More",
        target: "_blank",
        href: articleData.url
    })
    article.append(title);
    article.append(snippet);
    article.append(articleLink);
    $("#resultsnewsAPI").append(article);
}
$("#searchForm").on("submit", function (event) {
    event.preventDefault();
    searchTerm = $("#searchTerm").val();
    nytAPI();
    newsAPI();
   

    /*var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=" + searchTerm + "&page=0&sort=newest&api-key=";
    queryURL += "f24bf054f5db44779f0720799fb8f1ce";
    $.ajax({
        url: queryURL,
        method: "GET"
    })
    .then(function (response) {
        var numberRecords = 5
        clearResults();
        for (var i = 0; i < numberRecords; i++) {
            appendArticle(response.response.docs[i]);
        }
    });*/
})