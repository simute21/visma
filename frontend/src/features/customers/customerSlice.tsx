import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { CustomerData } from '../../app/components/CustomerForm/CustomerForm'
import customerService from './customerService'

const initialState = {
    customers: [] as CustomerData[],
    isError: false,
    isLoading: false,
    isSuccess: false,
    message: '',
}

export const createCustomer = createAsyncThunk(
    'customers/create',
    async (customerData: CustomerData, thunkAPI: any) => {
        try {
            const token = thunkAPI.getState().auth.user.token

            return await customerService.createCustomer(customerData, token)
        } catch (error: any) {
            const message = error.response.data.message
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const deleteCustomer = createAsyncThunk(
    'customers/delete',
    async (id: string, thunkAPI: any) => {
        try {
            const token = thunkAPI.getState().auth.user.token

            return await customerService.deleteCustomer(id, token)
        } catch (error: any) {
            const message = error.response.data.message
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const editCustomer = createAsyncThunk(
    'customers/edit',
    async (customerData: CustomerData, thunkAPI: any) => {
        const { _id } = customerData
        console.log(customerData)
        try {
            const token = thunkAPI.getState().auth.user.token
            return await customerService.editCustomer(
                _id as string,
                token,
                customerData
            )
        } catch (error: any) {
            const message = error.response.data.message
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const getCustomers = createAsyncThunk(
    'customers/getAll',
    async (_, thunkAPI: any) => {
        try {
            const token = thunkAPI.getState().auth.user.token

            return await customerService.getCustomers(token)
        } catch (error: any) {
            const message = error.response.data.message
            return thunkAPI.rejectWithValue(message)
        }
    }
)

export const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        reset: (state) => initialState,
    },
    extraReducers: (builder) => {
        builder.addCase(createCustomer.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(
            createCustomer.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.isLoading = false
                state.isSuccess = true
                state.customers.push(action.payload)
            }
        )
        builder.addCase(
            createCustomer.rejected,
            (state, action: PayloadAction<any>) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            }
        )
        builder.addCase(getCustomers.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(
            getCustomers.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.isLoading = false
                state.isSuccess = true
                state.customers = action.payload
            }
        )
        builder.addCase(
            getCustomers.rejected,
            (state, action: PayloadAction<any>) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            }
        )
        builder.addCase(deleteCustomer.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(
            deleteCustomer.fulfilled,
            (state, action: PayloadAction<any>) => {
                state.isLoading = false
                state.isSuccess = true
                state.customers = state.customers.filter(
                    (customer: CustomerData) => {
                        console.log(customer._id)
                        console.log(action.payload)
                        return customer._id !== action.payload._id
                    }
                )
            }
        )
        builder.addCase(
            deleteCustomer.rejected,
            (state, action: PayloadAction<any>) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            }
        )
        builder.addCase(editCustomer.pending, (state) => {
            state.isLoading = true
        })
        builder.addCase(
            editCustomer.fulfilled,
            (state, action: PayloadAction<any>) => {
                const customerIndex = state.customers.findIndex(
                    (customer: CustomerData) =>
                        customer._id === action.payload._id
                )
                console.log(action.payload)
                if (customerIndex !== -1) {
                    state.isLoading = false
                    state.isSuccess = true
                    state.customers[customerIndex] = action.payload
                }
            }
        )
        builder.addCase(
            editCustomer.rejected,
            (state, action: PayloadAction<any>) => {
                state.isLoading = false
                state.isError = true
                state.message = action.payload
            }
        )
    },
})

export const { reset } = customerSlice.actions
export default customerSlice.reducer
