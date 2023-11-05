import {
  Component,
  OnChanges,
  OnInit,
  SimpleChange,
  SimpleChanges,
} from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { AuthService } from '../service/authService/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { RouteTrackingServiceService } from '../route-tracking-service.service';

@Component({
  selector: 'app-nav-off-canvas',
  templateUrl: './nav-off-canvas.component.html',
  styleUrls: ['./nav-off-canvas.component.scss'],
})
export class NavOffCanvasComponent implements OnInit {
  // Pattern TakeUntil on Destroy
  private destroy$ = new Subject<void>();

  activeLink = '';

  // Booleano che indica se l'utente è autenticato o meno(Service)
  isAuth: boolean = false;

  // Stringa che indica il nome dell'utente(Service)
  userNameOrEmail: string = 'Ospite';

  roles: string[] = [];

  // Iniezione del service AuthService
  constructor(
    private auth$: AuthService,
    private route: ActivatedRoute,
    private routerTracker$: RouteTrackingServiceService
  ) {}

  // Inizializzazione del componente
  ngOnInit(): void {
    this.route.url
      .pipe(
        // Pattern TakeUntil on Destroy
        takeUntil(this.destroy$)
      )
      .subscribe((segments) => {
        this.routerTracker$.currentUrl$.subscribe((url) => {
          this.activeLink = url;
          console.log(this.activeLink);
        });

        this.auth$.roles.subscribe((roles) => {
          this.roles = roles;
          console.log(roles);
        });
      });

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
    this.auth$.isAuth
      .pipe(
        // Pattern TakeUntil on Destroy
        takeUntil(this.destroy$)
      )
      // sottoiscrizione al BehaviorSubject isAuth
      .subscribe(
        // Settiamo isAuth con il valore del BehaviorSubject isAuth
        (res) => {
          this.isAuth = res;
        }
      );

    this.auth$.userNameOrEmail
      .pipe(takeUntil(this.destroy$))
      .subscribe((res) => {
        this.userNameOrEmail = res;
      });
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  logout() {
    this.auth$.logout();
  }
}
