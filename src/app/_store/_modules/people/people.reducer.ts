import { createReducer, on, Action } from '@ngrx/store'
import { PeopleAction } from "./people.action";
import { PeopleState } from "../../people.module";

export namespace PeopleReducer {
    let peopleList: PeopleState[] = [];

    const _pesquisar = (state: any, action: Action) => ({ ...state, peopleList: state.peopleList.filter(people => accentsTidy(people.name) == accentsTidy(action['payload'])) });

    const _addPeople = (state: any, action: Action) => ({ ...state, peopleList: state.peopleList.concat(action['payload']) });

    const _setPeople = (state: any, action: Action) => ({ ...state, people: action['payload'] });

    const _removePeople = (state: any, action: Action) => ({ ...state, peopleList: state.peopleList.filter(people => people != action['payload']) });

    const _setPeopleList = (state: any, action: Action) => ({ ...state, peopleList: action['payload'] });

    const _peopleReduces = createReducer(peopleList,
        on(PeopleAction.pesquisar, _pesquisar),
        on(PeopleAction.add, _addPeople),
        on(PeopleAction.edit, _setPeople),
        on(PeopleAction.remove, _removePeople),
        on(PeopleAction.setList, _setPeopleList)
    )
    export function reducer(state: any, action: Action) {
        return _peopleReduces(state, action);
    }

    const accentsTidy = (s) => {
        var r=s.toLowerCase();
        r = r.replace(new RegExp(/\s/g),"");
        r = r.replace(new RegExp(/[àáâãäå]/g),"a");
        r = r.replace(new RegExp(/æ/g),"ae");
        r = r.replace(new RegExp(/ç/g),"c");
        r = r.replace(new RegExp(/[èéêë]/g),"e");
        r = r.replace(new RegExp(/[ìíîï]/g),"i");
        r = r.replace(new RegExp(/ñ/g),"n");                
        r = r.replace(new RegExp(/[òóôõö]/g),"o");
        r = r.replace(new RegExp(/œ/g),"oe");
        r = r.replace(new RegExp(/[ùúûü]/g),"u");
        r = r.replace(new RegExp(/[ýÿ]/g),"y");
        r = r.replace(new RegExp(/\W/g),"");
        return r;
    };
}
