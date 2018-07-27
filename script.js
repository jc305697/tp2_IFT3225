$(document).ready(function () {
    imageDummy.src= $("#urlImage").val();
    $("#afficheNb").change(changeAffNombre);
    $("#btnAffichage").click(affichage);
    $("#btnBrasser").click(brasse);
    $(document).keydown(mouvementClavier);
    $("#urlImage").change(imageChange);
    //document.addEventListener("keydown",mouvementClavier);
});
var imageDummy = new Image();

var tableau2d;
var tableauPositionCase;
var numLigneGris;
var numColonneGris;
var nbDeplacement = 0;
function imageChange(event) {
    imageDummy.src = $("#urlImage").val();
}
function mouvementClavier(event) {
    var nbLigne = $("#nbLigne").val();
    var nbColonne = $("#nbColonne").val();
    console.log(""+String.fromCharCode(event.keyCode));
    //switch (String.fromCharCode(event.charCode)) {
    var bonnecle = false;
    switch (event.keyCode) {
//        case "ArrowLeft":
        case 37:

            console.log("fleche ver gauche");
            if (numColonneGris == 1){
                alert("déplacement impossible");
            }else{
                deplacement("gauche");
                bonnecle = true;
            }
            break;
       // case "ArrowRight":
        case 39:

            console.log("fleche ver droite");
            if (numColonneGris==nbColonne){
                alert("déplacement impossible");
            }else {
                deplacement("droite");
                bonnecle = true;
            }
            break;
        //case "ArrowUp":
        case 38:
            console.log("fleche ver haut");
            if (numLigneGris == 1){
                alert("déplacement impossible");
            }else {
                deplacement("haut");
                bonnecle = true;
            }
            break;
        //case "ArrowDown":
        case 40:
            console.log("fleche ver bas");
            if (numLigneGris == nbLigne){
                alert("déplacement impossible");
            }else {
                deplacement("bas");
                bonnecle = true;
            }
            break;
    }
    if (bonnecle){
        victoire();
    }

}

function victoire() {
    var tableauSucces =[];
    var nbLigne = $("#nbLigne").val();
    var nbColonne = $("#nbColonne").val();
    $("td").each(function (index) {
            //if (this.attr("id") == this.attr("class")){
        if (this.id == this.className){
            tableauSucces.push(true);
        }
        else {
            tableauSucces.push(false);
        }

    });
    var accummulateur = 0;
    if (tableauSucces.length == nbColonne * nbLigne){
        tableauSucces.forEach(function (item) {
            if (item == true){
                accummulateur++;
            }
        });
        if (accummulateur==tableauSucces.length){
            alert("vous avez gagné en " + nbDeplacement +"déplacements" );
        }
    }
    else {
        alert("erreur systeme tableau de mauvaise longueur");
    }
}

function deplacement(direction) {
    nbDeplacement++;
    var nbLigne = $("#nbLigne").val();
    var nbColonne = $("#nbColonne").val();
    var classeGrise = "a" + nbLigne*nbColonne;
    var selectClasseGrise = "." + classeGrise;
    var $caseGrise = $(selectClasseGrise);

    var iemeColonne = (parseInt($caseGrise.attr("id").split("a")[1],10)-1)%nbColonne;
    //if (iemeColonne==0){
     //   iemeColonne=nbColonne;
    //}
    switch (direction) {
        case "haut":
            var numeroCaseDansDest = tableauPositionCase[numLigneGris-2][iemeColonne];
            var classeDest = "a" + numeroCaseDansDest;
            var selectClasseDest = "." +classeDest;
            var $caseDest = $(selectClasseDest);

            //enleve les classes pour éviter d'avoir 2 classes sur une case
            $caseDest.removeClass();
            $caseGrise.removeClass();

            //echange les classes pour echanger les backgrounds
            $caseDest.addClass(classeGrise);
            $caseGrise.addClass(classeDest);

            //met a jour mon tableau de position
            tableauPositionCase[numLigneGris-2][iemeColonne] = nbLigne*nbColonne;
            tableauPositionCase[numLigneGris-1][numColonneGris-1]= numeroCaseDansDest;
            //met a jour le contenu des cases
            $caseGrise.children("span").empty();
            $caseGrise.children("span").text(""+numeroCaseDansDest);
            $caseDest.children("span").empty();
            $caseDest.children("span").text(""+nbLigne*nbColonne);

            miseAJourPosGris();
            break;
        case "bas":
            var numeroCaseDansDest = tableauPositionCase[numLigneGris][iemeColonne];
            //console.log("numeroCaseDansDest = " + numeroCaseDansDest);
            var classeDest = "a" + numeroCaseDansDest;
            var selectClasseDest = "." +classeDest;
            var $caseDest = $(selectClasseDest);

            //enleve les classes pour éviter d'avoir 2 classes sur une case
            $caseDest.removeClass();
            $caseGrise.removeClass();

            //echange les classes pour echanger les backgrounds
            $caseDest.addClass(classeGrise);
            $caseGrise.addClass(classeDest);

            //met a jour mon tableau de position
            tableauPositionCase[numLigneGris][iemeColonne] = nbLigne*nbColonne;
            tableauPositionCase[numLigneGris-1][numColonneGris-1]= numeroCaseDansDest;
            //met a jour le contenu des cases
            $caseGrise.children("span").empty();
            $caseGrise.children("span").text(""+numeroCaseDansDest);
            $caseDest.children("span").empty();
            $caseDest.children("span").text(""+nbLigne*nbColonne);
            miseAJourPosGris();
            break;
        case "gauche":
            var numeroCaseDansDest = tableauPositionCase[numLigneGris-1][iemeColonne-1];
            console.log("numeroCaseDansDest = " + numeroCaseDansDest);
            var classeDest = "a" + numeroCaseDansDest;
            var selectClasseDest = "." +classeDest;
            var $caseDest = $(selectClasseDest);

            //enleve les classes pour éviter d'avoir 2 classes sur une case
            $caseDest.removeClass();
            $caseGrise.removeClass();

            //echange les classes pour echanger les backgrounds
            $caseDest.addClass(classeGrise);
            $caseGrise.addClass(classeDest);

            //met a jour mon tableau de position
            tableauPositionCase[numLigneGris-1][iemeColonne-1] = nbLigne*nbColonne;
            tableauPositionCase[numLigneGris-1][numColonneGris-1]= numeroCaseDansDest;
            //met a jour le contenu des cases
            $caseGrise.children("span").empty();
            $caseGrise.children("span").text(""+numeroCaseDansDest);
            $caseDest.children("span").empty();
            $caseDest.children("span").text(""+nbLigne*nbColonne);
            miseAJourPosGris();
            break;
            break;
        case "droite":
            var numeroCaseDansDest = tableauPositionCase[numLigneGris-1][iemeColonne+1];
            //console.log("numeroCaseDansDest = " + numeroCaseDansDest);
            var classeDest = "a" + numeroCaseDansDest;
            var selectClasseDest = "." +classeDest;
            var $caseDest = $(selectClasseDest);

            //enleve les classes pour éviter d'avoir 2 classes sur une case
            $caseDest.removeClass();
            $caseGrise.removeClass();

            //echange les classes pour echanger les backgrounds
            $caseDest.addClass(classeGrise);
            $caseGrise.addClass(classeDest);

            //met a jour mon tableau de position
            tableauPositionCase[numLigneGris-1][iemeColonne+1] = nbLigne*nbColonne;
            tableauPositionCase[numLigneGris-1][numColonneGris-1]= numeroCaseDansDest;
            //met a jour le contenu des cases
            $caseGrise.children("span").empty();
            $caseGrise.children("span").text(""+numeroCaseDansDest);
            $caseDest.children("span").empty();
            $caseDest.children("span").text(""+nbLigne*nbColonne);
            miseAJourPosGris();
            break;
    }
    $("#deplacement").empty();
    $("#deplacement").text(""+nbDeplacement);
}

function mouvmentClick(event) {
   // var this.children("span").text();
    //$(this).
    var nbLigne = $("#nbLigne").val();
    var nbColonne = $("#nbColonne").val();
    var iemeColonne = parseInt($(this).attr("id").split("a")[1],10)%nbColonne;
    var mouvementValide = false;
    if (iemeColonne==0){
        iemeColonne = nbColonne;
    }
    var iemeligne  = (parseInt($(this).parent().attr("id").split("Ligne")[1],10)+1) ;
    var differenceLigne = iemeligne-numLigneGris;
    var differenceColonne = iemeColonne - numColonneGris;
    if(Math.abs(differenceColonne) > 1 || Math.abs(differenceLigne)>1){
        alert("mouvement illegal");
    }

    else {
        if ((differenceLigne == -1) && (differenceColonne == 0)){
            mouvementValide = true;
            deplacement("haut");
        }
        else if((differenceLigne == 1) && (differenceColonne == 0)){
            mouvementValide = true;
            deplacement("bas");
        }
        else if ((differenceLigne == 0 ) && (differenceColonne == 1)){
            mouvementValide = true;
            deplacement("droite");
        }
        else if ((differenceLigne == 0) && (differenceColonne == -1)){
            mouvementValide = true;
            deplacement("gauche");
        }
        else {
            alert("deplacement illegal")
        }
        if (mouvementValide){
            victoire();
        }
    }



    /*var numeroCaseDansDest = tableauPositionCase[numLigneGris-2][numColonneGris];
    var classeDest = "a" + numeroCaseDansDest;
    var selectClasseDest = "." +classeDest;
    var $caseDest = $(selectClasseDest);

    //enleve les classes pour éviter d'avoir 2 classes sur une case
    $caseDest.removeClass();
    $caseGrise.removeClass();

    //echange les classes pour echanger les backgrounds
    $caseDest.addClass(classeGrise);
    $caseGrise.addClass(classeDest);

    //met a jour mon tableau de position
    tableauPositionCase[numLigneGris-2][iemeColonne] = nbLigne*nbColonne;
    tableauPositionCase[numLigneGris-1][numColonneGris-1]= numeroCaseDansDest;
    //met a jour le contenu des cases
    $caseGrise.children("span").empty();
    $caseGrise.children("span").text(""+numeroCaseDansDest);
    $caseDest.children("span").empty();
    $caseDest.children("span").text(""+nbLigne*nbColonne);

    miseAJourPosGris();*/


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
    //var image = new Image();
    //image.src = $("#urlImage").val();
    var nbLigne = $("#nbLigne").val();
    var nbColonne = $("#nbColonne").val();

    numColonneGris = nbColonne;
    numLigneGris = nbLigne;
    var numeroCase = 1;
    var tableauCase = [];
    for (var ligne = 0; ligne<nbLigne;ligne++){
        var tableauLigne = [];
        for (var colonne = 0; colonne<nbColonne;colonne++){
            tableauLigne.push(numeroCase);
            numeroCase++;
        }
        tableauCase.push(tableauLigne);
    }
    tableauPositionCase = tableauCase;


  //  alert("debut tableau");
    var style = document.styleSheets[0];
    console.log(style);
    var idIncrementCase = 1;
    var idIncrementLigne = 1;
    var selecteur = "#debutTbody";
    $(selecteur).empty();
    //https://stackoverflow.com/questions/623172/how-to-get-image-size-height-width-using-javascript

    var adresse = "url(" + imageDummy.src+ ")";
    var hauteur = imageDummy.height;
    var largeur = imageDummy.width;
    console.log("largeur = " + largeur + " hauteur = "+ hauteur);


    var largeurCase = largeur/nbColonne;
    var hauteurCase = hauteur/nbLigne;
    var caseDansColonne = 0;
    $("style").empty();

    for (var i=0;i< nbLigne;i++){
        //fait les lignes
        //console.log("i=" +i);
        var caseDansLigne = 0;
        var idLigne = "Ligne" + idIncrementLigne++;
        var nouvelleLigne = jQuery("<tr></tr>",{id:idLigne});

        for (var j = 0;j< nbColonne;j++){
            //console.log("j=" +j);
            //fait les colonnes
            var idColonne = "a" + idIncrementCase++;
            var classe = "a" + (idIncrementCase-1);
            var selectClasse = "." + classe;
            var cellule = "<td> " + "<span>"  + (idIncrementCase-1) + "</span>"+" </td>";//crée la case et met le chiffre
            var nouvelleColonne = jQuery(cellule);
            nouvelleColonne.addClass(classe);
            nouvelleColonne.attr("id",idColonne);

            //console.log(dimension);
            //nouvelleColonne.css({backgroundImage:adresse});
            if ( i != (nbLigne -1) || j != (nbColonne -1) ){
               //nouvelleColonne.css({"background-image":adresse});
                var regle = "background-image:" +adresse;
                //addCSSRule(style,selectClasse,regle,0);
                //$("style").append(selectClasse + "{" +regle+ ";}");
                //style.insertRule(selectClasse + "{" +regle+ "}");
                //style.insertRule('.1{color:blue}');
                ajoutestyleCSS(selectClasse,regle);

            }
            else {
                //nouvelleColonne.css({"background-color":"#808080"});
                ajoutestyleCSS(selectClasse,"background-color:#808080");

            }

            if (hauteur == 0|| largeur == 0){
                alert("hauteur = "+ hauteur +" largeur = " + largeur);
            }

            while(hauteur == 0|| largeur == 0){
                hauteur = imageDummy.height;
                largeur = imageDummy.width;
                console.log("nouvelle largeur = " + largeur + " nouvelle hauteur = "+ hauteur);
            }
            largeurCase = largeur/nbColonne;
            hauteurCase = hauteur/nbLigne;
            var dimension = largeurCase + "px "+ hauteurCase+"px";

           // nouvelleColonne.css({width:largeurCase, height:hauteurCase,"background-size":dimension});
           ajoutestyleCSS(selectClasse,"width:"+largeurCase+"px; height:"+hauteurCase+"px");
            nouvelleLigne.append(nouvelleColonne);
            var decalageGauche =  caseDansLigne * largeurCase +"px";
            //console.log("decalageGauche = " + decalageGauche + " caseDansLigne = " + caseDansLigne + " largeurCase = " + largeurCase);

            var decalageHauteur =  caseDansColonne * hauteurCase +"px";
            //console.log("idIncrementLigne = " + (idIncrementLigne - 2)+ " et decalage Hauteur = " +decalageHauteur + " hauteurCase = " + hauteurCase);

            //nouvelleColonne.css({"background-position-x":decalageGauche,"background-position-y":decalageHauteur});
            ajoutestyleCSS(selectClasse,"background-position-x:"+decalageGauche+"; background-position-y:"+decalageHauteur);

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

    for (var ligne=0;ligne< nbLigne;ligne++){
        for (var colonne=0;colonne<nbColonne;colonne++){
            var valeur = tableau2d[ligne][colonne];//valeur represente ce que je veux qui soit la dans mon affichage
           // console.log("ligne = "+ ligne +" colonne = " + colonne+ " valeur = "+valeur);
            var selecteurDest = "#a"+ valeur;//selecteurDest va selectionner où je veux mettre ce qui est dans la case numero numercase

            var numerCase = numCase(ligne,colonne);
            //console.log("numerCase = " +numerCase);

            var selecteurOrigine = "#a"+numerCase;//selecteurOrigine va selectionner la classe qui contient ce que je veux mettre dans la case selectionner par selecteur
            //console.log("selecteurDest = " + selecteurDest + " selecteurOrigine = " + selecteurOrigine);
            var $caseOrigine = $(selecteurOrigine);
            var $caseDest = $(selecteurDest);
            var classeOrigine = "a"+numerCase;
            if ($caseOrigine.hasClass(classeOrigine)){
                $caseOrigine.removeClass(classeOrigine);
            }
            $caseDest.removeClass();
            //console.log("enleve les classes");
           // console.log("classeOrigine = " + classeOrigine);
            $caseDest.addClass(classeOrigine);
            var $spanDest = $("."+classeOrigine +" span");
            $spanDest.empty();
            //$spanDest.text($caseOrigine.children("span").text());
            var numeroCaseAffiche = classeOrigine.split("a")[1];
            //console.log("numeroCaseAffiche = " + numeroCaseAffiche + "autre = " + classeOrigine.split("a")[0]);
            $spanDest.text(numeroCaseAffiche);
            var numLigne = numeroAxe(valeur,"ligne");
            var numColonne = numeroAxe(valeur,"colonne");
            tableauPositionCase[numLigne][numColonne]=numerCase;
        }
    }
    miseAJourPosGris();

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
    /*for (var i=0;i< produit;i++){
        //while ()
    }*/

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
    //console.log(tableau2d);
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

function ajoutestyleCSS(selecteur,regle) {
    $("style").append(selecteur + "{" +regle+ ";}");
}
function miseAJourPosGris() {
    var nbLigne = $("#nbLigne").val();
    var nbColonne = $("#nbColonne").val();
    var numCaseGris = nbLigne*nbColonne;
    for (var ligne=0;ligne<nbLigne;ligne++){
        if (tableauPositionCase[ligne].indexOf(numCaseGris) != -1) {
            numLigneGris = ligne + 1;
            numColonneGris = tableauPositionCase[ligne].indexOf(numCaseGris) + 1;
            console.log("numLigneGris = " + numLigneGris + " numColonneGris = "+numColonneGris);
        }
    }
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
*/
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
}

