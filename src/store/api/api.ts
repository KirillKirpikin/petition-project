import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IPetition } from "../../types/petition.type";
import { Status } from "../../types/status.types";

export const api = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: import.meta.env.VITE_BASE_URL}),
    tagTypes:['Petition'],
    endpoints:(builder)=>({
        getPetitionByStatus: builder.query<{data: IPetition[]; totalItems: number}, {status: Status, page: number, pageSize: number, searchTerm?:string }>({
            query:(params)=>({
                url: '/petition/all',
                params: {status: params.status, page: params.page, pageSize: params.pageSize, searchTerm: params.searchTerm }
            }),
            providesTags:(result)=>
            result
            ? [
                ...result.data.map(petition=> ({type: 'Petition' as const, id: petition._id})),
                {type: 'Petition', id: 'LIST-PETITION'},
                {type: 'Petition', id: 'PARTIAL-PETITION'},
            ]
            :[
                {type: 'Petition', id: 'LIST-PETITION'},
                {type: 'Petition', id: 'PARTIAL-PETITION'},
            ]
        }),
        getOnePetition: builder.query<IPetition, {id: string}>({
            query:({id})=> `/petition/${id}`,
            providesTags:(_result, _error, {id}) => [{type:'Petition', id}]
        }),
        createPetition: builder.mutation({
            query:petition=>({
                body: petition,
                url: '/petition',
                method: 'POST'
            }),
            invalidatesTags:[{type: 'Petition', id: 'LIST-PETITION'}]
        }),
        subscribePetition: builder.mutation({
            query:({id, formData})=>({
                url: `/petition/subs/${id}`,
                method: 'PUT',
                body: formData,                
            }),
            invalidatesTags:(_result, _error, arg) => [{type: 'Petition', id: arg._id}]
        }),
        updateStatus: builder.mutation({
            query: ({id, formData})=>({
                url:`/petition/${id}`,
                method: 'PUT',
                body: formData,
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem('token-petition')}`
                },
            }),
            invalidatesTags: (_result, _error, arg) => [{type: 'Petition', id: arg._id}],
        }),
        addAnswer: builder.mutation({
            query:({id, formData})=>({
                url:`petition/answer/${id}`,
                method: 'PUT',
                body: formData,
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem('token-petition')}`
                },
            }),
            invalidatesTags: (_result, _error, arg) => [{type: 'Petition', id: arg._id}],
        })

    })
})

export type Api = typeof api;

export const {
    useGetOnePetitionQuery,
    useGetPetitionByStatusQuery,
    useCreatePetitionMutation,
    useSubscribePetitionMutation,
    useUpdateStatusMutation,
    useAddAnswerMutation
} = api;

