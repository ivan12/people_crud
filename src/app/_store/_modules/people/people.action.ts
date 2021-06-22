import { createAction, props } from '@ngrx/store';

export namespace PeopleAction {
    export enum ActionTypes {
        ADD = 'ADD',
        ADD_LIST = 'ADD_LIST',
        REMOVE = 'REM',
        REMOVE_ALL = 'REMOVE_ALL',
        ADD_QUANTIDADE = 'ADD_QUANTIDADE',
        REDUCE_QUANTIDADE = 'REDUCE_QUANTIDADE',
        PESQUISAR = 'PESQUISAR',

        SET = 'SET',
        SET_LIST = 'SET_LIST',
        EDIT = 'EDIT',
        CLEAR_EDIT = 'CLEAR_EDIT',
        LOAD_LIST = 'GET_LIST',
        ADD_EFFECT = 'ADD_EFFECT',
        EDIT_EFFECT = 'EDIT_EFFECT',
        REMOVE_EFFECT = 'REM_EFFECT',
        DESATIVAR_EFFECT = 'DESATIVAR_EFFECT'
    }

    // Todo Actions Reduce

    export const pesquisar = createAction(ActionTypes.PESQUISAR, props<{ payload: any }>());

    export const add = createAction(ActionTypes.ADD, props<{ payload: any }>());

    export const remove = createAction(ActionTypes.REMOVE, props<{ payload: any }>());

    export const removeAll = createAction(ActionTypes.REMOVE_ALL, props<{ payload: any }>());

    export const addList = createAction(ActionTypes.ADD_LIST, props<{ payload: any }>());

    export const setList = createAction(ActionTypes.SET_LIST, props<{ payload: any }>());

    export const addQuantidade = createAction(ActionTypes.ADD_QUANTIDADE, props<{ payload: any, index: any }>());

    export const reduceQuantidade = createAction(ActionTypes.REDUCE_QUANTIDADE, props<{ payload: any, index: any }>());


    export const set = createAction(ActionTypes.SET, props<{ payload: any }>());

    export const edit = createAction(ActionTypes.EDIT, props<{ payload: any }>());

    export const clearEdit = createAction(ActionTypes.CLEAR_EDIT, props<{ payload: any }>());


    // Todo Actions Effect

    export const loadListEffect = createAction(ActionTypes.LOAD_LIST, props<{ payload: any }>());

    export const addEffect = createAction(ActionTypes.ADD_EFFECT, props<{ payload: any }>());

    export const editEffect = createAction(ActionTypes.EDIT_EFFECT, props<{ payload: any }>());

    export const desativarEffect = createAction(ActionTypes.DESATIVAR_EFFECT, props<{ payload: any }>());

}
