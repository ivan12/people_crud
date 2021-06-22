import { createReducer, on, Action } from '@ngrx/store'
import { PeopleAction } from "./people.action";
import { PeopleState } from "../../people.module";

export namespace PeopleReducer {
    let peopleList: PeopleState[] = [];

    const _pesquisar = (state: any, action: Action) => ({ ...state, codeAlarms: state.codeAlarms.filter(codeAlarm => codeAlarm.codigo == action['payload']) });

    const _addPeople = (state: any, action: Action) => ({ ...state, codeAlarms: state.codeAlarms.concat(action['payload']) });

    const _setPeople = (state: any, action: Action) => ({ ...state, codeAlarm: action['payload'] });

    const _removePeople = (state: any, action: Action) => ({ ...state, codeAlarms: state.codeAlarms.filter(myProduct => myProduct != action['payload']) });

    const _setPeopleList = (state: any, action: Action) => ({ ...state, codeAlarms: action['payload'] });

    function editElemListCodeAlarms(listPeople, index, people) {
        listPeople[index] = people;
        return listPeople;
    }

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
}
