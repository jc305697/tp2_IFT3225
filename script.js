$(document).ready(function () {
    $("#afficheNb").change(changeAffNombre);
    $("#btnAffichage").click(affichage);
    $("#btnBrasser").click(brasse);
    $(document).keydown(mouvementClavier);
});

function mouvementClavier(event) {
    switch (String.fromCharCode(event.charCode)) {
        case "ArrowLeft":
            break;
        case "ArrowRight":
            break;
        case "ArrowUp":
            break;
        case "ArrowDown":
            break;
    }
}

function mouvmentClick(event) {
   // var this.children("span").text();
}

function changeAffNombre(event) {
    if(this.checked){
        $("td span").show();
    }

    else{
        $("td span").hide();
    }
}

function affichage(event) {
    var image = new Image();
    image.src = $("#urlImage").val();


  //  alert("debut tableau");
    var idIncrementCase = 1;
    var idIncrementLigne = 1;
    var selecteur = "#debutTbody";
    $(selecteur).empty();
    //https://stackoverflow.com/questions/623172/how-to-get-image-size-height-width-using-javascript

    var adresse = "url(" + image.src+ ")";
    var hauteur = image.height;
    var largeur = image.width;
    console.log("largeur = " + largeur + " hauteur = "+ hauteur);


    var nbLigne = $("#nbLigne").val();
    var nbColonne = $("#nbColonne").val();
    var largeurCase = largeur/nbColonne;
    var hauteurCase = hauteur/nbLigne;
    var caseDansColonne = 0;

    for (var i=0;i< nbLigne;i++){
        //fait les lignes
        var caseDansLigne = 0;
        var idLigne = "Ligne" + idIncrementLigne++;
        var nouvelleLigne = jQuery("<tr></tr>",{id:idLigne});

        for (var j = 0;j< nbColonne;j++){
            //fait les colonnes
            var idColonne = "Colonne" + idIncrementCase++;
            var cellule = "<td> " + "<span>"  + (idIncrementCase-1) + "</span>"+" </td>";//crée la case et met le chiffre
            var nouvelleColonne = jQuery(cellule,{id:idColonne});

            //console.log(dimension);
            //nouvelleColonne.css({backgroundImage:adresse});
            if ( i != (nbLigne -1) || j != (nbColonne -1) ){
                nouvelleColonne.css({"background-image":adresse});
            }
            else {
                nouvelleColonne.css({"background-color":"#808080"});
            }

            if (hauteur == 0|| largeur == 0){
                alert("hauteur = "+ hauteur +" largeur = " + largeur);
            }

            while(hauteur == 0|| largeur == 0){
                hauteur = image.height;
                largeur = image.width;
                console.log("nouvelle largeur = " + largeur + " nouvelle hauteur = "+ hauteur);

               /* setTimeout(function () {
                },700);*/
            }
            largeurCase = largeur/nbColonne;
            hauteurCase = hauteur/nbLigne;
            var dimension = largeurCase + " "+ hauteurCase;

            nouvelleColonne.css({width:largeurCase, height:hauteurCase,"background-size":dimension});
            nouvelleLigne.append(nouvelleColonne);
            var position = nouvelleColonne.position();
            //var decalageGauche =   position.left +"px";
            //var decalageGauche =  (caseDansLigne % nbColonne ) *largeurCase +"px";
            var decalageGauche =  caseDansLigne * largeurCase +"px";
            console.log("decalageGauche = " + decalageGauche + " caseDansLigne = " + caseDansLigne + " largeurCase = " + largeurCase);

            //var decalageHauteur =  position.top + "px";
            var decalageHauteur =  caseDansColonne * hauteurCase +"px";
            //var decalageHauteur =  ((idIncrementLigne - 2) *hauteurCase * 100)/largeur +"%";

            console.log("idIncrementLigne = " + (idIncrementLigne - 2)+ " et decalage Hauteur = " +decalageHauteur + " hauteurCase = " + hauteurCase);

            nouvelleColonne.css({"background-position-x":decalageGauche,"background-position-y":decalageHauteur});

            caseDansLigne--;
        }

        $(selecteur).append(nouvelleLigne);
        caseDansColonne--;
    }
    $("td span").css({background:"rgba(255, 255, 255, 0.6)"});
    $("td").click(mouvmentClick);

}

function faitTableau(event) {
}

function brasse(event) {

    var nbLigne = $("#nbLigne").val();
    var nbColonne = $("#nbColonne").val();
    var nombreCases = nbLigne * nbColonne;

    //inverse deux tuiles au hasard autant de fois qu'il y a de tuiles en tout
    for (var k=0;k< nombreCases;k++) {

        var a = Math.floor((Math.random() * nbLigne));
        var b = Math.floor((Math.random() * nbColonne));
        var c = Math.floor((Math.random() * nbLigne));
        var d = Math.floor((Math.random() * nbColonne));

        var numeroA = jeu.rows[a].cells[b].innerHTML;
        var numeroB = jeu.rows[c].cells[d].innerHTML;
        jeu.rows[a].cells[b].innerHTML = numeroB;
        jeu.rows[c].cells[d].innerHTML = numeroA;

    }
}

