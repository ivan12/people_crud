import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import { ToastController } from '@ionic/angular';
import { PeopleSelector } from "../../_store/_modules/people/people.selector";
import { PeopleAction } from "../../_store/_modules/people/people.action";

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  total$: Observable<any>;
  peopleList$: Observable<any>;

  constructor(
    private store: Store<{ cart: [] }>,
    private toastCtrl: ToastController) {
    this.peopleList$ = store.select(PeopleSelector.peopleList);
  }

  showTotal(peopleList) {
    if (peopleList) {
      if (peopleList.length < 10) {
        return '0' + peopleList.length;
      } else {
        return peopleList.length;
      }
    } else {
      return 0;
    }
  }

  createProductAction() {
    let peopleDefault = {
      name: 'Ivan Test Local',
      email: 'amorim-ivan@hotmail.com',
      phone: '(48) 98453-0344',
      birth_at: '08/09/1989'
    }
    this.store.dispatch(PeopleAction.addEffect({ payload: peopleDefault }));
    this.toast('People criado com sucesso!');
  }

  async toast(msg) {
    const toast = await this.toastCtrl.create({
      message: msg,
      duration: 2000,
      cssClass: "toast-green",
      showCloseButton: true,
      closeButtonText: "Fechar"
    });
    toast.present();
  }
}
