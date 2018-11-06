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

$("#trainName").val(sessionStorage.getItem("Train"));
$("#trainDest").val(sessionStorage.getItem("Destination"));
$("#trainTime").val(sessionStorage.getItem("First Train Time"));
$("#trainFreq").val(sessionStorage.getItem("Frequency"));



currentTime();




