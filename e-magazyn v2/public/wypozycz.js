
function zaladujStrone(){
var user = firebase.auth().currentUser;
  var datepicker = document.getElementsByName("dataOddania")[0].setAttribute('min', _today); //Finding today's date and setting min value of datepicker
//KAJAKI DATALIST
var dl_kajaki = document.getElementById('dl_kajaki');
var in_kajaki = document.getElementById('in_kajaki');
//WIOSLA DATALIST
var dl_wioslo = document.getElementById('dl_wiosla');
var in_wioslo = document.getElementById('in_wiosla');
// MAGAZYNIERZY DATALIST
var dl_magazynierzy = document.getElementById('dl_magazynierzy');
var in_magazynierzy = document.getElementById('in_magazynierzy');
//KASKI DATALIST
var dl_kaski = document.getElementById('dl_kaski');
var in_kaski = document.getElementById('in_kaski');

return new Promise(resolve => {
wypelnij(dl_kajaki,in_kajaki,'Docs/kajaki.json',"kajak");
wypelnij(dl_wioslo,in_wioslo,'Docs/wiosla.json',"wioslo");
wypelnij(dl_magazynierzy,in_magazynierzy,'Docs/magazynierzy.json','osobę');
wypelnij(dl_kaski,in_kaski,'Docs/kaski.json','kask');
wypelnij(dl_fartuchy,in_fartuchy,'Docs/fartuchy.json',"fartuch");
wypelnij(dl_kamizelki,in_kamizelki,'Docs/kamizelki.json',"kamizelkę");


firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
document.getElementById("user-name").innerHTML=firebase.auth().currentUser.displayName;
   console.log("user-name is : " + firebase.auth().currentUser.displayName);
   resolve('resolved');
  } else {
    // No user is signed in.
  }
}); //pobiera imie uzytkownika i je wyswietla na stronie



});
} // - wypelnia dropdown'y plikami JSON - wyswietla imie uzytkownika

function modal(){
var modal = document.getElementById("modal");
window.wypozyczenie = new _Wypozyczenie();
window.sprzet = new _Sprzet(
document.getElementById("in_fartuchy").value,
document.getElementById("in_kajaki").value,
document.getElementById("in_kamizelki").value,
document.getElementById("in_kaski").value,
document.getElementById("in_wiosla").value
);
wypozyczenie.osoba_wydajaca = document.getElementById("in_magazynierzy").value;
wypozyczenie.data_planowanegoZwrotu = document.getElementById("data_planowanegoOddania").value;
wypozyczenie.koszt_planowany = _kalkulatorKosztu(_NOW.short,wypozyczenie.data_planowanegoZwrotu,sprzet);
console.log("koszt planowany : "+ wypozyczenie.koszt_planowany);
document.getElementById("wybranyMagazynier").innerHTML= wypozyczenie.osoba_wydajaca;
document.getElementById("wybranyKajak").innerHTML= sprzet.kajak;
document.getElementById("wybraneWioslo").innerHTML= sprzet.wioslo;
document.getElementById("wybranyKask").innerHTML= sprzet.kask;
document.getElementById("wybranyFartuch").innerHTML= sprzet.fartuch;
document.getElementById("wybranaKamizelka").innerHTML= sprzet.kamizelka;
document.getElementById("wybranaData").innerHTML= wypozyczenie.data_planowanegoZwrotu;
document.getElementById("kosztWypozyczeniaDzien").innerHTML= wypozyczenie.koszt_planowany/_kalkulatorDni(_NOW.short,wypozyczenie.data_planowanegoZwrotu);
document.getElementById("kosztWypozyczenia").innerHTML= wypozyczenie.koszt_planowany;

if(wypozyczenie.data_planowanegoZwrotu=="" || wypozyczenie.osoba_wydajaca==""){
alert("Musisz podac datę planowanego zwrotu oraz osobe która wydała Ci sprzęt")
}else{
modal.style.display="block";
}

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

} //modal

try{
function storeData(){

    var modal = document.getElementById("modal");
    var uwagi = document.getElementById("uwagi").value;
    var uwaga = _NOW.short + " " + getUserName() + " - '" + uwagi + "' ";
    var kosztDzien = wypozyczenie.koszt_planowany/_kalkulatorDni(_NOW.short,wypozyczenie.data_planowanegoZwrotu); //document.getElementById("kosztWypozyczeniaDzien").value;
    var data_planowanegoZwrotu = wypozyczenie.data_planowanegoZwrotu;
    var kajak = sprzet.kajak;
    var wioslo = sprzet.wioslo;
    var kask = sprzet.kask;
    var fartuch = sprzet.fartuch;
    var kamizelka = sprzet.kamizelka;
    var osoba_wydajaca = wypozyczenie.osoba_wydajaca;
    var koszt_planowany = wypozyczenie.koszt_planowany;
if(sessionStorage.getItem("godzinki") - wypozyczenie.koszt_planowany >= 0){

var sciezka = db.doc("wypozyczenia/"+ getUserName() +" "+ _NOW.long);
  modal.style.display = "none";
     sciezka.set({
    data_planowanegoZwrotu : data_planowanegoZwrotu,
    data_wydania : _NOW.short,
    data_zwrotu : "" ,
    sprzet_kajak : kajak,
    sprzet_wioslo : wioslo,
    sprzet_kask : kask,
    sprzet_fartuch : fartuch,
    sprzet_kamizelka : kamizelka,
    osoba_przyjmujaca : "" ,
    osoba_wydajaca : osoba_wydajaca,
    osoba_wypozyczajaca : getUserName(),
    uwagi : uwaga,
    koszt_dzien : kosztDzien,
    koszt_planowany : koszt_planowany,
    koszt_rzeczywisty : "",
    status : "aktywne/"+ getUserName()
  })

  var aktywneWypozyczenia = Number(sessionStorage.getItem("aktywneWypozyczenia")) + 1;
      sessionStorage.setItem("aktywneWypozyczenia", aktywneWypozyczenia);
      var godzinki = Number(sessionStorage.getItem('godzinki'))  - Number(wypozyczenie.koszt_planowany) ;
    sessionStorage.setItem("godzinki", godzinki);
    ref = "uzytkownicy/" + getUserName();
      var uzytkownikSciezka = db.doc(ref);
    uzytkownikSciezka.set({

      aktywneWypozyczenia : aktywneWypozyczenia,
    godzinki : godzinki

    },{merge: true})
    .then(()=>{
    alert("Sprzęt został wypożyczony");
    location.reload();
    });
  }else{
  alert("nie możesz dokonać tego wypozyczenia, masz zbyt mało godzinek")
  }
}

}catch(error){
console.error(error);

}//        ***zapis wypozyczenia do chmury***



