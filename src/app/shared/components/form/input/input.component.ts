import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormControl, ReactiveFormsModule} from "@angular/forms";
import {ControlErrorMessageComponent} from "../control-error-message/control-error-message.component";
import {ControlTypes} from "../../../constants/control-types";

@Component({
  selector: 'app-input',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ControlErrorMessageComponent],
  templateUrl: './input.component.html'
})
export class InputComponent {
  @Input() type: ControlTypes;
  @Input() control: FormControl = new FormControl<any>('');
  @Input() label: string;
  @Input() customErrorMessages: {[key: string]: string};
  @Input() autofocus: boolean;
}
