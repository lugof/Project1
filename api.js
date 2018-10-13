// Initialize Firebase
var config = {
    apiKey: "AIzaSyCLELJ2XRqID1272eMpipcMnkGzOSNMQng",
    authDomain: "project-1-440ef.firebaseapp.com",
    databaseURL: "https://project-1-440ef.firebaseio.com",
    projectId: "project-1-440ef",
    storageBucket: "project-1-440ef.appspot.com",
    messagingSenderId: "869209601087"
};
firebase.initializeApp(config);
var database = firebase.database();
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
            console.log(response.response.docs);
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
    var queryURL = "https://newsapi.org/v2/everything?q=" + searchTerm + "&language=en&sortBy=relevancy&excludeDomains=nytimes.com&apiKey=";
    queryURL += "c9f4e5891f6f4075a2b9dc9b999ef672";
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var numberRecords = 5
        clearResultsNewsAPI();
        for (var i = 0; i < numberRecords; i++) {
            appendArticleNewsAPI(response.articles[i]);
            console.log(response.articles);
        }
        var search = {
            searchTerm: searchTerm,
            firstImage: response.articles[0].urlToImage,
            firstTitle: response.articles[0].title
        }

        database.ref("searches").push(search);
    });
}
function appendArticleNewsAPI(articleData) {
    var imgsrc = articleData.urlToImage;
    var article = $("<div>", { class: "articlenewsAPI" });
    var image = $("<img>").attr({ src: imgsrc, width: "200px", height: "200px" })
    var title = $("<h2>").text(articleData.title);
    var snippet = $("<p>").text(articleData.description);
    var source = $("<p>").text("Source:" + articleData.source.name);
    var articleLink = $("<a>", {
        class: " btn btn-info",
        text: "Read More",
        target: "_blank",
        href: articleData.url
    })
    article.append(image);
    article.append(title);
    article.append(snippet);
    article.append(source);
    article.append(articleLink);
    $("#resultsnewsAPI").append(article);
}
function addSearchFirebase() {



}
database.ref("searches").limitToLast(10).on("child_added", function (childSnapshot) {
    console.log(childSnapshot.val());
    $("firebaseImg").remove();

    // Store everything into a variable.
    var searchTerm = childSnapshot.val().searchTerm;
    var image = childSnapshot.val().firstImage;
    var title = childSnapshot.val().firstTitle;

    var carouselItem = $("<div>").addClass("carousel-item ").attr("id", "firebaseImg");
    var carouselImage = $("<img>").attr("src", childSnapshot.val().firstImage).addClass("d-block w-100");
    var carouselText = $("<div>").text(title);


    carouselItem.append(carouselImage, carouselText);

    $(".carousel-inner").append(carouselItem);


});
$("#searchForm").on("submit", function (event) {
    event.preventDefault();
    searchTerm = $("#searchTerm").val();
    nytAPI();
    newsAPI();



})
