import { configureStore } from '@reduxjs/toolkit';
import { commitReducer } from './slice/commit';
import { projectReducer } from './slice/project';
import { userLoginReducer } from './slice/searchLogin';

const store = configureStore({
    reducer: {
        user: userLoginReducer,
        project: projectReducer,
        commit: commitReducer,
    },
})
 
export default store;

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;