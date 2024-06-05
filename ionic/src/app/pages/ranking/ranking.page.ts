import { Component, OnDestroy, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { Subscription, filter, map } from 'rxjs';
import { Topusers } from 'src/app/interfaces/topusers';
import { TopuserService } from 'src/app/servicios/topuser.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.page.html',
  styleUrls: ['./ranking.page.scss'],
})
export class RankingPage implements OnInit, OnDestroy{
  public subs: Subscription[] = []; //Almacena las subscripciones
  public mejores: Topusers[] = []; //Almacena los mejores jugadores

  constructor(
    public top: TopuserService, //Necesario para obtener los jugadores
    public router: Router //Necesario para navegar entre paginas
  ) { }

  ngOnDestroy(): void {
    for (let x = 0; x < this.subs.length; x++) { //Desubscribe todas las subscripciones realizadas
      this.subs[x].unsubscribe();
    }
  }

  ngOnInit() {
    this.router.events.pipe(//Sirve para refrescar la pagina cada vez que se llega para que se actualicen los valores de la tabla
      filter(event => event instanceof NavigationEnd) //No se explicar mas ya que solo copie y pege de internet
    ).subscribe((event: any) =>{
      if (event.urlAfterRedirects === '/ranking'){
        this.subs.push(
          this.top.getTopusers() //Se obtienen los jugadores registrados
            .pipe(map(req => {
              let pos = 0;
              this.mejores = [];
              //Se compara para obtener cuales son los 5 mejores
              for (let x = 0; x < 5; x++) {
                for (let y = 0; y < req.length; y++) {
                  if (this.mejores.length === x) {
                    this.mejores.push(req[y]);
                    pos = y;
                  } else if (this.mejores[x].tiempo > req[y].tiempo) {
                    this.mejores[x] = req[y];
                    pos = y;
                  }
                }
                //Se elimina al mejor jugador de la variable "r"
                let nn = [];
                for (let v = 0; v < req.length; v++) {
                  if (v !== pos) {
                    nn.push(req[v]);
                  }
                }
                req = nn;
              }
              return 0;
            }))
            .subscribe()
        );
      }
    });
  }

  volver(){ //Retorna al usuario a la pagina de inicio
    this.router.navigate(['/inicio']);
  }

}
