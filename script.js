$(document).ready(function () {
    $("#afficheNb").change(changeAffNombre);
    $("#btnAffichage").click(affichage);
    $("#btnBrasser").click(brasse);
});

function changeAffNombre(event) {

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

    for (var i=0;i< nbLigne;i++){
        //fait les lignes
        var caseDansLigne = 0;
        var idLigne = "Ligne" + idIncrementLigne++;
        var nouvelleLigne = jQuery("<tr></tr>",{id:idLigne});

        for (var j = 0;j< nbColonne;j++){
            //fait les colonnes
            var idColonne = "Colonne" + idIncrementCase++;
            var cellule = "<td> " + (idIncrementCase-1) + " </td>";//crée la case et met le chiffre
            var nouvelleColonne = jQuery(cellule,{id:idColonne});

            //console.log(dimension);
            nouvelleColonne.css({backgroundImage:adresse});
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
            var decalageGauche =  caseDansLigne *largeurCase +"px";
            console.log("decalageGauche = " + decalageGauche + " caseDansLigne = " + caseDansLigne + " largeurCase = " + largeurCase);

            //var decalageHauteur =  position.top + "px";
            var decalageHauteur =  (idIncrementLigne - 2 )*hauteurCase +"px";
            //var decalageHauteur =  ((idIncrementLigne - 2) *hauteurCase * 100)/largeur +"%";

            console.log("idIncrementLigne = " + (idIncrementLigne - 2)+ " et decalage Hauteur = " +decalageHauteur + " hauteurCase = " + hauteurCase);

            nouvelleColonne.css({"background-position-x":decalageGauche,"background-position-y":decalageHauteur});

            caseDansLigne++;
        }

        $(selecteur).append(nouvelleLigne);

    }


}

function faitTableau(event) {
}

function brasse(event) {
    
}

