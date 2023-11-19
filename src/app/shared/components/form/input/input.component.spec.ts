import {ComponentFixture, TestBed} from '@angular/core/testing';
import {InputComponent} from "./input.component";
import {Component} from "@angular/core";
import {FormControl} from "@angular/forms";
import {ControlTypes} from "../../../constants/control-types";
import {HttpClientTestingModule} from "@angular/common/http/testing";
import {By} from "@angular/platform-browser";

@Component({
  selector: 'test-input',
  template: '<app-input [autofocus]="true" [control]="control" label="test" [type]="controlTypes.Text"></app-input>',
  imports: [
    InputComponent
  ],
  standalone: true
})
class TestWrapperInputComponent {
  control = new FormControl<string>('test');
  controlTypes = ControlTypes;
}

describe('TestWrapperInputComponent', () => {
  let fixture: ComponentFixture<TestWrapperInputComponent>;
  let testWrapperInputComponent: TestWrapperInputComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestWrapperInputComponent, InputComponent, HttpClientTestingModule],
      providers: []
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TestWrapperInputComponent);
    testWrapperInputComponent = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create the test input wrapper component', () => {
    expect(testWrapperInputComponent).toBeTruthy();
  });

  it('should create the input component', () => {
    const inputComponent: InputComponent = fixture.debugElement.query(By.directive(InputComponent)).componentInstance;
    expect(inputComponent).toBeTruthy();
  });

  it('should have control with value test', () => {
    const inputComponent: InputComponent = fixture.debugElement.query(By.directive(InputComponent)).componentInstance;
    expect(inputComponent.control?.value).toEqual('test');
  });

  it('should have type text', () => {
    const inputComponent: InputComponent = fixture.debugElement.query(By.directive(InputComponent)).componentInstance;
    expect(inputComponent.type).toEqual('text');
  });

  it('should have same label', () => {
    const inputComponent: InputComponent = fixture.debugElement.query(By.directive(InputComponent)).componentInstance;
    expect(inputComponent.label).toEqual('test');
  });
});
