import { Component, OnInit } from '@angular/core';
import { Router } from  "@angular/router";
import { AuthService } from '../auth.service';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  constructor(private  authService:  AuthService,
              private  router:  Router,
              public alertController: AlertController) { }

  ngOnInit() {
  }

  async presentAlert() {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: 'Email or password incorrect',
      buttons: ['OK']
    });

    await alert.present();
  }

  login(form){
    //console.log(form.value);
    
    this.authService.login(form.value).subscribe((res)=>{
      //this.router.navigateByUrl('home');
      console.log(res);
      if(res==="error"){
        this.presentAlert();
      }
      else{
        console.log(res);
        this.router.navigate(['principal'], {queryParams :res});
      }
    });
    
  }
}
