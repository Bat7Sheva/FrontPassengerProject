import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Iform } from './shared/Iform';
// import { tap } from 'rxjs/operators'


@Injectable({
  providedIn: 'root'
})
export class TravelerService {
  private URL: string = "http://localhost:49365/api/Tofes/";

  constructor(private _http: HttpClient) {
  }

  save(element: Iform[]): Observable<boolean> {
    return this._http.post<boolean>(`${this.URL}Save`, element).pipe();
  }
}