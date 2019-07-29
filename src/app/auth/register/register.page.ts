import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  constructor(private  authService:  AuthService, 
              private  router:  Router, 
              public alertController: AlertController) { }

  ngOnInit() {
  }

  async presentAlert(message) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: message,
      buttons: ['OK']
    });

    await alert.present();
  }

  register(form) {
    this.authService.register(form.value).subscribe((res:any) => {
      let message="";
      if(res!=null){
        if(res.error){
          console.log("error")
          console.log(res);
          
          if(res.error.email){
            message += res.error.email[0] +"\n";
          }
          if(res.error.name){
            message += res.error.name[0] +"\n";
          }
          
          this.presentAlert(message);
        }
        else{
          this.router.navigate(['principal'], {queryParams :res});
        }
        
      }
    });
  }

}
