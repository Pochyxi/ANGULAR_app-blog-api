import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';
import { LoginResponseInterface } from '../../interfaces/loginResponseInterface';
import { BehaviorSubject } from 'rxjs';
import { SignupInterface } from '../../interfaces/signupInterface';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  rootapiurl = environment.ROOTAPIURL;
  loginapiurl = environment.LOGINAPIURL;
  signupapiurl = environment.SIGNUPAPIURL;

  isAuth: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  roles: BehaviorSubject<string[]> = new BehaviorSubject<string[]>([]);
  userNameOrEmail: BehaviorSubject<string> = new BehaviorSubject<string>(
    'Ospite'
  );

  constructor(
    private http: HttpClient,
    private router: Router,
    private jwtHelper: JwtHelperService
  ) {
    // Se il token di autenticazione è presente
    if (localStorage.getItem('BearerToken')) {
      // Setta isAuth a true
      this.setIsAuth(true);

      // Setta userNameOrEmail con il nome utente o email
      this.setUserNameOrEmail(localStorage.getItem('UserNameOrEmail')!);

      // Setta i ruoli
      this.getRoles();
    }
  }

  login(usernameOrEmail: string, password: string) {
    this.http
      .post<LoginResponseInterface>(this.rootapiurl + this.loginapiurl, {
        usernameOrEmail,
        password,
      })
      .subscribe((res) => {
        // Settiamo il token di autenticazione
        localStorage.setItem('BearerToken', res.accessToken);

        // Settiamo il nome utente o email
        localStorage.setItem('UserNameOrEmail', usernameOrEmail);

        console.log('BearerToken: ' + localStorage.getItem('BearerToken'));

        console.log(
          'UsernameOrEmail: ' + localStorage.getItem('UserNameOrEmail')
        );

        // Settato dall'interceptor
        console.log('X-XSRF-TOKEN: ' + localStorage.getItem('X-XSRF-TOKEN'));

        // Settiamo isAuth a true
        this.setIsAuth(true);

        // Settiamo userNameOrEmail con il nome utente o email
        this.setUserNameOrEmail(localStorage.getItem('UserNameOrEmail')!);

        // Reindirizziamo l'utente alla home
        this.router.navigate(['/']);

        this.getRoles();
      });
  }

  getRoles() {
    this.http
      .get<string>(this.rootapiurl + '/auth/roles', {
        responseType: 'text' as 'json',
      })
      .subscribe((roles: string) => {
        this.roles.next(roles.split(','));
      });
  }

  signup(signupObject: SignupInterface) {
    return this.http.post<any>(
      this.rootapiurl + this.signupapiurl,
      signupObject,
      // Dato che la risposta non è un json ma un testo
      // Settiamo responseType a text per evitare errori
      { responseType: 'text' as 'json' }
    );
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

    this.getRoles();
  }

  setIsAuth(isAuth: boolean) {
    this.isAuth.next(isAuth);
  }

  setUserNameOrEmail(userNameOrEmail: string) {
    return this.userNameOrEmail.next(userNameOrEmail);
  }
}
