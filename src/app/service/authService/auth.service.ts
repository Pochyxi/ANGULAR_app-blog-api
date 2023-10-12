import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {LoginResponseInterface} from "../../interfaces/loginResponseInterface";
import {BehaviorSubject} from "rxjs";
import {SignupInterface} from "../../interfaces/signupInterface";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  rootapiurl = environment.ROOTAPIURL;
  loginapiurl = environment.LOGINAPIURL;
  signupapiurl = environment.SIGNUPAPIURL;

  isAuth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  userNameOrEmail: BehaviorSubject<string> = new BehaviorSubject<string>("Ospite");


  constructor(private http: HttpClient) { }

  login(usernameOrEmail: string, password: string) {
    return this.http.post<LoginResponseInterface>(
      this.rootapiurl + this.loginapiurl,
      {
      usernameOrEmail,
      password
    })
  }

  signup(signupObject: SignupInterface) {
    return this.http.post<any>(
      this.rootapiurl + this.signupapiurl,
      signupObject,
      // Dato che la risposta non è un json ma un testo
      // Settiamo responseType a text per evitare errori
      {responseType: 'text' as 'json'})
  }

  logout() {
    // Rimuovi il token di autenticazione
    localStorage.removeItem('BearerToken');
    // Rimuovi il nome utente o email
    localStorage.removeItem('UserNameOrEmail');
    // Setta isAuth a false
    this.isAuth.next(false);
    // Setta userNameOrEmail a Ospite
    this.userNameOrEmail.next('Ospite');
  }

  setIsAuth(isAuth: boolean) {
    this.isAuth.next(isAuth);
  }

  setUserNameOrEmail(userNameOrEmail: string) {
    return this.userNameOrEmail.next(userNameOrEmail);
  }

}
