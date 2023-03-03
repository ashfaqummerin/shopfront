import { useDispatch, useSelector } from "react-redux"
import axios from "axios";
import { Button, Table } from "react-bootstrap"
import Message from "../components/Message";
import Loader from "../components/Loader";
import { LinkContainer } from "react-router-bootstrap"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { ORDER_LIST_REQUEST, ORDER_LIST_SUCCESS, ORDER_LIST_FAIL } from "../redux/orderList"

const OrderListScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    // USER LIST STATE FROM STORE
    const orderList = useSelector(state => state.orderList)
    const { loading, error, orders } = orderList


    // ORDER LIST ACTION
    const listOrders = async () => {
        try {
            dispatch(ORDER_LIST_REQUEST())
            const config = {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            }
            const { data } = await axios.get("/api/orders", config)

            dispatch(ORDER_LIST_SUCCESS(data))
        } catch (error) {
            dispatch(ORDER_LIST_FAIL(error))
        }
    }

    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            listOrders()
        } else {
            navigate("/login")
        }
    }, [userInfo])

    return (
        <>
            <h1>Orders</h1>
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <Table striped bordered hover responsive className="table-sm" >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>USER</th>
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
                                <td>{order.user && order.user.name}</td>
                                <td>{order.createdAt}</td>
                                <td>$ {order.totalPrice}</td>
                                <td>
                                    {order.isPaid ? (order.paidAt.substring(0, 10)) : <i className="fas fa-times" style={{ color: "red" }}></i>}
                                </td>
                                <td>
                                    {order.isDelivered ? (order.deliveredAt.substring(0, 10)) : <i className="fas fa-times" style={{ color: "red" }}></i>}
                                </td>

                                <td>
                                    <LinkContainer to={`/orders/${order._id}`}>
                                        <Button variant="light" className="btn-sm">
                                            Details
                                        </Button>
                                    </LinkContainer>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>);
}

export default OrderListScreen;