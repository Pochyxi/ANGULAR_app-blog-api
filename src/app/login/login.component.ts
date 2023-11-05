import { Component, OnDestroy, OnInit } from '@angular/core';
import { LoginInterface } from '../interfaces/loginInterface';
import { AuthService } from '../service/authService/auth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { SignupInterface } from '../interfaces/signupInterface';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  // Pattern TakeUntil on Destroy
  private destroy$ = new Subject<void>();

  isLogin: boolean = false;

  loginObject: LoginInterface = {
    usernameOrEmail: '',
    password: '',
  };

  signupObject: SignupInterface = {
    name: '',
    username: '',
    email: '',
    password: '',
  };

  paswwordConfirm: string = '';

  constructor(
    private auth$: AuthService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Sottoscrizione all'observable url
    this.route.url
      .pipe(
        // Pattern TakeUntil on Destroy
        takeUntil(this.destroy$)
      )
      .subscribe((segments) => {
        console.log(segments.join('/'));
        if (segments.join('/') === 'login') {
          this.isLogin = true;
          console.log(this.isLogin);
        }
      });
  }

  ngOnDestroy() {
    // Pattern TakeUntil on Destroy
    this.destroy$.next();
    this.destroy$.complete();
  }

  login(
    usernameOrEmail: string = this.loginObject.usernameOrEmail,
    password: string = this.loginObject.password
  ) {
    this.auth$.login(usernameOrEmail, password);
  }

  signup() {
    this.auth$.signup(this.signupObject).subscribe((res) => {
      console.log(res);
      if (res === 'Utente registrato con successo') {
        this.login(this.signupObject.email, this.signupObject.password);
      }
    });
  }
}
