import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { USER_DETAIL_REQUEST, USER_DETAIL_SUCCESS, USER_DETAIL_FAIL } from "../redux/userSlice";
import { USER_UPDATE_REQUEST, USER_UPDATE_SUCCESS, USER_UPDATE_FAIL, USER_UPDATE_RESET } from "../redux/userUpdateSlice";

const UserEditScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [isAdmin, setIsAdmin] = useState(false)

    // BOTH RETURNS ID FROM PATH PARAMS
    const userId = useParams().id
    // const { id } = useParams()

    // @USER DETAILS FROM STORE
    const userDetails = useSelector(state => state.userLogin)
    const { loading, error, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const userUpdate = useSelector(state => state.userUpdate)
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = userUpdate

    // @USER DETAILS ACTION
    const getUserDetails = async (id) => {
        try {
            dispatch(USER_DETAIL_REQUEST())
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const { data } = await axios.get(`/api/users/${id}`, config)
            dispatch(USER_DETAIL_SUCCESS(data))

        } catch (error) {
            dispatch(USER_DETAIL_FAIL(error))
        }
    }

    // USER UPDATE ACTION

    const updateUser = async (user) => {
        try {
            dispatch(USER_UPDATE_REQUEST())
            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const { data } = await axios.put(`/api/users/${user._id}`, user, config)

            dispatch(USER_UPDATE_SUCCESS())
            dispatch(USER_DETAIL_SUCCESS(data))
        } catch (error) {
            dispatch(USER_UPDATE_FAIL(error))
        }
    }

    useEffect(() => {
        if (successUpdate) {
            dispatch(USER_UPDATE_RESET())
            navigate("/admin/userlist")

        } else {
            if (!user.name || user._id !== userId) {
                getUserDetails(userId)
            } else {
                setName(user.name)
                setEmail(user.email)
                setIsAdmin(user.isAdmin)
            }
        }
    }, [user, userId])

    const submitHandler = (e) => {
        e.preventDefault()
        updateUser({ _id: userId, name, email, isAdmin })
    }

    return (
        <>
            <Link to="/admin/userList" className="btn btn-light">Go Back</Link>

            <FormContainer>
                <h1>Edit User</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="name" placeholder="Enter Name" value={name} onChange={e => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="email">
                            <Form.Label>Email Address</Form.Label>
                            <Form.Control type="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="isAdmin">

                            <Form.Check type="checkbox" label="Is Admin" checked={isAdmin} onChange={e => setIsAdmin(e.target.checked)} />
                        </Form.Group>

                        <Button type="submit" variant="primary" className="my-4">Update</Button>
                    </Form>
                )}
            </FormContainer>
        </>)
}

export default UserEditScreen;