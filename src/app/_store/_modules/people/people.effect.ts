import { Injectable } from '@angular/core';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, exhaustMap, map } from 'rxjs/operators';
import { PeopleService } from "./people.service";
import { PeopleAction } from "./people.action";

@Injectable()
export class PeopleEffect {
    constructor(
        private actions$: Actions,
        private codeAlarmService: PeopleService,
    ) { }

    getListEffect$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PeopleAction.loadListEffect),
            map(action => action['payload']),
            // catchError(error => error),
            exhaustMap(res => this.codeAlarmService.getPeopleList()),
            map(peopleList => {
                return PeopleAction.set({ payload: peopleList });
            })
        ),
    );

    edit$ = createEffect(() =>
        this.actions$.pipe(
            ofType(PeopleAction.editEffect),
            map(action => action['payload']),
            catchError(error => error),
            exhaustMap(product => this.codeAlarmService.edit(product)
                .pipe(
                    map(product => {
                        PeopleAction.edit({ payload: product });
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
            exhaustMap(product => this.codeAlarmService.create(product)
                .pipe(
                    map(product => {
                        PeopleAction.add({ payload: product });
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
            exhaustMap(product => this.codeAlarmService.remove(product)
                .pipe(
                    map(product => PeopleAction.loadListEffect({ payload: null }))
                )
            )
        )
    );
}
