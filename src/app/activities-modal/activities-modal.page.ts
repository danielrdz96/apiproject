import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-activities-modal',
  templateUrl: './activities-modal.page.html',
  styleUrls: ['./activities-modal.page.scss'],
})
export class ActivitiesModalPage implements OnInit {

  public contact_id:string;
  constructor(private modalController: ModalController,
              private navParams: NavParams) { 
                this.contact_id = this.navParams.data.contact_id;
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
