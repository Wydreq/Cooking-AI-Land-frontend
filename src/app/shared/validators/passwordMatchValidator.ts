import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export const passwordMatchValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const passwordControl = control.get('password');
  const confirmPasswordControl = control.get('confirmPassword');

  if (
    passwordControl &&
    confirmPasswordControl &&
    passwordControl.value !== confirmPasswordControl.value
  ) {
    return { passwordsNotMatch: true };
  }

  return null;
};
