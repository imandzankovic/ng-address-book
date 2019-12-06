import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap, map } from "rxjs/operators";
import { Contact } from "./contact";

@Injectable({
  providedIn: "root"
})
export class ContactService {
  private path = "http://localhost:8888";

  constructor(private http: HttpClient) {}

  getContacts(): Observable<Contact[]> {
    return this.http.get<Contact[]>(this.path + "/api/contact").pipe(
      tap(data => console.log("All" + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  getContact(id: number): Observable<Contact> {
    const url = `${this.path + "/api/contact"}/${id}`;
    return this.http.get<Contact>(url).pipe(
      tap(data => console.log("getContact: " + JSON.stringify(data))),
      catchError(this.handleError)
    );
  }

  createContact(contact: Contact): Observable<Contact> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });

    return this.http
      .post<Contact>(this.path + "/api/contact", contact, { headers: headers })
      .pipe(
        tap(data => console.log("createContact: " + JSON.stringify(data))),
        catchError(this.handleError)
      );
  }

  deleteContact(id: number): Observable<{}> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const url = `${this.path + "/api/contact"}/${id}`;
    return this.http
      .delete<Contact>(url, { headers: headers })
      .pipe(
        tap(data => console.log("deleteContact: " + id)),
        catchError(this.handleError)
      );
  }

  updateContact(contact: Contact): Observable<Contact> {
    const headers = new HttpHeaders({ "Content-Type": "application/json" });
    const url = `${this.path + "/api/contact"}/${contact.id}`;
    return this.http
      .put<Contact>(url, contact, { headers: headers })
      .pipe(
        tap(data => console.log("createContact: " + JSON.stringify(data))),
        map(() => contact),
        catchError(this.handleError)
      );
  }
  private handleError(err: HttpErrorResponse) {
    // in a real world app, we may send the server to some remote logging infrastructure
    // instead of just logging it to the console
    let errorMessage = "";
    if (err.error instanceof ErrorEvent) {
      // A client-side or network error occurred. Handle it accordingly.
      errorMessage = `An error occurred: ${err.error.message}`;
    } else {
      // The backend returned an unsuccessful response code.
      // The response body may contain clues as to what went wrong,
      errorMessage = `Server returned code: ${err.status}, error message is: ${err.message}`;
    }
    console.error(errorMessage);
    return throwError(errorMessage);
  }
}
