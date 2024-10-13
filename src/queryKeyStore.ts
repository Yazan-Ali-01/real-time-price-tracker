// import { createQueryKeyStore } from "@lukemorales/query-key-factory";

// export const queries = createQueryKeyStore({
//   users: {
//     all: null,
//     detail: (userId: string) => ({
//       queryKey: [userId],
//       queryFn: () => api.getUser(userId),
//     }),
//   },
//   todos: {
//     detail: (todoId: string) => [todoId],
//     list: (filters) => ({
//       queryKey: [{ filters }],
//       queryFn: (ctx) => api.getTodos({ filters, page: ctx.pageParam }),
//       contextQueries: {
//         search: (query, limit = 15) => ({
//           queryKey: [query, limit],
//           queryFn: (ctx) => api.getSearchTodos({
//             page: ctx.pageParam,
//             filters,
//             limit,
//             query,
//           }),
//         }),
//       },
//     }),
//   },
// });
