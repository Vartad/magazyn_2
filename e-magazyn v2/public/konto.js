
function zaladujStrone(){

return new Promise(resolve => {

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  var uzytkownik=[];
  _wczytajDane("godzinki",userConverter,resolve,uzytkownik,"uzytkownicy","Email",getUserEmail(),1).then(()=>{
   // console.log(uzytkownik[0]);
    sessionStorage.setItem( "dostep",uzytkownik[0].dostep);
    sessionStorage.setItem("skladka",uzytkownik[0].skladka);
    sessionStorage.setItem("godzinki",uzytkownik[0].godzinki);

    sessionStorage.setItem("aktywneWypozyczenia",uzytkownik[0].aktywneWypozyczenia);
    var liczbaGodzinek = document.getElementById("liczbaGodzinek").innerHTML = uzytkownik[0].godzinki;
  if(uzytkownik[0].skladka != "oplacona"){
  document.getElementById("skladka").style.display = "block";
  }else{
  document.getElementById("skladka").style.display = "none";
  }
  })
  }
}); // sprawdza czy jest zalogowany uzytkownik jezeli tak wykonuje polecenia z wewnatrz

});

}

/*

return new Promise(resolve => {

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

const ref = db.collection("uzytkownicy").where("Email","==", getUserEmail())// kolejne kryteria to po prostu .where()//
.get()
.then(function(querySelector) {
querySelector.forEach(function(doc){
sessionStorage.setItem( "dostep",doc.data().dostep);
skladka = doc.data().skladka;
sessionStorage.setItem("aktywneWypozyczenia",doc.data().aktywneWypozyczenia);
sessionStorage.setItem("skladka",skladka);
//godzinki = doc.data().godzinki;
//console.log("godzinki " + godzinki);
/*
if(godzinki == undefined){
console.log("nie ma takiego uzytkownika");
alert("Nie masz jeszcze dostepu do aplikacji, prosba o utworzenie konta zostala wyslana"+
" do administratora")
signOut();
resolve('unresolved');
}else{
if(skladka != "oplacona"){
document.getElementById("skladka").style.display = "block";
}else{
document.getElementById("skladka").style.display = "none";
}
}
*//*
if(skladka != "oplacona"){
document.getElementById("skladka").style.display = "block";
}else{
document.getElementById("skladka").style.display = "none";
}
//sessionStorage.setItem("godzinki",godzinki);
//var liczbaGodzinek = document.getElementById("liczbaGodzinek").innerHTML = godzinki;
resolve('resolved');
});//forEach
//ponizsze warunki ustawiaja mozliwość zaznaczenia wypozyczenia.
});//then
//alert("nie ma takiego uzytkownika w systemie, zglos prosbe zalozenia konta");
//signOut();

  } else {
   // alert("jezest niezalogowany");
   // window.location.href="404.html"// No user is signed in.
   // resolve("resolve");
  }
}); // sprawdza czy jest zalogowany uzytkownik jezeli tak wykonuje polecenia z wewnatrz

});

}

*/