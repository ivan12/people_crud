import { createFeatureSelector, createSelector } from "@ngrx/store";
import { PeopleState } from "../../people.module";

export const peopleListState = createFeatureSelector<PeopleState[]>('peopleList')
export const peopleState = createFeatureSelector<PeopleState>('people')

export namespace PeopleSelector {
    export const peopleList = createSelector(peopleListState, (state: any) => state.peopleList);
    export const people = createSelector(peopleState, (state: any) => state.people);
}
