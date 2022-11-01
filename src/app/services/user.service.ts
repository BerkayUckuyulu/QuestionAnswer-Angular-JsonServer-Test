import { Injectable } from '@angular/core';
import { BaseService } from './base.services';

@Injectable({
  providedIn: 'root',
})
export class UserService extends BaseService {
  public user: any;

  constructor(private base: BaseService) {
    super(base.http);
  }

  public createAccount(userObj: any) {
    return this.postReq('/users', userObj);
  }
  public getUserByEmail(email: string | any) {
    return this.getReq('/users?email=' + email);
  }
}
