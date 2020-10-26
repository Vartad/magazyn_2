
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

//^^ FIREBASE SETUP AND BASIC FUNCTIONS^^

  var _today = new Date().toISOString().split('T')[0];

function mainNOW(){
return new Date();
}

var _NOW = {

short : _convertDate(mainNOW(),"short"),
long  : _convertDate(mainNOW(),"long"),
full  : mainNOW()
} //_NOW

class _Sprzet{
constructor(
fartuch,
kajak,
kamizelka,
kask,
wioslo,
            ) {
this.fartuch = fartuch;
this.kajak = kajak;
this.kamizelka = kamizelka;
this.kask = kask;
this.wioslo = wioslo;
}
get sprzetFartuch(){
return this.fartuch;
}
get sprzetKajak(){
return this.kajak;
}
get sprzetKamizelka(){
return this.kamizelka;
}
get sprzetKask(){
return this.kask;
}
get sprzetWioslo(){
return this.wioslo;
}
}
/*
class _Wypozyczenie{
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
get stat(){
return this.status;
}
get uwa(){
return this.uwagi;
}
} //bez sprzetu
*/
class _Wypozyczenie{

constructor(
data_planowanegoZwrotu,
data_wydania,
data_zwrotu,
koszt_rzeczywisty,
koszt_dzien,
koszt_planowany,
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
this.data_planowanegoZwrotu = data_planowanegoZwrotu;   //1
this.data_wydania = data_wydania;                       //2
this.data_zwrotu = data_zwrotu;                         //3
this.koszt_dzien = koszt_dzien;                         //4
this.koszt_planowany = koszt_planowany;                 //5
this.koszt_rzeczywisty = koszt_rzeczywisty;             //6
this.osoba_przyjmujaca = osoba_przyjmujaca;             //7
this.osoba_wydajaca = osoba_wydajaca;                   //8
this.osoba_wypozyczajaca = osoba_wypozyczajaca;         //9
this.sprzet_fartuch = sprzet_fartuch;                   //10
this.sprzet_kajak = sprzet_kajak;                       //11
this.sprzet_kamizelka = sprzet_kamizelka;               //12
this.sprzet_kask = sprzet_kask;                         //13
this.sprzet_wioslo = sprzet_wioslo;                     //14
this.status = status;                                   //15
this.uwagi = uwagi;                                     //16
}

static koszt_oblicz(wypozyczenie){

}

static daj(wypozyczenie,i){
    switch(i){
    case "data_planowanegoZwrotu" : return wypozyczenie.data_planowanegoZwrotu
    case "data_wydania" : return wypozyczenie.data_wydania
    case "data_zwrotu" : return wypozyczenie.data_zwrotu
    case "koszt_dzien" : return wypozyczenie.koszt_dzien
    case "koszt_planowany" : return wypozyczenie.koszt_planowany
    case "koszt_rzeczywisty" : return wypozyczenie.koszt_rzeczywisty
    case "osoba_przyjmujaca" : return wypozyczenie.osoba_przyjmujaca
    case "osoba_wydajaca" : return wypozyczenie.osoba_wydajaca
    case "osoba_wypozyczajaca" : return wypozyczenie.osoba_wypozyczajaca
    case "sprzet_fartuch" : return wypozyczenie.sprzet_fartuch
    case "sprzet_kajak" :return wypozyczenie.sprzet_kajak
    case "sprzet_kamizelka" : return wypozyczenie.sprzet_kamizelka
    case "sprzet_kask" : return wypozyczenie.sprzet_kask
    case "sprzet_wioslo" : return wypozyczenie.sprzet_wioslo
    case "status" : return wypozyczenie.status
    case "uwagi" :  return wypozyczenie.uwagi
    case "sprzet" : return new _Sprzet(wypozyczenie.sprzet_fartuch,wypozyczenie.sprzet_kajak,wypozyczenie.sprzet_kamizelka,wypozyczenie.sprzet_kask,wypozyczenie.sprzet_wioslo,);
    case "obliczKoszt" : return _kalkulatorKosztu(wypozyczenie.data_wydania,_NOW.short,_Wypozyczenie.daj(wypozyczenie,"sprzet"));
    break;
    default : {console.log(" zadana wartosc nie istnieje");}
    }
}

static sprzet(wypozyzczenie){

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
} //KompletDanych

class _User{
constructor(
Email,
aktywneWypozyczenia,
dostep,
godzinki,
imie,
nazwisko,
skladka
            ) {
//this.id = id;
this.Email = Email;   //1
this.aktywneWypozyczenia = aktywneWypozyczenia;                       //2
this.dostep = dostep;                         //3
this.godzinki = godzinki;                         //4
this.imie = imie;                 //5
this.nazwisko = nazwisko;             //6
this.skladka = skladka;             //7
}
}

function _convertDate(date,format){
let current_datetime = date;
let formatted_date;
var dzien = (current_datetime.getDate()).toString();
var miesiac = (current_datetime.getMonth() + 1).toString();
if(miesiac.length == 1) miesiac = "0" + miesiac;
  if(dzien.length == 1) dzien = "0" + dzien;
if(format == "short"){
    formatted_date =
    current_datetime.getFullYear() + "-" +
    miesiac + "-" +
    dzien;
}else{
    formatted_date =
    current_datetime.getFullYear() + "-" +
    miesiac + "-" +
    dzien + " " +
    current_datetime.getHours() + ":" +
    current_datetime.getMinutes() + ":" +
    current_datetime.getSeconds();
}
//formatted_date = new Date(formatted_date)
  return formatted_date;
}

function _kalkulatorDni(dataStart,dataKoniec){

dataStart = new Date(dataStart);
dataKoniec = new Date(dataKoniec);
var milisecondsStart = dataStart.getTime();
var milisecondsKoniec = dataKoniec.getTime();
//console.log(" dataStart : " + dataStart );
//console.log(" dataKoniec : " + dataKoniec );

var timeDiffDays = Math.round((milisecondsKoniec - milisecondsStart )/(1000*60*60*24)) +1;
//console.log("wypozyczono na dni : " + timeDiffDays);
return timeDiffDays ;
} //oblicza ile dni jest pomiedzy data wybrana jako data planowanego zwrotu a data w dniu wypozyczenia.

function czyWybranoSprzet(sprzet){
var wartosc;
if(sprzet==""){
wartosc =0;
}else {
wartosc =1;
}
return wartosc;
} //sprawdza czy sprzet zostal wybrany przez uzytkownika.

function _kalkulatorKosztu(dataStart,dataKoniec,sprzet){
//console.log(" dataStart KOSZT : " + dataStart );
//console.log(" dataKoniec KOSZT : " + dataKoniec );
var liczbaDni;
liczbaDni = _kalkulatorDni(dataStart,dataKoniec);
//console.log("wypozyczono na dni KOSZT : " + liczbaDni);
var kajakWart = czyWybranoSprzet(sprzet.kajak);
var wiosloWart = czyWybranoSprzet(sprzet.wioslo);
var kaskwart = czyWybranoSprzet(sprzet.kask);
var fartuchWart = czyWybranoSprzet(sprzet.fartuch);
var kamizelkaWart = czyWybranoSprzet(sprzet.kamizelka);
//console.log("kajak : " + kajakWart);
liczbaDni = liczbaDni * ( kajakWart *1 + wiosloWart *1 + kaskwart * 1 + fartuchWart * 1 + kamizelkaWart *1);
//console.log("KOSZT : " + liczbaDni)
return liczbaDni;
}

function wypelnij(dl , in_dl,sciezka,holder ){
var request = new XMLHttpRequest();
request.onreadystatechange = function(response) {
  if (request.readyState === 4) {
    if (request.status === 200) {
      // Parse the JSON
      var jsonOptions = JSON.parse(request.responseText);

      // Loop over the JSON array.
      jsonOptions.forEach(function(item) {
        // Create a new <option> element.
        var option = document.createElement('option');
        // Set the value using the item in the JSON array.
        option.value = item;
        // Add the <option> element to the <datalist>.
        dl.appendChild(option); //zmienic
      });

      // Update the placeholder text.
      in_dl.placeholder = "wybierz " + holder + " z listy"; //zmienic
    } else {
      // An error occured :(
      input.placeholder = "Couldn't load datalist options :(";
    }
  }
};
// Update the placeholder text.
in_dl.placeholder = "Ładowanie listy :" + holder + "..."; //zmienic
// Set up and make the request.
request.open('GET', sciezka, true);
request.send();
} //wykorzystywana do wypelniania dropdown'ow

function undefinedNaNic(cos){
if(cos== undefined) {
return cos = "";
}else{
return cos;
}
}

function zaladuj(){
document.getElementById("page").style.display = "none";
document.getElementById("loading").style.display = "block";
loading();
}

async function loading (){

const result = await zaladujStrone();
//console.log('loading result :' + result);
if ( result == "resolved"){
//console.log("zaladowano");
document.getElementById("page").style.display = "block";
document.getElementById("loading").style.display = "none";
}
}

function _wczytajDane(segreguj,converter,resolve,tablica,skad,kryterium,szukana,limit){
//console.log("converter = " + converter);
return new Promise(czekaj => {
var i = 0;
//var liczbaElementowWtablicy = tablica.length;
//if(liczbaElementowWtablicy == undefined){liczbaElementowWtablicy = 0};
//i = liczbaElementowWtablicy + i;
//console.log("liczbaElementowWtablicy " + liczbaElementowWtablicy)
//console.log("poszukiwany dokument : skad - " + skad + " kryterium - " + kryterium + " szukana - " + szukana  )
const ref = db.collection(skad).where(kryterium,"==", szukana).limit(limit).orderBy(segreguj,"desc")// kolejne kryteria to po prostu .where()//
.withConverter(converter)
.get()
.then(function(querySelector) {
querySelector.forEach(function(doc){
if(doc.exists){

tablica[i] = doc.data();
tablica[i].id = doc.id;
i += 1;
czekaj("resolved");
resolve("resolved");
}else{
console.log("No such Document")
czekaj("resolved");
resolve("resolved");
}}
);
});
}).catch(function(error){
  console.log("bład podczas wczytywania dokumentu " + error)
  });//forEach;//then
czekaj("resolved");
resolve("resolved");
return resolve;
}

function _wyswietlTabliceWTabeli(headerRow,tablica,tabela,cbName){
var argNb = 4; // nr pierwszego argumentu bedacego sprzetem
var cell = [];
var new_tbody = document.createElement("tbody");
tabela.innerHTML = ""

tabela.appendChild(headerRow);
//console.log("liczbaWierszy : " + tabela.rows.length)
for(var i=1;i<=tablica.length;i++ ){ //petla wierszy
 row = tabela.insertRow();
for(var j=0;j<=arguments.length-3;j++){ //petla dodajaca kolumny
cell[j]  = row.insertCell();
} //petla dodajaca kolumny
//console.log("wiersz : " + i);

for( var j=argNb;j<arguments.length;j++){ //petla kolumn
//console.log("kolumna : " + j);
if(typeof arguments[j] == "number"){
cell[j-argNb].innerHTML = arguments[j];
}else{
   if(arguments[j].includes("checkBox") || arguments[j].includes("radio") || arguments[j].includes("textArea") || arguments[j].includes("Lp") ){
   if(arguments[j].includes("checkBox")){
   inputType =i + ": <input type='checkBox'> ";
      cell[j-argNb].innerHTML = inputType;
      cell[j-argNb].class = arguments[j];
    }
   if(arguments[j].includes("radio")){
   inputType =i + ": <input type='radio' name='radioWydanySprzet'>";
      cell[j-argNb].innerHTML = inputType;
      //cell[j-argNb].name = "radioWydanySprzet"
      //cell[j-argNb].class = arguments[j]; ok
      //console.log("cell.class : "+ cell[j-argNb].class);
   }
   if(arguments[j].includes("Lp")){inputType = i;
    cell[j-argNb].innerHTML = inputType;
          cell[j-argNb].class = arguments[j];
    }
   else{
   //console.log("nie rozpoznano typu input");
   }
  // console.log("arguments[j] " + arguments[j]  + " inputType " + inputType);



   if(arguments[j].includes("textArea")){
     // console.log("textarea")
      cell[j-argNb].innerHTML = "";
     // inputType = "<input type='textArea'>"
      var textArea = document.createElement("input");
      textArea.type = "textarea";
      textArea.id = "TA"+i;
      cell[j-argNb].appendChild(textArea);
     // console.log("id NAME : "+ textArea.id)
     // cell[j-argNb].name
      }
   }else{
   if(arguments[3] != "" && arguments[j].includes("sprzet")){
   var checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    //checkbox.name = arguments[j] + i;
            if(_Wypozyczenie.daj(tablica[i-1],arguments[j])==""){
            checkbox.disabled = true;
            }
        //inputType = "<input type='checkBox'>";
        cell[j-argNb].appendChild(checkbox);
        //console.log("argument[j] = " + arguments[j] + i);
        // cell[j-argNb].name = arguments[3] ;
        //console.log("id " + cell[j-argNb].id);
        }
        if(arguments[j] == "status"){
        var status = _Wypozyczenie.daj(tablica[i-1],arguments[j]).split('/')[0];
        cell[j-argNb].innerHTML += " " + status;
        }else{
        cell[j-argNb].innerHTML += " " + _Wypozyczenie.daj(tablica[i-1],arguments[j]);
}
}
}

}//petla kolumn
}//petla wierszy
}

var wypozyczenieConverter = {
toFirestore: function(wypozyczenie){
 return {
            data_planowanegoZwrotu : wypozyczenie.data_planowanegoZwrotu,
            data_wydania : wypozyczenie.data_wydania,
            data_zwrotu : wypozyczenie.data_zwrotu,
            koszt_rzeczywisty : wypozyczenie.koszt_rzeczywisty,
            koszt_dzien : wypozyczenie.koszt_dzien,
            koszt_planowany : wypozyczenie.koszt_planowany,
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
        return new _Wypozyczenie(
        data.data_planowanegoZwrotu,
        data.data_wydania,
        data.data_zwrotu,
        data.koszt_rzeczywisty,
        data.koszt_dzien,
        data.koszt_planowany,
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

var userConverter = {
toFirestore: function(user){
 return {
            Email : user.Email,
            aktywneWypozyczenia : user.aktywneWypozyczenia,
            dostep : user.dostep,
            godzinki : user.godzinki,
            imie : user.imie,
            nazwisko : user.nazwisko,
            skladka : user.skladka
            }
},
fromFirestore: function(snapshot, options){
        const data = snapshot.data(options);
        return new _User(
        data.Email,
        data.aktywneWypozyczenia,
        data.dostep,
        data.godzinki,
        data.imie,
        data.nazwisko,
        data.skladka
        )
    }
}

function _zaznaczoneZPodanegoForms(nr,tablica){
var input = document.forms[nr];
var indeksyZaznaczonych =[]; // zwraca tablice indeksow zaznaczonych checboxow
var zaznaczoneWypozyczenia =[]; //zwraca tablice wypozyczen ktore wybrano
//console.log("input.length : " + input.length)
for (var i =0;i<input.length;i++){
//console.log("i :" + i + " : " +  input[i].checked );
if(input[i].checked){
indeksyZaznaczonych.push(i-1);
//console.log("i = " + i + " isChecked " +  input[i].checked );
}
}
if(tablica != ""){
for(var i=0;i<indeksyZaznaczonych.length;i++){
zaznaczoneWypozyczenia.push(tablica[indeksyZaznaczonych[i]]);
}
return zaznaczoneWypozyczenia
}
return indeksyZaznaczonych;
}

function _pokazTablice (array){
//console.log(array + " length : " + array.length);
 for(var i =0;i<array.length;i++){
// console.log("i " + i + " - " + array[i].checked);
 }
 }
/*
function _zapiszDane(sciezka,obiekt,komunikat,reload){
     sciezka.set(obiekt,{merge: true})
    .then(()=>{
    alert(komunikat);
    console.log("Document successfully written")
    if(reload == true){
        location.reload();
    }
    })
    .catch(function(error) {
        console.error("Error writing document: ", error);
    });

    /*
    // Set with cityConverter
      .withConverter(wypozyczenieConverter)
      .set(new _Wypozyczenie("Los Angeles", "CA", "USA"));

}
*/