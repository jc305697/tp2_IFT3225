$(document).ready(function () {
    $("#afficheNb").change(changeAffNombre);
    $("#btnAffichage").click(affichage);
    $("#btnBrasser").click(brasse);
});

function changeAffNombre(event) {

}

function affichage(event) {
    var idIncrementCase = 1;
    var idIncrementLigne = 1;
    var caseDansLigne = 0;
    var selecteur = "#debutTbody";
    $(selecteur).empty();
    //https://stackoverflow.com/questions/623172/how-to-get-image-size-height-width-using-javascript
    var image = new Image();
    image.src = $("#urlImage").val();
    var hauteur = image.height;
    var largeur = image.width;
    var adresse = "url(\"" + image.src + "\")";

    var nbLigne = $("#nbLigne").val();
    var nbColonne = $("#nbColonne").val();
    var largeurCase = largeur/nbColonne;
    var hauteurCase = hauteur/nbLigne;

    for (var i=0;i< nbLigne;i++){
        var idLigne = "Ligne" + idIncrementLigne++;
        var nouvelleLigne = jQuery("<tr></tr>",{id:idLigne});

        for (var j = 0;j< nbColonne;j++){
            var idColonne = "Colonne" + idIncrementCase++;
            var cellule = "<td> " + (idIncrementCase-1) + " </td>";
            var nouvelleColonne = jQuery(cellule,{id:idColonne});
            var dimension = largeurCase + " "+ hauteurCase;
            console.log(dimension);
            nouvelleColonne.css({width:largeurCase, height:hauteurCase,backgroundImage:adresse,"background-size":dimension});
            nouvelleLigne.append(nouvelleColonne);
            var position = nouvelleColonne.position();
            //var decalageGauche =   position.left +"px";
            var decalageGauche =  (caseDansLigne % nbColonne ) *largeurCase +"px";

            //var decalageHauteur =  position.top + "px";
            var decalageHauteur =  ((idIncrementLigne - 2 ) % nbLigne ) *largeurCase +"px";

            nouvelleColonne.css({"background-position-x":decalageGauche,"background-position-y":decalageHauteur});

            caseDansLigne++;
        }
        $(selecteur).append(nouvelleLigne);

    }

}

function brasse(event) {
    
}

