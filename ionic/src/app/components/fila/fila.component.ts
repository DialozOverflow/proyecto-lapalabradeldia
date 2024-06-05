import { Component, EventEmitter, Input, OnChanges, OnInit, Output, QueryList, SimpleChanges, ViewChildren } from '@angular/core';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-fila',
  templateUrl: './fila.component.html',
  styleUrls: ['./fila.component.scss'],
})

export class FilaComponent implements OnInit, OnChanges {
  @ViewChildren(IonInput) inputel!: QueryList<IonInput>; //Se usa para obtener todos los elementos de tipo IonInput en el html
  @Input() mostrarcolor!: boolean; //Recibe la autorizacion de mostrar o no el color de las celdas
  @Input() activar!: boolean; //Recibe la autorizacion de bloquear o no las celdas
  public letrasCeldas: string[] = []; //Almacena las letras de cada celda en un arreglo
  @Output() corroborar = new EventEmitter<any>; //Envia un valor al componente padre que indica en que condicion se encuentra la fila
  public css: string[] = []; //Almacenla el estado de cada celda en un arreglo
  @Input() palabra!: string; //Recibe la palabra a evaluar

  constructor() { }

  //Funcion que evalua cada celda y le asigna un valor que influye en la clase del elemento
  comprobarCeldas() {
    for (let x = 0; x < this.letrasCeldas.length; x++) {
      if (this.letrasCeldas[x] === this.palabra[x]) {
        this.css[x] = 'acierto';
      } else if (this.letrasCeldas[x] !== this.palabra[x] && this.palabra.includes(this.letrasCeldas[x]) === true && this.letrasCeldas[x] !== '') {
        this.css[x] = 'casi';
      } else if (this.palabra.includes(this.letrasCeldas[x]) === false && this.letrasCeldas[x] !== '') {
        this.css[x] = 'fallo';
      } else if (this.letrasCeldas[x] === '') {
        this.css[x] = 'nada';
      }
    }
    //Despues de evaluar cada celda se hace una comparacion general para enviar una respuesta al componente padre
    if ((this.css.includes('casi') === true || this.css.includes('fallo') === true) && this.css.includes('nada') === false) {
      this.corroborar.emit(false);
    } else if (this.css.includes('nada') === true) {
      this.corroborar.emit('error');
    } else if (this.css.includes('casi') === false && this.css.includes('fallo') === false && this.css.includes('nada') === false) {
      this.corroborar.emit(true);
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['mostrarcolor']) { //Cuando la variable "mostrarcolor" sufra cambios se ejecutaran ciertas funciones
      if (this.mostrarcolor === true) {
        this.comprobarCeldas();
      }else{
        this.limpiarCss();
      }
    }
  }

  ngOnInit() {
    for (let x = 0; x < 5; x++) {
      this.letrasCeldas.push('');
    }
    this.limpiarCss();
    return 0;
  }
  //Quita el color de las celdas
  limpiarCss() {
    this.css = [];
    for (let x = 0; x < 5; x++) {
      this.css.push('nada');
    }
  }
  //Cambia el focus de la celda al poner una letra en la celda
  testing(i: number){
    if (i < this.letrasCeldas.length - 1){
      const siguiente = this.inputel.toArray()[i + 1];
      const actual = this.inputel.toArray()[i];
      if (actual.value !== '') {
        siguiente.setFocus();
      }
    }
  }
}
