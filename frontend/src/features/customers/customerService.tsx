import axios from 'axios'
import { CustomerData } from '../../app/components/CustomerForm/CustomerForm'

const API_URL = 'api/customers/'

const createCustomer = async (customerData: CustomerData, token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.post(API_URL, customerData, config)

    return response.data
}

const getCustomers = async (token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.get(API_URL, config)

    return response.data
}

const deleteCustomer = async (id: string, token: string) => {
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
    }
    const response = await axios.delete(API_URL + id, config)

    return response.data
}

const editCustomer = async (
    id: string,
    token: string,
    customerData: CustomerData
) => {
    const params = {
        email: customerData.email,
        fullName: customerData.fullName,
        houseNumber: customerData.houseNumber,
        zipCode: customerData.zipCode,
        street: customerData.street,
        city: customerData.city,
    }
    const config = {
        headers: {
            Authorization: `Bearer ${token}`,
        },
        'Content-Type': 'application/json',
    }
    const response = await axios.put(API_URL + id, params, config)
    console.log(response)
    return response.data
}

const customerService = {
    createCustomer,
    getCustomers,
    deleteCustomer,
    editCustomer,
}

export default customerService
