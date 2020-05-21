//ordena fichas
function ordenarFichas(){
  $$('.contenido').each(function(item){

       item.writeAttribute('src','image/'+ makeUniqueRandom(4) +'.png');

    })
}


function removerFichas(){
  $$('.contenido').each(function(item){
       item.writeAttribute('src','');
    })
}

//numero aleatorio entre 1- 4
function makeUniqueRandom(num) {
  var index = Math.floor(Math.random() * num) ;
  return index+1;
}

//validar validarLineas
function validarLineas(){
  var dragdrop=false;
  var ruta = '';
  var ruta1= '';
  var i = 0;
  var j = 0;
  var conHorizontal = 0;
  var previoHor = Array();
  $$('.panel-tablero').each(function(item){

    for(var i=0;i < 7; i++){
      for(var j=0; j< 7;j++){
        ruta = item.childElements()[i].childElements()[j].childElements()[0].readAttribute('src');
          if(ruta==ruta1){
            conHorizontal++;
            previoHor[conHorizontal]=item.childElements()[i].childElements()[j];
          }
          else{
            if (conHorizontal > 1){
                guardaritemH(previoHor);
                previoHor.clear();
                dragdrop=true;
            }
            ruta1 = ruta;
            conHorizontal=0;
             previoHor[conHorizontal]=item.childElements()[i].childElements()[j];
          }
          if  (j==6){
          ruta = '';
          ruta1= '';
            if (conHorizontal > 1){
            previoHor[conHorizontal]=item.childElements()[i].childElements()[j];
            guardaritemH(previoHor);
            previoHor.clear();
            conHorizontal=0;
            dragdrop=true;
            }
          }
      }
      }
//horizontal
 ruta = '';
 ruta1= '';
 i = 0;
 j = 0;
 conHorizontal = 0;


      for(var i=0;i < 7; i++){
        for(var j=0; j< 7;j++){
          ruta = item.childElements()[j].childElements()[i].childElements()[0].readAttribute('src');
            if(ruta==ruta1){
                  conHorizontal++;
                  previoHor[conHorizontal]=item.childElements()[j].childElements()[i];
            }
            else{
              if (conHorizontal > 1){
                guardaritemH(previoHor);
                previoHor.clear();
                dragdrop=true;
              }
              ruta1 = ruta;
              conHorizontal=0;
                previoHor[conHorizontal]=item.childElements()[j].childElements()[i];
              }
            if  (j==6){
            ruta = '';
            ruta1= '';
            if (conHorizontal > 1){

                previoHor[conHorizontal]=item.childElements()[j].childElements()[i];
                guardaritemH(previoHor);
                previoHor.clear();
                conHorizontal=0;
                dragdrop=true;
              }
            }
        }
        }


   })
  // $(".elemento").draggable({ disabled: false });
   return dragdrop;
}



function guardaritemH(elemento){
  $("div[class^='fil']").draggable({disabled:true});
       $("#score-text").text( parseInt($("#score-text").text()) + parseInt((elemento.length*10)));
      // $(elemento).fadeTo(500, .1).fadeTo(500, 1).fadeTo(500, .1).fadeTo(500, 1).fadeTo(500, .1).fadeTo(500, 1)
      $(elemento).hide("pulsate", 1000)
       .animate(
          2000,
          {
          duration:1000,
          step: function(){
          $(this).replaceWith($(this).prev());
          },

            queue:true,
            complete:function(){
            llenarVacios();


}}
)

}
      //    }
    //    )


//  }





function llenarVacios(){
var columnas= $("div [class^='col-']")
    for(var i=0;i<columnas.length;i++){
        if(columnas[i].childElementCount<7){
          var filas= columnas[i].childElements();
          for(var j=filas.length;j<7;j++){
          //  var a="<div class=fil-"+makeUniqueRandom(1000)+"><img src='image/"+makeUniqueRandom(4)+".png' class='contenido'></div>";
          var a="<div class=fila><img src='image/"+makeUniqueRandom(4)+".png' class='contenido' ></div>";

            if (filas==0){
              $("."+$(columnas)[i].readAttribute("class")).append(a);
            }else{
            //  $("."+$(columnas)[i].readAttribute("class")).children().first().before(a);
              $("."+$(columnas)[i].readAttribute("class")).prepend(a);
             }
            }
        }
      }
      $("div[class^='fil']").draggable({
            disabled:false,
            snap:"div[class^='fil']",
            snaptolerance: 40,
            containment: ".panel-tablero"

        })
        $("div[class^='fil']").droppable({
         //  accept: "div[class^='fil-']",
           enable:false,
           snapMode: "inner",
           Tolerance: "fit",
           accept:"div[class^='fil']",
           clone: true,
           classes: {
             "ui-droppable-hover": "ContenedorDrop"
           },
           drop: ManejadorDrop,
           })

  validarLineas();


 }

 function timeisUp() {

         $(".time").hide();
        $(".panel-tablero").hide("slow", "linear");
        $(".panel-score").animate(
            {
              width: "100%",
              height:"510px"
            }, 800, function(){
              $(".panel-score").css("flex-flow", "row wrap")
              $("h1").append("<div class='final'><h4 align='center'> juego terminado</h4></div>");

          }
      )
 }

$(".btn-reinicio").on("click", function(){
removerFichas();
  if($(".panel-tablero").css("display")!="none" && $(".btn-reinicio").text()!="reiniciar"){
    $(".btn-reinicio").text("reiniciar");

    ordenarFichas();
    $("div[class^='col-']").animate(600, function(){
         $("div[class^='col']").show(5000,"linear");
      //  validarLineas();
    })
    $('#timer').countdowntimer({
                                          minutes :2,
                                          seconds : 0,
                                          size : "lg",
                                          timeUp : timeisUp
                                      });
    $("#movimientos-text").text("0");

  }else if($(".panel-tablero").css("display")=="none"){
   $(".btn-reinicio").text("iniciar");
   $(".panel-tablero").show();
   $("div .final").remove();
   $(".time").show();
   $(".panel-score").css("width", "25%");
   $(".panel-score").css("height", "700px");
   $("#score-text").text("0");
   $("#movimientos-text").text("0");
   $("#timer").text("02:00");
   $(".panel-score").css("flex-flow", "column wrap");
   $("div[class^='col']").hide();

 }else {
   if ($(".btn-reinicio").text()=="reiniciar"){
       clearInterval(timer_MStimer);

       $("#timer").countdowntimer({
                                    minutes :2,
                                    seconds : 0,
                                    size : "lg",
                                    interval: 1,
                                    timeUp : timeisUp
                                   });
       $("#score-text").text( "0");
       $("#movimientos-text").text("0");
       ordenarFichas();
       validarLineas();
   }//else{
   //$(".btn-reinicio").text("reiniciar");
   //validarLineas();
   //}
 }




})

//$("div[class^='fil-']")
$("div[class^='fil']").draggable({
      disabled:false,
      snap:"div[class^='fil']",
      snaptolerance: 40,
      containment: ".panel-tablero"

  })





//  $("div[class^='fil-']").droppable({
 $("div[class^='fil']").droppable({
  //  accept: "div[class^='fil-']",
    enable:false,
    snapMode: "inner",
    Tolerance: "fit",
    accept:"div[class^='fil']",
    clone: true,
    classes: {
      "ui-droppable-hover": "ContenedorDrop"
    },
    drop: ManejadorDrop
    })


  function ManejadorDrop(event, ui){

    var tmpdrag=$(ui.draggable).clone().draggable({
      disable:false,
      snap:"div[class^='fil']",
      snaptolerance: 40,
      containment: ".panel-tablero"})
      var tmpdrop=$(this).clone()
    .draggable({
      disable:false,
      snap:"div[class^='fil']",
      containment: ".panel-tablero"
    })

    $(tmpdrag).attr("style","position: relative");
    $(tmpdrop).attr("style","position: relative");

      $(tmpdrag).droppable({
       enable:false,
       snapMode: "inner",
       Tolerance: "fit",
       accept:"div[class^='fil']",
       clone: true,
       classes: {
         "ui-droppable-hover": "ContenedorDrop"
       },
       drop: ManejadorDrop
       })


     $(tmpdrop).droppable({
      enable:false,
      snapMode: "inner",
      Tolerance: "fit",
      accept:"div[class^='fil']",
      clone: true,
      classes: {
        "ui-droppable-hover": "ContenedorDrop"
      },
      drop: ManejadorDrop


    })
    $("#movimientos-text").text( parseInt($("#movimientos-text").text()) + parseInt(1));

      var tmpdrag1=tmpdrag;
      var tmpdrop1=tmpdrop.clone();

       $(this).replaceWith($(tmpdrag))
       $(ui.draggable).replaceWith($(tmpdrop));
    if(!validarLineas()){
      $(tmpdrag).replaceWith($(tmpdrop1));
      $(tmpdrop).replaceWith($(tmpdrag1));

        $(tmpdrag1).draggable({
        disabled:false,
        snap:"div[class^='fil']",
        snaptolerance: 40,
        containment: ".panel-tablero"})

        $(tmpdrop1).draggable({
        disabled:false,
        snap:"div[class^='fil']",
        snaptolerance: 40,
        containment: ".panel-tablero"})


      $(tmpdrag1).droppable({
       enable:false,
       snapMode: "inner",
       Tolerance: "fit",
       accept:"div[class^='fil']",
       clone: true,
       classes: {
         "ui-droppable-hover": "ContenedorDrop"
       },
       drop: ManejadorDrop
       })


     $(tmpdrop1).droppable({
    //  accept: "div[class^='fil-']",
      enable:false,
      snapMode: "inner",
      Tolerance: "fit",
      accept:"div[class^='fil']",
      clone: true,
      classes: {
        "ui-droppable-hover": "ContenedorDrop"
      },
      drop: ManejadorDrop
    })


        }


  }







//inicio
$(function(){
  setInterval(function(){
  var color=$(".main-titulo").css("color");
  if(color=="rgb(220, 255, 14)") {
    $(".main-titulo").css("color","#DDDDDD");
  }else{
    $(".main-titulo").css("color","#DCFF0E");
  }
},1000);
// titulo_color();
// ordenarFichas();
$("div[class^='col']").hide();
  })
