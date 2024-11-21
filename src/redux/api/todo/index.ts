import { api as index } from "..";

const api = index.injectEndpoints({
  endpoints: (builder) => ({
    getTodo: builder.query<TODO.getResponse, TODO.getRequest>({
      query: () => ({
        url: `${process.env.NEXT_PUBLIC_GET}`,
        method: "GET",
      }),
      providesTags: ["todo"],
    }),

    createTodo: builder.mutation<TODO.postResponse, TODO.postRequest>({
      query: (data) => ({
        url: `${process.env.NEXT_PUBLIC_CREATE}`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["todo"],
    }),

    updateTodo: builder.mutation({
      query: (data) => ({
        url: `${process.env.NEXT_PUBLIC_UPDATE}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["todo"],
    }),

    deleteTodo: builder.mutation<TODO.deleteResponse, TODO.deleteRequest>({
      query: (id) => ({
        url: `${process.env.NEXT_PUBLIC_DELETE}`,
        method: "DELETE",
        body: id,
      }),
    }),
  }),
});

export const {
  useGetTodoQuery,
  useCreateTodoMutation,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} = api;
