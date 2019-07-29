import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';


@Component({
  selector: 'app-tools-modal',
  templateUrl: './tools-modal.page.html',
  styleUrls: ['./tools-modal.page.scss'],
})
export class ToolsModalPage implements OnInit {

  public project_id:string;

  constructor(private modalController: ModalController,
              private navParams: NavParams) {
                this.project_id = this.navParams.data.project_id;
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
