import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  constructor(private httpClient:HttpClient) { }
  getcategorybytshirt():Observable<any>{
    return this.httpClient.get(`https://local-brand-store.onrender.com/api/product/by-category?category=685998442ff8985b16173444`)
  }
  getcategorybypants():Observable<any>{
    return this.httpClient.get(`https://local-brand-store.onrender.com/api/product/by-category?category=686a84482616ee56826f9262`)
  }
  getcategorybyShorts():Observable<any>{
    return this.httpClient.get(`https://local-brand-store.onrender.com/api/product/by-category?category=686a9066accf019bec4afd02`)
  }
  getallcategories():Observable<any>{
    return this.httpClient.get(`https://local-brand-store.onrender.com/api/category`)
  }

updateCategory(id: string, body: any): Observable<any> {
      const token = sessionStorage.getItem(`userToken`)

  return this.httpClient.put(`https://local-brand-store.onrender.com/api/category/${id}`, body , {
    headers:{
       Authorization : `Bearer ${token}  `
    }
  });
}

getCategoryById(id: string): Observable<any> {
      const token = sessionStorage.getItem(`userToken`)

  return this.httpClient.get(`https://local-brand-store.onrender.com/api/category/single/${id}` , {
    headers:{
      Authorization : `Bearer ${token}  `

    }
  } );
}



addCategory(body: any): Observable<any> {
          const token = sessionStorage.getItem(`userToken`)

    return this.httpClient.post(`https://local-brand-store.onrender.com/api/category`, body,{
       headers:{
      Authorization : `Bearer ${token}  `
    }
    } );
  }



  deleteCategory(id: string): Observable<any> {

        const token = sessionStorage.getItem(`userToken`)

  return this.httpClient.delete(`https://local-brand-store.onrender.com/api/category/${id}` , {
    headers:{
      Authorization : `Bearer ${token}  `
    }
  } );
}
}
