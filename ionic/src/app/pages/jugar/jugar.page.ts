import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { LoadingController } from '@ionic/angular';
import { Subscription, map } from 'rxjs';
import { Topusers } from 'src/app/interfaces/topusers';
import { FotoService } from 'src/app/servicios/foto.service';
import { PalabrasService } from 'src/app/servicios/palabras.service';
import { TopuserService } from 'src/app/servicios/topuser.service';


@Component({
  selector: 'app-jugar',
  templateUrl: './jugar.page.html',
  styleUrls: ['./jugar.page.scss'],
})
export class JugarPage implements OnInit, OnDestroy {
  public id: number = 0; //Variable que almacena el valor de la dificultad
  public nivel: any = ''; //Variable que almacena todo con respecto al nivel seleccionado con el usuario como (id, nombre y el numero de intentos)
  public settt: any; //Variable que almacena el resultado de setInterval
  public mostrarcolor: boolean[] = []; //Variable que almacena la autorizacion para mostrar u ocultar el color de las celdas con respecto a las filas
  public activar: boolean[] = []; //Variable que almacena la autorizacion para bloquear o desbloquear las filas correspondientes
  public letras: any = []; //Variable que almacena las letras de la palabra separadas en un arreglo
  public opciones: any = [ //Variable que almacena todos niveles y configuraciones que puede escoger el usuario
    { id: 1, name: 'Facil', opc: 8, color: 'primary' },
    { id: 2, name: 'Normal', opc: 6, color: 'warning' },
    { id: 3, name: 'Dificil', opc: 3, color: 'danger' }
  ];
  public palabra: string = ''; //Donde esta la palabra
  public play: number = 0; //Variable que determina que fila esta habilitada
  public sups: Subscription[] = []; //Almacena las subscripciones hechas para despues desubscribirlas
  public nombre: string = ''; //Almacena el nombre del usuario
  public tiempo: number = 0; //Registra el tiempo en segundos del usuario
  public corroborar: any; //Determina la situacion del usuario al presionar "Enviar"
  public comppp: any; //Almacena el resultado al tomarse una foto

  constructor(
    private activedRoute: ActivatedRoute, //Necesario para obtener la dificultad del juego y el nombre del usuario
    public router: Router, //Necesario para navegar entre paginas
    public top: TopuserService, //Necesario para enviar y obtener informacion de la base de datos con respecto a la tabla de los mejores jugadores
    public pall: PalabrasService, //Necesario para obtener las palabras de la base de datos
    public FotoS: FotoService, //Necesario para usar la camara
    private loadingc: LoadingController //Para la pantalla de carga
  ) { }

  async ngOnInit() {
    const loading = await this.loadingc.create({ //Configura la pantalla de carga
      message: 'Cargando...',
      spinner: 'circles',
      cssClass: 'wait',
    });
    await loading.present(); //Muestra la pantalla de carga
    this.id = this.activedRoute.snapshot.params['id']; //Obtiene el id de la dificultad
    this.nombre = this.activedRoute.snapshot.params['nombre']; //Obtiene el nombre del usuario
    this.nivel = this.opciones.find((item: any) => item.id == this.id); //Se obtiene toda la configuracion del nivel en un objeto
    for (let x = 0; x < this.nivel.opc; x++) {//Inserta valores con respecto al numero de intentos
      this.mostrarcolor.push(false);
      this.activar.push(true);
      this.letras.push(0);
    }
    this.activar[0] = false; //Se deja habilitada la primera fila
    this.sups.push(
      this.pall.getPalabras() //Se piden todas las palabras de la base de datos
        .pipe(map((r) => { return r; })) //La variable "r" contiene todas las palabras
        .subscribe((r) => {
          const rand = Math.ceil(Math.random() * r.length); //Se genera un valor aleatorio para escoger una palabra
          this.palabra = r[rand].palabras; //Se elige una palabra aleatoriamente
          console.log(this.palabra);
          loading.dismiss(); //Se quita la pantalla de carga
          this.settt = setInterval(() => { //Empieza el juego a contar
            this.tiempo += 1;
          }, 1000);
        })
    );
    return 0;
  }
  ngOnDestroy() {
    //Al terminar todo es necesario desubscribir los observables que se emplearon
    //para evitar problemas de rendimiento
    for (let x = 0; x < this.sups.length; x++) {
      this.sups[x].unsubscribe();
    }
    return 0;
  }

  fenviar() {//Se le pide a la fila habilitada que muestre el color y que envie una respuesta comparativa
    this.mostrarcolor[this.play] = true;
  }

  volver() { //Retorna a la pagina inicial
    this.router.navigate(['']);
  }

  //Variable que se usa para poder registrar el usuario
  public userNew: Topusers = {
    _id: '',
    nombre: '',
    tiempo: this.tiempo,
    nivel: this.nivel.name,
    palabra: this.palabra,
    foto: 'imagen.png',
  };

  //Funcion que comprueba la palabra enviada por el usuario
  //Si la palabra es correcta
  //Si la palabra no es correcta se continua
  //Si se acaban los intentos
  //Si el usuario tiene una celda sin letra
  comprobante(arg: any) {
    console.log(arg, this.play, this.nivel.opc);
    this.corroborar = arg;
    if (arg === 'error') { //Si falta una celda sin ponerle una letra
      this.mostrarcolor[this.play] = false;
      alert('LLene todas las celdas de la fila, por favor');
    } else if (this.corroborar === true) { //Si la palabra es correcta
      clearInterval(this.settt);
      setTimeout(() => {
        alert("¡FELICITACIONES! Ganastes");
        this.sups.push(
          this.top.getTopusers() //Se obtienen los usuarios registrados
            .pipe(map((r) => { return r; })) // "r" es un arreglo que contiene todos los usuarios registrados
            .subscribe((r) => {
              //Lo que se busca en este apartado es ver si el usuario que completo el juego
              //hace parte de los 5 mejores
              let mejores = []; //Se limpia la variable
              //Se observa si la cantidad de usuarios registrados es menor o igual a 5
              //y si lo es la variable "mejores" es igual a "r"
              if (r.length <= 5) {
                mejores = r;
                console.log('pocos');
              } else { //Si son mas de 5 se comparan los diferentes usuarios para obtener los 5 mejores
                console.log('muchos');
                let pos = 0; //Almacena la posicion del mejor jugador en la variable "r"
                //Un bucle "for" de 5 iteraciones para almacenar los 5 mejores
                for (let x = 0; x < 5; x++) {
                  //Un bucle "for" que itera con respecto a la cantidad de usuarios registrados anteriormente
                  for (let y = 0; y < r.length; y++) {
                    //Condicion que inserta un usuario si tiene cierta cantidad de registros
                    if (mejores.length === x) {
                      mejores.push(r[y]);
                      pos = y;
                    } else {
                      //Se compara si el usuario en que esta almacenado en "mejores" tiene mayor tiempo que el almacenado en "r"
                      if (mejores[x].tiempo > r[y].tiempo) {
                        mejores[x] = r[y]; //Si se cumple esta condicion se cambia el valor de "mejores[x]" por el de "r[y]"
                        pos = y;
                      }
                    }
                  }
                  //Se elimina al mejor jugador de la variable "r"
                  let nn = [];
                  for (let v = 0; v < r.length; v++) {
                    if (v !== pos) {
                      nn.push(r[v]);
                    }
                  }
                  r = nn;
                }
              }
              let esta = false; // Variable para determinar si el usuario actual pertenece a los 5 mejores
              console.log(mejores.length);
              //Se usa este bucle para comparar el puntaje del usuario actual
              //con los 5 mejores anteriores
              for (let x = 0; x < mejores.length; x++) {
                //Si es mayor a un o varios el valor de la variable "esta" es igual a "true"
                //indicando que esta en el top 5
                if (mejores[x].tiempo >= this.tiempo) {
                  esta = true;
                }
              }
              //Si son menos de 5 indica que pertenece al top 5
              if (mejores.length < 5) {
                esta = true;
              }
              console.log(esta)
              if (esta === false) { //Si es "false" se registra
                this.userNew.foto = '';
                this.userNew.nivel = this.nivel.name;
                this.userNew.nombre = this.nombre;
                this.userNew.palabra = this.palabra;
                this.userNew.tiempo = this.tiempo;
                this.sups.push(
                  this.top.createTopuser(this.userNew)
                    .pipe(map(r => { return r; }))
                    .subscribe(() => {
                      this.router.navigate(['/inicio']);
                    })
                );
              } else { //Si es "true" se le notifica que este entre los 5 mejores y se le solicita una foto
                alert("!INCREIBLE¡ Estas entre los 5 mejores, nos gustaria que te tomaras una foto como recuerdo");
                this.comppp = this.FotoS.tomarfoto(() => { }); //Sirve para abrir la camara
                //Se modifica la variable "userNew" con toda la informacion del usuario proporcionada
                //como nombre, la dificultad, la palabra y el tiempo
                this.userNew.foto = 'foto.png';
                this.userNew.nivel = this.nivel.name;
                this.userNew.nombre = this.nombre;
                this.userNew.palabra = this.palabra;
                this.userNew.tiempo = this.tiempo;
                this.sups.push(
                  this.top.createTopuser(this.userNew) //Se crea el usuario en la base de datos
                    .pipe(map(r => { return r; }))
                    .subscribe(() => {
                      this.router.navigate(['/inicio']);
                    })
                );
              }
            })
        );
      }, 1000);
    } else if (this.corroborar === false && this.play === (this.nivel.opc - 1)) { //Si agota todos sus intentos
      setTimeout(() => {
        alert('Lo sentimos, perdistes todos tus intentos vuelve a intentarlo');
        window.location.reload();
      }, 400);
    } else if (arg === false) { //Si no es la palabra correcta y tiene mas intentos
      this.play += 1;
    }
    if (this.play < this.nivel.opc) { //Se genera una actualizacion si tiene mas intentos
      this.actualizarActivar();
    }
  }
  //Funcion que permite actualizar la fila a la cual se puede escribir y bloquear las otras filas
  actualizarActivar() {
    for (let x = 0; x < this.nivel.opc; x++) {
      if (x === this.play) {
        this.activar[x] = false;
      } else {
        this.activar[x] = true;
      }
    }
  }
}