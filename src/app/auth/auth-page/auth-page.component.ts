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

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  ngOnInit(): void {
    this.signInForm = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
    });

    this.signUpForm = this.fb.group(
      {
        email: ['', [Validators.required, Validators.email]],
        password: [
          '',
          [
            Validators.required,
            Validators.minLength(6),
            this.passwordPatternValidator(),
          ],
        ],
        confirmPassword: ['', Validators.required],
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        dateOfBirth: ['', [Validators.required]],
      },
      { validator: this.passwordMatchValidator }
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

  private passwordPatternValidator() {
    const pattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^\da-zA-Z]).{6,}$/;
    return (control: AbstractControl) => {
      if (control.value && !pattern.test(control.value)) {
        return { invalidPassword: true };
      }
      return null;
    };
  }

  private passwordMatchValidator(form: FormGroup) {
    const password = form.get('password');
    const confirmPassword = form.get('confirmPassword');

    if (password!.value !== confirmPassword!.value) {
      confirmPassword!.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword!.setErrors(null);
    }
  }
}
