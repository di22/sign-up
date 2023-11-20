import {ComponentFixture, TestBed} from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormHelperService} from "../../shared/services/form-helper.service";
import {AuthRepository} from "../../data/auth/auth.repository";
import {of} from "rxjs";
import {InputComponent} from "../../shared/components/form/input/input.component";
import {By} from "@angular/platform-browser";
import {
  ControlErrorMessageComponent
} from "../../shared/components/form/control-error-message/control-error-message.component";

describe('SignupComponent', () => {
  let fixture: ComponentFixture<SignUpComponent>;
  let component: SignUpComponent;
  let formHelperService: FormHelperService;
  let authRepository: AuthRepository;
  let compiled: HTMLElement;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpComponent, HttpClientTestingModule],
      providers: [FormHelperService, AuthRepository]
    }).compileComponents();
  });

  beforeEach(() => {
    formHelperService = TestBed.inject(FormHelperService);
    authRepository = TestBed.inject(AuthRepository);
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
    compiled = fixture.nativeElement as HTMLElement;

    fixture.detectChanges();
  });

  it('should create the signup component', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    expect(compiled.querySelector('header')?.textContent).toContain('Sign up');
  });

  it('should init the form', () => {
    expect(component.form).toBeTruthy();
  });

  it('should not render error message', () => {
    expect(compiled.querySelector('.message-error')).toBeFalsy();
  });

  it('should render four fields', () => {
    expect(Object.keys(component.form.controls).length).toEqual(4);
    expect(component.form.contains('firstName')).toBeTruthy();
    expect(component.form.contains('lastName')).toBeTruthy();
    expect(component.form.contains('email')).toBeTruthy();
    expect(component.form.contains('password')).toBeTruthy();

    expect(compiled.querySelectorAll('app-input')?.length).toEqual(3);
    expect(compiled.querySelectorAll('app-input-password')?.length).toEqual(1);
  });

  it('should fire form validation', () => {
    jest.spyOn(component, 'validate');
    jest.spyOn(component, 'signup');
    jest.spyOn(formHelperService, 'validateAllFormFields');

    const submitButton = compiled.querySelector('button') as HTMLButtonElement;

    submitButton.click();
    fixture.detectChanges();

    expect(component.form.invalid).toBeTruthy();
    expect(formHelperService.validateAllFormFields).toHaveBeenCalled();
    expect(component.signup).toHaveBeenCalledTimes(0);
  });

  it('should show email pattern error', () => {
    jest.spyOn(component, 'signup');
    jest.spyOn(formHelperService, 'validateAllFormFields');

    const formValue = {
      firstName: 'diaa',
      lastName: 'hammad',
      email: 'diaa@hammad',
      password: 'Ali1234567'
    }
    component.form.patchValue(formValue);
    fixture.detectChanges();

    const submitButton = compiled.querySelector('button') as HTMLButtonElement;

    submitButton.click();
    fixture.detectChanges();

    const errorMessage = compiled.querySelector('.message-error') as HTMLSpanElement;

    expect(errorMessage).toBeTruthy();
    expect(errorMessage.textContent?.trim()).toEqual('You must enter correct email pattern');
    expect(component.form.invalid).toBeTruthy();
    expect(component.email.invalid).toBeTruthy();
    expect(formHelperService.validateAllFormFields).toHaveBeenCalled();
    expect(component.signup).toHaveBeenCalledTimes(0);
  });

  it('should render password strength error based on first and last name values changes', () => {
    const formValue = {
      email: 'diaa@hammad.com',
      password: 'Diaa1234567'
    }
    component.form.patchValue(formValue);
    fixture.detectChanges();

    const submitButton = compiled.querySelector('button') as HTMLButtonElement;

    submitButton.click();
    fixture.detectChanges();

    let errorMessage: ControlErrorMessageComponent = fixture.debugElement.query(By.css('[data-test="password-error"]')).componentInstance;

    expect(errorMessage.error).toBeFalsy();
    expect(component.form.invalid).toBeTruthy();
    expect(component.password.valid).toBeTruthy();
/////////
    component.firstName.setValue('diaa');
    component.lastName.setValue('hammad');
    fixture.detectChanges();

    errorMessage = fixture.debugElement.query(By.css('[data-test="password-error"]')).componentInstance;

    expect(errorMessage.error).toBeTruthy();
    expect(errorMessage.error).toEqual('You must follow the below instructions for strong password');
    expect(component.form.invalid).toBeTruthy();
    expect(component.password.invalid).toBeTruthy();
/////////
    component.firstName.setValue('moha');
    component.lastName.setValue('hammad');
    fixture.detectChanges();

    errorMessage = fixture.debugElement.query(By.css('[data-test="password-error"]')).componentInstance;

    expect(errorMessage.error).toBeFalsy();
    expect(component.form.valid).toBeTruthy();
    expect(component.password.valid).toBeTruthy();
  });

  it('should show password length and strength errors', () => {
    jest.spyOn(component, 'signup');
    jest.spyOn(formHelperService, 'validateAllFormFields');

    const formValue = {
      firstName: 'diaa',
      lastName: 'hammad',
      email: 'diaa@hammad.com',
      password: '1234567'
    }
    component.form.patchValue(formValue);
    fixture.detectChanges();

    const submitButton = compiled.querySelector('button') as HTMLButtonElement;

    submitButton.click();
    fixture.detectChanges();

    // length error
    const lengthErrorMessage = compiled.querySelector('.message-error') as HTMLSpanElement;

    expect(lengthErrorMessage).toBeTruthy();
    expect(lengthErrorMessage.textContent?.trim()).toEqual('Password must be at least 8 characters, and you can add numbers (optional)');
    expect(component.form.invalid).toBeTruthy();
    expect(component.password.invalid).toBeTruthy();
    expect(formHelperService.validateAllFormFields).toHaveBeenCalled();
    expect(component.signup).toHaveBeenCalledTimes(0);

    // strength error
    let password = 'ali1234567'
    component.password.patchValue(password);
    fixture.detectChanges();

    let strengthErrorMessage = compiled.querySelector('.message-error') as HTMLSpanElement;

    expect(strengthErrorMessage).toBeTruthy();
    expect(strengthErrorMessage.textContent?.trim()).toEqual('You must follow the below instructions for strong password');
    expect(component.form.invalid).toBeTruthy();
    expect(component.password.invalid).toBeTruthy();
    expect(formHelperService.validateAllFormFields).toHaveBeenCalled();
    expect(component.signup).toHaveBeenCalledTimes(0);

    // strength error for ensure name not included
    password = 'diaaA1234567'
    component.password.patchValue(password);
    fixture.detectChanges();

    strengthErrorMessage = compiled.querySelector('.message-error') as HTMLSpanElement;

    expect(strengthErrorMessage).toBeTruthy();
    expect(strengthErrorMessage.textContent?.trim()).toEqual('You must follow the below instructions for strong password');
    expect(component.form.invalid).toBeTruthy();
    expect(component.password.invalid).toBeTruthy();
    expect(formHelperService.validateAllFormFields).toHaveBeenCalled();
    expect(component.signup).toHaveBeenCalledTimes(0);
  });

  it('should execute login', () => {
    const mockedResponse = {
      firstName: 'diaa',
      lastName: 'hammad',
      email: 'diaa@hammad.com',
      _id: '123456789'
    }

    jest.spyOn(component, 'signup');
    jest.spyOn(formHelperService, 'validateAllFormFields');
    jest.spyOn(authRepository, 'signup').mockReturnValue(of(mockedResponse));

    component.firstName.setValue('mohamed');
    component.lastName.setValue('said');
    component.email.setValue('diaa@hammad.com');
    component.password.setValue('AliAhmed45');
    fixture.detectChanges();

    const submitButton = compiled.querySelector('button') as HTMLButtonElement;

    submitButton.click();
    fixture.detectChanges();

    const errorMessages = compiled.querySelector('.message-error');

    expect(errorMessages).toBeFalsy();
    expect(component.form.valid).toBeTruthy();
    expect(formHelperService.validateAllFormFields).toHaveBeenCalledTimes(0);
    expect(authRepository.signup).toHaveBeenCalledWith(component.form.value);

    authRepository.signup(component.form.value).subscribe(res => {
      expect(res.email).toHaveBeenCalledWith(mockedResponse.email);
    })
  });
});
