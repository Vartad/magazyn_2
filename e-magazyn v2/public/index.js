
function przejdzDalej(){
if(isUserSignedIn() == true){
consloe.log("zalogowanyś");
window.location.href = "konto.html";
}else{
console.log("niezalogowanyś");
}
}

function signIn() {
if(isUserSignedIn() == true){
window.location.href = "konto.html";
}else{
return new Promise(resolve => {
  // Sign into Firebase using popup auth & Google as the identity provider.
  var provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider).then(function(result) {
  var token = result.credential.accessToken;
  var user = result.user;
  resolve('resolved');
  }).catch(function(error) {
  var errorCode = error.code;
  var errormessage = error.message;
  var credential = error.credentaial;
  resolve('unresolved');
  })
  console.log(isUserSignedIn());
});
}
}

async function logowanieGoogle (){

const result = await signIn();
console.log('loading' + result);
if ( result == "resolved"){
console.log("zaladowano");
window.location.href="konto.html"
}
}

function logowanieEmail(email,password){
console.log("logowanie, login : "+ login );
firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
   console.log("couldnt add user ",error);
  // ...
});

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
    // User is signed in.
    var displayName = user.displayName;
    var email = user.email;
    var emailVerified = user.emailVerified;
    var photoURL = user.photoURL;
    var isAnonymous = user.isAnonymous;
    var uid = user.uid;
    var providerData = user.providerData;
    console.log("/Name : " + displayName + " /email : " + email);
    window.location.href = "konto.html"
    // ...

  } else {
    // User is signed out.
    // ...
  }
});

}

function registerUser(email,password){
firebase.auth().createUserWithEmailAndPassword(email, password).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;
  console.log("couldnt add user ",error);
  // ...
})
.then(() =>{
firebase.firestore().collection('users').doc(firebase.auth().currentUser.uid)
            .set({
                email: email
            })
});
}

function modalRegister(){

var modal = document.getElementById("modalRegister");
modal.style.display="block";
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}
}

}

function zamknijRegister(){
var modal = document.getElementById("modalRegister");

var login = document.getElementById("loginRegister").value;
var password = document.getElementById("passwordRegister").value;
console.log("login : " + login);
registerUser(login,password);

//modal.style.display = "none";

}

function zamknijLogin(){
var modal = document.getElementById("modalLogin");

var login = document.getElementById("login").value;
var password = document.getElementById("password").value;
logowanieEmail(login,password);

//modal.style.display = "none";

}

function modalLogin(){

var modal = document.getElementById("modalLogin");

modal.style.display="block";
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}
}

}

