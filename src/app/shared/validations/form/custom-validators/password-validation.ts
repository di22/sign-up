import {AbstractControl, ValidationErrors, ValidatorFn} from "@angular/forms";
import {lettersExistRegex} from "../../../util";

export const passwordStrengthValidator = (): ValidatorFn => {
  return (control: AbstractControl) : ValidationErrors | null => {

    const value: string = control.value;

    if (!value) return null;

    const firstname: string = control.parent?.get('firstName')?.value;
    const lastname: string = control.parent?.get('lastName')?.value;

    const hasUpperCase: boolean = /[A-Z]+/.test(value);
    const hasLowerCase: boolean = /[a-z]+/.test(value);


    const passwordValid: boolean = hasUpperCase && hasLowerCase &&
      !lettersExistRegex(firstname, value) && !lettersExistRegex(lastname, value);

    return !passwordValid ? {passwordStrength: true} : null;
  }
}
