
/*
wypozyczenia do rozpatrzenia dziela sie na dwa rodzaje :
    - rozpoczete, niezakonczone. Wydalem sprzet, musze potwierdzic
        jego wydanie
    - zakonczone, oddany sprzet. Odebralem sprzet
//pobieram wszystkie wypozyczenia aktywne w ktorych jestem jako
    - osoba_wydajaca
    - osoba_przyjmujaca
//moge dokonac w obu przypadkach dwoch akcji:
    -1- zatwierdzic
    -2- odrzucic
    -3- edytowac
//skutki akcji:
    ad 1 - poza wpisem do wypozyczenia o zatwierdzeniu, brak innych
    ad 2 - blokada nowych wypozyczen.
    ad 3 - zmiana parametrow wypozyczenia, zapis o zmianach i ich autorze.
    */
function zaladujStrone(){
document.getElementById("defaultOpen").click();
return new Promise(resolve => {
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
const ref = db.collection("uzytkownicy").where("Email","==", getUserEmail())// kolejne kryteria to po prostu .where()//
.get()
.then(function(querySelector) {
querySelector.forEach(function(doc){

wyswietlWydanySprzet(resolve);
wyswietlOdebranySprzet(resolve);
resolve('resolved');
});//forEach
//ponizsze warunki ustawiaja mozliwość zaznaczenia wypozyczenia.
});//then

  } else {
    // No user is signed in.
  }
}); // sprawdza czy jest zalogowany uzytkownik jezeli tak wykonuje polecenia z wewnatrz

});

}

window.wypozyczeniaWydanySprzet =[];
window.wypozyczeniaOdebranySprzet = [];

async function wyswietlWydanySprzet(resolve){
console.log("Wydanysprzet ");
const resultWydany = await _wczytajDane("data_wydania",wypozyczenieConverter,resolve,wypozyczeniaWydanySprzet,"wypozyczenia","osoba_wydajaca",getUserName(),99)
console.log("resultWydany " + resultWydany);
if(resultWydany == "resolved"){
const tabela = document.getElementById("tabelaWydanych");
const headerRowWydany = document.getElementById("headerRowWydany");
_wyswietlTabliceWTabeli(_Wypozyczenie,headerRowWydany,wypozyczeniaWydanySprzet,tabela,"",
"radio",
"data_wydania",
"osoba_wydajaca",
"sprzet_kajak",
"sprzet_wioslo",
"sprzet_fartuch",
"sprzet_kamizelka",
"sprzet_kask",
"data_planowanegoZwrotu",
"data_zwrotu",
"status",
"uwagi"
)
}
}

async function wyswietlOdebranySprzet(resolve){
console.log("odebranysprzet ");
                         //_wczytajDane("data_wydania",wypozyczenieConverter,resolve,wypozyczeniaWydanySprzet,"wypozyczenia","osoba_wydajaca",getUserName(),99)
const resultOdebrany = await _wczytajDane("data_zwrotu",wypozyczenieConverter,resolve,wypozyczeniaOdebranySprzet,"wypozyczenia","osoba_przyjmujaca",getUserName(),99);
console.log("resultOdebrany " + resultOdebrany);
if(resultOdebrany == "resolved"){
const tabela = document.getElementById("tabelaPrzyjetych");
const headerRowZwrocony = document.getElementById("headerRowZwrocony");
_wyswietlTabliceWTabeli(_Wypozyczenie,headerRowZwrocony,wypozyczeniaOdebranySprzet,tabela,"",
"radio",
"data_wydania",
"osoba_wydajaca",
"sprzet_kajak",
"sprzet_wioslo",
"sprzet_fartuch",
"sprzet_kamizelka",
"sprzet_kask",
"data_planowanegoZwrotu",
"data_zwrotu",
"status",
"uwagi"
)
//console.log("tablica " + wypozyczeniaOdebranySprzet.koszt_dzien)
}
resolve('resolved');
}

//          ***MODAL***
// modal czyli pojawiajace sie okienko dialogowe. Tutaj upewniajace sie o poprawnosci wybranego sprzetu do wypozyczenia.
window._wybranaTablica

function modal(tablica){
modal = document.getElementById("modal");
modal.style.display="block";
var span = document.getElementsByClassName("close")[0];
span.onclick = function() {
  modal.style.display = "none";
  // When the user clicks anywhere outside of the modal, close it
  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
}
}


if(tablica == "wypozyczeniaWydanySprzet"){
tablica = wypozyczeniaWydanySprzet;
_wybranaTablica = tablica;
var dane = document.forms[0]; // pobiera pierwszy z formsow na stronie
console.log("wybrano tablice wydanego sprzetu");
}else{
tablica = wypozyczeniaOdebranySprzet;
_wybranaTablica = wypozyczeniaOdebranySprzet;
var dane = document.forms[1]; // pobiera pierwszy z formsow na stronie
console.log("wybrano tablice odebranego sprzetu");
}

for(var i=1;i<dane.length;i++){
if(dane[i].checked == true){
//console.log(dane[i].checked)
window.wybraneRadio = i;
console.log("wybraneRadio = " + wybraneRadio)
window.wybraneID = tablica[i-1].id; //XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX
}
//console.log(i + " " + dane[i].checked + " id : "+ tablica[i].id);
}

wypelnijFormEdycji(tablica)
} //modal

function zatwierdz(radio,tablica){
komunikat ="zatwierdzone";
if(tablica == "wypozyczeniaWydanySprzet"){
tablica = wypozyczeniaWydanySprzet;
var dane = document.forms[0]; // pobiera pierwszy z formsow na stronie
console.log(dane);
}
else{
tablica = wypozyczeniaOdebranySprzet;
var dane = document.forms[1]; // pobiera pierwszy z formsow na stronie
}

for(var i=1;i<dane.length;i++){
if(dane[i].checked == true){
console.log(" i : " + i + " checked : " + dane[i].checked);
console.log("tablica " + tablica);
var wybraneID = tablica[i-1].id;
var iWybrane = i-1; //nr wybranego radia
}
//console.log(i + " " + dane[i].checked + " id : "+ tablica[i].id);
}

if(tablica == wypozyczeniaWydanySprzet){
console.log("komunikat zatwierdzenia ="+ komunikat)
var osoba_wydajaca = getUserName() + "/" + komunikat;
ref = "wypozyczenia/" + wybraneID;
//ZAPIS
  var Sciezka = db.doc(ref);
  Sciezka.set({
osoba_wydajaca : osoba_wydajaca
  },{merge: true}).catch(function(error){
                    console.log("bład podczas zapisywania dokumentu " + error)
                    }).then(()=>{
                    console.log("zapisuje");
                    alert("Wykonano zatwierdzenie");
                    dane[iWybrane + 1].disabled = true//Usunięcię zatwierdzonej opcji
                    });//forEach;//then;
}else{
var osoba_przyjmujaca = getUserName() + "/" + komunikat;
ref = "wypozyczenia/" + wybraneID;
//ZAPIS
  var Sciezka = db.doc(ref);
  var status = "zamkniete/" + tablica[iWybrane].osoba_wypozyczajaca;
  Sciezka.set({
osoba_przyjmujaca : osoba_przyjmujaca,
status : status
  },{merge: true}).catch(function(error){
                    console.log("bład podczas zapisywania dokumentu " + error)
                    });//forEach;//then;
  var aktywneWypozyczenia = Number(sessionStorage.getItem("aktywneWypozyczenia")) -1;
  ref = "uzytkownicy/" + getUserName();
  //ZAPIS
    Sciezka = db.doc(ref);
     Sciezka.set({

    aktywneWypozyczenia : aktywneWypozyczenia

      },{merge: true}).catch(function(error){
                        console.log("bład podczas zapisywania dokumentu " + error)
                        }).then(()=>{
                         console.log("zapisuje");
                         alert("Wykonano zatwierdzenie");
                         dane[iWybrane + 1].disabled = true//Usunięcię zatwierdzonej opcji
                        });//forEach;//then;
}

}

function zatwierdzEdycje(){
var tablica = _wybranaTablica;
var i = wybraneRadio -1;
var zmiana =false;
console.log( " id : "+ tablica[i].id);

var osoba_wydajaca = document.getElementById("in_osobaWydajaca").value;
var osoba_przyjmujaca = document.getElementById("in_osobaPrzyjmujaca").value;
var sprzet_kajak = document.getElementById("in_kajaki").value;
var sprzet_fartuch = document.getElementById("in_fartuchy").value;
var sprzet_wioslo = document.getElementById("in_wiosla").value;
var sprzet_kask =document.getElementById("in_kaski").value;
var sprzet_kamizelka = document.getElementById("in_kamizelki").value;
var data_wydania = document.getElementById("nowaData_wydania").value;
var data_planowanegoOddania = document.getElementById("nowaData_planowanegoOddania").value;
var data_zwrotu = document.getElementById("nowaData_zwrotu").value;
var koszt_planowany = document.getElementById("nowyKoszt_planowany").value;
var koszt_rzeczywisty = document.getElementById("nowyKoszt_rzeczywisty").value;
var status = document.getElementById("nowyStatus").value ;
var uwagi = document.getElementById("noweUwagi").value ;

if(osoba_wydajaca == ""){
osoba_wydajaca = _wybranaTablica[i].osoba_wydajaca;
}else{zmiana=true}
if(osoba_przyjmujaca == ""){
osoba_przyjmujaca = _wybranaTablica[i].osoba_przyjmujaca;
}else{zmiana=true}
if(sprzet_kajak == ""){
sprzet_kajak = _wybranaTablica[i].sprzet_kajak;
}else{zmiana=true}
if(sprzet_fartuch == ""){
sprzet_fartuch = _wybranaTablica[i].sprzet_fartuch;
}else{zmiana=true}
if(sprzet_wioslo == ""){
sprzet_wioslo = _wybranaTablica[i].sprzet_wioslo;
}else{zmiana=true}
if(sprzet_kask == ""){
sprzet_kask = _wybranaTablica[i].sprzet_kask;
}else{zmiana=true}
if(sprzet_kamizelka == ""){
sprzet_kamizelka = _wybranaTablica[i].sprzet_kamizelka;
}else{zmiana=true}
if(data_wydania == ""){
data_wydania = _wybranaTablica[i].data_wydania;
}else{zmiana=true}
if(data_planowanegoOddania == ""){
data_planowanegoOddania = _wybranaTablica[i].data_planowanegoOddania;
}else{zmiana=true} //XXXXXXXXXXXXXXXXX
if(data_zwrotu == ""){
data_zwrotu = _wybranaTablica[i].data_zwrotu//.toDate();
}else{zmiana=true}
if(koszt_planowany == ""){
koszt_planowany = _wybranaTablica[i].koszt_planowany;
}else{zmiana=true}
if(koszt_rzeczywisty == ""){
koszt_rzeczywisty = _wybranaTablica[i].koszt_rzeczywisty;
}else{zmiana=true}
if(status == ""){
status = _wybranaTablica[i].status;
}else{
status += "/" +_wybranaTablica[i].osoba_wypozyczajaca;
zmiana = true;
}
if(uwagi == ""){
uwagi = _wybranaTablica[i].uwagi;
}else{
zmiana = true;
uwagi =_wybranaTablica[i].uwagi + " | " + getUserName() + _NOW.short + uwagi + " -> " + getUserName() + " <- edytował wypożyczenie w dniu :" + _NOW.short;
}

  if(zmiana==true){
ref = "wypozyczenia/" + wybraneID;
      var Sciezka = db.doc(ref);
  Sciezka.set({

//data_planowanegoZwrotu : data_planowanegoOddania,
data_wydania : data_wydania,
data_zwrotu : data_zwrotu,
koszt_planowany : koszt_planowany,
koszt_rzeczywisty : koszt_rzeczywisty,
osoba_przyjmujaca : osoba_przyjmujaca,
osoba_wydajaca : osoba_wydajaca,
sprzet_fartuch : sprzet_fartuch,
sprzet_kajak : sprzet_kajak,
sprzet_kamizelka : sprzet_kamizelka,
sprzet_kask : sprzet_kask,
sprzet_wioslo : sprzet_wioslo,
status : status,
uwagi : uwagi

  },{merge: true}).then(()=>{
  alert("edytowano wypozyczenie")
  var modal = document.getElementById("modal");
  modal.style.display = "none";
  if(_wybranaTablica = wypozyczeniaWydanySprzet){
  var radia = document.forms[0];
  radia[wybraneRadio].disabled =true;
  }else{
  var radia = document.forms[1];
  radia[wybraneRadio].disabled = true;
  }
    console.log("zapisano")
  });
}else{
 alert("nie wprowadzono zmian")
 }
}

function wypelnijFormEdycji(tablica){

console.log("tablica w edycji : " + tablica)
var osoba_wypozyczajaca = document.getElementById("OsobaWypozyczajaca");
var osoba_wydajaca = document.getElementById("OsobaWydajaca");
var osoba_przyjmujaca = document.getElementById("OsobaPrzyjmujaca");
var sprzet_kajak = document.getElementById("sprzet_kajaki");
var sprzet_fartuch = document.getElementById("sprzet_fartuchy");
var sprzet_wioslo = document.getElementById("sprzet_wiosla");
var sprzet_kask =document.getElementById("sprzet_kaski");
var sprzet_kamizelka = document.getElementById("sprzet_kamizelki");
var data_wydania = document.getElementById("data_wydania");
var data_planownaegoOddania = document.getElementById("data_planowanegoOddania");
var data_zwrotu = document.getElementById("data_zwrotu");
var koszt_planowany = document.getElementById("koszt_planowany");
var koszt_rzeczywisty = document.getElementById("koszt_rzeczywisty");
var status = document.getElementById("status");
var uwagi = document.getElementById("uwagi");
 var i = wybraneRadio -1;
 console.log("wybrane radio = " + wybraneRadio + " i : " + i);
osoba_wypozyczajaca.value = tablica[i].osoba_wypozyczajaca;
osoba_wydajaca.value = tablica[i].osoba_wydajaca;
osoba_przyjmujaca.value = tablica[i].osoba_przyjmujaca;
sprzet_kajak.value = tablica[i].sprzet_kajak;
sprzet_fartuch.value = tablica[i].sprzet_fartuch;
sprzet_wioslo.value = tablica[i].sprzet_wioslo;
sprzet_kask.value = tablica[i].sprzet_kask;
sprzet_kamizelka.value = tablica[i].sprzet_kamizelka;
sprzet_fartuch.value = tablica[i].sprzet_fartuch;
data_wydania.value = tablica[i].data_wydania;
data_planownaegoOddania.value = tablica[i].data_planowanegoZwrotu;
data_zwrotu.value = tablica[i].data_zwrotu;
koszt_planowany.value = tablica[i].koszt_planowany;
koszt_rzeczywisty.value = tablica[i].koszt_rzeczywisty;
status.value = tablica[i].status.split('/')[0];
uwagi.value = tablica[i].uwagi;
}

document.getElementById("btnEdytujPrzyjecie").addEventListener("click", function(){modal('wypozyczeniaOdebranySprzet')});

document.getElementById("btnEdytujWydanie").addEventListener("click", function(){modal('wypozyczeniaWydanySprzet')});
