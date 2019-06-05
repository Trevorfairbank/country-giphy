var topics = ["Russia", "Germany", "France", "Spain", "Ireland", "Portugal", "Morocco", "Ghana", "South Africa", "Botswana", "Zimbabwe", "Argentina", "Brazil", "Cuba", "Colombia", "Panama", "Costa Rica", "Nicaragua", "Guatemala", "Mexico", "Belize"]


function createButtons() {
    $("#buttonView").empty();
    for (var i = 0; i < topics.length; i++) {
        var button = $("<button>");
        button.addClass("country-button");
        button.attr("data-name", topics[i]);
        button.text(topics[i]);
        $("#buttonView").append(button);
    }
}

createButtons();


function getGiphy(name) {

    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=44g33Icfw0SaXgSmHz3VEdSDFGKPSUyL&q=" + name + "&limit=10&offset=0&rating=PG-13&lang=en"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (response) {
        var giphyArray = response.data;
        console.log(response);
        for (var i = 0; i < giphyArray.length; i++) {
            var img = $("<img>");
            img.addClass("giphy-image");
            //img.attr("src",giphyArray[i].images.original.url);
            img.attr("src", giphyArray[i].images.original_still.url);
            img.attr("alt", name)
            img.attr("data-state", "still")

            $("#gifs").append(img);

            var p = $("<p>");
            p.text("Rating: " + giphyArray[i].rating);
            $("#gifs").append(p);

        }

        //targets giphy image on click and runs a function
        $(document).on("click", ".giphy-image", function () {

            console.log(this);
            //create an attribute for the image for data-state to still.
            var dataState = $(this).attr("data-state");

            if (dataState === "still") {
                $(this).attr("src", giphyArray[i].images.original.url);
                $(this).attr(dataState, "animate");
            }
            else {
                $(this).attr("src", giphyArray[i].images.original_still.url);
                $(this).attr(dataState, "still");
            }

        })




    });
}

$("#add-country").on("click", function (event) {
    event.preventDefault();

    // grabs text written inside input field
    var country = $("#country-input").val();
    //adds whatever is written to the array
    topics.push(country);
    //then runs create button function
    createButtons();
})  

$(document).on("click", ".country-button", function(){
    var name = $(this).attr("data-name");
    getGiphy(name);

});

