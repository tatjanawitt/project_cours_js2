import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError, retry } from 'rxjs/operators';
import { Contact } from './contact';

@Injectable({
  providedIn: 'root'
})
export class ContactStoreService {
  private api = 'http://localhost:3000/api';
  contacts: Contact[];

  constructor(private http: HttpClient) { }

  getAll(): Observable<Contact[]> {
    return this.http.get<Contact[]>(
      `${this.api}/contacts`
    ).pipe(
      retry(3),
      map(contacts =>
        contacts.map(c =>
          this.createInstanceContact(c))
      ), catchError(this.errorHandler)
    );
  }

  getSingle(id: string): Observable<Contact> {
    return this.http.get<Contact>(
      `${this.api}/contacts/${id}`
    ).pipe(
      retry(3),
      map(c => this.createInstanceContact(c)
      ), catchError(this.errorHandler)
    );
  }

  create(contact: Contact): Observable<any> {
    return this.http.post(
      `${this.api}/contacts`,
      contact,
      { responseType: 'text' }
    ).pipe(
      catchError(this.errorHandler)
    );
  }

  update(contact: Contact): Observable<any> {
    return this.http.put(
      `${this.api}/contacts/${contact.id}`,
      contact,
      { responseType: 'text' }
    ).pipe(
      catchError(this.errorHandler)
    );
  }

  remove(id: string): Observable<any> {
    return this.http.delete(
      `${this.api}/contacts/${id}`,
      { responseType: 'text' }
    ).pipe(
      catchError(this.errorHandler)
    );
  }

  getAllSearch(searchItem: string): Observable<Contact[]> {
    return this.http.get<Contact[]>(
      `${this.api}/contacts/search/${searchItem}`
    ).pipe(
      retry(3),
      map((contacts: Contact[]) =>
        contacts.map(c =>
          this.createInstanceContact(c))
      ), catchError(this.errorHandler)
    );
  }

  private createInstanceContact(c: any) {
    return new Contact(
      c.id,
      c.firstname,
      c.lastname,
      c.email,
      c.street,
      c.postcode,
      c.place,
      c.fon,
      c.mobil,
      c.born,
      c.img
    );
  }

  private errorHandler(error: HttpErrorResponse): Observable<any> {
    console.log('Fehler aufgetreten!');
    return throwError(error);
  }
}
