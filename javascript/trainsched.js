// Initialize Firebase

var config = {
    apiKey: "AIzaSyDEgeZks27WRLzRkEVpYURR9xdfVUy8Xn8",
    authDomain: "fire-train-26bd0.firebaseapp.com",
    databaseURL: "https://fire-train-26bd0.firebaseio.com",
    projectId: "fire-train-26bd0",
    storageBucket: "fire-train-26bd0.appspot.com",
    messagingSenderId: "450750880238"
};
firebase.initializeApp(config);

// Firebase reference

var database = firebase.database()

// Variables to store values

var train = "";
var destination = "";
var firstTrain = "";
var frequency = "";

// Adding moment

function currentTime() {

    var current = moment().format('LT');
    $("#currentT").html(current);
    setTimeout(currentTime, 1000);

}

// Storing values into variables created, set session properties

$("#add-train-btn").on("click", function() {

    var train = $("#trainName").val().trim();
    var destination = $("#trainDest").val().trim();
    var firstTrain = $("#trainTime").val().trim();
    var frequency = $("#trainFreq").val().trim();
    sessionStorage.setItem("Train", train);
    sessionStorage.setItem("Destination", destination);
    sessionStorage.setItem("First Train Time", firstTrain);
    sessionStorage.setItem("Frequency", frequency);

});

// Store property value from session to elements

$("#trainName").val(sessionStorage.getItem("Train"));
$("#trainDest").val(sessionStorage.getItem("Destination"));
$("#trainTime").val(sessionStorage.getItem("First Train Time"));
$("#trainFreq").val(sessionStorage.getItem("Frequency"));
$("#add-train-btn").on("click", function(event) {

    event.preventDefault();

if ($("#trainName").val().trim() === "" ||
    $("#trainDest").val().trim() === "" ||
    $("#trainTime").val().trim() === "" ||
    $("#trainFreq").val().trim() === "") 
    {

        alert("Please input missing fields to proceed.");

    } else {

        train = $("#trainName").val().trim();
        destination = $("#trainDest").val().trim();
        firstTrain = $("#trainTime").val().trim();
        frequency = $("#trainFreq").val().trim();
        $(".form-control").val("");
        database.ref().push({
            
        // Push values to database

            train: train,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP});

    }
    
    sessionStorage.clear();

});

database.ref().on("child_added", function(childSnapshot) {

    // Start time pushed back so will come before current time

    var startTime = moment(childSnapshot.val().firstTrain, "HH:mm").subtract(1, "years");
    console.log(startTime);

    // Current time equal to moment

    var currentTime = moment();
    console.log("Current Time: " + moment(currentTime).format("HH:mm"));
    
    // Difference between time

    var diffTime = moment().diff(moment(startTime), "minutes");
    console.log("Difference in time: " + diffTime);

    // Remainder

    var tRemainder = diffTime % childSnapshot.val().frequency;
    console.log(tRemainder);

    // Minutes for next train

    var trainArrival = childSnapshot.val().frequency - tRemainder;
    console.log("Minutes til next train: " + trainArrival, "minutes");

    // Next train

    var nextTrain = moment().add(trainArrival, "minutes");
    console.log("Arrival: " + moment(nextTrain).format("HH:mm"));

    // Add new row for new train added

    var newRow = $("<tr>");
    newRow.append($("<td>" + childSnapshot.val().train + "</td>" ));
    newRow.append($("<td>" + childSnapshot.val().destination + "</td>" ));
    newRow.append($("<td>" + childSnapshot.val().frequency + "</td>" ));
    newRow.append($("<td>" + moment(nextTrain).format("LT") + "</td>" ));
    newRow.append($("<td>" + trainArrival + "</td>"));
    console.log(trainArrival)
    $("#train-rows").append(newRow);

    console.log(newRow)





})

currentTime();
setInterval(function() {

    window.location.reload();

}, 60000)




