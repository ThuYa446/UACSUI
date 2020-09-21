import { Injectable } from '@angular/core';
import {Observable, of} from 'rxjs';
import { HttpClient, HttpHeaders, JsonpClientBackend } from '@angular/common/http';
import { catchError, map, tap } from 'rxjs/operators';

import { MessageService } from './message.service';
@Injectable({
  providedIn: 'root'
})
export class HttpClientService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

constructor(private httpClient: HttpClient, private message: MessageService) { }

  private log(message: string) {
    this.message.addMessage(`ErrorService: ${message}`);
  }

  doGet(url: string): Observable<any> {
    return this.httpClient.get(`${url}`).pipe(
      // tap(_ => this.log('Http Requested Successfully!')),
      catchError(this.handleError<any>())
    );
  }

  doPost(url: string, json: JSON): Observable<any> {
    return this.httpClient.post(url, json, this.httpOptions).pipe(
      // tap(_ => this.log('Http Requested Successfully!')),
      catchError(this.handleError<any>())
    );
  }

  checkServerErrorConnection(): boolean {
    if (this.message.message.length === 1 ) {
      return true;
    }
    return false;
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      // console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      // this.log(`${operation} failed: ${error.message}`);
      this.log('Can not connect to Server');
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
