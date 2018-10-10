

function nytAPI() {
    var queryURL = "https://api.nytimes.com/svc/search/v2/articlesearch.json?q=&page=0&sort=newest&begin_date=0101&end_date=0101&api-key=";
    queryURL += "&api-key=f24bf054f5db44779f0720799fb8f1ce";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        clearResults();
        for (var i = 0; i < numberRecords; i++) {
            appendArticle(response.response.docs[i]);
        }
    });
}
function clearResults() {
    $(".article").remove();
}
function appendArticle(articleData) {
    var article = $("<div>", { class: "article" });
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
    $("#results").append(article);
}
$("#formId").on("submit", function (event) {
    e.preventDefault();
    var searchTerm = $("#searchTerm").val();
})