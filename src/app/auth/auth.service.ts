import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  registerUser(form: FormGroup) {
    this.http
      .post(`${environment.backendUrl}/account/register`, form.value)
      .subscribe(
        (res) => console.log(res),
        (err) => {
          console.error(err);
        }
      );
  }

  loginUser(form: FormGroup) {
    this.http
      .post(`${environment.backendUrl}/account/login`, form.value)
      .subscribe(
        (res) => console.log(res),
        (err) => console.error(err)
      );
  }
}
