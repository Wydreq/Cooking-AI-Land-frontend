import { AbstractControl, ValidationErrors } from '@angular/forms';

export function dateOfBirthValidator(
  control: AbstractControl
): ValidationErrors | null {
  const dateOfBirth: Date = control.value;
  if (dateOfBirth) {
    const today: Date = new Date();
    const minDateOfBirth: Date = new Date(
      today.getFullYear() - 13,
      today.getMonth(),
      today.getDate()
    );
    if (dateOfBirth >= minDateOfBirth) {
      return { dateOfBirthInvalid: true };
    }
  }
  return null;
}
