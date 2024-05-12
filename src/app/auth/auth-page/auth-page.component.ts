import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';
import { CardModule } from 'primeng/card';
import { AuthService } from '../auth.service';
import { InputTextModule } from 'primeng/inputtext';
import { dateOfBirthValidator } from '../../shared/validators/dateOfBirthValidator';
import { passwordMatchValidator } from '../../shared/validators/passwordMatchValidator';

@Component({
  selector: 'app-auth-page',
  standalone: true,
  imports: [
    CardModule,
    TranslateModule,
    ButtonModule,
    ReactiveFormsModule,
    CalendarModule,
    InputTextModule,
  ],
  templateUrl: './auth-page.component.html',
  styleUrl: './auth-page.component.scss',
})
export class AuthPageComponent implements OnInit {
  protected signInForm!: FormGroup;
  protected signUpForm!: FormGroup;

  protected signInMode = true;
  protected today = new Date();
  protected minDate = new Date();

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.minDate.setFullYear(this.today.getFullYear() - 13);
    this.signInForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        Validators.pattern(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$/
        ),
      ]),
    });

    this.signUpForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            Validators.pattern(
              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$/
            ),
          ],
        ],
        confirmPassword: [
          '',
          Validators.required,
          Validators.pattern(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$/
          ),
        ],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        dateOfBirth: [null, [Validators.required, dateOfBirthValidator]],
      },
      { validator: passwordMatchValidator }
    );
  }

  loginUser() {
    this.authService.loginUser(this.signInForm);
  }

  registerUser() {
    this.authService.registerUser(this.signUpForm);
  }

  toggleMode() {
    this.signInMode = !this.signInMode;
  }
}
