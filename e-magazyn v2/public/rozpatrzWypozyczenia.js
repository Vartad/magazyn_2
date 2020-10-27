
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

return new Promise(resolve => {
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
const ref = db.collection("uzytkownicy").where("Email","==", getUserEmail())// kolejne kryteria to po prostu .where()//
.get()
.then(function(querySelector) {
querySelector.forEach(function(doc){

var imie = document.getElementById("user-name").innerHTML;
imie = getUserName();

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

function odrzuc(){

}

document.getElementById("btnEdytujPrzyjecie").addEventListener("click", function(){try{modal('wypozyczeniaOdebranySprzet')}catch(error){
                                                                                                                           console.error(error);
                                                                                                                           }});

document.getElementById("btnEdytujWydanie").addEventListener("click", function(){modal('wypozyczeniaWydanySprzet')});

/*
function wczytajDane(tablica,skad,kryterium,szukana){
return new Promise(czekaj => {

var i = 1;
console.log("poszukiwany dokument : skad - " + skad + " kryterium - " + kryterium + " szukana - " + szukana  )
const ref = db.collection(skad).where(kryterium,"==", szukana)// kolejne kryteria to po prostu .where()//
.withConverter(wypozyczenieConverter)
.get().then(function(querySelector) {
querySelector.forEach(function(doc){
//if (doc.exist){
tablica[i] = doc.data();
tablica[i].id = doc.id;

//console.log("i = "+ i + " wypozyczenie " + wypozyczeniaWydanySprzet[i].koszt_dzien);
i += 1;
//}else{
//console.log("nie ma takiego dokumentu")
//}//else
czekaj("resolved");
});
}).catch(function(error){
  console.log("bład podczas wczytywania dokumentu " + error)
  });//forEach;//then


})
}

function wyswietlTabliceWTabeli(tablica,tabela){

for(var i=1;i<tablica.length;i++ ){

var row = tabela.insertRow(i);
var cell0 = row.insertCell(0);
var cell1 = row.insertCell(1);
var cell2 = row.insertCell(2);
var cell3 = row.insertCell(3);
var cell4 = row.insertCell(4);
var cell5 = row.insertCell(5);
var cell6 = row.insertCell(6);
var cell7 = row.insertCell(7);
var cell8 = row.insertCell(8);
var cell9 = row.insertCell(9);
var cell10 = row.insertCell(10);
var cell11 = row.insertCell(11);

if(tablica == "wypozyczeniaWydanySprzet"){
cell0.innerHTML = "<input type='radio' name='radioWydanySprzet'>";
}else{
cell0.innerHTML = "<input type='radio' name='radioOdebranySprzet'>";
}


cell1.innerHTML = tablica[i].data_wydania;
cell2.innerHTML = tablica[i].osobaWydajaca;
cell3.innerHTML = tablica[i].sprzetKajak;
cell4.innerHTML = tablica[i].sprzetWioslo;
cell5.innerHTML = tablica[i].sprzetFartuch;
cell6.innerHTML = tablica[i].sprzetKamizelka;
cell7.innerHTML = tablica[i].sprzetKask;
cell8.innerHTML = tablica[i].dataPlanowanegoZwrotu;
cell9.innerHTML = tablica[i].dataZwrotu;
cell10.innerHTML = tablica[i].stat;
cell11.innerHTML = tablica[i].uwagi;
}
}
*/

/*
var obiektWczytywany = {
id : "",
data_planowanegoZwrotu : "",
data_wydania : "",
data_zwrotu : "",
koszt_dzien : "",
koszt_planowany : "",
koszt_rzeczywisty : "",
osoba_przyjmujaca : "",
osoba_wydajaca : "",
osoba_wypozyczajaca : "",
sprzet_fartuch : "",
sprzet_kajak : "",
sprzet_kamizelka : "",
sprzet_kask : "",
sprzet_wioslo : "",
status : "",
uwagi : ""
}

class Wypozyczenie{
constructor(
data_planowanegoZwrotu,
data_wydania,
data_zwrotu,
koszt_dzien,
koszt_planowany,
koszt_rzeczywisty,
osoba_przyjmujaca,
osoba_wydajaca,
osoba_wypozyczajaca,
sprzet_fartuch,
sprzet_kajak,
sprzet_kamizelka,
sprzet_kask,
sprzet_wioslo,
status,
uwagi
            ) {
//this.id = id;
this.data_planowanegoZwrotu = data_planowanegoZwrotu;
this.data_wydania = data_wydania;
this.data_zwrotu = data_zwrotu;
this.koszt_dzien = koszt_dzien;
this.koszt_planowany = koszt_planowany;
this.koszt_rzeczywisty = koszt_rzeczywisty;
this.osoba_przyjmujaca = osoba_przyjmujaca;
this.osoba_wydajaca = osoba_wydajaca;
this.osoba_wypozyczajaca = osoba_wypozyczajaca;
this.sprzet_fartuch = sprzet_fartuch;
this.sprzet_kajak = sprzet_kajak;
this.sprzet_kamizelka = sprzet_kamizelka;
this.sprzet_kask = sprzet_kask;
this.sprzet_wioslo = sprzet_wioslo;
this.status = status;
this.uwagi = uwagi;
}

get dataPlanowanegoZwrotu(){
return this.data_planowanegoZwrotu;
}
get dataWydania(){
return this.data_wydania;
}
get dataZwrotu(){
return this.data_zwrotu;
}
get kosztDzien(){
return this.koszt_dzien;
}
get kosztPlanowany(){
return this.koszt_planowany;
}
get kosztRzeczywisty(){
return this.koszt_rzeczywisty;
}
get osobaPrzyjmujaca(){
return this.osoba_przyjmujaca;
}
get osobaWydajaca(){
return this.osoba_wydajaca;
}
get osobaWypozyczajaca(){
return this.osobaWypozyczajaca;
}
get sprzetFartuch(){
return this.sprzet_fartuch;
}
get sprzetKajak(){
return this.sprzet_kajak;
}
get sprzetKamizelka(){
return this.sprzet_kamizelka;
}
get sprzetKask(){
return this.sprzet_kask;
}
get sprzetWioslo(){
return this.sprzet_wioslo;
}
get stat(){
return this.status;
}
get uwa(){
return this.uwagi;
}
}

var wypozyczenieConverter = {
toFirestore: function(wypozyczenie){
 return {
            data_planowanegoZwrotu : wypozyczenie.data_planowanegoZwrotu,
            data_wydania : wypozyczenie.data_wydania,
            data_zwrotu : wypozyczenie.data_zwrotu,
            koszt_dzien : wypozyczenie.koszt_dzien,
            koszt_planowany : wypozyczenie.koszt_planowany,
            koszt_rzeczywisty : wypozyczenie.koszt_rzeczywisty,
            osoba_przyjmujaca : wypozyczenie.osoba_przyjmujaca,
            osoba_wydajaca : wypozyczenie.osoba_wydajaca,
            osoba_wypozyczajaca : wypozyczenie.osoba_wypozyczajaca,
            sprzet_fartuch : wypozyczenie.sprzet_fartuch,
            sprzet_kajak : wypozyczenie.sprzet_kajak,
            sprzet_kamizelka : wypozyczenie.sprzet_kamizelka,
            sprzet_kask : wypozyczenie.sprzet_kask,
            sprzet_wioslo : wypozyczenie.sprzet_wioslo,
            status : wypozyczenie.status,
            uwagi : wypozyczenie.uwagi
            }
},
fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new Wypozyczenie(
        data.data_planowanegoZwrotu,
        data.data_wydania,
        data.data_zwrotu,
        data.koszt_dzien,
        data.koszt_planowany,
        data.koszt_rzeczywisty,
        data.osoba_przyjmujaca,
        data.osoba_wydajaca,
        data.osoba_wypozyczajaca,
        data.sprzet_fartuch,
        data.sprzet_kajak,
        data.sprzet_kamizelka,
        data.sprzet_kask,
        data.sprzet_wioslo,
        data.status,
        data.uwagi)
    }
}
*/

//obiekt
/*
var obiektWczytywany = {
id : doc.id,
data_planowanegoZwrotu : doc.data().data_planowanegoZwrotu,
data_wydania : doc.data().data_wydania,
data_zwrotu : undefinedNaNic(doc.data().data_zwrotu),
koszt_dzien : doc.data().koszt_dzien,
koszt_planowany : doc.data().koszt_planowany,
koszt_rzeczywisty : doc.data().koszt_rzeczywisty,
osoba_przyjmujaca : doc.data().osoba_przyjmujaca,
osoba_wydajaca : doc.data().osoba_wydajaca,
osoba_wypozyczajaca : doc.data().osoba_wypozyczajaca,
sprzet_fartuch : doc.data().sprzet_fartuch,
sprzet_kajak : undefinedNaNic(doc.data().sprzet_kajak),
sprzet_kamizelka : undefinedNaNic(doc.data().sprzet_kamizelka),
sprzet_kask : undefinedNaNic(doc.data().sprzet_kask),
sprzet_wioslo : undefinedNaNic(doc.data().sprzet_wioslo),
status : undefinedNaNic(doc.data().status),
uwagi : doc.data().uwagi
}
*/

//obiekt


/*
function wyswietlWydanySprzet(resolve){

firebase.auth().onAuthStateChanged(function(user) {
var i =1;

window.IDwypozyczeniaWydanySprzet = [1,2,3];
window.kosztPlanowany =[1,2,3];
window.uwagiWczytane = [1,2,3];
window.czyWyswietlic = [1,2,3];
var sprawdzajacy = [1,2,3];

 // if (user) {
const ref = db.collection("wypozyczenia").where("osoba_wydajaca","==", getUserName())// kolejne kryteria to po prostu .where()//
.get().then(function(querySelector) {
querySelector.forEach(function(doc){

console.log("i = "+ i);
var data_wydania = convert(doc.data().data_wydania.toDate());
var osoba_wydajaca = doc.data().osoba_wydajaca;
var sprzet_kajak = undefinedNaNic(doc.data().sprzet_kajak);
var sprzet_wioslo = undefinedNaNic(doc.data().sprzet_wioslo);
var sprzet_fartuch = doc.data().sprzet_fartuch;
var sprzet_kamizelka = undefinedNaNic(doc.data().sprzet_kamizelka);
var sprzet_kask = undefinedNaNic(doc.data().sprzet_kask);
var status = undefinedNaNic(doc.data().status);
var data_zwrotu = doc.data().data_zwrotu;
if(data_zwrotu==undefined){
data_zwrotu = "jeszcze nie zwrocono";
}else{
//data_zwrotu = convert(data_zwrotu,"short");
}
sprawdzajacy[i] = doc.data().osoba_przyjmujaca;

var uwagi = undefinedNaNic(doc.data().uwagi);
var data_planowanegoZwrotu = doc.data().data_planowanegoZwrotu;
IDwypozyczeniaWydanySprzet[i] = doc.id;
//kosztPlanowany[i] = doc.data().kosztPlanowany;

var tabela = document.getElementById("tabelaWydanych");
var row = tabela.insertRow(i);
var cell0 = row.insertCell(0);
var cell1 = row.insertCell(1);
var cell2 = row.insertCell(2);
var cell3 = row.insertCell(3);
var cell4 = row.insertCell(4);
var cell5 = row.insertCell(5);
var cell6 = row.insertCell(6);
var cell7 = row.insertCell(7);
var cell8 = row.insertCell(8);
var cell9 = row.insertCell(9);
var cell10 = row.insertCell(10);
var cell11 = row.insertCell(11);

cell0.innerHTML = "<input type='radio' name='radioWydanySprzet'>";
cell1.innerHTML = data_wydania.substring(0,10);
cell2.innerHTML = osoba_wydajaca;
cell3.innerHTML = sprzet_kajak;
cell4.innerHTML = sprzet_wioslo;
cell5.innerHTML = sprzet_fartuch;
cell6.innerHTML = sprzet_kamizelka;
cell7.innerHTML = sprzet_kask;
cell8.innerHTML = data_planowanegoZwrotu;
cell9.innerHTML = data_zwrotu;
cell10.innerHTML = status;
cell11.innerHTML = uwagi;

i += 1;

});//forEach

});//then

//} else {
// No user is signed in.
 // }
 resolve('resolved');
});

}
*/
/*
function wyswietlOdebranySprzet(resolve){

firebase.auth().onAuthStateChanged(function(user) {
var i =1;

window.IDwypozyczeniaPrzyjetySprzet = [1,2,3];
window.kosztPlanowanyPrzyjetegoSprzetu =[1,2,3];
window.uwagiWczytanePrzyjetegoSprzetu = [1,2,3];

var sprawdzajacy = [1,2,3];

 // if (user) {
const ref = db.collection("wypozyczenia").where("osoba_przyjmujaca","==", getUserName())// kolejne kryteria to po prostu .where()//
.get().then(function(querySelector) {
querySelector.forEach(function(doc){

var data_wydania = convert(doc.data().data_wydania.toDate());
var osoba_wydajaca = doc.data().osoba_wydajaca;
var sprzet_kajak = undefinedNaNic(doc.data().sprzet_kajak);
var sprzet_wioslo = undefinedNaNic(doc.data().sprzet_wioslo);
var sprzet_fartuch = doc.data().sprzet_fartuch;
var sprzet_kamizelka = undefinedNaNic(doc.data().sprzet_kamizelka);
var sprzet_kask = undefinedNaNic(doc.data().sprzet_kask);
var status = undefinedNaNic(doc.data().status);
var data_zwrotu = doc.data().data_zwrotu;
sprawdzajacy[i] = doc.data().osoba_przyjmujaca;

var uwagi = undefinedNaNic(doc.data().uwagi);
var data_planowanegoZwrotu = doc.data().data_planowanegoZwrotu;
IDwypozyczeniaPrzyjetySprzet[i] = doc.id;
//kosztPlanowany[i] = doc.data().kosztPlanowany;

var tabela = document.getElementById("tabelaPrzyjetych");
var row = tabela.insertRow(i);
var cell0 = row.insertCell(0);
var cell1 = row.insertCell(1);
var cell2 = row.insertCell(2);
var cell3 = row.insertCell(3);
var cell4 = row.insertCell(4);
var cell5 = row.insertCell(5);
var cell6 = row.insertCell(6);
var cell7 = row.insertCell(7);
var cell8 = row.insertCell(8);
var cell9 = row.insertCell(9);
var cell10 = row.insertCell(10);
var cell11 = row.insertCell(11);

cell0.innerHTML = "<input type='radio' name='radioOdebranySprzet'>";
cell1.innerHTML = data_wydania.substring(0,10);
cell2.innerHTML = osoba_wydajaca;
cell3.innerHTML = sprzet_kajak;
cell4.innerHTML = sprzet_wioslo;
cell5.innerHTML = sprzet_fartuch;
cell6.innerHTML = sprzet_kamizelka;
cell7.innerHTML = sprzet_kask;
cell8.innerHTML = data_planowanegoZwrotu;
cell9.innerHTML = data_zwrotu;
cell10.innerHTML = status;
cell11.innerHTML = uwagi;

i += 1;

});//forEach

});//then

//} else {
// No user is signed in.
 // }
 resolve('resolved');
});

}
<<<<<<< HEAD
*/

