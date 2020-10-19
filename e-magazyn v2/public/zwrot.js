
//                      ***ZALADUJ()***
function zaladujStrone(){

var dl_magazynierzy = document.getElementById('dl_magazynierzy');
var in_magazynierzy = document.getElementById('in_magazynierzy');
wypelnij(dl_magazynierzy,in_magazynierzy,'Docs/magazynierzy.json',"magazyniera"); //lista magazynierow w modalu

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

document.getElementById("user-name").innerHTML=firebase.auth().currentUser.displayName;
   console.log("user-name is : " + firebase.auth().currentUser.displayName);
  } else {
    document.location.href = "index.html";
  }
}); //pobiera imie uzytkownika i je wyswietla na stronie
return new Promise(resolve => {

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
window.tabelaAktywnychWypozyczen = document.getElementById('tabelaAktywnychWypozyczen');
window.tabWypozyczenie = []
const szukana = "aktywne/" + getUserName();
const headerRowAktywne = document.getElementById("headerRowAktywne");
_wczytajDane(resolve,tabWypozyczenie,"wypozyczenia","status",szukana).then(() => {
_wyswietlTabliceWTabeli(headerRowAktywne,tabWypozyczenie,tabelaAktywnychWypozyczen,"",
                        "checkBoxAktywne",
                        "data_wydania",
                        "osoba_wydajaca",
                        "sprzet_kajak",
                        "sprzet_wioslo",
                        "sprzet_fartuch",
                        "sprzet_kamizelka",
                        "sprzet_kask",
                        "data_planowanegoZwrotu",
                        "status",
                        "uwagi"
                        );
resolve("resolved");
});

}else{
console.log("niezalogowanyś");
}
});
});//Promise


} // ZALADUJ()

function zwrotModal(){
const headerRowModal = document.getElementById("headerRowModal");
var zaznaczoneAktywne = [];
var tabelaModal = document.getElementById("tabelaZwrotuModal");
var modal = document.getElementById("modalZwrot");
window.wypozyczeniaWModal = _zaznaczoneZPodanegoForms(0,tabWypozyczenie);

_wyswietlTabliceWTabeli(headerRowModal,wypozyczeniaWModal,tabelaModal,"Modal",
                        //"checkBoxAktywne",
                        //"data_wydania",
                        //"osoba_wydajaca",
                        "Lp",
                        "sprzet_kajak",
                        "sprzet_wioslo",
                        "sprzet_fartuch",
                        "sprzet_kamizelka",
                        "sprzet_kask",
                        //"koszt_planowany",
                        "obliczKoszt",
                        //"data_planowanegoZwrotu",
                        //"status",
                        "textAreaModal"
                        );

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

function btnModalZwracamSprzet(){
var CB = document.forms[1]
_pokazTablice(CB);
console.log("AAA : " + document.getElementById("TA1").value) // dziala

for(var i =0;i<wypozyczeniaWModal.length;i++){
console.log("zapis i " + i);
console.log("id : " + wypozyczeniaWModal[i].id)

console.log("TA name : "+ "TA"+Number(i+1));
var TA = document.getElementById("TA"+Number(i+1)).value;
console.log("TA value " + TA);
//sprzet
var sprzet = new _Sprzet()
var komunikat = "Zwrócono Sprzęt";
var reload = true;
var sciezka = db.doc("wypozyczenia/"+ wypozyczeniaWModal[i].id);
sciezka.set({
data_zwrotu : _NOW.short,
osoba_przyjmujaca : document.getElementById("in_magazynierzy").value,
koszt_rzeczywisty : _kalkulatorKosztu(wypozyczeniaWModal[i].data_wydania,_NOW.short,sprzet),
uwagi :  wypozyczeniaWModal[i].uwagi + " | " +  _NOW.short + " " + getUserName() + "- '" +  TA + "'",
status : "zwrocono/"+getUserName()
},{merge: true})
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

}
}

//^^NOWA WERSJA^^
/*

function pokazAktywneWypozyczeniaWTablicy(resolve){

firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
  window.checkBox = [];
  window.wypozyczenia = [];
  window.sprzet = [];
checkBox[3] = document.getElementById("wypozyczenie3");
checkBox[2] = document.getElementById("wypozyczenie2");
checkBox[1] = document.getElementById("wypozyczenie1");
var w1 = document.getElementsByClassName("w1");
var i = 0;
window.tabelaWypozyczen = document.getElementById("tabelaWypozyczen");
var user_email = getUserEmail();

const ref = db.collection("wypozyczenia").where("status","==","aktywne/"+ getUserName())// kolejne kryteria to po prostu .where()//
.get().then(function(querySelector) {
querySelector.forEach(function(doc){
i +=1;
console.log(" i " + i);
wypozyczenia[i] = new _Wypozyczenie();
sprzet[i] = new _Sprzet();
wypozyczenia[i].data_wydania = doc.data().data_wydania;
wypozyczenia[i].osoba_wydajaca = doc.data().osoba_wydajaca;
wypozyczenia[i].status = undefinedNaNic(doc.data().status);
wypozyczenia[i].osoba_przyjmujaca = doc.data().osoba_przyjmujaca;
wypozyczenia[i].uwagi = undefinedNaNic(doc.data().uwagi);
wypozyczenia[i].data_planowanwegoZwrotu = doc.data().data_planowanegoZwrotu;
wypozyczenia[i].id = doc.id;
wypozyczenia[i].koszt_planowany = doc.data().kosztPlanowany;
wypozyczenia[i].uwagiWczytane = doc.data().uwagi;
sprzet[i].kajak = undefinedNaNic(doc.data().sprzet_kajak);
sprzet[i].wioslo = undefinedNaNic(doc.data().sprzet_wioslo);
sprzet[i].fartuch = doc.data().sprzet_fartuch;
sprzet[i].kamizelka = undefinedNaNic(doc.data().sprzet_kamizelka);
sprzet[i].kask = undefinedNaNic(doc.data().sprzet_kask);

tabelaWypozyczen.rows[i].cells[1].innerHTML = wypozyczenia[i].data_wydania;
tabelaWypozyczen.rows[i].cells[2].innerHTML = wypozyczenia[i].osoba_wydajaca;
tabelaWypozyczen.rows[i].cells[3].innerHTML = sprzet[i].kajak;
tabelaWypozyczen.rows[i].cells[4].innerHTML = sprzet[i].wioslo;
tabelaWypozyczen.rows[i].cells[5].innerHTML = sprzet[i].fartuch;
tabelaWypozyczen.rows[i].cells[6].innerHTML = sprzet[i].kamizelka;
tabelaWypozyczen.rows[i].cells[7].innerHTML = sprzet[i].kask;
tabelaWypozyczen.rows[i].cells[8].innerHTML = wypozyczenia[i].data_planowanwegoZwrotu;
tabelaWypozyczen.rows[i].cells[9].innerHTML = wypozyczenia[i].status.split("/")[0];
tabelaWypozyczen.rows[i].cells[10].innerHTML = wypozyczenia[i].uwagi;
if(wypozyczenia[i].osoba_przyjmujaca == ""){
checkBox[i].disabled = false;
}
 resolve('resolved');

});//forEach

});//then
  } else {
// No user is signed in.
  }

}); //

} //uzupelnia tablice trzema aktywnymi(nie zakonczonymi i zatwierdzonymi) wypozyczeniami


function zmienDostep(className,textAreaID,state){
var x = document.getElementsByClassName(className);
for(var l = 0; l<x.length;l++){
x[l].disabled = state;
x[l].checked = false;
document.getElementById(textAreaID).disabled = state;
}
l=0;
} /*zmienia z "disabled = true" na "disabled = false"
 elementow wskazanej klasy i elemetu typu textArea. uzyte w wybraneWypozyczeniaWModal() */
/*
function przepiszWartosc(pole,tablica,wiersz,kolumna){
pole.innerHTML = tablica.rows[wiersz].cells[kolumna].innerHTML;
return pole.innerHTML;
}

function przypiszZmiennejElementHTMLOTejSamejNazwie(zmienna){
zmienna = document.getElementById(zmienna);
}

function checkBoxUstawDisabledChecked(cb,disabledStatus,checkedStatus){
cb.disabled = disabledStatus;
cb.checked = checkedStatus;
}

function wyswietlSprzetZWypozyczeniaWModalu(wiersz,wartosc){
//var tabelaWypozyczen = document.getElementById("tabelaWypozyczen");
/*
var kajakwyswietl = "z" + wiersz + "_kajak";
var wioslowyswietl = "z" + wiersz + "_wioslo";
var fartuchwyswietl = "z" + wiersz + "_fartuch";
var kamizelkawyswietl = "z" + wiersz + "_kamizelka";
var kaskwyswietl = "z" + wiersz + "_kask";
var kosztwyswietl = "z" + wiersz + "_koszt";
kajakwyswietl = document.getElementById(kajakwyswietl);
wioslowyswietl = document.getElementById(wioslowyswietl);
fartuchwyswietl = document.getElementById(fartuchwyswietl);
kamizelkawyswietl = document.getElementById(kamizelkawyswietl);
kaskwyswietl = document.getElementById(kaskwyswietl);
kosztwyswietl = document.getElementById(kosztwyswietl);
if(wartosc == 1){
var kajak = przepiszWartosc(kajakwyswietl,tabelaWypozyczen,wiersz,3);
var wioslo = przepiszWartosc(wioslowyswietl,tabelaWypozyczen,wiersz,4);
var fartuch = przepiszWartosc(fartuchwyswietl,tabelaWypozyczen,wiersz,5);
var kamizelka = przepiszWartosc(kamizelkawyswietl,tabelaWypozyczen,wiersz,6);
var kask = przepiszWartosc(kaskwyswietl,tabelaWypozyczen,wiersz,7);
//console.log(kajak,wioslo,fartuch,kamizelka,kask);
window.dataWypozyczenia = tabelaWypozyczen.rows[wiersz].cells[1].innerHTML;


data_wydania = tabelaWypozyczen.rows[wiersz].cells[1].innerHTML;
*/
/*
var sprzet = new _Sprzet(fartuch,kajak,kamizelka,kask,wioslo,)
kosztwyswietl.innerHTML = _kalkulatorKosztu(data_wydania,_NOW.short,sprzet);

var cbZKajak = "cbZ"+ wiersz +"_kajak";
var cbZWioslo = "cbZ"+ wiersz +"_wioslo";
var cbZFartuch = "cbZ"+ wiersz +"_fartuch";
var cbZKamizelka = "cbZ"+ wiersz +"_kamizelka";
var cbZKask = "cbZ"+ wiersz +"_kask";

cbZKajak = document.getElementById(cbZKajak);
cbZWioslo = document.getElementById(cbZWioslo);
cbZFartuch = document.getElementById(cbZFartuch);
cbZKamizelka = document.getElementById(cbZKamizelka);
cbZKask = document.getElementById(cbZKask);

if(kajakwyswietl.innerHTML=="" ){
checkBoxUstawDisabledChecked(cbZKajak,true,false);
}
if(wioslowyswietl.innerHTML=="" ){
checkBoxUstawDisabledChecked(cbZWioslo,true,false);
}
if(fartuchwyswietl.innerHTML=="" ){
checkBoxUstawDisabledChecked(cbZFartuch,true,false);
}
if(kamizelkawyswietl.innerHTML=="" ){
checkBoxUstawDisabledChecked(cbZKamizelka,true,false);
}
if(kaskwyswietl.innerHTML=="" ){
checkBoxUstawDisabledChecked(cbZKask,true,false);
}

}else{
kajakwyswietl.innerHTML = "";
wioslowyswietl.innerHTML = "";
fartuchwyswietl.innerHTML = "";
kamizelkawyswietl.innerHTML = "";
kaskwyswietl.innerHTML = "";
}
}
/*
function przepiszWartoscKomorek(biorcaTablica,biorcaKomorkaW,biorcaKomorkaR,dawcaTablica,dawcaKomorkaW,dawcaKomorkaR){
biorcaTablica.rows[biorcaKomorkaW].cells[biorcaKomorkaR].innerHTML = dawcaTablica.rows[dawcaKomorkaW].cells[dawcaKomorkaR].innerHTML;
}//przepiszWartosc()

function wybraneWypozyczeniaWModal(w1,w2,w3){
var tabelaZwrotuModal=document.getElementById("tabelaZwrotuModal");
var tabelaWypozyczen = document.getElementById("tabelaWypozyczen");

if(w1==true){
zmienDostep("w1","taZ1",false);
wyswietlSprzetZWypozyczeniaWModalu(1,1);
}else{
zmienDostep("w1","taZ1",true);
wyswietlSprzetZWypozyczeniaWModalu(1,0);
}

if(w2==true){
zmienDostep("w2","taZ2",false);
wyswietlSprzetZWypozyczeniaWModalu(2,1);
}else{
zmienDostep("w2","taZ2",true);
wyswietlSprzetZWypozyczeniaWModalu(2,0);
}

if(w3==true){
zmienDostep("w3","taZ3",false);
wyswietlSprzetZWypozyczeniaWModalu(3,1);
}else{
zmienDostep("w3","taZ3",true);
wyswietlSprzetZWypozyczeniaWModalu(3,0);
}
}//wybraneWypozyczeniaWModal

//*****MODAL***
function zwrotModal(){
var table = tabelaWypozyczen
var modal = document.getElementById("modalZwrot");

wybraneWypozyczeniaWModal(checkBox[1].checked,checkBox[2].checked,checkBox[3].checked);

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
} //*****MODAL***

function sprawdzFajki(className){
var x = document.getElementsByClassName(className);
return x;
}

function zwrotSprzetu(){
/*co ma sie stac po wcisnieciu "zwracam sprzet"
 + sprawdzam czy wszytskie fajki sa odznaczone
  -TAK - jezeli sa to zapisuje danr do chmury
      - zmieniam status na oczekujeNaZatwierdzenie
      - dopisuje osobe przyjmujaca
      - dopisuje uwagi
      - przy sprzecie zapisuje ze zwrocono
  -NIE - jezeli nie sa, sprawdzam czy textarea zawiera text
      - TAK - jezeli zawiera text to zapisuje do chmury
            - zmieniam status na oczekujeNaZatwierdzenie
            - dopisuje osobe przyjmujaca
            - dopisuje uwagi
            - przy sprzecie zapisuje czy zwrocono czy nie
      - NIE - jezeli nie zawiera textu to nakazuje go zapisac tzn rozpoczynam od poczatku
            * (kolejny etap) wypozyczenie jest zamykane z informacjami jak powyzej, dodatkowo
              generowane jest wypozyczenie ze sprzetem ktory nie zwrocono
*//*
var sprzetW1 = sprawdzFajki("sprzetW1");
var sprzetW2 = sprawdzFajki("sprzetW2");
var sprzetW3 = sprawdzFajki("sprzetW3");
var tabelaWypozyczen = document.getElementById("tabelaWypozyczen");
var fajkiW1 = sprawdzFajki("w1","taZ1");
var fajkiW2 = sprawdzFajki("w2","taZ2");
var fajkiW3 = sprawdzFajki("w3","taZ3");
var fajkiW1Status = [];
var fajkiW2Status = [];
var fajkiW3Status = [];

for(var i=0 ;i<fajkiW1.length;i++){
if(fajkiW1[i].disabled == false){
if (fajkiW1[i].checked==true){
fajkiW1Status[i] = "zwrocono";
}else{
fajkiW1Status[i] = "nieZwrocono";
}
}else{
fajkiW1Status[i]= "";
}
}
for(var i=0 ;i<fajkiW2.length;i++){
if(fajkiW2[i].disabled == false){
if (fajkiW2[i].checked==true){
fajkiW2Status[i] = "zwrocono";
}else{
fajkiW2Status[i] = "nieZwrocono";
}
}else{
fajkiW2Status[i]= "";
}
}
for(var i=0 ;i<fajkiW3.length;i++){
if(fajkiW3[i].disabled == false){
if (fajkiW3[i].checked==true){
fajkiW3Status[i] = "zwrocono";
}else{
fajkiW3Status[i] = "nieZwrocono";
}
}else{
fajkiW3Status[i]= "";
}
}

var modal = document.getElementById("modalZwrot");
var w1 = document.getElementById("wypozyczenie1") ;
var w1Wybor = w1.checked;
var w2 = document.getElementById("wypozyczenie2") ;
var w2Wybor = w2.checked;
var w3 = document.getElementById("wypozyczenie3") ;
var w3Wybor = w3.checked;
var wybranymagazynier = document.getElementById("in_magazynierzy").value;
if(checkBox[1].checked == true){
storeData(1,tabelaWypozyczen.rows[1].cells[1].innerHTML,fajkiW1Status,sprzetW1,wypozyczenia[1].id,"taZ1","z1_kajak","z1_wioslo","z1_fartuch","z1_kamizelka","z1_kask");
}
if(checkBox[2].checked  == true){
storeData(2,tabelaWypozyczen.rows[2].cells[1].innerHTML,fajkiW2Status,sprzetW2,wypozyczenia[2].id,"taZ2","z2_kajak","z2_wioslo","z2_fartuch","z2_kamizelka","z2_kask");
}
if(checkBox[3].checked == true){
storeData(3,tabelaWypozyczen.rows[3].cells[1].innerHTML,fajkiW3Status,sprzetW3,wypozyczenia[3].id,"taZ3","z3_kajak","z3_wioslo","z3_fartuch","z3_kamizelka","z3_kask");
}
 //if(zwracanySprzet == "nie wybrano sprzętu do zwrotu" || wybranymagazynier=="" ){
 //alert("Musisz wybrać sprzęt jaki chcesz zwrócić oraz osobe która odbiera sprzet.")
 //}else{
 modal.style.display = "none";
 alert("wniosek zwrócenia sprzetu został wysłany do zatwierdzenia do osoby, która otworzyła Ci magazyn podczas zwracania sprzętu");
    if(w1.checked==true){
    w1.checked=false;
     w1.disabled=true;

     }
        if(w2.checked==true){
        w2.checked=false;
        w2.disabled=true;
        }
                  if(w3.checked==true){
                  w3.checked=false;
                  w3.disabled=true;
                  }
//} // po zakonczeniu zapisu wylacza mozliwosc zaznaczenia wypozyczenia ktore zostalo wlasnie zakonczone
} //zapisuje dane do chmury
/*
try{
function storeData(i,dataWypozyczenia,fajkiStatus,sprzetW,IDWypozyczenia,idAT,kajak,wioslo,fartuch,kamizelka,kask) {
  var modal = document.getElementById("modalZwrot");

  var osobaPrzyjmujaca = document.getElementById("in_magazynierzy").value;
  var wybranyKajak = document.getElementById(kajak).innerHTML + "/" + fajkiStatus[0] ;
  var wybraneWioslo = document.getElementById(wioslo).innerHTML + "/" + fajkiStatus[1] ;
    var wybranyFartuch =document.getElementById(fartuch).innerHTML + "/" +  fajkiStatus[2] ;
      var wybranaKamizelka = document.getElementById(kamizelka).innerHTML + "/" + fajkiStatus[3] ;
  var wybranyKask = document.getElementById(kask).innerHTML + "/" + fajkiStatus[4] ;

  var uwagi = document.getElementById(idAT).value;
  var uwaga = wypozyczenia[i].uwagiWczytane + _NOW.short + " " + getUserName() + " - '" + uwagi + "' ";
  var koszt = _kalkulatorKosztu(wypozyczenia[i].data_wydania,_NOW.short,sprzet[i]); //document.getElementById("kosztWypozyczenia").value;
var statusZapis = "aktywne/"+ getUserName();
var NOW = firebase.firestore.Timestamp.fromDate(new Date());
var ref = "wypozyczenia/" + IDWypozyczenia;

var sciezka = db.doc(ref);
  const textToSave = wybranyKajak;
  modal.style.display = "none";

 var wstaw =  sciezka.set( {
   // data_planowanegoZwrotu : data_planowanegoOddania,
   // data_wydania : NOW,
    data_zwrotu : _NOW.short ,
    sprzet_kajak : wybranyKajak,
    sprzet_wioslo : wybraneWioslo,
    sprzet_kask : wybranyKask,
    sprzet_fartuch : wybranyFartuch,
    sprzet_kamizelka : wybranaKamizelka,
    osoba_przyjmujaca : osobaPrzyjmujaca ,
//    osoba_wydajaca : wybranyMagazynier,
//    osoba_wypozyczajaca : getUserEmail() + "-" + getUserName(),
    uwagi : uwaga,
//    kosztDzien : kosztDzien,
//    kosztPlanowany : koszt,
    kosztRzeczywisty : koszt,
    status : statusZapis
  },{merge: true});

//alert("Sprzęt został wypożyczony");
var godzinki = Number(sessionStorage.getItem('godzinki'))  + Number(wypozyczenia[1].kosztPlanowany) - Number(koszt);
sessionStorage.setItem("godzinki", godzinki);
ref = "uzytkownicy/" + getUserName();
var uzytkownikSciezka = db.doc(ref);
uzytkownikSciezka.set({

godzinki : 100//godzinki

},{merge: true});

  console.log("sajvinio");
}
}catch(error){
console.error(error);
}
*/