/*  Front-End
 * ========================= */

// 1: On Load
// ==========

// The first thing this js file will do: ask the back end for a json with all people's info

function getData(){
$.getJSON("/name", function(data) {
  // For each entry of that json...
   $("#results").empty("");
  for (var i = 0; i < data.length; i++) {

    var firstName = data[i].Test;
    var lastName = data[i].Test_Name;
    var email = data[i].email;

    $("#results").append(firstName + " ");
    $("#results").append(lastName + "</br>");
    $("#results").append(email + "</br>");
    $("#results").append("*******************" + "</br>");
  }
});
};

$("h1").click(function(){
  
  console.log($(this).html());
  var testValue = $(this).html();
  var testValuePlus = "/find/" + testValue;
  console.log(testValuePlus);


$.ajax({
    type: "GET",
    url: "/find/" + testValue,
    success: function(data) {
      console.log(JSON.stringify(data));


    }
  });
$("#results").append(data);

});

// 2: Submit Button 
// ======================


// $.getJSON("/find/:id", function(data) {
//   // For each entry of that json...
//    $("#results").empty("");
//    $("#results").append(data[0]);


// });
