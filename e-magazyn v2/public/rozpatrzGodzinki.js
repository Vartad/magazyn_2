function zaladujStrone(){

return new Promise(resolve => {
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
const ref = db.collection("uzytkownicy").where("Email","==", getUserEmail())// kolejne kryteria to po prostu .where()//
.get()
.then(function(querySelector) {
querySelector.forEach(function(doc){

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


