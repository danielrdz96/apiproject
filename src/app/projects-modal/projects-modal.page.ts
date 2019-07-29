import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';

@Component({
  selector: 'app-projects-modal',
  templateUrl: './projects-modal.page.html',
  styleUrls: ['./projects-modal.page.scss'],
})
export class ProjectsModalPage implements OnInit {

  public user_id:string;
  constructor(private modalController: ModalController,
              private navParams: NavParams) {
                this.user_id = this.navParams.data.user_id;
               }

  ngOnInit() {
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

}
