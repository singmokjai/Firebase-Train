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

// Storing values into variables created

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
$("#add-train-btn").on("click", function() {

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
            
            train: train,
            destination: destination,
            firstTrain: firstTrain,
            frequency: frequency,
            dateAdded: firebase.database.ServerValue.TIMESTAMP});

    }
    
    sessionStorage.clear();
})


currentTime();




