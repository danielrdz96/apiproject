import { ToolsModalPage } from './../tools-modal/tools-modal.page';
import { ToolsService } from './../tools.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-tools',
  templateUrl: './tools.page.html',
  styleUrls: ['./tools.page.scss'],
})
export class ToolsPage implements OnInit {

  project:any;
  tools: any;
  constructor(private route: ActivatedRoute,
              private router: Router,
              public modalController: ModalController,
              public alertController: AlertController,
              public toolsService: ToolsService) {

                this.route.queryParams.subscribe(params => {
                  this.project = params;
                  this.getTools(this.project.id);
                  console.log(params);
                });
               }

  getTools(id){
    this.toolsService.read(this.project.id).subscribe(res=>{
      this.tools = res;
      console.log(this.tools);
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

  updateTool(form){
    console.log("Contact to update");
    this.toolsService.update(form.value).subscribe(res => {
      console.log(res)
      this.presentAlert("updated");
    })
  }

  deleteTool(id){
    console.log("Contact to delete");
    this.toolsService.delete(id).subscribe(res => {
      console.log(res)
      this.presentAlert("deleted");
      this.getTools(this.project.id);
    })
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ToolsModalPage,
      componentProps: {
        "project_id": this.project.id
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data !== null) {
        console.log("contacts")
        console.log(dataReturned.data)
        
        this.toolsService.create(dataReturned.data).subscribe(res=>{
          this.getTools(this.project.id);
          console.log(res);
        });
        
      }
    });

    return await modal.present();
  }




  ngOnInit() {
  }

}
