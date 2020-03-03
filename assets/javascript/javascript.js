var topics = [
  "Russia",
  "Germany",
  "France",
  "Belgium",
  "England",
  "Spain",
  "Ireland",
  "Portugal",
  "Morocco",
  "Ghana",
  "South Africa",
  "Botswana",
  "Zimbabwe",
  "Argentina",
  "Brazil",
  "Cuba"
];

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

//createButtons();
$("#add-country").on("click", function(event) {
  event.preventDefault();

  // grabs text written inside input field
  var country = $("#country-input").val();
  //adds whatever is written to the array
  topics.push(country);
  //then runs create button function
  createButtons();
});

createButtons();

$(document).on("click", ".country-button", function() {
  var name = $(this).attr("data-name");
  getGiphy(name);
});

//targets giphy image on click and runs a function
$(document).on("click", ".giphy-image", function() {
  console.log(this);
  //dataState now equals the attribute data-state of each button
  var dataState = $(this).attr("data-state");

  if (dataState === "still") {
    $(this).attr("src", $(this).attr("animateURL"));
    $(this).attr("data-state", "animate");
  } else {
    $(this).attr("src", $(this).attr("stillURL"));
    $(this).attr("data-state", "still");
  }
});

function getGiphy(name) {
  var queryURL =
    "https://api.giphy.com/v1/gifs/search?api_key=44g33Icfw0SaXgSmHz3VEdSDFGKPSUyL&q=" +
    name +
    "&limit=12&offset=0&rating=R&lang=en";

  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function(response) {
    var giphyArray = response.data;
    console.log(response);
    for (var i = 0; i < giphyArray.length; i++) {
      var imgContainer = $("<div>");
      imgContainer.addClass("giphy-box");
      var img = $("<img>");
      img.addClass("giphy-image");
      //img.attr("src",giphyArray[i].images.original.url);
      img.attr("src", giphyArray[i].images.original_still.url);
      img.attr("alt", name);
      img.attr("data-state", "still");
      img.attr("stillURL", giphyArray[i].images.original_still.url);
      img.attr("animateURL", giphyArray[i].images.original.url);

      var p = $("<p>");
      p.addClass("caption");
      p.text("Rating: " + giphyArray[i].rating);
      var title = $("<h5>");
      title.addClass("title");
      title.text(giphyArray[i].title);

      $("#gifs").prepend(imgContainer);
      imgContainer.prepend(p);
      imgContainer.prepend(title);
      imgContainer.prepend(img);
    }
  });
}
