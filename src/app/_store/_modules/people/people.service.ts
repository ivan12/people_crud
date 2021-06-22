import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PeopleState } from "../../people.module";

@Injectable({
  providedIn: 'root'
})
export class PeopleService {
  public url = 'https://forassetapi.herokuapp.com/people';
  private params = {};
  private headers = {};


  constructor(
    private http: HttpClient
  ) { }

  getPeopleList() {
    return this.http.get<PeopleState[]>(`${this.url}`, this.params, this.headers);
  }

  create(codeAlarm: any) {
    return this.http.post(this.url, codeAlarm);
  };

  edit(codeAlarm: any) {
    return this.http.post(this.url + '/', codeAlarm.id);
  };

  remove(codeAlarm: any) {
    return this.http.delete(this.url + '/', codeAlarm.id);
  };

}
