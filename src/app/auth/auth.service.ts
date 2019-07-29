import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from  '@angular/common/http';
import { Observable, BehaviorSubject } from  'rxjs';
import { tap } from 'rxjs/operators';
//import { Storage } from '@ionic/storage';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  	AUTH_SERVER_ADDRESS  =  'http://obscure-inlet-80569.herokuapp.com';
	myheaders = new HttpHeaders({
		'Content-Type': 'application/json',
		'Accept': 'application/json'
	});
  constructor(private  httpClient:  HttpClient) {
	
   }


	register(user): Observable<any> {
			// tslint:disable-next-line: indent
			const data = {
				"name": user.name,
				"email": user.email,
				"password": user.password
			}
			return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/api/register`, data, {headers: this.myheaders}).pipe(
				tap(async (res ) => {

					

					
					/*
						if (res.user) {
						await this.storage.set("ACCESS_TOKEN", res.user.access_token);
						await this.storage.set("EXPIRES_IN", res.user.expires_in);
						this.authSubject.next(true);
						}
					*/
				
				})

			);
	}

	login(user): Observable<any> {
		const data = {
			"email": user.email,
			"password": user.password
		}
		
		return this.httpClient.post(`${this.AUTH_SERVER_ADDRESS}/api/login`, data, {headers: this.myheaders}).pipe(
		  tap(async (res) => {
			  
			
			/*
			if (res.user) {
			  await this.storage.set("ACCESS_TOKEN", res.user.access_token);
			  await this.storage.set("EXPIRES_IN", res.user.expires_in);
			  this.authSubject.next(true);
			}
			*/
		  })
		);
	  }
}
