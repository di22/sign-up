import {Component, DestroyRef, inject, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {InputComponent} from "../../shared/components/form/input/input.component";
import {FormHelperService} from "../../shared/services/form-helper.service";
import {ControlTypes} from "../../shared/constants/control-types";
import {PasswordInputComponent} from "../../shared/components/form/input/pasword-input/password-input.component";
import {Email_Pattern, English_Characters_Pattern} from "../../shared/constants/regex-patterns";
import {passwordStrengthValidator} from "../../shared/validations/form/custom-validators/password-validation";
import {AuthRepository} from "../../data/auth/auth.repository";
import {takeUntilDestroyed} from "@angular/core/rxjs-interop";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, InputComponent, PasswordInputComponent],
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  destroyRef = inject(DestroyRef);
  form: FormGroup;
  firstName: FormControl<string>;
  lastName: FormControl<string>;
  email: FormControl<string>;
  password: FormControl<string>;
  controlTypes = ControlTypes;
  passwordErrorMessages = {
    'minlength': 'Password must be at least 8 characters, and you can add numbers (optional)',
    'passwordStrength': 'You must follow the below instructions for strong password'
  }
  constructor(private formBuilder: FormBuilder,
              private router: Router,
              private formHelperService: FormHelperService,
              private authRepository: AuthRepository) {}

  ngOnInit() {
    this.initForm();
  }

  initForm(): void {
    this.form = this.formBuilder.group({
      firstName: ['', [Validators.required, Validators.pattern(English_Characters_Pattern)]],
      lastName: ['', [Validators.required, Validators.pattern(English_Characters_Pattern)]],
      email: ['', [Validators.required, Validators.pattern(Email_Pattern)]],
      password: ['', [Validators.required, Validators.minLength(8), passwordStrengthValidator()]]
    });

    this.firstName = <FormControl>this.form.get('firstName');
    this.lastName = <FormControl>this.form.get('lastName');
    this.email = <FormControl>this.form.get('email');
    this.password = <FormControl>this.form.get('password');
  }

  validate(): void {
    if (this.form.invalid) this.formHelperService.validateAllFormFields(this.form);
    else this.signup();
  }

  signup(): void {
    this.authRepository.signup(this.form.value).pipe(takeUntilDestroyed(this.destroyRef)).subscribe(res => {
      this.router.navigateByUrl('/success');
    });
  }
}
