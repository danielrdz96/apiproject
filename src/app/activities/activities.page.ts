import { ActivitiesService } from './../activities.service';
import { ActivitiesModalPage } from './../activities-modal/activities-modal.page';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-activities',
  templateUrl: './activities.page.html',
  styleUrls: ['./activities.page.scss'],
})
export class ActivitiesPage implements OnInit {

  contact:any;
  activities:any;
  constructor(
              private route: ActivatedRoute,
              private router: Router,
              public modalController: ModalController,
              public alertController: AlertController,
              public activitiesService: ActivitiesService) {

                this.route.queryParams.subscribe(params => {
                  this.contact = params;
                  this.getActivities(this.contact.id);
                  console.log(params);
                });

              }
  
              

  getActivities(id){
    this.activitiesService.read(this.contact.id).subscribe(res=>{
      this.activities = res;
      console.log(this.activities);
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


  updateActivity(form){
    console.log("Contact to update");
    this.activitiesService.update(form.value).subscribe(res => {
      console.log(res)
      this.presentAlert("updated");
    })
  }

  deleteActivity(id){
    console.log("Contact to delete");
    this.activitiesService.delete(id).subscribe(res => {
      console.log(res)
      this.presentAlert("deleted");
      this.getActivities(this.contact.id);
    })
  }

  
  redirectToAccounts(form){
    this.router.navigate(['accounts'], {queryParams :form.value});
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ActivitiesModalPage,
      componentProps: {
        "contact_id": this.contact.id
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data !== null) {
        console.log("contacts")
        console.log(dataReturned.data)
        
        this.activitiesService.create(dataReturned.data).subscribe(res=>{
          this.getActivities(this.contact.id);
          console.log(res);
        });
        
      }
    });

    return await modal.present();
  }
  ngOnInit() {
  }

}
