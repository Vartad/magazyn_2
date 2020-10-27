
  var firebaseConfig = {
    apiKey: "AIzaSyArP7tKFGkuG4g1PMPMpMhydm8BDSPYd0E",
    authDomain: "emagazynbystrze.firebaseapp.com",
    databaseURL: "https://emagazynbystrze.firebaseio.com",
    projectId: "emagazynbystrze",
    storageBucket: "emagazynbystrze.appspot.com",
    messagingSenderId: "630076504784",
    appId: "1:630076504784:web:027b321bbc1a4aa9a1fcd5",
    measurementId: "G-F02JC48KGY"
  };
//                    ***INITIALIZE***
// Initialize Firebase

var app = firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
var firestore = firebase.firestore();

// Checks that the Firebase SDK has been correctly setup and configured.
function checkSetup() {
  if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
    window.alert('You have not configured and imported the Firebase SDK. ' +
      'Make sure you go through the codelab setup instructions and make ' +
      'sure you are running the codelab using `firebase serve`');
  }
}// Checks that the Firebase SDK has been correctly setup and configured.

checkSetup(); // Checks that Firebase has been imported.

// Checks that the Firebase SDK has been correctly setup and configured.
function checkSetup() {
  if (!window.firebase || !(firebase.app instanceof Function) || !firebase.app().options) {
    window.alert('You have not configured and imported the Firebase SDK. ' +
      'Make sure you go through the codelab setup instructions and make ' +
      'sure you are running the codelab using `firebase serve`');
  }
}// Checks that the Firebase SDK has been correctly setup and configured.

checkSetup(); // Checks that Firebase has been imported.

function signIn() {
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider);
} // Sign into Firebase using popup auth & Google as the identity provider.

function signOut() {
 firebase.auth().signOut();
 document.location.href = "index.html";
 }

function getUserEmail() { return firebase.auth().currentUser.email ; }

function getProfilePicUrl() { return firebase.auth().currentUser.photoURL || '../images/profile_placeholder.png'; }// Returns the signed-in user's profile pic URL.

function getUserName() { return firebase.auth().currentUser.displayName; }// Returns the signed-in user's display name.

function isUserSignedIn() { return !!firebase.auth().currentUser; }// Returns true if a user is signed-in.

function zaladujStrone(){

return new Promise(resolve => {
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
const ref = db.collection("uzytkownicy").where("Email","==", getUserEmail())// kolejne kryteria to po prostu .where()//
.get()
.then(function(querySelector) {
querySelector.forEach(function(doc){

var imie = document.getElementById("user-name").innerHTML;
imie = getUserName();

resolve('resolved');
});//forEach
//ponizsze warunki ustawiaja mozliwość zaznaczenia wypozyczenia.
});//then

  } else {
    // No user is signed in.
  }
}); // sprawdza czy jest zalogowany uzytkownik jezeli tak wykonuje polecenia z wewnatrz

});
console.log('pozdro')

}

function zaladuj(){
document.getElementById("page").style.display = "none";
document.getElementById("loading").style.display = "block";
loading();
}

async function loading (){

const result = await zaladujStrone();
if ( result == "resolved"){
document.getElementById("page").style.display = "block";
document.getElementById("loading").style.display = "none";
}
}

/*
rozpatrywanie (oraz przyznawanie) godzinek

// pokaz wszystkie wnioski w ktorych jestem "ratowany"
    -zatwierdz, przekaz do prezesa
    -odrzuc, przekaz do prezesa
    -edytuj, nastepnie zatwierdz lub odrzuc