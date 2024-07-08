import { createFeatureSelector, createReducer } from '@ngrx/store';

export const initialState = 0;

export const counterReducer = createReducer(initialState);

export const selectCount = createFeatureSelector<number>('count');
