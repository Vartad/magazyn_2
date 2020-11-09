
function zaladujStrone(){
var historiaForm = document.getElementById("historia").style.display = "none"

window.wczytaneWnioski = []
var datepicker = document.getElementsByName("dataPomagania")[0].setAttribute('max', _today);
if(isUserSignedIn() ==true ) {
}
var status = false;

return new Promise(resolve => {
wypelnij(dl_magazynierzy,in_magazynierzy,'Docs/magazynierzy.json',"magazyniera");
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {

  } else {
    // No user is signed in.
  }
}); // sprawdza czy jest zalogowany uzytkownik jezeli tak wykonuje polecenia z wewnatrz
resolve("resolved");
});

}

function wyslijWniosek(){
firebase.auth().onAuthStateChanged(function(user) {
  if (user) {
var username = getUserName()
  } else {
    // No user is signed in.
  }
    var data_wykonania = document.getElementById("dataPomagania").value;
        data_wykonania = data_wykonania.toString();
    var osoba_pomagana = document.getElementById("in_magazynierzy").value;
    var opis = document.getElementById("ta").value;
    var godzinki_wnioskowane = document.getElementById("godzinkiIleChce").value;
    var status = "rozpatrywane";
    var ref = "godzinkiWnioski/" + _NOW.long + "-" + getUserName();
    //ZAPIS
    if(data_wykonania != "" && osoba_pomagana !="" && opis !="" && godzinki_wnioskowane !=""){
    var sciezka = db.doc(ref);
    var wstaw =  sciezka.set({
    data_zlozenia : _NOW.short,
    data_wykonania : data_wykonania,
    osoba_rozpatrujaca : osoba_pomagana,
    osoba_wnioskujaca : getUserName(),
    osoba_pomocBiorca : osoba_pomagana,
    osoba_pomagajaca : getUserName(),
    opis : opis,
    godzinki_wnioskowane : godzinki_wnioskowane,
    godzinki_przyznane : "",
    status : status,
    uwagi : ""
  })
  alert("wniosek został wysłany");
  console.log("sajvinio");
  }
  else{
  alert("musisz uzepłnić wszystkie pola wniosku")
  }
})
}

function historia(){
var historiaForm = document.getElementById("historia").style.display = "block"

return new Promise(resolve => {
firebase.auth().onAuthStateChanged(function(user) {
const headerRowHistoria = document.getElementById("headerRowHistoria");
var tabela = document.getElementById("tabelaRozpatrywanychWnioskow");
var k = wczytaneWnioski.length
console.log("wczytaneWnioski.length " + wczytaneWnioski.length + " i " )
for(var i =0;i==k;i++){ //nawias
_wczytajDane("status",godzinkiWniosekConverter,resolve,wczytaneWnioski,"godzinkiWnioski","osoba_pomagajaca",getUserName(),6).then(()=>{
console.log("wczytaneWnioski[1] " + wczytaneWnioski[0] + " i " )
_wyswietlTabliceWTabeli(_GodzinkiWniosek,headerRowHistoria,wczytaneWnioski,tabela,"",
"Lp",
"data_zlozenia",
"data_wykonania",
"osoba_rozpatrujaca",
"osoba_wnioskujaca",
"opis",
"godzinki_wnioskowane",
"godzinki_przyznane",
"status",
"uwagi"
);
 resolve('resolved');
 });
  } //nawias
 });

}); //Promise

}

/*
var i =1;
 // if (user) {
const ref = db.collection("godzinkiWnioski").where("osoba_wnioskujacy","==", getUserName())// kolejne kryteria to po prostu .where()//
.get().then(function(querySelector) {
querySelector.forEach(function(doc){

console.log("i = "+ i);
var data_wykonania = doc.data().data_wykonania;
var data_zlozenia = doc.data().data_zlozenia;
var godzinki = doc.data().godzinki;
var opis = doc.data().opis;
var osoba_pomagana = doc.data().osoba_pomagana;
var osoba_wnioskujacy = doc.data().osoba_wnioskujacy;
var status = doc.data().status;

var tabela = document.getElementById("tabelaRozpatrywanychWnioskow");
var row = tabela.insertRow(i);
var cell0 = row.insertCell(0);
var cell1 = row.insertCell(1);
var cell2 = row.insertCell(2);
var cell3 = row.insertCell(3);
var cell4 = row.insertCell(4);
var cell5 = row.insertCell(5);
var cell6 = row.insertCell(6);
//var cell7 = row.insertCell(7);

cell0.innerHTML = i;
cell1.innerHTML = data_zlozenia;
cell2.innerHTML = data_wykonania;
cell3.innerHTML = osoba_pomagana;
cell4.innerHTML = opis;
cell5.innerHTML = godzinki;
cell6.innerHTML = status;
//cell7.innerHTML =

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
        function zaladuj(){
        document.getElementById("page").style.display = "none";
        document.getElementById("loading").style.display = "block";
        loading();
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


        async function loading (){

        const result = await zaladujStrone();
        console.log('loading' + result);
        if ( result == "resolved"){
        console.log("zaladowano");
        document.getElementById("page").style.display = "block";
        document.getElementById("loading").style.display = "none";
        }
        }

         var terazDzien = new Date().toISOString().split('T')[0];

        function convert(date,format){
        let current_datetime = date
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
            dzien + "-" +
            current_datetime.getHours() + ":" +
            current_datetime.getMinutes() + ":" +
            current_datetime.getSeconds();
        }

          return formatted_date;
        }
        */
        //var today = new Date().toISOString().split('T')[0];