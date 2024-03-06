import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const tasksApi = createApi({
    reducerPath: 'tasksApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3001/api/v1/task' }),
    endpoints: (builder) => ({
        getAllTasks: builder.query({
            query: () => '/'
        }),
        createTask: builder.mutation({
            query: (credentials) => ({
                url: '/',
                method: 'POST',
                body: credentials
            })
        }),
        updateTask: builder.mutation({
            query: (credentials) => ({
                url: `/${credentials.task_id}`,
                method: 'PUT',
                body: credentials
            })
        }),
        deleteTask: builder.mutation({
            query: (credentials) => ({
                url: `/${credentials.task_id}`,
                method: 'DELETE'
            })
        }),
    })
})

export const { useGetAllTasksQuery, useCreateTaskMutation, useUpdateTaskMutation, useDeleteTaskMutation } = tasksApi;
