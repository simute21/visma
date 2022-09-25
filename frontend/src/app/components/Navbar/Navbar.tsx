import { Link, useNavigate } from 'react-router-dom'
import Logo from '../../../../src/logo.svg'
import './Navbar.css'
import { useSelector, useDispatch } from 'react-redux'
import { logOut, reset } from '../../../features/auth/authSlice'
import { RootState } from '../../store'
import { AppDispatch } from '../../store'

function Navbar() {
    const navigate = useNavigate()
    const dispatch = useDispatch<AppDispatch>()

    const { user } = useSelector((state: RootState) => state.auth)
    const userExists = user && Object.keys(user).length

    const onLogOut = () => {
        dispatch(logOut())
        dispatch(reset())
        navigate('/')
    }

    return (
        <div className="navbar">
            <Link to="/">
                <img src={Logo} alt="visma-logo" />
            </Link>
            <ul>
                {userExists ? (
                    <li>
                        <button onClick={onLogOut}>Log out</button>
                    </li>
                ) : (
                    <>
                        <li>
                            <Link to="/login">login</Link>
                        </li>
                        <li>
                            <Link to="/register">register</Link>
                        </li>
                    </>
                )}
            </ul>
        </div>
    )
}

export default Navbar
