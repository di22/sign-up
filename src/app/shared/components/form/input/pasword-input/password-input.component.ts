import {Component, signal, WritableSignal} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {ReactiveFormsModule} from "@angular/forms";
import {ControlErrorMessageComponent} from "../../control-error-message/control-error-message.component";
import {InputComponent} from "../input.component";
import {ControlTypes} from "../../../../constants/control-types";

@Component({
  selector: 'app-input-password',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, ControlErrorMessageComponent, NgOptimizedImage],
  templateUrl: './password-input.component.html',
  styles: [`
    :host {
      img {
        right: 0px;
        top: 35px;
      }

      .password-alert {
        margin-left: 1rem;
        text-align: left;
        font-size: 0.7rem;
        line-height: 1rem;
        display: list-item;
      }
    }
  `]
})
export class PasswordInputComponent extends InputComponent{
  icon: WritableSignal<string> = signal<string>('eye');

  togglePasswordVisibility(): void {
    if (this.type === ControlTypes.Password) {
      this.icon.set('eye-hide');
      this.type = ControlTypes.Text;
    } else {
      this.icon.set('eye');
      this.type = ControlTypes.Password;
    }
  }
}
