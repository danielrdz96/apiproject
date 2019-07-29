import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-accounts-modal',
  templateUrl: './accounts-modal.page.html',
  styleUrls: ['./accounts-modal.page.scss'],
})
export class AccountsModalPage implements OnInit {
  public activity_id:string;

  constructor(private modalController: ModalController,
              private navParams: NavParams) { 
                this.activity_id = this.navParams.data.activity_id;
              }

  ngOnInit() {
  }

  async submitForm(form){
    console.log("modal")
    console.log(form.value)
    await this.modalController.dismiss(form.value); 
  }

  async closeModal() {
    const onClosedData = null;
    await this.modalController.dismiss(onClosedData);
  }


}
