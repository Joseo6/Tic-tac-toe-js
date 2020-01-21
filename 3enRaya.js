var soluciones = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
var turno = turnos();
var celdasOcupadas = [];
var celdasJugador = [];
var finJuego = false;
var puntosJugador = 0;
var puntosIA = 0;
var empates = 0;

function iniciar() {
    /*variables globales puestas dentro de iniciar para que se restablezcan cada vez 
    que se pulse el boton iniciar*/
    finJuego = false;
    dificultad = this.document.getElementById("dificultad").value;
    celdasOcupadas = [];
    celdasJugador = [];
    for (let i = 0; i < 9; i++){
        this.document.getElementById(i).innerHTML = '';
    }
    turnos();
    marcador();
}



function instrucciones() {
    this.alert("Reglas:\n1. Elegir una casilla por turno.\n2. Una vez un jugador elige una casilla le toca al siguiente." +
               "\n3. Gana el jugador que consiga antes 3 'X' u 'O' en una fila, columna o diagonal con tres casillas." +
               "\n\n\n¡BUENA SUERTE!");
}



function marcador(){
    if (empates != 1){
        document.getElementById("marcador").innerHTML = "<b>Marcador</b><br>Jugador: "+ puntosJugador + 
        " puntos<br>Máquina: " + puntosIA + " puntos" + "<br>Empates: " + empates + " veces";
        
    } else {
        document.getElementById("marcador").innerHTML = "<b>Marcador</b><br>Jugador: "+ puntosJugador + 
        " puntos<br>Máquina: " + puntosIA + " puntos" + "<br>Empates: " + empates + " vez";
    }
    
}



function turnos(){
    turno = Math.floor(Math.random()*2);
    document.getElementById("parrafoTurnos").innerHTML = "Empieza el jugador";
    if (turno == 1){
        turno = 0;
        cambiarTurno();
    }
}



function escribir (id){
    if (finJuego == false){
        id = parseInt(id);
        document.getElementById("parrafoTurnos").innerHTML = "Seleccione una casilla";
        var celdaValida = comprobarID(id);
        if (celdaValida == true){
            if (turno === 0){
                document.getElementById(id).innerHTML= 'X';
                celdasOcupadas.push(id);
                celdasJugador.push(id);
                comprobar('X');

            } else {
                document.getElementById(id).innerHTML = 'O';
                celdasOcupadas.push(id);
                comprobar('O');
            }
            cambiarTurno();
            
        } else {
            document.getElementById("parrafoTurnos").innerHTML = "Casilla no disponible para seleccionarla";
        }
        
        
    } else {
        document.getElementById("parrafoTurnos").innerHTML = "Para volver a jugar pulse en Iniciar";
    } 
}



function comprobarID(id){
    for (var i = 0; i < celdasOcupadas.length; i++){
        if (celdasOcupadas[i] == id){
            return false;
        }
    }
    return true;
}



function cambiarTurno(){
    if (turno === 0){
        if (finJuego == false){
            turno = 1;
            var id = turnoIA();
            setTimeout(escribir, 100, id);
        }
        
        
    } else {
        turno = 0;
    }
}



function comprobar(letra){
          
    for (let i = 0; i < soluciones.length && finJuego == false; i++){
    var contador = 0;

        for (let j = 0; j < soluciones[i].length; j++){
            if (letra == document.getElementById(soluciones[i][j]).innerHTML){
                contador++;
            }
        }

        if (contador == 3){
            finJuego = true;

            if(turno == 0){
                document.getElementById("parrafoTurnos").innerHTML = "¡¡¡Ha ganado el jugador!!!<br><br>Fin de la partida";
                puntosJugador++;

            } else {
                document.getElementById("parrafoTurnos").innerHTML = "¡¡¡Ha ganado la máquina!!!<br><br>Fin de la partida";
                puntosIA++;
            }

            marcador();
        }
    }

    
    if (celdasOcupadas.length == 9 && finJuego == false){
            document.getElementById("parrafoTurnos").innerHTML = "¡¡¡Empate!!!<br><br>Fin de la partida";
            finJuego = true;
            empates++;
            marcador();
    }
    
    
}



function turnoIA(){
   
    if (dificultad === "facil"){
        var celdaAleatoria = movimiento();
        return celdaAleatoria;
              
    } else {
        
        if (celdasOcupadas.indexOf(4) == -1){
            return 4;
        } else {
            var ganar = comprobarCasillas("O");

            if (ganar === false){
                var perder = comprobarCasillas("X");
                if(perder === false){
                    var id = movimiento();
                    return id;
                } else {
                    return perder;
                }
            } else {
                return ganar;
            }
        } 
    }
}



function movimiento(){
    if (celdasOcupadas.length == 0){
        var celdaAleatoria = Math.floor(Math.random()*9);
        return celdaAleatoria;

    } else {
        if (dificultad === "dificil") {
            if (celdasOcupadas.length == 1){
                celdaAleatoria = elegirCelda(0, 2, 6, 8);

            } else if (celdasOcupadas.length == 3){
                celdaAleatoria = evitarDobletes();

            } else {
                if (celdasOcupadas.indexOf(0) == -1 || celdasOcupadas.indexOf(2) == -1 || celdasOcupadas.indexOf(6) == -1 || celdasOcupadas.indexOf(8) == -1){
                    celdaAleatoria = elegirCelda(0, 2, 6, 8);
                } else {
                    celdaAleatoria = aleatorio();
                }
                
            }
            salir = true;

        } else {
            celdaAleatoria = aleatorio();
        }         
        
        return celdaAleatoria;
    }
}



function aleatorio(){
    var salir = false;
    
    while (!salir){
        var celdaAleatoria = Math.floor(Math.random()*9);

        for (let i = 0; i < celdasOcupadas.length && salir == false; i++){
            if (celdaAleatoria == celdasOcupadas[i]){
                salir = true;
            }
        }

        if (salir == false){
            salir = true;
        } else {
            salir = false;
        }
    }
    return celdaAleatoria;
}


function comprobarCasillas(letra){
    if (document.getElementById(4).innerHTML === ''){
        escribir(4);
    } else {
        for (let i = 0; i < soluciones.length; i++){
            var contador = 0;
            var id = -1;
            
            for (let j = 0; j < soluciones[i].length; j++){
                if (letra == document.getElementById(soluciones[i][j]).innerHTML){
                    contador++;

                } else if (celdasOcupadas.indexOf(soluciones[i][j]) != -1){
                    break;

                } else {
                    var id = soluciones[i][j];
                }
            }

            if (contador == 2 && id != -1){
                return id;
            }
        }
    }
    
    return false;
}



function evitarDobletes(){
    //2 esquinas == diagonal, poniendo en cruz central crea jugada defensiva inevitable, evita que pueda poner en tercera esquina 
    if (celdasJugador.indexOf(0) != -1 && celdasJugador.indexOf(8) != -1){
        celdaAleatoria = elegirCelda(1, 3, 5, 7);
        return celdaAleatoria;

    } else if (celdasJugador.indexOf(2) != -1 && celdasJugador.indexOf(6) != -1){
        celdaAleatoria = elegirCelda(1, 3, 5, 7);
        return celdaAleatoria;
    
    //puntas cruz central correlativas, si máquina coloca en esquina opuesta a la pareja pierde automáticamente
    } else if (celdasJugador.indexOf(1) != -1 && celdasJugador.indexOf(3) != -1){
        celdaAleatoria = elegirCelda(0, 2, 6, 0);
        return celdaAleatoria;

    } else if (celdasJugador.indexOf(1) != -1 && celdasJugador.indexOf(5) != -1){
        celdaAleatoria = elegirCelda(0, 2, 8, 0);
        return celdaAleatoria;
        
    } else if (celdasJugador.indexOf(3) != -1 && celdasJugador.indexOf(7) != -1){
        celdaAleatoria = elegirCelda(0, 6, 8, 0);
        return celdaAleatoria;
        
    } else if (celdasJugador.indexOf(5) != -1 && celdasJugador.indexOf(7) != -1){
        celdaAleatoria = elegirCelda(2, 6, 8, 0);
        return celdaAleatoria;
        
    //esquina y centro del mismo, esquina contraria de la máquina, colocando en esquinas cortas el doblete
    } else if (celdasJugador.indexOf(0) != -1 && celdasJugador.indexOf(4) != -1){
        celdaAleatoria = elegirCelda(2, 6, 0, 0);
        return celdaAleatoria;

    } else if (celdasJugador.indexOf(2) != -1 && celdasJugador.indexOf(4) != -1){
        celdaAleatoria = elegirCelda(0, 8, 0, 0);
        return celdaAleatoria;
        
    } else if (celdasJugador.indexOf(4) != -1 && celdasJugador.indexOf(6) != -1){
        celdaAleatoria = elegirCelda(0, 8, 0, 0);
        return celdaAleatoria;
        
    } else if (celdasJugador.indexOf(4) != -1 && celdasJugador.indexOf(8) != -1){
        celdaAleatoria = elegirCelda(2, 6, 0, 0);
        return celdaAleatoria;
        
    //posiciones de las x en extremos de una L, como se mueve el caballo en ajedrez, 2 centros y 2 esquinas cortan doblete
    } else if (celdasJugador.indexOf(3) != -1 && celdasJugador.indexOf(2) != -1){
        celdaAleatoria = elegirCelda(0, 6, 7, 0);
        return celdaAleatoria;

    } else if (celdasJugador.indexOf(3) != -1 && celdasJugador.indexOf(8) != -1){
        celdaAleatoria = elegirCelda(0, 1, 6, 0);
        return celdaAleatoria;
        
    } else if (celdasJugador.indexOf(1) != -1 && celdasJugador.indexOf(6) != -1){
        celdaAleatoria = elegirCelda(0, 2, 5, 0);
        return celdaAleatoria;
        
    } else if (celdasJugador.indexOf(1) != -1 && celdasJugador.indexOf(8) != -1){
        celdaAleatoria = elegirCelda(0, 2, 3, 0);
        return celdaAleatoria;
        
    } else if (celdasJugador.indexOf(5) != -1 && celdasJugador.indexOf(0) != -1){
        celdaAleatoria = elegirCelda(2, 7, 8, 0);
        return celdaAleatoria;

    } else if (celdasJugador.indexOf(5) != -1 && celdasJugador.indexOf(6) != -1){
        celdaAleatoria = elegirCelda(1, 2, 8, 0);
        return celdaAleatoria;
        
    } else if (celdasJugador.indexOf(7) != -1 && celdasJugador.indexOf(0) != -1){
        celdaAleatoria = elegirCelda(5, 6, 8, 0);
        return celdaAleatoria;
        
    } else if (celdasJugador.indexOf(7) != -1 && celdasJugador.indexOf(2) != -1){
        celdaAleatoria = elegirCelda(3, 6, 8, 0);
        return celdaAleatoria;
        
    } else {
        if (celdasOcupadas.indexOf(0) == -1 || celdasOcupadas.indexOf(0) == -1 || celdasOcupadas.indexOf(0) == -1 ||                     celdasOcupadas.indexOf(0) == -1){
            celdaAleatoria = elegirCelda(0, 2, 6, 8);
            return celdaAleatoria;
        } else {
            celdaAleatoria = aleatorio();
            return celdaAleatoria;
        }
    }
}


    
function elegirCelda(a,b,c,d){
    var salir = false;
    while(!salir){
        //hay tres opciones de evitar perder, siendo estas opciones 2, 3 o 4 casillas posibles
        if (c == 0){
            var celdaAleatoria = Math.floor(Math.random()*2);
            
        } else if (d == 0){
            var celdaAleatoria = Math.floor(Math.random()*3);
            
        } else {
            var celdaAleatoria = Math.floor(Math.random()*4);
        }
        

        switch(celdaAleatoria){
            case 0: 
                if (celdasOcupadas.indexOf(a) == -1){
                    return a;
                }
                break;

            case 1: 
                if (celdasOcupadas.indexOf(b) == -1){
                    return b;
                }
                break;

            case 2: 
                if (celdasOcupadas.indexOf(c) == -1){
                    return c;
                }
                break;
                
            case 3:
                if (celdasOcupadas.indexOf(d) == -1){
                    return d;
                }
                break;
        }
    }
}