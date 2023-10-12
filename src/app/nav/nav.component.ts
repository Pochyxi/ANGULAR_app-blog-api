import {Component, OnDestroy, OnInit} from '@angular/core';
import {AuthService} from "../service/authService/auth.service";
import {Subject, takeUntil} from "rxjs";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent implements OnInit, OnDestroy {

  // Pattern TakeUntil on Destroy
  private destroy$ = new Subject<void>();

  // Booleano che indica se l'utente è autenticato o meno(Service)
  isAuth: boolean = false;

  // Stringa che indica il nome dell'utente(Service)
  userNameOrEmail: string = "Ospite";


  // Iniezione del service AuthService
  constructor(private auth$: AuthService) {
  }

  // Inizializzazione del componente
  ngOnInit(): void {

    // Se è presente il token di autenticazione
    if (localStorage.getItem('BearerToken')) {
      // Setta isAuth a true
      this.auth$.setIsAuth(true);

      // Se è presente il nome utente o email
      if (localStorage.getItem('UserNameOrEmail')) {
        // Setta userNameOrEmail con il nome utente o email
        this.auth$.setUserNameOrEmail(localStorage.getItem('UserNameOrEmail')!);
      }
    // Altrimenti
    } else {
      // Setta isAuth a false
      this.auth$.setIsAuth(false);
      // Setta userNameOrEmail a Ospite
      localStorage.setItem('UserNameOrEmail', 'Ospite');
    }

    // Sottoscrizione al BehaviorSubject isAuth
    this.auth$.isAuth.pipe(
      // Pattern TakeUntil on Destroy
      takeUntil(this.destroy$))
        // sottoiscrizione al BehaviorSubject isAuth
        .subscribe(
          // Settiamo isAuth con il valore del BehaviorSubject isAuth
          (res) => {
            this.isAuth = res;
          }
        )

    this.auth$.userNameOrEmail.pipe(
      takeUntil(this.destroy$))
      .subscribe(
        (res) => {
          this.userNameOrEmail = res;
        })
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  logout() {
    this.auth$.logout();
  }
}
