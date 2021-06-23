import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { PeopleService } from "./people.service";
import { PeopleAction } from "./people.action";
import { ToastController } from '@ionic/angular';

@Injectable()
export class PeopleEffect {
    constructor(
        private actions$: Actions,
        private toastCtrl: ToastController,
        private peopleService: PeopleService,
    ) { }

    getListEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PeopleAction.loadListEffect),
            map(action => action['payload']),
            exhaustMap(_ => this.peopleService.getPeopleList()
                .pipe(
                    map(peopleListTemp => {
                        console.log('peopleListTemp = ', peopleListTemp)
                        return PeopleAction.setList({ payload: peopleListTemp });
                    })
                ),
            )
        ),
    );

    edit$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PeopleAction.editEffect),
            map(action => action['payload']),
            catchError(error => error),
            exhaustMap(peopleEdit => this.peopleService.edit(peopleEdit)
                .pipe(
                    map(peopleResult => {
                        if (peopleResult) {
                            this.toastSucesso('People editado com sucesso!');
                        }
                        PeopleAction.edit({ payload: peopleResult });
                        return PeopleAction.loadListEffect({ payload: null });
                    })
                )
            )
        )
    );

    add$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PeopleAction.addEffect),
            map(action => action['payload']),
            catchError(error => error),
            exhaustMap(product => this.peopleService.create(product)
                .pipe(
                    map(people => {
                        if (people) {
                            this.toastSucesso('People salvo com sucesso!');
                        }
                        PeopleAction.add({ payload: people });
                        return PeopleAction.loadListEffect({ payload: null });
                    })
                )
            )
        )
    );

    desativar$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PeopleAction.desativarEffect),
            map(action => action['payload']),
            catchError(error => error),
            exhaustMap(product => this.peopleService.remove(product)
                .pipe(
                    map(peopleResult => {
                        if (peopleResult) {
                            this.toastSucesso('People excluido com sucesso!');
                        }
                        return PeopleAction.loadListEffect({ payload: null })
                    })
                )
            )
        )
    );

    async toastSucesso(msg) {
        const toast = await this.toastCtrl.create({
            message: msg,
            duration: 2000,
            cssClass: "toast-green",
            showCloseButton: true,
            closeButtonText: "Fechar"
        });
        toast.present();
    }

    async toastError(msg) {
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
