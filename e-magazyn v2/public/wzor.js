
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

function zapis(){
if(sessionStorage.getItem("godzinki") - wypozyczenie.koszt_planowany >= 0){


}

.catch(function(error){
  console.log("bład podczas wczytywania dokumentu " + error)
  });//forEach;//then