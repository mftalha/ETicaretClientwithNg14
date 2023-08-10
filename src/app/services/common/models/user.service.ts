import { Injectable } from '@angular/core';
import {Observable, firstValueFrom} from 'rxjs';
import { HttpClientService } from '../http-client.service';
import { User } from 'src/app/Entity/user';
import { Create_User } from 'src/app/contracts/users/create_user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private httpClientService: HttpClientService) { }

  async create(user: User): Promise<Create_User> {
    const observable: Observable<Create_User | User> = this.httpClientService.post<Create_User | User>({ // Ganaric yapılanmada 2 modeli'de kullanacağım. : User giden, Create_User gelen olarak kullanacağım ben 
      controller: "users"
    }, user); // brudaki user kısmı bady olarak göndermekiçin bu şekilde.

    return await firstValueFrom(observable) as Create_User;
  }

  async login(userNameOrEmail: string, password: string, callBackFunction? : () => void): Promise<void> {
    const observable : Observable<any> = this.httpClientService.post({
      controller:"users",
      action: "login"
    }, { userNameOrEmail, password})

    await firstValueFrom(observable);
    callBackFunction();
  }
}
