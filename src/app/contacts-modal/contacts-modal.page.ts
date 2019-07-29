import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-contacts-modal',
  templateUrl: './contacts-modal.page.html',
  styleUrls: ['./contacts-modal.page.scss'],
})
export class ContactsModalPage implements OnInit {

  public user_id:string;

  constructor(private modalController: ModalController,
              private navParams: NavParams) {
                this.user_id = this.navParams.data.user_id;
               }



  async closeModal() {
    const onClosedData = null;
    await this.modalController.dismiss(onClosedData);
  }
  async submitForm(form){
    console.log("modal")
    console.log(form.value)
    await this.modalController.dismiss(form.value);
    
  }
  ngOnInit() {
   
  }

}
