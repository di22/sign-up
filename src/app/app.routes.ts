import { Routes } from '@angular/router';
import {SignUpComponent} from "./pages/sign-up/sign-up.component";
import {SignUpSuccessComponent} from "./pages/sign-up/sign-up-success/sign-up-success.component";

export const routes: Routes = [
  {
    path: '',
    component: SignUpComponent,
  },
  {
    path: 'success',
    component: SignUpSuccessComponent,
  }
];
