import { useDispatch, useSelector } from "react-redux";
import { USER_UPDATE_PROFILE_REQUEST, USER_UPDATE_PROFILE_SUCCESS, USER_UPDATE_PROFILE_FAIL } from "../redux/userSlice";
import { USER_DETAIL_REQUEST, USER_DETAIL_SUCCESS, USER_DETAIL_FAIL } from "../redux/userSlice"
import { ORDER_LIST_MY_REQUEST, ORDER_LIST_MY_SUCCESS, ORDER_LIST_MY_FAIL } from "../redux/orderListMySlice";

import axios from "axios"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"
import { Row, Col, Button, Form, Table } from "react-bootstrap"
import Message from "../components/Message";
import Loader from "../components/Loader";
import { LinkContainer } from "react-router-bootstrap"

const ProfileScreen = () => {

    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState("")

    const dispatch = useDispatch()
    const navigate = useNavigate()
    // @USER DETAILS FROM STORE
    const userDetails = useSelector(state => state.userDetails)
    const { loading, error, user } = userDetails

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const updateUser = useSelector(state => state.userLogin)
    const { success } = updateUser

    const orderListMy = useSelector(state => state.orderListMy)
    const { orders, loading: loadingOrders, error: errorOrders } = orderListMy

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

    // @USER UPDATE PROFILE ACTON
    const updateUserProfile = async (user) => {
        try {
            dispatch(USER_UPDATE_PROFILE_REQUEST())

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            const { data } = await axios.put("/api/users/profile", user, config)
            // console.log("update", data)
            dispatch(USER_UPDATE_PROFILE_SUCCESS(data))
            setName(data.name)
            setEmail(data.email)
        } catch (error) {
            dispatch(USER_UPDATE_PROFILE_FAIL(error))
        }
    }

    // LIST MY ORDERS ACTIONS
    const listMyOrders = async () => {
        try {
            dispatch(ORDER_LIST_MY_REQUEST())

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const { data } = await axios.get(`/api/orders/myorders`, config)
            dispatch(ORDER_LIST_MY_SUCCESS(data))

        } catch (error) {
            dispatch(ORDER_LIST_MY_FAIL(error))
        }
    }

    useEffect(() => {
        if (!userInfo) {
            navigate("/login")
        } else {
            if (!user.name) {
                getUserDetails("profile")
                listMyOrders()
            } else {
                setName(userInfo.name)
                setEmail(userInfo.email)
            }
        }
    }, [userInfo, user, navigate])

    const submitHandler = (e => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage("Password doesn't match")
        } else (
            updateUserProfile({ id: user._id, name, email, password })
        )
    })


    return (<Row>
        <Col md={3}>
            <h2>User Profile</h2>
            {message && <Message variant="danger">{message}</Message>}
            {error && <Message variant="danger">{error}</Message>}
            {success && <Message variant="success">Profile Updated</Message>}
            {loading && <Loader />}
            <Form onSubmit={submitHandler}>
                <Form.Group controlId="name">
                    <Form.Label>Name</Form.Label>
                    <Form.Control type="name" placeholder="Enter Name" value={name} onChange={e => setName(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="email">
                    <Form.Label>Email Adress</Form.Label>
                    <Form.Control type="email" placeholder="Enter Email" value={email} onChange={e => setEmail(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="password">
                    <Form.Label>Enter Password</Form.Label>
                    <Form.Control type="password" placeholder="Enter Password" value={password} onChange={e => setPassword(e.target.value)} />
                </Form.Group>

                <Form.Group controlId="confirmpassword">
                    <Form.Label>Confirm Password</Form.Label>
                    <Form.Control type="password" placeholder="Confirm Password" value={confirmPassword} onChange={e => setConfirmPassword(e.target.value)} />
                </Form.Group>
                <Button type="submit" variant="primary" className="my-4">Update</Button>
            </Form>

        </Col>
        <Col md={9}>
            <h2>My Orders</h2>
            {loadingOrders ? <Loader /> : errorOrders ? <Message variant="danger">{errorOrders}</Message> : (
                <Table striped bordered hover responsive className="table-sm">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>DATE</th>
                            <th>TOTAL</th>
                            <th>PAID</th>
                            <th>DELIVERED</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {orders.map(order => (
                            <tr key={order._id}>
                                <td>{order._id}</td>
                                {/* created at not working */}
                                <td>{order.createdAt}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : (<i className="fas fa-times" style={{ color: "red" }}></i>)}</td>
                                <td>{order.totalPrice}</td>
                                <td>{order.isPaid ? order.paidAt.substring(0, 10) : (<i className="fas fa-times" style={{ color: "red" }}></i>)}</td>
                                <td>{order.isDelivered ? order.deliveredAt.substring(0, 10) : <i className="fas fa-times" style={{ color: "red" }}></i>}</td>
                                <td>
                                    <LinkContainer to={`/orders/${order._id}`}>
                                        <Button className="btn-sm" variant="light">Details</Button>
                                    </LinkContainer>
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </Col>
    </Row>);
}

export default ProfileScreen;