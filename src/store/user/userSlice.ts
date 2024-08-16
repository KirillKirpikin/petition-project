import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios, { AxiosError } from "axios";
import { jwtDecode } from "jwt-decode";
import { IAuth } from "../../types/auth.type";
import { toastError, toastSuccess } from "../../utils/toastFunction";


type User = {
    _id: string
    email: string,
}

type UserState ={
    currentUser: User | null,
    isAuth: boolean,
    status: 'loading' | 'resolved' | 'rejected' | null,
}

export interface CustomError {
    response?: {
        data?: {
        message?: string;
        };
    };
}



export const loginUser = createAsyncThunk<User, IAuth, {rejectValue: AxiosError}>('user/login', 
    async(payload, {rejectWithValue})=>{
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login`, payload);
            console.log(res.data);
            localStorage.setItem('token-petition', res.data.access_token);
            return jwtDecode(res.data.access_token)
        } catch (error: unknown) {
            console.log(error)
            return rejectWithValue((error as AxiosError))        
        }
    }
)

export const addAdmin = createAsyncThunk< void,{email :string}>('user/add_admin', 
    async(payload)=>{
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/newadmin`, payload);
            if(res.status === 201){ 
                toastSuccess('Адмін Успішно додан')
            }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error: any) {
            
            toastError(error.response.data.message)
        }
    }
)


export const loginGlobal = createAsyncThunk<string | undefined, {token :string}>('user/login_global',
    async(payload, {rejectWithValue})=>{
        try {
            const res = await axios.post(`${import.meta.env.VITE_BASE_URL}/auth/login-global`, payload);
            if(res.status === 201){
                toastSuccess('Вхід успішний')
                localStorage.setItem('token-petition', res.data.token);
            }
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (error) {
            const axiosError = error as AxiosError;
            return rejectWithValue(axiosError.response?.data);            
        }
    }
)

export const checkUser = createAsyncThunk('user/check',
    async (_, {rejectWithValue})=>{
        try {
            const token = localStorage.getItem('token-petition')
            if(!token){
                return null;
            }
            const res = await axios(`${import.meta.env.VITE_BASE_URL}/auth/check`, {
                headers:{
                    "Authorization": `Bearer ${localStorage.getItem('token-petition')}`
                }
            });            
            localStorage.setItem('token-petition', res.data.access_token)
            return jwtDecode(res.data.access_token)

        } catch (error) {
            return rejectWithValue((error as Error).message)
        }
    }
)



const initialState: UserState = {
    currentUser:null,
    isAuth: false,
    status: null
}

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers:{
        logOut:(state)=>{
            state.currentUser = null;
            state.isAuth = false;
            localStorage.removeItem('token-petition')
        }
    },
    extraReducers: (builder) =>{
        builder
        .addCase(loginGlobal.pending, (state)=>{
            state.status = 'loading';
        })
        .addCase(loginGlobal.fulfilled, (state)=>{
            state.status = 'resolved';
            state.isAuth = true;
        })
        .addCase(loginGlobal.rejected, (state)=>{
            state.status = 'resolved';
            state.isAuth = false;
        })
        
        // .addCase(loginUser.pending, (state)=>{
        //     state.status = 'loading';
        // })
        // .addCase(loginUser.fulfilled, (state, action)=>{
        //     state.status = 'resolved';
        //     state.currentUser = action.payload;
        //     state.isAuth = true;
        // })
        // .addCase(loginUser.rejected, (state)=>{
        //     state.status = 'resolved';
        // })
        .addCase(checkUser.pending, (state)=>{
            state.status = 'loading';
        })
        .addCase(checkUser.fulfilled, (state, action)=>{
            state.currentUser = action.payload;
            state.isAuth = true;
            if (action.payload) {
                state.status = 'resolved';
                state.currentUser = action.payload;
                state.isAuth = true;
            } else {
            state.status = 'resolved';
            state.isAuth = false;
            }
        })
        .addCase(checkUser.rejected, (state)=>{
            state.status = 'resolved';
            state.isAuth = false;
        })
    }
})

export const {logOut} = userSlice.actions;

export default userSlice.reducer;

