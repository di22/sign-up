import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Signup} from "./models/signup.model";
import {SignupResponse} from "./models/auth-request-response.models";
import {SettingsService} from "../../core/services/settings.service";

@Injectable({
  providedIn: 'root'
})
export class AuthRepository {
  protected readonly apiUrl = SettingsService.configurationEnvironment.api.baseUrl + 'users';
  constructor(private http: HttpClient) {}

  signup(signupData: Signup): Observable<SignupResponse> {
    const {password, ...data} = signupData;
    return this.http.post<SignupResponse>(this.apiUrl, data);
  }
}
