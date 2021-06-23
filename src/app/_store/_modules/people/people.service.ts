import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PeopleState } from "../../people.module";

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  public url = 'https://forassetapi.herokuapp.com/people';
  
  constructor(
    private http: HttpClient
  ) { }

  getPeopleList() {
    return this.http.get<PeopleState[]>(`${this.url}`);
  }

  create(people: any) {
    return this.http.post(this.url, people);
  };

  edit(people: any) {
    return this.http.post(this.url + '/', people.id);
  };

  remove(people: any) {
    return this.http.delete(this.url + '/', people.id);
  };

}
