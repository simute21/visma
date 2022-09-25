import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '../store'
import {
    deleteCustomer,
    editCustomer,
} from '../../features/customers/customerSlice'
import Modal from 'react-modal'
import { useState, useEffect } from 'react'
import { CustomerData } from './CustomerForm/CustomerForm'

function Customer(props: any) {
    const [modalIsOpen, setIsOpen] = useState<boolean>(false)

    const { _id, email, fullName, zipCode, street, houseNumber, city } =
        props.customer

    const dispatch = useDispatch<AppDispatch>()

    const { isSuccess } = useSelector((state: RootState) => state.customers)

    const openModal = () => {
        setIsOpen(true)
    }
    const closeModal = () => {
        setIsOpen(false)
    }

    Modal.setAppElement('#root')

    const [formChanged, setIsFormChanged] = useState<boolean>(false)

    const [customerData, setCustomerData] = useState<CustomerData>({
        _id,
        fullName,
        email,
        city,
        street,
        houseNumber,
        zipCode,
    })

    const onSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        console.log(customerData)
        dispatch(editCustomer(customerData))
    }

    const onFormChange = (e: React.FormEvent) => {
        const { name, value } = e.target as HTMLButtonElement
        console.log(name, value)
        setIsFormChanged(true)
        setCustomerData((prevState) => ({
            ...prevState,
            [name]: value,
        }))
    }

    return (
        <div className="grid-container">
            <p>{fullName}</p>
            <p>{email}</p>
            <p>{city}</p>
            <p>{street}</p>
            <p>{houseNumber}</p>
            <p>{zipCode}</p>
            <div>
                <button
                    onClick={() => {
                        console.log('hello')
                        dispatch(deleteCustomer(_id))
                    }}
                >
                    x
                </button>
                <button
                    onClick={() => {
                        openModal()
                    }}
                >
                    edit
                </button>
            </div>
            <Modal isOpen={modalIsOpen}>
                <button onClick={closeModal}>close</button>
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        placeholder="full name"
                        name="fullName"
                        id="fullName"
                        onChange={onFormChange}
                        value={formChanged ? customerData.fullName : fullName}
                    ></input>
                    <input
                        type="email"
                        placeholder="email"
                        name="email"
                        id="email"
                        onChange={onFormChange}
                        value={formChanged ? customerData.email : email}
                    ></input>
                    <input
                        type="text"
                        placeholder="city"
                        name="city"
                        id="city"
                        onChange={onFormChange}
                        value={formChanged ? customerData.city : city}
                    ></input>
                    <input
                        type="text"
                        placeholder="street"
                        name="street"
                        id="street"
                        onChange={onFormChange}
                        value={formChanged ? customerData.street : street}
                    ></input>
                    <input
                        type="text"
                        placeholder="house number"
                        name="houseNumber"
                        id="houseNumber"
                        onChange={onFormChange}
                        value={
                            formChanged ? customerData.houseNumber : houseNumber
                        }
                    ></input>
                    <input
                        type="text"
                        placeholder="zip code"
                        name="zipCode"
                        id="zipCode"
                        onChange={onFormChange}
                        value={formChanged ? customerData.zipCode : zipCode}
                    ></input>
                    <button type="submit">Edit customer</button>
                </form>
            </Modal>
        </div>
    )
}

export default Customer
