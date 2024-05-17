import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { FormGroup } from '@angular/forms';
import { IToken } from '../shared/interfaces/token.interface';
import { BehaviorSubject } from 'rxjs';
import { IUser } from '../shared/interfaces/user.interface';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { PopupState } from '../shared/types/PopupState';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  $user = new BehaviorSubject<IUser | null>(null);

  constructor(
    private http: HttpClient,
    private router: Router,
    private messageService: MessageService
  ) {}

  registerUser(form: FormGroup) {
    this.http
      .post(`${environment.backendUrl}/account/register`, form.value)
      .subscribe(
        () => {
          this.messageService.add({
            severity: PopupState.OK,
            summary: 'Success',
            detail: 'Account has been created',
          });
        },
        (err) => {
          console.error(err);
        }
      );
  }

  loginUser(form: FormGroup) {
    this.http
      .post<IToken>(`${environment.backendUrl}/account/login`, form.value, {
        withCredentials: true,
      })
      .subscribe(
        (res) => {
          console.log(res);
          this.http
            .get<IUser>(`${environment.backendUrl}/account/me`)
            .subscribe((user) => {
              console.log(user);
              this.$user.next(user);
              localStorage.setItem('tokenExpirationDate', res.expirationDate);
              localStorage.setItem('user', JSON.stringify(user));
              this.router.navigate(['/']);
              this.messageService.add({
                severity: PopupState.OK,
                summary: 'Success',
                detail: 'Your are logged in',
              });
            });
        },
        (err) => console.error(err)
      );
  }

  autoLogin() {
    const lsUser = localStorage.getItem('user');
    const tokenExpirationDate = localStorage.getItem('tokenExpirationDate');
    if (tokenExpirationDate) {
      const expirationDate = new Date(tokenExpirationDate);
      const nowDate = new Date();
      if (nowDate.getTime() < expirationDate.getTime()) {
        if (lsUser) {
          this.$user.next(JSON.parse(lsUser));
        } else {
          localStorage.removeItem('tokenExpirationDate');
          this.$user.next(null);
        }
      } else {
        localStorage.removeItem('user');
        localStorage.removeItem('tokenExpirationDate');
        this.$user.next(null);
      }
    } else {
      localStorage.removeItem('user');
      this.$user.next(null);
    }
  }

  logout() {
    this.http.post(`${environment.backendUrl}/account/logout`, {}).subscribe(
      () => {
        localStorage.removeItem('user');
        localStorage.removeItem('tokenExpirationDate');
        this.$user.next(null);
        this.router.navigate(['/auth']);
        this.messageService.add({
          severity: PopupState.OK,
          summary: 'Success',
          detail: 'Succesfully logged out',
        });
      },
      (err) => console.error(err)
    );
  }
}
