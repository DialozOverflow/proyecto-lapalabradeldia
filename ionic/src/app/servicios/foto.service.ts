import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class FotoService {

  constructor() { }

  //Funcion que se encarga de llamar la camara
  async tomarfoto(cualquiercosa: any) {
    const foto = await Camera.getPhoto({
      quality: 90,
      allowEditing: true,
      resultType: CameraResultType.Uri,
      source: CameraSource.Camera
    });
    return foto.base64String;
  }
}
