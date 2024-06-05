import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-cronometro',
  templateUrl: './cronometro.component.html',
  styleUrls: ['./cronometro.component.scss'],
})
export class CronometroComponent implements OnInit, OnChanges{
  
  @Input() t:number = 0;  //Recibe el tiempo en segundos desde el componente padre
  public tiempo:string = '00:00'; //Muestra el tiempo ya convertido
  public min:number = 0; //Variable para almacenar los minutos

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges): void {
    this.actualizar(); //Cada vez que ocurra un cambio se ejecutara la funcion
  }

  //Funcion que hace una conversion para mostrar el tiempo de forma adecuada.
  //Para hacer que los segundos se ponian directamente los segundos si la variable "t"
  //es menor a 60. Si es mayor a 60 se le resta 60, se convierte en un string y se eligen
  //los dos ultimos valores.
  //Para obtener los minutos se divide por 60 la variable "t" y se redondea para obtener
  //un entero que seran los minutos
  actualizar(){
    let tt;
    if (this.t < 60){
      tt = this.t;
    }else{
      tt = ((this.t-60)+'').slice(-2);
    }
    let ml = ''+Math.floor(this.t/60);
    let sl = ''+tt;
    let contt = '';
    if (ml.length === 1){
      contt = '0'+ml+':';
    }else{
      contt = ml+':';
    }
    if (sl.length === 1){
      contt += '0'+sl;
    }else{
      contt += sl;
    }
    this.tiempo = contt;
  }
}
