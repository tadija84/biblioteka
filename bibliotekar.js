
document.getElementById("unesiNovuKnjigu").addEventListener("click",pozivanjeAjaksa);
function pozivanjeAjaksa(){
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            var podaci = xhttp.responseText;
            var knjige = JSON.parse(podaci);
           unosNoveKnjige(knjige);         
        }
    };
    xhttp.open("GET", "knjige.json", true);
    xhttp.send();  
}
function unosNoveKnjige(x){
    var imeKnjige=document.getElementById("imeNoveKnjige").value;
    var idKnjige=document.getElementById("IDNoveKnjige").value;
    var imePisca=document.getElementById("imePiscaNoveKnjige").value;
    var izdavacK=document.getElementById("izdavacNoveKnjige").value;
    var godinaIzdanja=document.getElementById("godinaIzdanjaNoveKnjige").value;
    var zanrK=document.getElementById("zanrNoveKnjige").value;
    var xmr=new XMLHttpRequest;
    var duzinaNiza=x.length;
    x[duzinaNiza]={
        id: idKnjige,
        imeKnjige: imeKnjige,
        imePisca: imePisca,
        izdavac: izdavacK,
        godinaIzdanja: godinaIzdanja,
        zanr: zanrK
    };
    prikazi(x);
    var nesto=JSON.stringify(x);
    xmr.open("POST", "biblioteka.php?q="+nesto,true);
    xmr.send();  
}

function prikazi(x) {
   console.log(x);
}