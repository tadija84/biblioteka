document.getElementById("pretragaKnjiga").addEventListener("click", prikaziKnjige);
document.getElementById("potvrdiNovogKorisnika").addEventListener("click", upisNovogKorisnika);
document.getElementById("linkLog").addEventListener("click", logLink);
document.getElementById("linkRegistracija").addEventListener("click", prikazRegStranice);
document.getElementById("idiNaMojProfil").addEventListener("click", prikazProfilaNovogKorisnika);
document.getElementById("ipakImamNalog").addEventListener("click", prikazLogStranice);
document.getElementById("ulogujMe").addEventListener("click", logovanjeKorisnika);
document.getElementById("prikaziProfil").addEventListener("click", prikazProfilaNovogKorisnika);
document.getElementById("knjigePopularno").addEventListener("click", knjigeNaNaslovnojPopularno);
document.getElementById("knjigeNobelovci").addEventListener("click", knjigeNaNaslovnojNobelovci);
document.getElementById("knjigeNovo").addEventListener("click", knjigeNaNaslovnojNovo);
document.getElementById("knjigeNagradjivano").addEventListener("click", knjigeNaNaslovnojNagradjivano);
document.getElementById("pocetnaLink").addEventListener("click", ponovnoUcitavanje);
document.getElementById("knjigeZanr").addEventListener("click", pretragaPoZanruIzbor);
document.getElementById("SFzanr").addEventListener("click", prikazKnjigaPoZanruSF);
document.getElementById("zanrRoman").addEventListener("click", prikazKnjigaPoZanruRoman);
document.getElementById("zanrLjubavni").addEventListener("click", prikazKnjigaPoZanruLjubavni);
document.getElementById("zanrIstorija").addEventListener("click", prikazKnjigaPoZanruIstorija);
document.getElementById("zanrRatni").addEventListener("click", prikazKnjigaPoZanruRatni);
document.getElementById("zanrUdzbenik").addEventListener("click", prikazKnjigaPoZanruUdzbenik);
document.getElementById("zanrPoezija").addEventListener("click", prikazKnjigaPoZanruPoezija);
document.getElementById("zanrOstalo").addEventListener("click", prikazKnjigaPoZanruOstalo);
document.getElementById("pretragaKnjiga").addEventListener("click", potragaZaKnjigom);
/*var divElementSaZanromKnjige = document.getElementsByClassName("zanrOpcija");
for (var i = 0; i < divElementSaZanromKnjige.length; i++) {
    divElementSaZanromKnjige[i].addEventListener("click", function () {
       // pozivanjeZanra(this)
       var zanr=this.getAttribute('value');
       console.log("alalala", zanr);
    });

}
function pozivanjeZanra(x){
          var zanr=x.getAttribute('value');
        console.log("alalala", zanr);
}*/




function ponovnoUcitavanje() {
    location.reload();
}
window.onload = function (e) {
    knjigeNaNaslovnoj();
}
function prikaziKnjige() {
    pozivanjeAjaksa("GET", prikazi, "podaci.json");
}
function prikazi(sveKnjige) {
    var trazenaKnjiga = document.getElementById("trazenaKnjiga").value;
    var rezultatNiz = [];
    /* for (var i = 0; i < knjige.length; i++) {
         if (knjige[i].imeKnjige == trazenaKnjiga || knjige[i].imePisca == trazenaKnjiga) {
             rezultatNiz[rezultatNiz.length] = knjige[i];
         }
     }*/
    //  console.log(sveKnjige[5])
}

function upisNovogKorisnika() {
    pozivanjeAjaksa("POST", upisivanjePodataka, "korisnici.json");
}

function upisivanjePodataka(prosledjeniKorisnici) {
    //ubaciti regex proveru
    //nije neophodna provera da li ima korisnik sa istim imenom. imamo jedinstveni id.
    var ime = document.getElementById("imeNovogKorisnika").value;
    var prezime = document.getElementById("prezimeNovogKorisnika").value;
    var telefon = document.getElementById("brojTelefonaNovogKorisnika").value;
    var email = document.getElementById("mejlNovogKorisnika").value;
    var jmbg = document.getElementById("jmbgNovogKorisnika").value;
    var sifra = document.getElementById("sifraNovogKorisnika").value;
    var idKorisnika = kreiranjeNovogID(ime, prezime, prosledjeniKorisnici);
    prosledjeniKorisnici[prosledjeniKorisnici.length] = {
        ime: ime,
        prezime: prezime,
        telefon: telefon,
        email: email,
        jmbg: jmbg,
        sifra: sifra,
        potvrdjeno: false,
        clanarinaDo: false,
        id: idKorisnika,
        podaciOKnjigama: {
            uzeteKnjige: [],
            nevraceneKnjige: [],
            vraceneKnjige: [],
            rezervisaneKnjige: []
        }
    }
    var xmr = new XMLHttpRequest;
    var nesto = JSON.stringify(prosledjeniKorisnici);
    xmr.open("POST", "korisnici.php?q=" + nesto, true);
    xmr.send();
    localStorage.setItem("ulogovaniKorisnikBiblioteke", idKorisnika);
    document.getElementById("linkLog").innerHTML = "Izloguj me"
    IDKorisnika(idKorisnika);
}
function logovanjeKorisnika() {
    pozivanjeAjaksa("GET", ulogujKorisnika, "korisnici.json");
}

function ulogujKorisnika(x) {
    var user = document.getElementById("idKorisnika").value;
    var pass = document.getElementById("sifraKorisnika").value;
    for (var i = 0; i < x.length; i++) {
        if (user == x[i].id || pass == x[i].sifra) {
            localStorage.setItem("ulogovaniKorisnikBiblioteke", x[i].id);
            console.log("ulogovan je", user);
            document.getElementById("paraLinkLog").innerHTML = "Izloguj me";
            prikazNaslovneStranice();
        } else {
            alert("pogresan korisnicki id ili sifra");
        }
    }
}
function izlogovatiKorisnika() {
    localStorage.removeItem("ulogovaniKorisnikBiblioteke");
    location.reload();
}
function koJeUlogovan() {
    var ime = localStorage.getItem('ulogovaniKorisnikBiblioteke');
    return ime;
}
function hideDivs(divs) {
    for (var i = 0; i < divs.length; i++) {
        document.getElementById(divs[i]).style.display = 'none';
    }
}
function pozivanjeAjaksa(metoda, funkcija, fajlSaPodacima) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var podaci = xhttp.responseText;
            if (podaci != "") {
                var sviKorisnici = JSON.parse(podaci);
            } else {
                sviKorisnici = []
            }
            funkcija(sviKorisnici);
            console.log(sviKorisnici);
        }
    };
    xhttp.open(metoda, fajlSaPodacima, true);
    xhttp.send();
}
function kreiranjeNovogID(ime, prezime, sviKorisnici) {
    datum = new Date();
    var dat = datum.getDate();
    var year = datum.getFullYear();
    var noviID = "";
    noviID += year + ime[0] + prezime[0] + sviKorisnici.length + dat;
    return noviID;
}
function logLink() {
    var ulogovan = koJeUlogovan();
    if (ulogovan == null) {
        prikazLogStranice();
    } else {
        izlogovatiKorisnika()
    }
}
function prikazLogStranice() {
    document.getElementById("zaLogovanje").style.display = "block";
    hideDivs(["prikazOdredjeneKnjige","zaPrikazNagradjivano","zaPrikazNovo","zaPrikazPoZanruSF","zaPrikazPoZanruRoman","zaPrikazPoZanruLjubavni","zaPrikazPoZanruIstorija","zaPrikazPoZanruRatni","zaPrikazPoZanruUdzbenik","zaPrikazPoZanruPoezija","zaPrikazPoZanruOstalo","container", "registracijaKorisnika", "podaciOKnjigamaKorisnika"]);
}
function prikazRegStranice() {
    document.getElementById("registracijaKorisnika").style.display = "block";
    hideDivs(["prikazOdredjeneKnjige","zaPrikazNagradjivano","zaPrikazNovo","zaPrikazPoZanruSF","zaPrikazPoZanruRoman","zaPrikazPoZanruLjubavni","zaPrikazPoZanruIstorija","zaPrikazPoZanruRatni","zaPrikazPoZanruUdzbenik","zaPrikazPoZanruPoezija","zaPrikazPoZanruOstalo","container", "zaLogovanje", "podaciOKnjigamaKorisnika"]);
}
function IDKorisnika(id) {
    document.getElementById("tekstIDKorisnika").innerHTML = "Cestitamo, uspesno ste se registrovali. Vas ID je" + id + "Zabelezite ovaj ID jer cete uz njegovu pomoc moci da pristupate nalogu.";
    document.getElementById("IDsifraKorisnika").style.display = "block";
    hideDivs(["prikazOdredjeneKnjige","zaPrikazNagradjivano","zaPrikazNovo","zaPrikazPoZanruSF","zaPrikazPoZanruRoman","zaPrikazPoZanruLjubavni","zaPrikazPoZanruIstorija","zaPrikazPoZanruRatni","zaPrikazPoZanruUdzbenik","zaPrikazPoZanruPoezija","zaPrikazPoZanruOstalo","container", "zaLogovanje", "podaciOKnjigamaKorisnika", "registracijaKorisnika"]);
}
function prikazProfilaNovogKorisnika() {
    var ulogovan = koJeUlogovan();
    document.getElementById("podaciOKnjigamaKorisnika").style.display = "block";
    hideDivs(["prikazOdredjeneKnjige","zaPrikazNovo","zaPrikazPoZanruSF","zaPrikazPoZanruRoman","zaPrikazPoZanruLjubavni","zaPrikazPoZanruIstorija","zaPrikazPoZanruRatni","zaPrikazPoZanruUdzbenik","zaPrikazPoZanruPoezija","zaPrikazPoZanruOstalo","container", "zaLogovanje", "IDsifraKorisnika", "registracijaKorisnika"]);
}
function prikazNaslovneStranice() {
    document.getElementById("container").style.display = "block";
    hideDivs(["prikazOdredjeneKnjige","zaPrikazNovo","zaPrikazPoZanruSF","zaPrikazPoZanruRoman","zaPrikazPoZanruLjubavni","zaPrikazPoZanruIstorija","zaPrikazPoZanruRatni","zaPrikazPoZanruUdzbenik","zaPrikazPoZanruPoezija","zaPrikazPoZanruOstalo","podaciOKnjigamaKorisnika", "zaLogovanje", "IDsifraKorisnika", "registracijaKorisnika"]);
}
function knjigeNaNaslovnoj() {
    pozivanjeAjaksa("POST", prikaziNaslovneKnjige, "knjige.json");
}
function prikaziNaslovneKnjige(sveKnjige) {
    hideDivs(["prikazOdredjeneKnjige","zaPrikazNagradjivano","zaPrikazNovo","zaPrikazPoZanruSF","zaPrikazPoZanruRoman","zaPrikazPoZanruLjubavni","zaPrikazPoZanruIstorija","zaPrikazPoZanruRatni","zaPrikazPoZanruUdzbenik","zaPrikazPoZanruPoezija","zaPrikazPoZanruOstalo","zaPrikazPopularno", "podaciOKnjigamaKorisnika", "zaLogovanje", "IDsifraKorisnika", "registracijaKorisnika"]);
    document.getElementById("zaPrikazNaslovna").style.display = "block";
    document.getElementById("zaPrikazNaslovna").innerHTML="";
    for (var i = 0; i < sveKnjige.length; i++) {
        var noviDivKnjige = document.createElement("div");
        noviDivKnjige.setAttribute("class", "knjigaNaPocetnoj");
        var imeKnjigeDiva = document.createElement("p");
        imeKnjigeDiva.innerHTML = sveKnjige[i].imeKnjige;
        var pisacKnjigeDiva = document.createElement("p");
        pisacKnjigeDiva.innerHTML = sveKnjige[i].imePisca;
        var idKnjigeDiva = document.createElement("p");
        idKnjigeDiva.innerHTML = sveKnjige[i].id;
        var zanrKnjigeDiva = document.createElement("p");
        zanrKnjigeDiva.innerHTML = sveKnjige[i].zanr;
        noviDivKnjige.appendChild(imeKnjigeDiva);
        noviDivKnjige.appendChild(pisacKnjigeDiva);
        noviDivKnjige.appendChild(idKnjigeDiva);
        noviDivKnjige.appendChild(zanrKnjigeDiva);
        document.getElementById("zaPrikazNaslovna").appendChild(noviDivKnjige);
    }
}
function knjigeNaNaslovnojPopularno() {
    pozivanjeAjaksa("POST", prikaziPopularneKnjige, "knjige.json");
}
function prikaziPopularneKnjige(sveKnjige) {
    hideDivs(["prikazOdredjeneKnjige","zaPrikazNagradjivano","zaPrikazNovo","zaPrikazPoZanruSF","zaPrikazPoZanruRoman","zaPrikazPoZanruLjubavni","zaPrikazPoZanruIstorija","zaPrikazPoZanruRatni","zaPrikazPoZanruUdzbenik","zaPrikazPoZanruPoezija","zaPrikazPoZanruOstalo","zaPrikazNaslovna", "podaciOKnjigamaKorisnika", "zaLogovanje", "IDsifraKorisnika", "registracijaKorisnika"]);
    document.getElementById("zaPrikazPopularno").style.display = "block";
    document.getElementById("zaPrikazPopularno").innerHTML="";
    for (var i = 0; i < sveKnjige.length; i++) {

        if (sveKnjige[i].popularno == true) {
            var noviDivKnjige = document.createElement("div");
            noviDivKnjige.setAttribute("class", "knjigaNaPocetnoj");
            var imeKnjigeDiva = document.createElement("p");
            imeKnjigeDiva.innerHTML = sveKnjige[i].imeKnjige;
            var pisacKnjigeDiva = document.createElement("p");
            pisacKnjigeDiva.innerHTML = sveKnjige[i].imePisca;
            var idKnjigeDiva = document.createElement("p");
            idKnjigeDiva.innerHTML = sveKnjige[i].id;
            var zanrKnjigeDiva = document.createElement("p");
            zanrKnjigeDiva.innerHTML = sveKnjige[i].zanr;
            noviDivKnjige.appendChild(imeKnjigeDiva);
            noviDivKnjige.appendChild(pisacKnjigeDiva);
            noviDivKnjige.appendChild(idKnjigeDiva);
            noviDivKnjige.appendChild(zanrKnjigeDiva);
            document.getElementById("zaPrikazPopularno").appendChild(noviDivKnjige);
        }

    }
}
function knjigeNaNaslovnojNobelovci() {
    pozivanjeAjaksa("POST", prikaziKnjigeNobelovaca, "knjige.json");
}
function prikaziKnjigeNobelovaca(sveKnjige) {
    hideDivs(["prikazOdredjeneKnjige","zaPrikazNagradjivano","zaPrikazNovo","zaPrikazPoZanruSF","zaPrikazPoZanruRoman","zaPrikazPoZanruLjubavni","zaPrikazPoZanruIstorija","zaPrikazPoZanruRatni","zaPrikazPoZanruUdzbenik","zaPrikazPoZanruPoezija","zaPrikazPoZanruOstalo","zaPrikazPopularno", "zaPrikazNaslovna", "podaciOKnjigamaKorisnika", "zaLogovanje", "IDsifraKorisnika", "registracijaKorisnika"]);
    document.getElementById("zaPrikazNobelovci").style.display = "block";
    document.getElementById("zaPrikazNobelovci").innerHTML="";
    for (var i = 0; i < sveKnjige.length; i++) {

        if (sveKnjige[i].novo == true) {

            var noviDivKnjige = document.createElement("div");
            noviDivKnjige.setAttribute("class", "knjigaNaPocetnoj");
            var imeKnjigeDiva = document.createElement("p");
            imeKnjigeDiva.innerHTML = sveKnjige[i].imeKnjige;
            var pisacKnjigeDiva = document.createElement("p");
            pisacKnjigeDiva.innerHTML = sveKnjige[i].imePisca;
            var idKnjigeDiva = document.createElement("p");
            idKnjigeDiva.innerHTML = sveKnjige[i].id;
            var zanrKnjigeDiva = document.createElement("p");
            zanrKnjigeDiva.innerHTML = sveKnjige[i].zanr;
            noviDivKnjige.appendChild(imeKnjigeDiva);
            noviDivKnjige.appendChild(pisacKnjigeDiva);
            noviDivKnjige.appendChild(idKnjigeDiva);
            noviDivKnjige.appendChild(zanrKnjigeDiva);
            document.getElementById("zaPrikazNobelovci").appendChild(noviDivKnjige);
        }

    }
}
function knjigeNaNaslovnojNovo() {
    pozivanjeAjaksa("POST", prikaziNoveKnjige, "knjige.json");
}
function prikaziNoveKnjige(sveKnjige) {
    hideDivs(["prikazOdredjeneKnjige","zaPrikazNagradjivano","zaPrikazNobelovci","zaPrikazPoZanruSF","zaPrikazPoZanruRoman","zaPrikazPoZanruLjubavni","zaPrikazPoZanruIstorija","zaPrikazPoZanruRatni","zaPrikazPoZanruUdzbenik","zaPrikazPoZanruPoezija","zaPrikazPoZanruOstalo","zaPrikazPopularno", "zaPrikazNaslovna", "podaciOKnjigamaKorisnika", "zaLogovanje", "IDsifraKorisnika", "registracijaKorisnika"]);
    document.getElementById("zaPrikazNovo").style.display = "block";
    document.getElementById("zaPrikazNovo").innerHTML="";
    for (var i = 0; i < sveKnjige.length; i++) {

        if (sveKnjige[i].novo == true) {

            var noviDivKnjige = document.createElement("div");
            noviDivKnjige.setAttribute("class", "knjigaNaPocetnoj");
            var imeKnjigeDiva = document.createElement("p");
            imeKnjigeDiva.innerHTML = sveKnjige[i].imeKnjige;
            var pisacKnjigeDiva = document.createElement("p");
            pisacKnjigeDiva.innerHTML = sveKnjige[i].imePisca;
            var idKnjigeDiva = document.createElement("p");
            idKnjigeDiva.innerHTML = sveKnjige[i].id;
            var zanrKnjigeDiva = document.createElement("p");
            zanrKnjigeDiva.innerHTML = sveKnjige[i].zanr;
            noviDivKnjige.appendChild(imeKnjigeDiva);
            noviDivKnjige.appendChild(pisacKnjigeDiva);
            noviDivKnjige.appendChild(idKnjigeDiva);
            noviDivKnjige.appendChild(zanrKnjigeDiva);
            document.getElementById("zaPrikazNovo").appendChild(noviDivKnjige);
        }

    }
}
function knjigeNaNaslovnojNagradjivano() {
    pozivanjeAjaksa("POST", prikaziNagradjeneKnjige, "knjige.json");
}
function prikaziNagradjeneKnjige(sveKnjige) {
    hideDivs(["prikazOdredjeneKnjige","zaPrikazNobelovci","zaPrikazNovo","zaPrikazPoZanruSF","zaPrikazPoZanruRoman","zaPrikazPoZanruLjubavni","zaPrikazPoZanruIstorija","zaPrikazPoZanruRatni","zaPrikazPoZanruUdzbenik","zaPrikazPoZanruPoezija","zaPrikazPoZanruOstalo","zaPrikazPopularno", "zaPrikazNaslovna", "podaciOKnjigamaKorisnika", "zaLogovanje", "IDsifraKorisnika", "registracijaKorisnika"]);
    document.getElementById("zaPrikazNagradjivano").style.display = "block";
    document.getElementById("zaPrikazNagradjivano").innerHTML="";
    for (var i = 0; i < sveKnjige.length; i++) {

        if (sveKnjige[i].nagradjivano == true) {

            var noviDivKnjige = document.createElement("div");
            noviDivKnjige.setAttribute("class", "knjigaNaPocetnoj");
            var imeKnjigeDiva = document.createElement("p");
            imeKnjigeDiva.innerHTML = sveKnjige[i].imeKnjige;
            var pisacKnjigeDiva = document.createElement("p");
            pisacKnjigeDiva.innerHTML = sveKnjige[i].imePisca;
            var idKnjigeDiva = document.createElement("p");
            idKnjigeDiva.innerHTML = sveKnjige[i].id;
            var zanrKnjigeDiva = document.createElement("p");
            zanrKnjigeDiva.innerHTML = sveKnjige[i].zanr;
            noviDivKnjige.appendChild(imeKnjigeDiva);
            noviDivKnjige.appendChild(pisacKnjigeDiva);
            noviDivKnjige.appendChild(idKnjigeDiva);
            noviDivKnjige.appendChild(zanrKnjigeDiva);
            document.getElementById("zaPrikazNagradjivano").appendChild(noviDivKnjige);
        }
    }
}
function pretragaPoZanruIzbor() {
    var glavniDiv = document.getElementById("odabirZanra");
    if (glavniDiv.style.display == "none") {
        glavniDiv.style.display = "block";
    } else {
        glavniDiv.style.display = "none";
    }
}
function prikazKnjigaPoZanruSF() {
    pozivanjeAjaksa("POST", prikaziKnjigeZanraSF, "knjige.json");
}
function prikaziKnjigeZanraSF(sveKnjige) {
    hideDivs(["prikazOdredjeneKnjige","zaPrikazNagradjivano","zaPrikazNobelovci","zaPrikazNovo","zaPrikazPoZanruRoman","zaPrikazPoZanruLjubavni","zaPrikazPoZanruIstorija","zaPrikazPoZanruRatni","zaPrikazPoZanruUdzbenik","zaPrikazPoZanruPoezija","zaPrikazPoZanruOstalo","zaPrikazPopularno", "zaPrikazNaslovna", "podaciOKnjigamaKorisnika", "zaLogovanje", "IDsifraKorisnika", "registracijaKorisnika"]);
    document.getElementById("zaPrikazPoZanruSF").style.display = "block";
    document.getElementById("zaPrikazPoZanruSF").innerHTML="";
    for (var i = 0; i < sveKnjige.length; i++) {
        if (sveKnjige[i].zanr == "naucna fantastika") {

            var noviDivKnjige = document.createElement("div");
            noviDivKnjige.setAttribute("class", "knjigaNaPocetnoj");
            var imeKnjigeDiva = document.createElement("p");
            imeKnjigeDiva.innerHTML = sveKnjige[i].imeKnjige;
            var pisacKnjigeDiva = document.createElement("p");
            pisacKnjigeDiva.innerHTML = sveKnjige[i].imePisca;
            var idKnjigeDiva = document.createElement("p");
            idKnjigeDiva.innerHTML = sveKnjige[i].id;
            var zanrKnjigeDiva = document.createElement("p");
            zanrKnjigeDiva.innerHTML = sveKnjige[i].zanr;
            noviDivKnjige.appendChild(imeKnjigeDiva);
            noviDivKnjige.appendChild(pisacKnjigeDiva);
            noviDivKnjige.appendChild(idKnjigeDiva);
            noviDivKnjige.appendChild(zanrKnjigeDiva);
            document.getElementById("zaPrikazPoZanruSF").appendChild(noviDivKnjige);
        }
    }
}
function prikazKnjigaPoZanruRoman(){
    pozivanjeAjaksa("POST", prikaziKnjigeZanraRoman, "knjige.json");
}
function prikaziKnjigeZanraRoman(sveKnjige){
    hideDivs(["prikazOdredjeneKnjige","zaPrikazPoZanruSF","zaPrikazNagradjivano","zaPrikazNobelovci","zaPrikazNovo","zaPrikazPoZanruLjubavni","zaPrikazPoZanruIstorija","zaPrikazPoZanruRatni","zaPrikazPoZanruUdzbenik","zaPrikazPoZanruPoezija","zaPrikazPoZanruOstalo","zaPrikazPopularno", "zaPrikazNaslovna", "podaciOKnjigamaKorisnika", "zaLogovanje", "IDsifraKorisnika", "registracijaKorisnika"]);
    document.getElementById("zaPrikazPoZanruRoman").style.display = "block";
    document.getElementById("zaPrikazPoZanruRoman").innerHTML="";
    for (var i = 0; i < sveKnjige.length; i++) {
        if (sveKnjige[i].zanr == "roman") {

            var noviDivKnjige = document.createElement("div");
            noviDivKnjige.setAttribute("class", "knjigaNaPocetnoj");
            var imeKnjigeDiva = document.createElement("p");
            imeKnjigeDiva.innerHTML = sveKnjige[i].imeKnjige;
            var pisacKnjigeDiva = document.createElement("p");
            pisacKnjigeDiva.innerHTML = sveKnjige[i].imePisca;
            var idKnjigeDiva = document.createElement("p");
            idKnjigeDiva.innerHTML = sveKnjige[i].id;
            var zanrKnjigeDiva = document.createElement("p");
            zanrKnjigeDiva.innerHTML = sveKnjige[i].zanr;
            noviDivKnjige.appendChild(imeKnjigeDiva);
            noviDivKnjige.appendChild(pisacKnjigeDiva);
            noviDivKnjige.appendChild(idKnjigeDiva);
            noviDivKnjige.appendChild(zanrKnjigeDiva);
            document.getElementById("zaPrikazPoZanruRoman").appendChild(noviDivKnjige);
        }
    }
}
function prikazKnjigaPoZanruLjubavni(){
    pozivanjeAjaksa("POST", prikaziKnjigeZanraLjubavni, "knjige.json");
}
function prikaziKnjigeZanraLjubavni(sveKnjige){
    hideDivs(["prikazOdredjeneKnjige","zaPrikazPoZanruSF","zaPrikazNagradjivano","zaPrikazNobelovci","zaPrikazNovo","zaPrikazPoZanruRoman","zaPrikazPoZanruIstorija","zaPrikazPoZanruRatni","zaPrikazPoZanruUdzbenik","zaPrikazPoZanruPoezija","zaPrikazPoZanruOstalo","zaPrikazPopularno", "zaPrikazNaslovna", "podaciOKnjigamaKorisnika", "zaLogovanje", "IDsifraKorisnika", "registracijaKorisnika"]);
    document.getElementById("zaPrikazPoZanruLjubavni").style.display = "block";
    document.getElementById("zaPrikazPoZanruLjubavni").innerHTML="";
    for (var i = 0; i < sveKnjige.length; i++) {
        if (sveKnjige[i].zanr == "ljubavni") {

            var noviDivKnjige = document.createElement("div");
            noviDivKnjige.setAttribute("class", "knjigaNaPocetnoj");
            var imeKnjigeDiva = document.createElement("p");
            imeKnjigeDiva.innerHTML = sveKnjige[i].imeKnjige;
            var pisacKnjigeDiva = document.createElement("p");
            pisacKnjigeDiva.innerHTML = sveKnjige[i].imePisca;
            var idKnjigeDiva = document.createElement("p");
            idKnjigeDiva.innerHTML = sveKnjige[i].id;
            var zanrKnjigeDiva = document.createElement("p");
            zanrKnjigeDiva.innerHTML = sveKnjige[i].zanr;
            noviDivKnjige.appendChild(imeKnjigeDiva);
            noviDivKnjige.appendChild(pisacKnjigeDiva);
            noviDivKnjige.appendChild(idKnjigeDiva);
            noviDivKnjige.appendChild(zanrKnjigeDiva);
            document.getElementById("zaPrikazPoZanruLjubavni").appendChild(noviDivKnjige);
        }
    }
}
function prikazKnjigaPoZanruIstorija(){
    pozivanjeAjaksa("POST", prikaziKnjigeZanraIstorija, "knjige.json");
}
function prikaziKnjigeZanraIstorija(sveKnjige){
    hideDivs(["prikazOdredjeneKnjige","zaPrikazPoZanruSF","zaPrikazNagradjivano","zaPrikazNobelovci","zaPrikazNovo","zaPrikazPoZanruRoman","zaPrikazPoZanruLjubavni","zaPrikazPoZanruRatni","zaPrikazPoZanruUdzbenik","zaPrikazPoZanruPoezija","zaPrikazPoZanruOstalo","zaPrikazPopularno", "zaPrikazNaslovna", "podaciOKnjigamaKorisnika", "zaLogovanje", "IDsifraKorisnika", "registracijaKorisnika"]);
    document.getElementById("zaPrikazPoZanruIstorija").style.display = "block";
    document.getElementById("zaPrikazPoZanruIstorija").innerHTML="";
    for (var i = 0; i < sveKnjige.length; i++) {
        if (sveKnjige[i].zanr == "istorija") {
            var noviDivKnjige = document.createElement("div");
            noviDivKnjige.setAttribute("class", "knjigaNaPocetnoj");
            var imeKnjigeDiva = document.createElement("p");
            imeKnjigeDiva.innerHTML = sveKnjige[i].imeKnjige;
            var pisacKnjigeDiva = document.createElement("p");
            pisacKnjigeDiva.innerHTML = sveKnjige[i].imePisca;
            var idKnjigeDiva = document.createElement("p");
            idKnjigeDiva.innerHTML = sveKnjige[i].id;
            var zanrKnjigeDiva = document.createElement("p");
            zanrKnjigeDiva.innerHTML = sveKnjige[i].zanr;
            noviDivKnjige.appendChild(imeKnjigeDiva);
            noviDivKnjige.appendChild(pisacKnjigeDiva);
            noviDivKnjige.appendChild(idKnjigeDiva);
            noviDivKnjige.appendChild(zanrKnjigeDiva);
            document.getElementById("zaPrikazPoZanruIstorija").appendChild(noviDivKnjige);
        }
    }
}
function prikazKnjigaPoZanruRatni(){
    pozivanjeAjaksa("POST", prikaziKnjigeZanraRatni, "knjige.json");
}
function prikaziKnjigeZanraRatni(sveKnjige){
    hideDivs(["prikazOdredjeneKnjige","zaPrikazPoZanruSF","zaPrikazNagradjivano","zaPrikazNobelovci","zaPrikazNovo","zaPrikazPoZanruRoman","zaPrikazPoZanruLjubavni","zaPrikazPoZanruIstorija","zaPrikazPoZanruUdzbenik","zaPrikazPoZanruPoezija","zaPrikazPoZanruOstalo","zaPrikazPopularno", "zaPrikazNaslovna", "podaciOKnjigamaKorisnika", "zaLogovanje", "IDsifraKorisnika", "registracijaKorisnika"]);
    document.getElementById("zaPrikazPoZanruRatni").style.display = "block";
    document.getElementById("zaPrikazPoZanruRatni").innerHTML="";
    for (var i = 0; i < sveKnjige.length; i++) {
        if (sveKnjige[i].zanr == "ratni") {
            var noviDivKnjige = document.createElement("div");
            noviDivKnjige.setAttribute("class", "knjigaNaPocetnoj");
            var imeKnjigeDiva = document.createElement("p");
            imeKnjigeDiva.innerHTML = sveKnjige[i].imeKnjige;
            var pisacKnjigeDiva = document.createElement("p");
            pisacKnjigeDiva.innerHTML = sveKnjige[i].imePisca;
            var idKnjigeDiva = document.createElement("p");
            idKnjigeDiva.innerHTML = sveKnjige[i].id;
            var zanrKnjigeDiva = document.createElement("p");
            zanrKnjigeDiva.innerHTML = sveKnjige[i].zanr;
            noviDivKnjige.appendChild(imeKnjigeDiva);
            noviDivKnjige.appendChild(pisacKnjigeDiva);
            noviDivKnjige.appendChild(idKnjigeDiva);
            noviDivKnjige.appendChild(zanrKnjigeDiva);
            document.getElementById("zaPrikazPoZanruRatni").appendChild(noviDivKnjige);
        }
    }
}
function prikazKnjigaPoZanruUdzbenik(){
    pozivanjeAjaksa("POST", prikaziKnjigeZanraUdzbenik, "knjige.json");
}
function prikaziKnjigeZanraUdzbenik(sveKnjige){
    hideDivs(["prikazOdredjeneKnjige","zaPrikazPoZanruSF","zaPrikazNagradjivano","zaPrikazNobelovci","zaPrikazNovo","zaPrikazPoZanruRoman","zaPrikazPoZanruLjubavni","zaPrikazPoZanruIstorija","zaPrikazPoZanruRatni","zaPrikazPoZanruPoezija","zaPrikazPoZanruOstalo","zaPrikazPopularno", "zaPrikazNaslovna", "podaciOKnjigamaKorisnika", "zaLogovanje", "IDsifraKorisnika", "registracijaKorisnika"]);
    document.getElementById("zaPrikazPoZanruUdzbenik").style.display = "block";
    document.getElementById("zaPrikazPoZanruUdzbenik").innerHTML="";
    for (var i = 0; i < sveKnjige.length; i++) {
        if (sveKnjige[i].zanr == "udzbenik") {
            var noviDivKnjige = document.createElement("div");
            noviDivKnjige.setAttribute("class", "knjigaNaPocetnoj");
            var imeKnjigeDiva = document.createElement("p");
            imeKnjigeDiva.innerHTML = sveKnjige[i].imeKnjige;
            var pisacKnjigeDiva = document.createElement("p");
            pisacKnjigeDiva.innerHTML = sveKnjige[i].imePisca;
            var idKnjigeDiva = document.createElement("p");
            idKnjigeDiva.innerHTML = sveKnjige[i].id;
            var zanrKnjigeDiva = document.createElement("p");
            zanrKnjigeDiva.innerHTML = sveKnjige[i].zanr;
            noviDivKnjige.appendChild(imeKnjigeDiva);
            noviDivKnjige.appendChild(pisacKnjigeDiva);
            noviDivKnjige.appendChild(idKnjigeDiva);
            noviDivKnjige.appendChild(zanrKnjigeDiva);
            document.getElementById("zaPrikazPoZanruUdzbenik").appendChild(noviDivKnjige);
        }
    }
}
function prikazKnjigaPoZanruPoezija(){
    pozivanjeAjaksa("POST", prikaziKnjigeZanraPoezija, "knjige.json");
}
function prikaziKnjigeZanraPoezija(sveKnjige){
    hideDivs(["prikazOdredjeneKnjige","zaPrikazPoZanruSF","zaPrikazNagradjivano","zaPrikazNobelovci","zaPrikazNovo","zaPrikazPoZanruRoman","zaPrikazPoZanruLjubavni","zaPrikazPoZanruIstorija","zaPrikazPoZanruRatni","zaPrikazPoZanruUdzbenik","zaPrikazPoZanruOstalo","zaPrikazPopularno", "zaPrikazNaslovna", "podaciOKnjigamaKorisnika", "zaLogovanje", "IDsifraKorisnika", "registracijaKorisnika"]);
    document.getElementById("zaPrikazPoZanruPoezija").style.display = "block";
    document.getElementById("zaPrikazPoZanruPoezija").innerHTML="";
    for (var i = 0; i < sveKnjige.length; i++) {
        if (sveKnjige[i].zanr == "poezija") {
            var noviDivKnjige = document.createElement("div");
            noviDivKnjige.setAttribute("class", "knjigaNaPocetnoj");
            var imeKnjigeDiva = document.createElement("p");
            imeKnjigeDiva.innerHTML = sveKnjige[i].imeKnjige;
            var pisacKnjigeDiva = document.createElement("p");
            pisacKnjigeDiva.innerHTML = sveKnjige[i].imePisca;
            var idKnjigeDiva = document.createElement("p");
            idKnjigeDiva.innerHTML = sveKnjige[i].id;
            var zanrKnjigeDiva = document.createElement("p");
            zanrKnjigeDiva.innerHTML = sveKnjige[i].zanr;
            noviDivKnjige.appendChild(imeKnjigeDiva);
            noviDivKnjige.appendChild(pisacKnjigeDiva);
            noviDivKnjige.appendChild(idKnjigeDiva);
            noviDivKnjige.appendChild(zanrKnjigeDiva);
            document.getElementById("zaPrikazPoZanruPoezija").appendChild(noviDivKnjige);
        }
    }
}
function prikazKnjigaPoZanruOstalo(){
    pozivanjeAjaksa("POST", prikaziKnjigeZanraPoezija, "knjige.json");
}
function prikaziKnjigeZanraOstalo(sveKnjige){
    hideDivs(["prikazOdredjeneKnjige","zaPrikazPoZanruSF","zaPrikazNagradjivano","zaPrikazNobelovci","zaPrikazNovo","zaPrikazPoZanruRoman","zaPrikazPoZanruLjubavni","zaPrikazPoZanruIstorija","zaPrikazPoZanruRatni","zaPrikazPoZanruUdzbenik","zaPrikazPoZanruPoezija","zaPrikazPopularno", "zaPrikazNaslovna", "podaciOKnjigamaKorisnika", "zaLogovanje", "IDsifraKorisnika", "registracijaKorisnika"]);
    document.getElementById("zaPrikazPoZanruOstalo").style.display = "block";
    document.getElementById("zaPrikazPoZanruOstalo").innerHTML="";
    for (var i = 0; i < sveKnjige.length; i++) {
        if (sveKnjige[i].zanr == "ostalo") {
            var noviDivKnjige = document.createElement("div");
            noviDivKnjige.setAttribute("class", "knjigaNaPocetnoj");
            var imeKnjigeDiva = document.createElement("p");
            imeKnjigeDiva.innerHTML = sveKnjige[i].imeKnjige;
            var pisacKnjigeDiva = document.createElement("p");
            pisacKnjigeDiva.innerHTML = sveKnjige[i].imePisca;
            var idKnjigeDiva = document.createElement("p");
            idKnjigeDiva.innerHTML = sveKnjige[i].id;
            var zanrKnjigeDiva = document.createElement("p");
            zanrKnjigeDiva.innerHTML = sveKnjige[i].zanr;
            noviDivKnjige.appendChild(imeKnjigeDiva);
            noviDivKnjige.appendChild(pisacKnjigeDiva);
            noviDivKnjige.appendChild(idKnjigeDiva);
            noviDivKnjige.appendChild(zanrKnjigeDiva);
            document.getElementById("zaPrikazPoZanruOstalo").appendChild(noviDivKnjige);
        }
    }
}
function potragaZaKnjigom(){
    pozivanjeAjaksa("POST", prikaziTrazenuKnjigu, "knjige.json");
}
function prikaziTrazenuKnjigu(sveKnjige){
    hideDivs(["zaPrikazPoZanruOstalo","zaPrikazPoZanruSF","zaPrikazNagradjivano","zaPrikazNobelovci","zaPrikazNovo","zaPrikazPoZanruRoman","zaPrikazPoZanruLjubavni","zaPrikazPoZanruIstorija","zaPrikazPoZanruRatni","zaPrikazPoZanruUdzbenik","zaPrikazPoZanruPoezija","zaPrikazPopularno", "zaPrikazNaslovna", "podaciOKnjigamaKorisnika", "zaLogovanje", "IDsifraKorisnika", "registracijaKorisnika"]);
    document.getElementById("prikazOdredjeneKnjige").style.display = "block";

    var knjigaKojaSeTrazi=document.getElementById("trazenaKnjiga").value;
for(var i=0; i<sveKnjige.length;i++){
    if (sveKnjige[i].imeKnjige == knjigaKojaSeTrazi ||sveKnjige[i].imePisca==knjigaKojaSeTrazi) {
        console.log(knjigaKojaSeTrazi)
        var noviDivKnjige = document.createElement("div");
        noviDivKnjige.setAttribute("class", "knjigaNaPocetnoj");
        var imeKnjigeDiva = document.createElement("p");
        imeKnjigeDiva.innerHTML = sveKnjige[i].imeKnjige;
        var pisacKnjigeDiva = document.createElement("p");
        pisacKnjigeDiva.innerHTML = sveKnjige[i].imePisca;
        var idKnjigeDiva = document.createElement("p");
        idKnjigeDiva.innerHTML = sveKnjige[i].id;
        var zanrKnjigeDiva = document.createElement("p");
        zanrKnjigeDiva.innerHTML = sveKnjige[i].zanr;
        noviDivKnjige.appendChild(imeKnjigeDiva);
        noviDivKnjige.appendChild(pisacKnjigeDiva);
        noviDivKnjige.appendChild(idKnjigeDiva);
        noviDivKnjige.appendChild(zanrKnjigeDiva);
        document.getElementById("prikazOdredjeneKnjige").appendChild(noviDivKnjige);
    }
}
}