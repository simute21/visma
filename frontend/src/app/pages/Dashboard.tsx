import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { AppDispatch, RootState } from '../store'
import CustomerForm, {
    CustomerData,
} from '../components/CustomerForm/CustomerForm'
import Spinner from '../components/Spinner/Spinner'
import { toast } from 'react-toastify'
import { getCustomers, reset } from '../../features/customers/customerSlice'
import Customer from '../components/Customer'

function Dashboard() {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const { user } = useSelector((state: RootState) => state.auth)
    const { customers, isLoading, isError, message } = useSelector(
        (state: RootState) => state.customers
    )

    const userExists = user && Object.keys(user).length

    useEffect(() => {
        if (!userExists) {
            navigate('/login')
        }
        if (isError) {
            toast.error(message)
        }
        dispatch(getCustomers())
        return () => {
            dispatch(reset())
        }
    }, [user, navigate])

    return (
        <>
            <section>
                <p>Welcome, {user && user.email}</p>
                <CustomerForm />
                {customers && (
                    <>
                        <div className="grid-container">
                            <p>Full name</p>
                            <p>Email</p>
                            <p>City</p>
                            <p>Street</p>
                            <p>House number</p>
                            <p>Zip code</p>
                            <p>Actions</p>
                        </div>
                        {customers.map((customer: CustomerData, i) => {
                            return <Customer customer={customer} key={i} />
                        })}
                    </>
                )}
            </section>
        </>
    )
}

export default Dashboard
