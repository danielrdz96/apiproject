import { ProjectsService } from './../projects.service';
import { ProjectsModalPage } from './../projects-modal/projects-modal.page';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';


@Component({
  selector: 'app-projects',
  templateUrl: './projects.page.html',
  styleUrls: ['./projects.page.scss'],
})
export class ProjectsPage implements OnInit {
  user:any;
  projects:any;

  constructor(private route: ActivatedRoute,
              private router: Router,
              public modalController: ModalController,
              public alertController: AlertController,
              public projectsService: ProjectsService) {

                this.route.queryParams.subscribe(params => {
                  this.user = params;
                  this.getProjects(this.user.id);
                  console.log(params);
                });
               }

  
  redirectToTools(form){
    this.router.navigate(['tools'], {queryParams :form.value});
   }
  async presentAlert(msg) {
    const alert = await this.alertController.create({
      header: 'Alert',
      message: msg,
      buttons: ['OK']
    });

    await alert.present();
  }

  getProjects(id){
    this.projectsService.read(this.user.id).subscribe(res=>{
      this.projects = res;
      console.log(this.projects);
    });
  }

  updateProject(form){
    console.log("Project to update");
    this.projectsService.update(form.value).subscribe(res => {
      console.log(res)
      this.presentAlert("updated");
    })
  }

  deleteProject(id){
    console.log("Contact to delete");
    this.projectsService.delete(id).subscribe(res => {
      console.log(res)
      this.presentAlert("deleted");
      this.getProjects(this.user.id);
    })
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: ProjectsModalPage,
      componentProps: {
        "user_id": this.user.id
      }
    });

    modal.onDidDismiss().then((dataReturned) => {
      if (dataReturned.data !== null) {
        console.log("contacts")
        console.log(dataReturned.data)
        this.projectsService.create(dataReturned.data).subscribe(res=>{
          this.getProjects(this.user.id);
          console.log(res);
        });
      }
    });

    return await modal.present();
  }








  ngOnInit() {
  }

}
