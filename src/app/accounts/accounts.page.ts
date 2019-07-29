import { AccountsModalPage } from './../accounts-modal/accounts-modal.page';
import { AccountsService } from './../accounts.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.page.html',
  styleUrls: ['./accounts.page.scss'],
})
export class AccountsPage implements OnInit {

  activity: any;
  accounts: any;
  constructor(private route: ActivatedRoute,
              private router: Router,
              public modalController: ModalController,
              public alertController: AlertController,
              public accountsService: AccountsService) {

                this.route.queryParams.subscribe(params => {
                  this.activity = params;
                  this.getAccounts(this.activity.id);
                  console.log(params);
                });
              }
          
  getAccounts(id){
    this.accountsService.read(this.activity.id).subscribe(res => {
      this.accounts = res;
      console.log(this.accounts);
    });
  }

  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  updateAccount(form){
    console.log("Account to update");
    this.accountsService.update(form.value).subscribe(res => {
      console.log(res)
      this.presentAlert("updated");
    })
  }

  deleteAccount(id){
    console.log("account to delete");
    this.accountsService.delete(id).subscribe(res => {
      console.log(res)
      this.presentAlert("deleted");
      this.getAccounts(this.activity.id);
    })
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: AccountsModalPage,
      componentProps: {
        "activity_id": this.activity.id
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data !== null) {
        console.log("contacts")
        console.log(dataReturned.data)
        
        this.accountsService.create(dataReturned.data).subscribe(res=>{
          this.getAccounts(this.activity.id);
          console.log(res);
        });
        
      }
      else{
        console.log("no paso");
      }
    });

    return await modal.present();
  }

  ngOnInit() {
  }

}
