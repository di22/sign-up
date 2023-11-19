import {Component, Input, OnChanges, signal, WritableSignal} from '@angular/core';
import {FormControl} from '@angular/forms';
import {CommonModule} from "@angular/common";

@Component({
  selector: 'app-control-error-message',
  template: `
    <span *ngIf="errorMessage" class="message-error">
  {{error}}
</span>
  `,
  standalone: true,
  imports: [CommonModule],
})
export class ControlErrorMessageComponent implements OnChanges {
  @Input() control: FormControl;
  @Input() label: string;
  @Input() customErrorMessages: {[key: string]: string} = {};
  errorMessages: WritableSignal<{[key: string]: string}> = signal({
    required: 'You must enter your ',
  });
  error: string;

  ngOnChanges(): void {
    if (this.customErrorMessages || this.label) this.errorMessages.set({
      ...this.errorMessages(),
      required: this.errorMessages()['required'] + this.label.toLowerCase(),
      pattern: `You must enter correct ${this.label.toLowerCase()} pattern`,
      ...this.customErrorMessages});
  }

  get errorMessage() {
    this.error = '';
    for (let propertyName in this.control.errors) {
      if (this.control.errors.hasOwnProperty(propertyName) && this.control.touched) {
        this.error = this.errorMessages()[propertyName];
        return true;
      }
    }
    return false;
  }
}
