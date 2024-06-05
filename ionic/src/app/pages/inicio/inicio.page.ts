import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.page.html',
  styleUrls: ['./inicio.page.scss'],
})
export class InicioPage implements OnInit, OnDestroy {

  constructor(public router: Router //Necesario para navegar entre paginas
  ) {
  }
  public jugador: string = ""; //Almacena el nombre del jugador
  public subs: Subscription[] = []; //Almacena las subscripciones realizadas
  public opciones:any =[
    { id: 1, name: 'Facil', opc: 8, color: 'primary' },
    { id: 2, name: 'Normal', opc: 6, color: 'warning' },
    { id: 3, name: 'Dificil', opc: 3, color: 'danger' }
  ];

  ngOnInit() {
    return 0;
  }
  ngOnDestroy() {
    for (let z = 0; z < this.subs.length; z++) {//Se desubscriben todas las subscripciones realizadas
      this.subs[z].unsubscribe();
    }
  }
  onSelectNivel(id: number) { //Envia al usuario a la pagina del juego al seleccionar un nivel
    this.router.navigate(["/jugar", id, this.jugador]);
  }
  mostrarRanking() {//Envia al usuario a la pagina de los rankings
    this.router.navigate(['/ranking']);
  }
}
