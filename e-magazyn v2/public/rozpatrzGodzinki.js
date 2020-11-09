function zaladujStrone(){
console.log('pozdro')
return new Promise(resolve => {
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
window.wnioski=[];
const headerRow = document.getElementById("headerRowWnioski");
var tabela = document.getElementById("tabelaRozpatrywanychWnioskow");
_wczytajDane("data_zlozenia",godzinkiWniosekConverter,resolve,wnioski,"godzinkiWnioski","osoba_rozpatrujaca",getUserName(),99).then(()=>{
_wyswietlTabliceWTabeli(_GodzinkiWniosek,headerRow,wnioski,tabela,"",
"radio",
"data_zlozenia",
"data_wykonania",
"godzinki_wnioskowane",
"opis",
"osoba_wnioskujaca",
"osoba_pomagajaca",
"osoba_pomocBiorca",
"osoba_rozpatrujaca",
"status",
"uwagi"
)
})
resolve('resolved');
  } else {
    // No user is signed in.
  }
}); // sprawdza czy jest zalogowany uzytkownik jezeli tak wykonuje polecenia z wewnatrz
});
}

function modal(){
window.wybraneRadio = _wybraneRadio(0);
if (wybraneRadio == undefined){
alert("Nie wybrałeś wniosku");
}else{
var modal = document.getElementById("modal");
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
wypelnijFormEdycji()
}
} //modal

function wypelnijFormEdycji(){
//wypelnij(dl_osoba_pomocBiorca , in_dl,sciezka,holder )
var osoba_pomocBiorca = document.getElementById("osoba_pomocBiorca");
var godzinki_przyznane = document.getElementById("godzinki_przyznane");
//var data_wykonania = document.getElementById("data_wykonania");
var uwagi = document.getElementById("uwagi");
osoba_pomocBiorca.value = wnioski[wybraneRadio].osoba_pomocBiorca;
godzinki_przyznane.value = wnioski[wybraneRadio].godzinki_przyznane;
//data_wykonania.value = wnioski[wybraneRadio].data_wykonania;
}//wypelnijFormEdycji

function zatwierdz(){
window.wybraneRadio = _wybraneRadio(0);
if (wybraneRadio == undefined){
alert("Nie wybrałeś wniosku");
}else{

if(sessionStorage.getItem( "dostep") == "prezes"){
_zapiszDane({godzinki_przyznane : wnioski[wybraneRadio].godzinki_wnioskowane,
osoba_rozpatrujaca : "",
status : "rozpatrzone"
},
"godzinkiWnioski/"+wnioski[wybraneRadio].id);

_zapiszDane(
{godzinki : firebase.firestore.FieldValue.increment(parseInt(wnioski[wybraneRadio].godzinki_wnioskowane))},
"uzytkownicy/" + wnioski[wybraneRadio].osoba_pomagajaca);

}else{
_zapiszDane({godzinki_wnioskowane : wnioski[wybraneRadio].godzinki_wnioskowane,
osoba_rozpatrujaca : sessionStorage.gettItem("prezes")})
}
document.forms[0][wybraneRadio].disabled =true;
document.forms[0][wybraneRadio].checked =false;
alert("zatwierdzono");
}
}

function zatwierdzEdycje(){
var modal = document.getElementById("modal");
var osoba_pomocBiorca = document.getElementById("osoba_pomocBiorca").value;
var godzinki_przyznane = document.getElementById("godzinki_przyznane").value;
//var data_wykonania = document.getElementById("data_wykonania").value;
var uwagi = document.getElementById("uwagi").value;
var zmiana,zmiana2;
var edytowano = "";
if(osoba_pomocBiorca != ""){
zmiana=true;
var status = "rozpatrywane";
edytowano = " osobę rozpatrującą"}else{
}
if(godzinki_przyznane != ""){
zmiana2=true;
edytowano += " godzinki"}else{
godzinki_przyznane = wnioski[wybraneRadio].godzinki_wnioskowane
}
/*
if(data_wykonania != ""){
zmiana=true}else{
data_wykonania = wnioski[wybraneRadio].data_wykonania;
}
*/
uwagi+="/Edytowano :" + edytowano;
if(uwagi != ""){
zmiana=true;
uwagi = wnioski[wybraneRadio].uwagi + "/" + _NOW.short + " " + getUserName() + " - " + uwagi}else{
uwagi = wnioski[wybraneRadio].uwagi;
}
  if(zmiana==true || zmiana2==true){
if(osoba_pomocBiorca != sessionStorage.getItem( "prezes")){status = "rozpatrywane"}else{osoba_pomocBiorca =""}
                    if(sessionStorage.getItem( "dostep") == "prezes"){
                   _zapiszDane({godzinki_przyznane : godzinki_przyznane,
                   osoba_rozpatrujaca : osoba_pomocBiorca,
                   status : status,
                   uwagi :  uwagi
                   },
                   "godzinkiWnioski/"+wnioski[wybraneRadio].id);
                   }else{
                   _zapiszDane({godzinki_wnioskowane : wnioski[wybraneRadio].godzinki_wnioskowane,
                   osoba_rozpatrujaca : sessionStorage.gettItem("prezes"),
                   uwagi : uwagi});
                   }
                  document.forms[0][wybraneRadio].disabled =true;
                  document.forms[0][wybraneRadio].checked =false;
                  alert("zatwierdzono edytowany wniosek");
                  modal.style.display = "none"
}else{
 alert("nie wprowadzono zmian")
 }
}

function odrzuc(){
window.wybraneRadio = _wybraneRadio(0);
if (wybraneRadio == undefined){
alert("Nie wybrałeś wniosku");
}else{
var modalOdrzuc = document.getElementById("modalOdrzuc");
var modal = modalOdrzuc;
modal.style.display="block";
var span = document.getElementsByClassName("close")[1];
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
}// musi pojawic sie form z oknem do wpisania powodu odrzucenia

function zatwierdzOdrzucenie(){
console.log(wybraneRadio)
 var uwagi = document.getElementById("uwagiOdrzuc").value
 if(uwagi ==""){
 alert("Musisz podać powód aby odrzucić")
 }else{
 _zapiszDane({
 status : "odrzucono",
 uwagi : getUserName() + " " + _NOW.short + " - " + uwagi,
 osoba_rozpatrujaca : ""},
 "godzinkiWnioski/"+wnioski[wybraneRadio].id)
 }
}

