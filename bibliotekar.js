document.getElementById("dugmeUnosNovogBibliotekara").addEventListener("click", pozivanjeUnosaNovogBibliotekara);
document.getElementById("unesiNovuKnjigu").addEventListener("click", pozivanjeUnosaNoveKnjige);
document.getElementById("paraLinkLog").addEventListener("click", idiNaProfilBibliotekara);
document.getElementById("idiNaPromenuSifre").addEventListener("click", idiNaPromenuSifre);
document.getElementById("dugmeZaPromenuSifreB").addEventListener("click", pozivMenjanjaSifre);
document.getElementById("dugmeLogovanjeBibliotekara").addEventListener("click", logovanjeKorisnika);
document.getElementById("izlogujSe").addEventListener("click", izlogovatiKorisnika);
document.getElementById("linkNaUnosKnjiga").addEventListener("click", idiNaUnosKnjiga);
document.getElementById("linkNaRadSaKorisnicima").addEventListener("click", idiNaRadSaKorisnicima);
document.getElementById("idiNaUnosNB").addEventListener("click", idiNaUnosNovogB);
document.getElementById("dugmePotraziKorisnikaPoImenu").addEventListener("click", pozivPretragePoImenu);

window.onload = function (e) {
    if (koJeUlogovan() != null) {
        idiNaProfilBibliotekara();
        document.getElementById("linkZaLog").style.display = "block"
    }
}
function hideDivs(divs) {
    for (var i = 0; i < divs.length; i++) {
        document.getElementById(divs[i]).style.display = 'none';
    }
}
function pozivanjeUnosaNoveKnjige() {
    pozivanjeAjaksa("GET", unosNoveKnjige, "knjige.json")
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
        }
    };
    xhttp.open(metoda, fajlSaPodacima, true);
    xhttp.send();
}

function unosNoveKnjige(x) {
    var imeKnjige = document.getElementById("imeNoveKnjige").value;
    var imePisca = document.getElementById("imePiscaNoveKnjige").value;
    var izdavacK = document.getElementById("izdavacNoveKnjige").value;
    var godinaIzdanja = document.getElementById("godinaIzdanjaNoveKnjige").value;
    var xmr = new XMLHttpRequest;
    var duzinaNiza = x.length;
    var noviIDKnjige = kreiranjeIDKnjige(duzinaNiza, imeKnjige, imePisca, izdavacK, godinaIzdanja);
    var unosZaPopularno = document.getElementById("novaKnjigaPoPularno");
    var popularno;
    if (unosZaPopularno.checked) {
        popularno = true;
    } else {
        popularno = false;
    }
    var unosZaNobela = document.getElementById("nobelovac");
    var nobelovac;
    if (unosZaNobela.checked) {
        nobelovac = true;
    } else {
        nobelovac = false;
    }
    var unosZaNovo = document.getElementById("novo");
    var knjigaNovo;
    if (unosZaNovo.checked) {
        knjigaNovo = true;
    } else {
        knjigaNovo = false;
    }
    var unosZaNagradjivano = document.getElementById("ostaleNagrade");
    var nagradjivano;
    if (unosZaNagradjivano.checked) {
        nagradjivano = true;
    } else {
        nagradjivano = false;
    }
    var radios = document.getElementsByName('zanrNoveKnjige');
    var zanrK;
    for (var i = 0, length = radios.length; i < length; i++) {
        if (radios[i].checked) {
            zanrK = radios[i].value;
            break;
        }
    }
    x[duzinaNiza] = {
        id: noviIDKnjige,
        imeKnjige: imeKnjige,
        imePisca: imePisca,
        izdavac: izdavacK,
        godinaIzdanja: godinaIzdanja,
        zanr: zanrK,
        popularno: popularno,
        nobelovac: nobelovac,
        novo: knjigaNovo,
        nagradjivano: nagradjivano
    };
    var nesto = JSON.stringify(x);
    xmr.open("POST", "biblioteka.php?q=" + nesto, true);
    xmr.send();
    document.getElementById("imeNoveKnjige").value = "";
    document.getElementById("imePiscaNoveKnjige").value = "";
    document.getElementById("izdavacNoveKnjige").value = "";
    document.getElementById("godinaIzdanjaNoveKnjige").value = "";
    document.getElementById("novaKnjigaPoPularno").value = "";
    document.getElementById("novo").checked = false;
    document.getElementById("nobelovac").checked = false;
    document.getElementById("ostaleNagrade").checked = false;
    document.getElementById("radiosf").checked = false;
    document.getElementById("radioroman").checked = false;
    document.getElementById("radiolj").checked = false;
    document.getElementById("radiois").checked = false;
    document.getElementById("radiorat").checked = false;
    document.getElementById("radioudz").checked = false;
    document.getElementById("radiopoet").checked = false;
    document.getElementById("radioost").checked = false;
}
function kreiranjeIDKnjige(duzinaNiza, imeKnjige, imePisca, izdavacK, godinaIzdanja) {
    return duzinaNiza + imeKnjige[0] + imePisca[0] + godinaIzdanja + izdavacK[0];
}
function logovanjeKorisnika() {
    pozivanjeAjaksa("GET", ulogujBibliotekara, "bibliotekari.json");
}
function ulogujBibliotekara(x) {
    var user = document.getElementById("imeBibliotekara").value;
    var pass = document.getElementById("sifraBibliotekara").value;
    for (var i = 0; i < x.length; i++) {
        if (user == x[i].userName || pass == x[i].sifra) {
            localStorage.setItem("ulogovaniBibliotekar", x[i].userName);
            document.getElementById("linkZaLog").style.display = "block"
            document.getElementById("profilBibliotekara").style.display = "block";
            hideDivs(["logovanjeBibliotekara", "divPromenaSifre", "unosBibliotekara", "zaPretragu", "unosNoveKnjige", "radSaKorisnicima"])
        } else {
            alert("pogresno korisnicko ime ili sifra");
        }
    }
}
function izlogovatiKorisnika() {
    localStorage.removeItem("ulogovaniBibliotekar");
    location.reload();
}
function koJeUlogovan() {
    var idUlogovanogKorisnika = localStorage.getItem('ulogovaniBibliotekar');
    return idUlogovanogKorisnika;
}
function pozivanjeUnosaNovogBibliotekara() {
    var imeNovogB = document.getElementById("imeNovogBibliotekara").value;
    var prezimeNovogB = document.getElementById("prezimeNovogBibliotekara").value;
    var sifraNovogB = document.getElementById("prezimeNovogBibliotekara").value;
    var korisnickoImeNB = document.getElementById("korisnickoImeNovogB").value;
    var noviBibliotekar = {
        ime: imeNovogB,
        prezime: prezimeNovogB,
        userName: korisnickoImeNB,
        sifra: sifraNovogB
    }
    var xmr = new XMLHttpRequest;
    var nesto = JSON.stringify(noviBibliotekar);
    xmr.open("POST", "bibliotekari.php?q=" + nesto, true);
    xmr.send();
}
function idiNaProfilBibliotekara() {
    pozivanjeAjaksa("GET", prikaziProfilBibliotekara, "bibliotekari.json");
}
function prikaziProfilBibliotekara(sviBibliotekari) {
    var ulogovani = koJeUlogovan();
    for (var i = 0; i < sviBibliotekari.length; i++) {
        if (sviBibliotekari[i].userName == ulogovani) {
            hideDivs(["logovanjeBibliotekara", "divPromenaSifre", "unosBibliotekara", "zaPretragu", "unosNoveKnjige", "radSaKorisnicima","divZaOdabranogKorisnika","divZaKnjigeOdabranogK"])

            document.getElementById("profilBibliotekara").style.display = "block";
            document.getElementById("imePrezime").innerHTML = sviBibliotekari[i].ime + " " + sviBibliotekari[i].prezime;
        }
    }
}
function idiNaPromenuSifre() {
    document.getElementById("divPromenaSifre").style.display = "block";
    hideDivs(["logovanjeBibliotekara", "profilBibliotekara", "unosBibliotekara", "zaPretragu", "unosNoveKnjige", "radSaKorisnicima"])

}
function pozivMenjanjaSifre() {
    pozivanjeAjaksa("POST", promenaSifre, "bibliotekari.json");
}
function promenaSifre(bibliotekari) {
    var ulogovaniBibliotekar = koJeUlogovan();  
    var staraSifra = document.getElementById("staraSifraBibliotekara").value;
    var novaSifra = document.getElementById("novaSifraBibliotekara").value;
    var novaSifraPotvrda = document.getElementById("potvrdaNoveSifreBibliotekara").value;
    for (var i = 0; i < bibliotekari.length; i++) {alert("poklapa se")
        if (bibliotekari[i].userName == ulogovaniBibliotekar) {
            if (staraSifra != bibliotekari[i].sifra) {
              alert("pogresna sifra");
            } else if (novaSifra == novaSifraPotvrda) {
                bibliotekari[i].sifra = novaSifra;
                var xmr = new XMLHttpRequest;
                var nesto = JSON.stringify(bibliotekari);
                xmr.open("POST", "bibliotekari.php?q=" + nesto, true);
                xmr.send();
            } else {
                alert("sifre se ne poklapaju")
            }
        }
    }
}
function idiNaUnosKnjiga() {
    document.getElementById("unosNoveKnjige").style.display = "block";
    hideDivs(["logovanjeBibliotekara", "profilBibliotekara", "unosBibliotekara", "zaPretragu", "divPromenaSifre", "radSaKorisnicima"])
}
function idiNaRadSaKorisnicima() {
    document.getElementById("radSaKorisnicima").style.display = "block";
    hideDivs(["logovanjeBibliotekara", "profilBibliotekara", "unosBibliotekara", "zaPretragu", "divPromenaSifre", "unosNoveKnjige"])
}
function idiNaUnosNovogB() {
    var ulogovan = koJeUlogovan();
    if (ulogovan == "admin") {
        document.getElementById("unosBibliotekara").style.display = "block";
        hideDivs(["logovanjeBibliotekara", "profilBibliotekara", "radSaKorisnicima", "zaPretragu", "divPromenaSifre", "unosNoveKnjige"])
    } else {
        alert("Ova opcija je rezervisana za administratora");
    }
}
function pozivPretragePoImenu() {
    pozivanjeAjaksa("POST", pretragaKorisnikaPoImenu, "korisnici.json");
}
function pretragaKorisnikaPoImenu(sviKorisnici) {
    var trazeniKor = document.getElementById("potraziKorisnikaPoImenu").value;
    document.getElementById("divZaPrikazPretrageKorisnika").innerHTML = ""
    for (var i = 0; i < sviKorisnici.length; i++) {
        if (sviKorisnici[i].ime == trazeniKor || sviKorisnici[i].prezime == trazeniKor || sviKorisnici[i].ime + " " + sviKorisnici[i].prezime == trazeniKor || sviKorisnici[i].id == trazeniKor) {
            var divTrazenogKorisnika = document.createElement("div");
            divTrazenogKorisnika.setAttribute("class", "divTrazenogKorisnik")
            var imeTrazenogKorisnika = document.createElement("p");
            imeTrazenogKorisnika.innerHTML = sviKorisnici[i].ime + " " + sviKorisnici[i].prezime;
            var telefonTrazenogK = document.createElement("p");
            telefonTrazenogK.innerHTML = "Telefon korisnika:" + sviKorisnici[i].telefon;
            var emailTrazenogK = document.createElement("p");
            emailTrazenogK.innerHTML = "Email korisnika:" + sviKorisnici[i].email;
            var jmbg = document.createElement("p");
            jmbg.innerHTML = "JMBG korisnika:" + sviKorisnici[i].jmbg;
            var idTrazenogK = document.createElement("p");
            idTrazenogK.innerHTML = "ID korisnika:" + sviKorisnici[i].id;
            var korisnikJePotvrdjen = document.createElement("p");
            korisnikJePotvrdjen.innerHTML = "Korisnik je uclanjen:" + sviKorisnici[i].potvrdjeno;
            var clanarinaJeDo = document.createElement("p");
            clanarinaJeDo.innerHTML = "Clanarina do:" + sviKorisnici[i].clanarinaDo;
            divTrazenogKorisnika.appendChild(imeTrazenogKorisnika);
            divTrazenogKorisnika.appendChild(telefonTrazenogK);
            divTrazenogKorisnika.appendChild(emailTrazenogK);
            divTrazenogKorisnika.appendChild(jmbg);
            divTrazenogKorisnika.appendChild(idTrazenogK);
            divTrazenogKorisnika.appendChild(korisnikJePotvrdjen);
            divTrazenogKorisnika.appendChild(clanarinaJeDo);
            divTrazenogKorisnika.setAttribute("onclick", "prikaziKrupnoKorisnika('" + sviKorisnici[i].id + "');")
            document.getElementById("divZaPrikazPretrageKorisnika").appendChild(divTrazenogKorisnika);
        }
    }
}

function uclaniKorisnika(idTrazenogKor) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var podaci = xhttp.responseText;
            var datum = new Date();
            datum.setFullYear(datum.getFullYear() + 1);
            var sviKorisnici = JSON.parse(podaci);
            for (var i = 0; i < sviKorisnici.length; i++) {
                if (sviKorisnici[i].id == idTrazenogKor) {
                    sviKorisnici[i].potvrdjeno = true;
                    sviKorisnici[i].clanarinaDo = datum;
                    proslediNovePodatkeOK(sviKorisnici);
                    prikaziKrupnoKorisnika(idTrazenogKor)
                }
            }
        }
    };
    xhttp.open("POST", "korisnici.json", true);
    xhttp.send();
}
function proslediNovePodatkeOK(sviKorisnici) {
    var xmr = new XMLHttpRequest;
    var nesto = JSON.stringify(sviKorisnici);
    xmr.open("POST", "korisnici.php?q=" + nesto, true);
    xmr.send();
}
function prikaziKrupnoKorisnika(x) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var podaci = xhttp.responseText;
            var sviKorisnici = JSON.parse(podaci);
            for (var i = 0; i < sviKorisnici.length; i++) {
                if (sviKorisnici[i].id == x) {
                    var odabraniK = document.getElementById("divZaOdabranogKorisnika")
                    odabraniK.style.display = "block";
                    odabraniK.innerHTML = ""
                    hideDivs(["unosBibliotekara", "logovanjeBibliotekara", "profilBibliotekara", "radSaKorisnicima", "zaPretragu", "divPromenaSifre", "unosNoveKnjige"]);
                    var imeTrazenogKorisnika = document.createElement("p");
                    imeTrazenogKorisnika.innerHTML = sviKorisnici[i].ime + " " + sviKorisnici[i].prezime;
                    var telefonTrazenogK = document.createElement("p");
                    telefonTrazenogK.innerHTML = "Telefon korisnika:" + sviKorisnici[i].telefon;
                    var emailTrazenogK = document.createElement("p");
                    emailTrazenogK.innerHTML = "Email korisnika:" + sviKorisnici[i].email;
                    var jmbg = document.createElement("p");
                    jmbg.innerHTML = "JMBG korisnika:" + sviKorisnici[i].jmbg;
                    var idTrazenogK = document.createElement("p");
                    idTrazenogK.innerHTML = "ID korisnika:" + sviKorisnici[i].id;
                    var korisnikJePotvrdjen = document.createElement("p");
                    korisnikJePotvrdjen.innerHTML = "Korisnik je uclanjen:" + sviKorisnici[i].potvrdjeno;
                    var clanarinaJeDo = document.createElement("p");
                    clanarinaJeDo.innerHTML = "Clanarina do:" + sviKorisnici[i].clanarinaDo;
                    if (sviKorisnici[i].potvrdjeno == false) {
                        var dugmeZaPotvrdu = document.createElement("button");
                        dugmeZaPotvrdu.innerHTML = "Uclani korisnika";
                        korisnikJePotvrdjen.appendChild(dugmeZaPotvrdu);
                        dugmeZaPotvrdu.setAttribute("onclick", "uclaniKorisnika('" + sviKorisnici[i].id + "');");
                    }
                    var dugmeZaUzeteK = document.createElement("button");
                    var dugmeRezervisaneK = document.createElement("button");
                    var dugmeZaVraceneK = document.createElement("button");
                    var dugmici = document.createElement("div");
                    dugmeZaUzeteK.innerHTML = "Uzete knjige";
                    if (sviKorisnici[i].podaciOKnjigama.uzeteKnjige.length == 0) {
                        sviKorisnici[i].podaciOKnjigama.uzeteKnjige = 0;
                    }
                    var uzeteZaProslediti = "";
                    if (sviKorisnici[i].podaciOKnjigama.uzeteKnjige == 0) {
                        uzeteZaProslediti = 0;
                    } else {
                        uzeteZaProslediti = sviKorisnici[i].id + "," + sviKorisnici[i].podaciOKnjigama.uzeteKnjige;
                    }
                    dugmeZaUzeteK.setAttribute("onclick", "prikazUzetihKnjiga('" + uzeteZaProslediti + "');");
                    dugmeRezervisaneK.innerHTML = "Rezervisane knjige";
                    if (sviKorisnici[i].podaciOKnjigama.rezervisaneKnjige.length == 0) {
                        sviKorisnici[i].podaciOKnjigama.rezervisaneKnjige = 0;
                    }
                    var rezervisaneZaProslediti = "";
                    if (sviKorisnici[i].podaciOKnjigama.rezervisaneKnjige == 0) {
                        rezervisaneZaProslediti = 0;
                    } else {
                        rezervisaneZaProslediti = sviKorisnici[i].id + "," + sviKorisnici[i].podaciOKnjigama.rezervisaneKnjige;
                    }
                    dugmeRezervisaneK.setAttribute("onclick", "prikazRezervisanihKnjiga('" + rezervisaneZaProslediti + "');");
                    dugmeZaVraceneK.innerHTML = "Vracene knjige"
                    if (sviKorisnici[i].podaciOKnjigama.vraceneKnjige.length == 0) {
                        sviKorisnici[i].podaciOKnjigama.vraceneKnjige = 0;
                    }
                    dugmeZaVraceneK.setAttribute("onclick", "prikazVracenihKnjiga('" + sviKorisnici[i].podaciOKnjigama.vraceneKnjige + "');");
                    odabraniK.appendChild(imeTrazenogKorisnika);
                    odabraniK.appendChild(telefonTrazenogK);
                    odabraniK.appendChild(emailTrazenogK);
                    odabraniK.appendChild(jmbg);
                    odabraniK.appendChild(idTrazenogK);
                    odabraniK.appendChild(korisnikJePotvrdjen);
                    odabraniK.appendChild(clanarinaJeDo);
                    dugmici.appendChild(dugmeZaUzeteK);
                    dugmici.appendChild(dugmeRezervisaneK);
                    dugmici.appendChild(dugmeZaVraceneK);
                    odabraniK.appendChild(dugmici);
                }
            }
        }
    };
    xhttp.open("POST", "korisnici.json", true);
    xhttp.send();
}
function prikazRezervisanihKnjiga(x) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var podaci = xhttp.responseText;
            var divZaKnjO=document.getElementById("divZaKnjigeOdabranogK")
            divZaKnjO.style.display="block";
            divZaKnjO.innerHTML = "<h3>Rezervisane</h3>";
            if (podaci != "") {
                var sveKnjige = JSON.parse(podaci);
            } else {
                sveKnjige = []
            }
            if (x == 0) {
                divZaKnjO.innerHTML = "<p class='posebanPar'>Nema rezervisanih knjiga</p>"
            } else {
                var rezervisaneKnjige = x.split(",");
                for (var i = 1; i <= rezervisaneKnjige.length; i++) {
                    for (var j = 0; j < sveKnjige.length; j++) {
                        if (rezervisaneKnjige[i] == sveKnjige[j].id) {
                            var noviDivKnjige = document.createElement("div");
                            noviDivKnjige.setAttribute("class", "odabranaKnjigaKorisnika");
                            var imeKnjigeDiva = document.createElement("div");
                            imeKnjigeDiva.innerHTML = sveKnjige[j].imeKnjige;
                            var pisacKnjigeDiva = document.createElement("div");
                            pisacKnjigeDiva.innerHTML = "Ime pisca:" + sveKnjige[j].imePisca;
                            var idKnjigeDiva = document.createElement("div");
                            idKnjigeDiva.innerHTML = "ID knjige:" + sveKnjige[j].id;
                            var zanrKnjigeDiva = document.createElement("div");
                            zanrKnjigeDiva.innerHTML = "Zanr:" + sveKnjige[j].zanr;
                            var podatakZaProslediti = "";
                            podatakZaProslediti = rezervisaneKnjige[0] + "," + sveKnjige[j].id;
                            var dugmeZaZaduzenje = document.createElement("button");
                            dugmeZaZaduzenje.innerHTML = "Zaduziti";
                            dugmeZaZaduzenje.setAttribute("onclick", "zaduzitiKorisnikaKnjigom('" + podatakZaProslediti + "');");
                            var dugmeZaPonistavanje = document.createElement("button");
                            dugmeZaPonistavanje.innerHTML = "Ponistiti";
                            dugmeZaPonistavanje.setAttribute("onclick", "ponistitiRezervaciju('" + podatakZaProslediti + "');");
                            noviDivKnjige.appendChild(imeKnjigeDiva);
                            noviDivKnjige.appendChild(pisacKnjigeDiva);
                            noviDivKnjige.appendChild(idKnjigeDiva);
                            noviDivKnjige.appendChild(zanrKnjigeDiva);
                            noviDivKnjige.appendChild(dugmeZaZaduzenje);
                            noviDivKnjige.appendChild(dugmeZaPonistavanje);
                            divZaKnjO.appendChild(noviDivKnjige);
                        }
                    }
                }
            }
        }
    };
    xhttp.open("POST", "knjige.json", true);
    xhttp.send();
}
function prikazUzetihKnjiga(x) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var podaci = xhttp.responseText;
            var divZaKnjO=document.getElementById("divZaKnjigeOdabranogK")
            divZaKnjO.innerHTML = "";
            divZaKnjO.style.display="block";
            if (podaci != "") {
                var sveKnjige = JSON.parse(podaci);
            } else {
                sveKnjige = []
            }
            if (x == 0) {
                divZaKnjO.innerHTML = "<p class='posebanPar'>Nema uzetih Knjiga</p>"
            } else {
                var uzeteKnjige = x.split(",");
                for (var i = 1; i <= uzeteKnjige.length; i++) {
                    for (var j = 0; j < sveKnjige.length; j++) {
                        if (uzeteKnjige[i] == sveKnjige[j].id) {
                            var noviDivKnjige = document.createElement("div");
                            noviDivKnjige.setAttribute("class", "odabranaKnjigaKorisnika");
                            var imeKnjigeDiva = document.createElement("div");
                            imeKnjigeDiva.innerHTML = sveKnjige[j].imeKnjige;
                            var pisacKnjigeDiva = document.createElement("div");
                            pisacKnjigeDiva.innerHTML = "Ime pisca:" + sveKnjige[j].imePisca;
                            var idKnjigeDiva = document.createElement("div");
                            idKnjigeDiva.innerHTML = "ID knjige:" + sveKnjige[j].id;
                            var zanrKnjigeDiva = document.createElement("div");
                            zanrKnjigeDiva.innerHTML = "Zanr:" + sveKnjige[j].zanr;
                            var dugmeVratitiKnjigu = document.createElement("button");
                            var podatakZaProslediti = "";
                            podatakZaProslediti = uzeteKnjige[0] + "," + sveKnjige[j].id;
                            dugmeVratitiKnjigu.innerHTML = "Vracena knjiga";
                            dugmeVratitiKnjigu.setAttribute("onclick", "vracanjeKnjige('" + podatakZaProslediti + "');");
                            noviDivKnjige.appendChild(imeKnjigeDiva);
                            noviDivKnjige.appendChild(pisacKnjigeDiva);
                            noviDivKnjige.appendChild(idKnjigeDiva);
                            noviDivKnjige.appendChild(zanrKnjigeDiva);
                            noviDivKnjige.appendChild(dugmeVratitiKnjigu);
                            divZaKnjO.appendChild(noviDivKnjige);
                        }
                    }
                }
            }
        }
    };
    xhttp.open("POST", "knjige.json", true);
    xhttp.send();
}
function prikazVracenihKnjiga(x) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var podaci = xhttp.responseText;
            var divZaKnjO=document.getElementById("divZaKnjigeOdabranogK");
            divZaKnjO.innerHTML = "";
            divZaKnjO.style.display="block";
            if (podaci != "") {
                var sveKnjige = JSON.parse(podaci);
            } else {
                sveKnjige = []
            }
            if (x == 0) {
                divZaKnjO.innerHTML = "<p class='posebanPar'>Nema vracenih Knjiga</p>"
            } else {
                var vraceneKnjige = x.split(",");
                for (var i = 0; i < vraceneKnjige.length; i++) {
                    for (var j = 0; j < vraceneKnjige.length; j++) {
                        if (vraceneKnjige[i] == sveKnjige[j].id) {
                            var noviDivKnjige = document.createElement("div");
                            noviDivKnjige.setAttribute("class", "odabranaKnjigaKorisnika");
                            var imeKnjigeDiva = document.createElement("div");
                            imeKnjigeDiva.innerHTML = sveKnjige[j].imeKnjige;
                            var pisacKnjigeDiva = document.createElement("div");
                            pisacKnjigeDiva.innerHTML = "Ime pisca:" + sveKnjige[j].imePisca;
                            var idKnjigeDiva = document.createElement("div");
                            idKnjigeDiva.innerHTML = "ID knjige:" + sveKnjige[j].id;
                            var zanrKnjigeDiva = document.createElement("div");
                            zanrKnjigeDiva.innerHTML = "Zanr:" + sveKnjige[j].zanr;
                            noviDivKnjige.appendChild(imeKnjigeDiva);
                            noviDivKnjige.appendChild(pisacKnjigeDiva);
                            noviDivKnjige.appendChild(idKnjigeDiva);
                            noviDivKnjige.appendChild(zanrKnjigeDiva);
                            divZaKnjO.appendChild(noviDivKnjige);
                        }
                    }
                }
            }
        }
    };
    xhttp.open("POST", "knjige.json", true);
    xhttp.send();
}
function zaduzitiKorisnikaKnjigom(prosledjeniPodaci) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var podaci = xhttp.responseText;
            var sviKorisnici = JSON.parse(podaci);
            var podeljeno = prosledjeniPodaci.split(",");
            trazeniKID = podeljeno[0];
            idKnjige = podeljeno[1];
            for (var i = 0; i < sviKorisnici.length; i++) {
                if (sviKorisnici[i].id == trazeniKID) {
                    if (sviKorisnici[i].podaciOKnjigama.uzeteKnjige == 0) {
                        sviKorisnici[i].podaciOKnjigama.uzeteKnjige = [];
                    }
                    sviKorisnici[i].podaciOKnjigama.uzeteKnjige.push(idKnjige);
                    for (var j = 0; j < sviKorisnici[i].podaciOKnjigama.rezervisaneKnjige.length; j++) {
                        if (idKnjige == sviKorisnici[i].podaciOKnjigama.rezervisaneKnjige[j]) {
                            sviKorisnici[i].podaciOKnjigama.rezervisaneKnjige.splice(j, 1);
                            proslediNovePodatkeOK(sviKorisnici);
                            zaProslediti = "";
                            zaProslediti += sviKorisnici[i].id + "," + sviKorisnici[i].podaciOKnjigama.rezervisaneKnjige;
                            prikazRezervisanihKnjiga(zaProslediti)
                        }
                    }
                }
            }
        }
    };
    xhttp.open("POSt", "korisnici.json", true);
    xhttp.send();
}
function ponistitiRezervaciju(prosledjeniPodaci) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var podaci = xhttp.responseText;
            var sviKorisnici = JSON.parse(podaci);
            var podeljeno = prosledjeniPodaci.split(",");
            trazeniKID = podeljeno[0];
            idKnjige = podeljeno[1];
            for (var i = 0; i < sviKorisnici.length; i++) {
                if (sviKorisnici[i].id == trazeniKID) {
                    for (var j = 0; j < sviKorisnici[i].podaciOKnjigama.rezervisaneKnjige.length; j++) {
                        if (idKnjige == sviKorisnici[i].podaciOKnjigama.rezervisaneKnjige[j]) {
                            sviKorisnici[i].podaciOKnjigama.rezervisaneKnjige.splice(j, 1);
                            proslediNovePodatkeOK(sviKorisnici);
                            zaProslediti = "";
                            zaProslediti += sviKorisnici[i].id + "," + sviKorisnici[i].podaciOKnjigama.rezervisaneKnjige;
                            promenitiPodatakOKnjizi(idKnjige)
                            prikazRezervisanihKnjiga(zaProslediti)
                        }
                    }

                }
            }
        }
    };
    xhttp.open("POSt", "korisnici.json", true);
    xhttp.send();
}
function vracanjeKnjige(x) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var podaci = xhttp.responseText;
            var sviKorisnici = JSON.parse(podaci);
            var podeljeno = x.split(",");
            trazeniKID = podeljeno[0];
            idKnjige = podeljeno[1];
            for (var i = 0; i < sviKorisnici.length; i++) {
                if (sviKorisnici[i].id == trazeniKID) {
                    for (var j = 0; j < sviKorisnici[i].podaciOKnjigama.uzeteKnjige.length; j++) {
                        if (idKnjige == sviKorisnici[i].podaciOKnjigama.uzeteKnjige[j]) {
                            sviKorisnici[i].podaciOKnjigama.uzeteKnjige.splice(j, 1);
                            sviKorisnici[i].podaciOKnjigama.vraceneKnjige.push(idKnjige);
                            if (sviKorisnici[i].podaciOKnjigama.uzeteKnjige.length == 0) {
                                sviKorisnici[i].podaciOKnjigama.uzeteKnjige = 0;
                            }

                            var uzeteZaProslediti = "";
                            if (sviKorisnici[i].podaciOKnjigama.uzeteKnjige == 0) {
                                uzeteZaProslediti = 0;
                            } else {
                                uzeteZaProslediti = sviKorisnici[i].id + "," + sviKorisnici[i].podaciOKnjigama.uzeteKnjige;
                            }
                            proslediNovePodatkeOK(sviKorisnici);
                            promenitiPodatakOKnjizi(idKnjige)
                            prikazUzetihKnjiga(uzeteZaProslediti)

                        }
                    }
                }
            }
        }
    };
    xhttp.open("POSt", "korisnici.json", true);
    xhttp.send();
}
function promenitiPodatakOKnjizi(idKnjige) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var podaci = xhttp.responseText;
            if (podaci != "") {
                var sveKnjige = JSON.parse(podaci);
            } else {
                sveKnjige = []
            }
            for (var i = 0; i < sveKnjige.length; i++) {
                if (sveKnjige[i] == idKnjige) {
                    sveKnjige[i].rezervisana = false;
                    proslediNovePodatkeOKnjigama(sveKnjige);
                }
            }
        }
    };
    xhttp.open("POST", "knjige.json", true);
    xhttp.send();
}
function proslediNovePodatkeOKnjigama(sveKnjige) {
    var xmr = new XMLHttpRequest;
    var nesto = JSON.stringify(sveKnjige);
    xmr.open("POST", "knjige.php?q=" + nesto, true);
    xmr.send();
}
const url = 'process.php'
const form = document.querySelector('form')




