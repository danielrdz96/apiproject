import { ContactsServiceService } from './../contacts-service.service';
import { ContactsModalPage } from './../contacts-modal/contacts-modal.page';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.page.html',
  styleUrls: ['./contacts.page.scss'],
})
export class ContactsPage implements OnInit {

  user: any;
  contacts: any;
  constructor(private route: ActivatedRoute,
              private router: Router,
              public modalController: ModalController,
              public contactsService: ContactsServiceService,
              public alertController: AlertController) {
    this.route.queryParams.subscribe(params => {
      this.user = params;
      this.getContacts(this.user.id);
      console.log(params);
    });

   

   }

   redirectToActivities(form){
    this.router.navigate(['activities'], {queryParams :form.value});
   }
  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

   getContacts(id){
    this.contactsService.read(this.user.id).subscribe(res=>{
      this.contacts = res;
      console.log(this.contacts);
    });
   }
   updateContact(form){
     console.log("Contact to update");
     this.contactsService.update(form.value).subscribe(res => {
       console.log(res)
       this.presentAlert("updated");
     })
   }
   deleteContact(id){
    console.log("Contact to delete");
    this.contactsService.delete(id).subscribe(res => {
      console.log(res)
      this.presentAlert("deleted");
      this.getContacts(this.user.id);
    })
  }

   async openModal() {
      const modal = await this.modalController.create({
        component: ContactsModalPage,
        componentProps: {
          "user_id": this.user.id
        }
      });
  
      modal.onDidDismiss().then((dataReturned) => {
        console.log(dataReturned===null);
        if (dataReturned.data !== null) {
          console.log("contacts")
          console.log(dataReturned.data)
          this.contactsService.create(dataReturned.data).subscribe(res=>{
            this.getContacts(this.user.id);
            console.log(res);
          });
        }
      });
  
      return await modal.present();
    }

  ngOnInit() {
  }


}
