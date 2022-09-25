import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import authService, { AuthUser } from './authServise'

const user = JSON.parse(localStorage.getItem('user') || '{}')

const initialState = {
    user: user ? user : null,
    isError: false,
    isSuccess: false,
    isLoading: false,
    message: '',
}

export const register = createAsyncThunk(
    'auth/register',
    async (user: AuthUser, thunkAPI) => {
        try {
            return await authService.register(user)
        } catch (error: any) {
            const message = error.response.data.message
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const login = createAsyncThunk(
    'auth/login',
    async (user: AuthUser, thunkAPI) => {
        try {
            return await authService.login(user)
        } catch (error: any) {
            const message = error.response.data.message
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const logOut = createAsyncThunk('auth/logout', async () => {
    await authService.logout()
})

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        reset: (state) => {
            state.isLoading = false
            state.isError = false
            state.isSuccess = false
            state.message = ''
        },
    },
    extraReducers: (builder) => {
        builder.addCase(register.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(
            register.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            }
        )
        builder.addCase(
            register.rejected,
            (state, action: PayloadAction<any>) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
                state.user = null
            }
        )
        builder.addCase(login.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(
            login.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.isLoading = false
                state.isSuccess = true
                state.user = action.payload
            }
        )
        builder.addCase(login.rejected, (state, action: PayloadAction<any>) => {
            state.isLoading = false
            state.isError = true
            state.message = action.payload
            state.user = null
        })
        builder.addCase(
            logOut.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.user = null
            }
        )
    },
})

export const { reset } = authSlice.actions
export default authSlice.reducer
