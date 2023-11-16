import {ComponentFixture, TestBed} from '@angular/core/testing';
import { SignUpComponent } from './sign-up.component';
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {FormHelperService} from "../../shared/services/form-helper.service";
import {AuthRepository} from "../../data/auth/auth.repository";
import {of} from "rxjs";

describe('SignupComponent', () => {
  let fixture: ComponentFixture<SignUpComponent>;
  let component: SignUpComponent;
  let formHelperService: FormHelperService;
  let authRepository: AuthRepository;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SignUpComponent, HttpClientTestingModule],
      providers: [FormHelperService, AuthRepository]
    }).compileComponents();

    formHelperService = TestBed.inject(FormHelperService);
    authRepository = TestBed.inject(AuthRepository);
    fixture = TestBed.createComponent(SignUpComponent);
    component = fixture.componentInstance;
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should render title', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('header')?.textContent).toContain('Sign up');
  });

  it('should init the form', () => {
    fixture.detectChanges();
    expect(component.form).toBeTruthy();
  });

  it('should not render error message', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelector('.message-error')).toBeFalsy();
  });

  it('should render four fields', () => {
    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    expect(compiled.querySelectorAll('app-input')?.length).toEqual(3);
    expect(compiled.querySelectorAll('app-input-password')?.length).toEqual(1);
  });

  it('should fire form validation', () => {
    jest.spyOn(component, 'validate');
    jest.spyOn(component, 'signup');
    jest.spyOn(formHelperService, 'validateAllFormFields');

    fixture.detectChanges();
    const compiled = fixture.nativeElement as HTMLElement;
    const submitButton = compiled.querySelector('button') as HTMLButtonElement;

    submitButton.click();
    fixture.detectChanges();

    expect(component.form.invalid).toBeTruthy();
    expect(formHelperService.validateAllFormFields).toHaveBeenCalled();
    expect(component.signup).toHaveBeenCalledTimes(0);
  });

  it('should show email pattern error', () => {
    fixture.detectChanges();
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

    const compiled = fixture.nativeElement as HTMLElement;
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

  it('should show password length and strength errors', () => {
    // wait till form init
    fixture.detectChanges();
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

    const compiled = fixture.nativeElement as HTMLElement;
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
    const password = 'ali1234567'
    component.password.patchValue(password);
    fixture.detectChanges();

    const strengthErrorMessage = compiled.querySelector('.message-error') as HTMLSpanElement;

    expect(strengthErrorMessage).toBeTruthy();
    expect(strengthErrorMessage.textContent?.trim()).toEqual('You must follow the below instructions for strong password');
    expect(component.form.invalid).toBeTruthy();
    expect(component.password.invalid).toBeTruthy();
    expect(formHelperService.validateAllFormFields).toHaveBeenCalled();
    expect(component.signup).toHaveBeenCalledTimes(0);

    // strength error for ensure name not included
    const password2 = 'diaaA1234567'
    component.password.patchValue(password2);
    fixture.detectChanges();

    const strengthErrorMessage2 = compiled.querySelector('.message-error') as HTMLSpanElement;

    expect(strengthErrorMessage).toBeTruthy();
    expect(strengthErrorMessage2.textContent?.trim()).toEqual('You must follow the below instructions for strong password');
    expect(component.form.invalid).toBeTruthy();
    expect(component.password.invalid).toBeTruthy();
    expect(formHelperService.validateAllFormFields).toHaveBeenCalled();
    expect(component.signup).toHaveBeenCalledTimes(0);
  });

  it('should execute login', () => {
    // wait till form init
    fixture.detectChanges();
    const mockedResponse = {
      firstName: 'diaa',
      lastName: 'hammad',
      email: 'diaa@hammad.com',
      _id: '123456789'
    }

    jest.spyOn(component, 'signup');
    jest.spyOn(formHelperService, 'validateAllFormFields');
    jest.spyOn(authRepository, 'signup').mockReturnValue(of(mockedResponse));

    component.firstName.setValue('diaa');
    component.lastName.setValue('hammad');
    component.email.setValue('diaa@hammad.com');
    component.password.setValue('AliAhmed45');
    fixture.detectChanges();
    fixture.detectChanges();

    const compiled = fixture.nativeElement as HTMLElement;
    const submitButton = compiled.querySelector('button') as HTMLButtonElement;

    submitButton.click();
    fixture.detectChanges();

    const errorMessages = compiled.querySelector('.message-error');

    expect(errorMessages).toBeFalsy();
    expect(component.form.valid).toBeTruthy();
    expect(formHelperService.validateAllFormFields).toHaveBeenCalledTimes(0);
    expect(component.signup).toHaveBeenCalled();
    expect(authRepository.signup).toHaveBeenCalledWith(component.form.value);

    authRepository.signup(component.form.value).subscribe(res => {
      expect(res.email).toHaveBeenCalledWith(mockedResponse.email);
    })
  });
});
