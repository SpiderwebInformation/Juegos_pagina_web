$(document).ready(function(){
	function NuevaPropiedad(){
		$('.boton').attr("disabled",true);
		$('p span').text("x").addClass('azul');
		c=0;
	}
	for(var i=1;i<=3;i++){
		var claseFila =  i;
		$('#padre').append("<div class='" + claseFila + "'></div>");
		 for(var j=1;j<=3;j++){
				$("." + claseFila).append("<button class='btn boton' id='" + claseFila+j + "'>"+"</button>");		 
		};	
			
	}
	var c = 0;

	$('p span').text("x").addClass('azul');
	$('.boton').text("+").addClass('negro');

	$('.boton').click(function(){
		c++;
		if(c % 2){
			$(this).each(function(){
				$('.boton').removeClass('negro');
				$(this).text("x").addClass('azul');
				$(this).attr("disabled",true);
				$('p span').text("o").addClass('azul');
				$('p span').text("o").addClass('rojo');
				
			})
		}else{
			$(this).each(function(){
				$('.boton').removeClass('negro');
				$(this).text("o").addClass('rojo');;
				$(this).attr("disabled",true);
				$('p span').text("x").removeClass('rojo');
				$('p span').text("x").addClass('azul');
			})

		}

/* LOS #XX SON BOTONES DEL TABLERO, DE LOS PRIMEROS DIGITOS EL 1 ES LA COLUMNA IZQUIERDA COMENZANDO DE ARRIBA HACIA ABAJO, 
EL 2 ES LA SEGUNDA COLUMNA COMENZANDO DE ARRIBA HACIA ABAJO Y EL NUMERO 3 ES LA COLUMNA DERECHA COMENZANDO DE ARRIBA HACIA
ABAJO. EL SEGUNDO DIGITO ES LA POSICION DEL BOTON DE ARRIBA HACIA ABAJO EMPEZANDO EN 1 HASTA 3.*/

		if( $('#11').text()!="+" && $('#11').text()==$('#22').text()  && $('#11').text()==$('#33').text()){
				$('p').text(" Ganó: "+$('#11').text());
				NuevaPropiedad();
		}
		if( $('#13').text()!="+" && $('#13').text()==$('#22').text()  && $('#13').text()==$('#31').text()){
				$('p').text(" Ganó: "+$('#13').text());
				NuevaPropiedad();
		}
		if( $('#11').text()!="+" && $('#11').text()==$('#12').text()  && $('#11').text()==$('#13').text()){
				$('p').text(" Ganó: "+$('#11').text() );
				NuevaPropiedad();
		}
		if( $('#11').text()!="+" && $('#11').text()==$('#21').text()  && $('#11').text()==$('#31').text()){
				$('p').text(" Ganó: "+$('#11').text() );
				NuevaPropiedad();
		}
		if( $('#12').text()!="+" && $('#12').text()==$('#22').text()  && $('#12').text()==$('#32').text()){
				$('p').text(" Ganó: "+$('#12').text() );
				NuevaPropiedad();
		}
		if( $('#13').text()!="+" && $('#13').text()==$('#23').text()  && $('#13').text()==$('#33').text()){
				$('p').text(" Ganó: "+$('#13').text() );
				NuevaPropiedad();
		}
		if( $('#21').text()!="+" && $('#21').text()==$('#22').text()  && $('#21').text()==$('#23').text()){
				$('p').text(" Ganó: "+$('#21').text() );
				NuevaPropiedad();
		}
		if( $('#31').text()!="+" && $('#31').text()==$('#32').text()  && $('#31').text()==$('#33').text()){
				$('p').text(" Ganó: "+$('#31').text() );
				NuevaPropiedad();
		}
		if(c==9){
			$('p').text(" Empate " );

		}

		});

//BOTON PARA EMPEZAR UNA NUEVA JUGADA

	$('.btnNew').click(function(){
		$('.boton').removeClass('azul');
		$('.boton').removeClass('rojo');
		$('.boton').text("+").addClass('negro');
		$('.boton').attr("disabled",false);
		$('p').text("Turno: Jugador ").addClass('negro');
		$('p').append("<span id='turno'></span>")
		$('#turno').text("x").addClass('azul');
		c = 0;
	});
	


});