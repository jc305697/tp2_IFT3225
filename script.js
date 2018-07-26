$(document).ready(function () {
    $("#afficheNb").change(changeAffNombre);
    $("#btnAffichage").click(affichage);
    $("#btnBrasser").click(brasse);
    $(document).keydown(mouvementClavier);
});
var tableau2d;
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
    var style = document.styleSheets[0];
    console.log(style);
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
            var classe = "" + (idIncrementCase-1);
            var selectClasse = "." + classe;
            var cellule = "<td> " + "<span>"  + (idIncrementCase-1) + "</span>"+" </td>";//crée la case et met le chiffre
            var nouvelleColonne = jQuery(cellule,{id:idColonne});
            nouvelleColonne.addClass(classe);

            //console.log(dimension);
            //nouvelleColonne.css({backgroundImage:adresse});
            if ( i != (nbLigne -1) || j != (nbColonne -1) ){
               nouvelleColonne.css({"background-image":adresse});
                //var regle = "background-image:" +adresse;
                //addCSSRule(style,selectClasse,regle,0);

                //style.insertRule(selectClasse + "{" +regle+ "}");
                //style.insertRule('.1{color:blue}');
            }
            else {
                nouvelleColonne.css({"background-color":"#808080"});
                //style.insertRule(selectClasse + "{" +"background-color: #808080"+ "}");

            }

            if (hauteur == 0|| largeur == 0){
                alert("hauteur = "+ hauteur +" largeur = " + largeur);
            }

            while(hauteur == 0|| largeur == 0){
                hauteur = image.height;
                largeur = image.width;
                console.log("nouvelle largeur = " + largeur + " nouvelle hauteur = "+ hauteur);
            }
            largeurCase = largeur/nbColonne;
            hauteurCase = hauteur/nbLigne;
            var dimension = largeurCase + " "+ hauteurCase;

            nouvelleColonne.css({width:largeurCase, height:hauteurCase,"background-size":dimension});
            nouvelleLigne.append(nouvelleColonne);
            var decalageGauche =  caseDansLigne * largeurCase +"px";
            console.log("decalageGauche = " + decalageGauche + " caseDansLigne = " + caseDansLigne + " largeurCase = " + largeurCase);

            var decalageHauteur =  caseDansColonne * hauteurCase +"px";
            console.log("idIncrementLigne = " + (idIncrementLigne - 2)+ " et decalage Hauteur = " +decalageHauteur + " hauteurCase = " + hauteurCase);

            nouvelleColonne.css({"background-position-x":decalageGauche,"background-position-y":decalageHauteur});

            caseDansLigne--;
        }

        $(selecteur).append(nouvelleLigne);
        /*var selecteurLigne = "#"+ idLigne + " td";
        $(selecteurLigne).each(function () {
            var classe = this.attr("class")
            var selectClass = "."+classe;
            $(selectClass).css(this.attr)
        })*/


        caseDansColonne--;
    }
    $("td span").css({background:"rgba(255, 255, 255, 0.6)"});
    $("td").click(mouvmentClick);

}

function faitTableau(event) {
}

function actualiseTableau() {
    var nbLigne = $("#nbLigne").val();
    var nbColonne = $("#nbColonne").val();
    //var numCase = 1;
    var tabloStyle=[];
    var i = 0;
    while (i< nbLigne*nbColonne){
        tabloStyle.push("");
        i++;
    }

    for (var ligne=0;i< nbLigne;i++){

        for (var colonne=0;j<nbColonne;j++){

            var valeur = tableau2d[ligne][colonne];
            var selecteurDest = "td."+ valeur;//valeur represente ce que je veux qui soit la dans mon affichage
            //selecteur va selectionner où je veux mettre la ce qui est dans la case numero numcase
                //numCase++;
            var numCase = numCase(ligne,colonne);
            var selecteurOrigine = "td."+numCase;//selecteur2 va selectionner la classe qui contient ce que je veux mettre dans la case selectionner par selecteur
            var $caseOrigine = $(selecteurOrigine);
            var classe = "."+ numCase;
            //$caseOrigine.removeClass($case.attr("class"));
            var $caseDest = $(selecteurDest);

            tabloStyle[valeur-1] = $caseDest.attr("style");
            if (tabloStyle[numCase-1] == ""){
                $caseDest.attr("style",$caseOrigine.attr("style"));
            }
            else {
                $caseDest.attr("style",tabloStyle[numCase-1]);
            }
            //$caseOrigine.removeClass(""+numCase);
            $caseDest.addClass(""+numCase);
            $("."+numCase+"."+valeur +"span").empty();
            $("."+numCase+"."+valeur +"span").text($caseOrigine.children("span").text());
            //$caseDest.removeClass("")




            var nouvelleClasse = "" + valeur;
            //$caseOrigine.addClass(nouvelleClasse);
        }
    }
}

function numCase(ligne,colonne) {
    var nbLigne = $("#nbLigne").val();
    var nbColonne = $("#nbColonne").val();
    var accumulateur = 0;
    for (var i = 0; i<nbLigne; i++){
        for (var j = 0; j<nbColonne;j++){
            accumulateur += 1;
            if (ligne==i && colonne==j){
                return accumulateur;
            }
        }
    }
}
function brasse(event) {
    var nbLigne = $("#nbLigne").val();
    var nbColonne = $("#nbColonne").val();
    var produit = nbColonne*nbLigne;
    var tableauNombreChoisi =[];
    for (var i=0;i< produit;i++){
        //while ()
    }

    var tableau2DTempo=[];
    for (var i=0;i< nbLigne;i++){
        var tableauLigne = [];
        for (var j=0;j<nbColonne;j++){
            var nombreChoisi;
            do {
                nombreChoisi = nombreAleatoireEntier(1,produit);
            }while(tableauNombreChoisi.indexOf(nombreChoisi) != -1)

            tableauNombreChoisi.push(nombreChoisi);
            tableauLigne.push(nombreChoisi);
        }
        tableau2DTempo.push(tableauLigne);
    }
    tableau2d = tableau2DTempo;
    actualiseTableau();
    
/*
    var copieTableau = copieTableau2D(tableau2DTempo);
    var numcase = 1;
    for (var ligne = 0; ligne < nbLigne; ligne++ ){
        for (var colonne = 0 ; colonne < nbColonne; nbColonne++){
            var valeur = tableau2DTempo[ligne][colonne];
            var numeroLigne = numeroAxe(valeur,"ligne");
            var numeroColonne = numeroAxe(valeur,"colonne");
            copieTableau[numeroLigne][numeroColonne] = numcase;
            numcase++;
        }
    }
    tableau2d = copieTableau;*/
    //tableau2d[]
}

function nombreAleatoireEntier(min,max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;//https://stackoverflow.com/questions/1527803/generating-random-whole-numbers-in-javascript-in-a-specific-range
}

function addCSSRule(sheet, selector, rules, index) {//https://davidwalsh.name/add-rules-stylesheets
    if("insertRule" in sheet) {
        sheet.insertRule(selector + "{" + rules + "}", index);
    }

    /*if("addRule" in sheet) {
        sheet.addRule(selector, rules, index);
    }*/
}

/*function copieTableau2D(tableau) {
    var copieTableau=[];
    for (var i=0; i<tableau.length;i++){
        var copieLigne=[];
        for (var j = 0 ; j < tableau[i].length;j++){
            copieLigne.push(tableau[i][j]);
        }
        copieTableau.push(copieLigne);
    }
    return copieTableau;
}

function numeroAxe(nombre,axe) {
    var nbLigne = $("#nbLigne").val();
    var nbColonne = $("#nbColonne").val();
    var accumulateur = 0;
    for (var i = 0; i<nbLigne; i++){
        for (var j = 0; j<nbColonne;j++){
            accumulateur += 1;
            switch (axe) {
                case "ligne":
                    if (accumulateur==nombre){
                        return i;
                    }
                    break;
                case "colonne":
                    if (accumulateur==nombre){
                        return j;
                    }
                    break;
            }
        }
    }
}*/

