import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { Observable, BehaviorSubject } from  'rxjs';
import { tap } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ProjectsService {

  AUTH_SERVER_ADDRESS  =  'https://obscure-inlet-80569.herokuapp.com/api/project';
	myheaders = new HttpHeaders({
		'Content-Type': 'application/json',
		'Accept': 'application/json'
  });
  
  constructor(private  httpClient:  HttpClient) { }


  create(project): Observable<any> {
    // tslint:disable-next-line: indent
    
    const data = {
      "name": project.name,
      "methodology": project.methodology,
      "user_id": project.user_id
    }
    //console.log(data);
    
    //console.log(contact)
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/create`, data, {headers: this.myheaders}).pipe(
      tap(async (res ) => {
        console.log(res);
      
      })

    );
  }

  read(id): Observable<any> {
    // tslint:disable-next-line: indent
    //console.log(data);
    //console.log(contact)
    const data = {
      "id":id
    }
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/read`, data, {headers: this.myheaders}).pipe(
      tap(async (res ) => {
        
      
      })

    );
  }

  update(project): Observable<any> {
    // tslint:disable-next-line: indent
    //console.log(data);
    //console.log(contact)
    const data = {
      "name": project.name,
      "methodology": project.methodology,
      "id": project.id
    }
    console.log(data)
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/update`, data, {headers: this.myheaders}).pipe(
      tap(async (res) => {
        
      
      })

    );
  }

  delete(id): Observable<any> {
    // tslint:disable-next-line: indent
    //console.log(data);
    //console.log(contact)
    const data = {
      "id":id
    }
    return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/delete`, data, {headers: this.myheaders}).pipe(
      tap(async (res ) => {
        
      
      })

    );
  }


}
