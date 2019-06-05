var topics = ["Russia", "Germany", "France", "Spain", "Ireland", "Portugal", "Morocco", "Ghana", "South Africa", "Botswana", "Zimbabwe", "Argentina", "Brazil", "Cuba", "Colombia", "Panama", "Costa Rica", "Nicaragua", "Guatemala", "Mexico", "Belize"]


function createButtons() {
    $("#buttonView").empty();
    for (var i =0; i < topics.length; i++){
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
        
        for (var i = 0; i < giphyArray.length;i++){
            var img = $("<img>");
            img.addClass("giphy-image");
            img.attr("src",giphyArray[i].images.original.url);
            img.attr("alt", name)

            $("#gifs").prepend(img);

        }
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

