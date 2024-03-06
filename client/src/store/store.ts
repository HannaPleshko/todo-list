import { configureStore } from "@reduxjs/toolkit";
import { tasksApi } from '../service/tasksApi'
import { setupListeners } from "@reduxjs/toolkit/query";

const store = configureStore({
    reducer: {
        [tasksApi.reducerPath]: tasksApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat([
            tasksApi.middleware
        ])
})
setupListeners(store.dispatch)
export default store