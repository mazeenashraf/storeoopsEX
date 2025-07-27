import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  private api = 'https://local-brand-store.onrender.com/api/admin/users';

  constructor(private http: HttpClient) {}

  getAllUsers(): Observable<any> {
        const token = sessionStorage.getItem('userToken')

    return this.http.get(this.api , {
      headers:{
Authorization : `Bearer ${token} `
      }
    });
  }

  promoteUser(id: string): Observable<any> {
    const token = sessionStorage.getItem('userToken')
    return this.http.put(`${this.api}/${id}/promote`, {} , {
      headers:{
Authorization : `Bearer ${token} `
      }
    } );
  }

  deleteUser(id: string): Observable<any> {
        const token = sessionStorage.getItem('userToken')

    return this.http.delete(`${this.api}/${id}` , {
      headers:{
Authorization : `Bearer ${token} `
      }
    } ) ;
  }
}
