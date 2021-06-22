import { NgModule } from '@angular/core';
import { EffectsModule } from '@ngrx/effects';
import { ActionReducerMap, MetaReducer, StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { environment } from 'src/environments/environment';
import { PeopleEffect } from './_modules/people/people.effect';
import { PeopleReducer } from "./_modules/people/people.reducer";

export interface PeopleState {
    id: number
    name: string
    email: string
    phone: string
    birth_at: string
}

export interface TryState {
    peopleList: PeopleState[]
    people: PeopleState
}

export const reducers: ActionReducerMap<TryState> = {
    peopleList: PeopleReducer.reducer,
    people: PeopleReducer.reducer
};

export const metaReducers: MetaReducer<TryState>[] = !environment.production ? [] : [];

const CONFIG_STORE_MODULE = {
    metaReducers: [],
    runtimeChecks: {
        strictStateImmutability: true,
        strictActionImmutability: true
    }
}

const CONFIG_STORE_DEV_MODULE = { maxAge: 100, logOnly: environment.production }
const CONFIG_EFFECTS_MODULE = [PeopleEffect]

@NgModule({
    imports: [
        StoreModule.forRoot(reducers, CONFIG_STORE_MODULE),
        StoreDevtoolsModule.instrument(CONFIG_STORE_DEV_MODULE),
        EffectsModule.forRoot(CONFIG_EFFECTS_MODULE)
    ],
    exports: [StoreModule, StoreDevtoolsModule, EffectsModule]
})
export class PeopleModule { }
