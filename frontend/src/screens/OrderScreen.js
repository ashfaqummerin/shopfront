import axios from "axios"
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"
import { useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams, Link } from "react-router-dom"
import { Row, Col, ListGroup, Image, Card, Button } from "react-bootstrap"
import Message from "../components/Message"
import Loader from "../components/Loader"
import { ORDER_DETAIL_REQUEST, ORDER_DETAIL_SUCCESS, ORDER_DETAIL_FAIL } from "../redux/orderDetailSlice"
import { ORDER_PAY_REQUEST, ORDER_PAY_SUCCESS, ORDER_PAY_FAIL, ORDER_PAY_RESET } from "../redux/orderPaySlice"

const OrderScreen = () => {
    const { id } = useParams()
    const dispatch = useDispatch()

    //  STATE FOR SDK PAYPAL
    const [sdkReady, setSdkReady] = useState(false)

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const orderDetails = useSelector(state => state.orderDetails)
    const { order, loading, error } = orderDetails

    const orderPay = useSelector(state => state.orderPay)
    const { loading: loadingPay, success: successPay } = orderPay

    // GET ORDER DETAIL ACTION
    const getOrderDetails = async (id) => {
        try {
            dispatch(ORDER_DETAIL_REQUEST())

            const config = {
                headers: {
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const { data } = await axios.get(`/api/orders/${id}`, config)

            dispatch(ORDER_DETAIL_SUCCESS(data))

        } catch (error) {
            dispatch(ORDER_DETAIL_FAIL(error))
        }
    }

    useEffect(() => {
        // PAYPAL SCRIPT
        // const addPayPalScript = async () => {
        //     const { data: clientId } = await axios.get("/api/config/paypal")
        //     const script = document.createElement("script")
        //     script.type = "text/javascript"
        //     script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`
        //     script.async = true
        //     script.onload = () => {
        //         setSdkReady(true)
        //     }
        //     // ADD SCRIPT TO BODY
        //     document.body.appendChild(script)
        // }

        // GET ORDER DETAILS ACTION FIRED IF ORDER ISN'T THERE OR IF WE HAVE A SUCCESS PAY
        if (!order || !successPay) {
            dispatch(ORDER_PAY_RESET())
            getOrderDetails(id)
        }
        // IF ORDER ISNT' PAID ADD PAYPAL SCRIPT
        // } else if (!order.isPaid) {
        //     if (!window.paypal) {
        //         addPayPalScript()
        //     } else {
        //         setSdkReady(true)
        //     }
        // }
    }, [id, successPay])

    // ORDER PAY ACTION

    const payOrder = async (orderId, details) => {
        try {
            dispatch(ORDER_PAY_REQUEST())

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            const { data } = await axios.put(`/api/orders/${orderId}/pay`, details, config)
            console.log("data", data)
            console.log("token", userInfo.token)
            dispatch(ORDER_PAY_SUCCESS(data))
        } catch (error) {
            dispatch(ORDER_PAY_FAIL(error))
        }
    }

    return loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : <>
        <h1>Order {order._id}</h1>
        <Row>
            <Col md={8}>
                <ListGroup variant="flush">
                    <ListGroup.Item>
                        <h2>Shipping</h2>
                        <p><strong>Name: </strong>{order.user.name}</p>
                        <p><strong>Email: </strong> <a href={`mailto:${order.user.name}`}>{order.user.email}</a></p>
                        <p>
                            <strong>Address: </strong>
                            {order.shippingAddress.address}, {order.shippingAddress.city},{order.shippingAddress.postalCode},{order.shippingAddress.country}
                        </p>
                        {order.isDelivered ? <Message variant="success">Delivered on {order.deliveredAt}</Message> : <Message variant="danger">Not Delivered</Message>}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Payment Method</h2>
                        <p>
                            <strong>Method: </strong>
                            {order.paymentMethod}
                        </p>
                        {order.isPaid ? <Message variant="success">Paid on {order.paidAt}</Message> : <Message variant="danger">Not Paid</Message>}
                    </ListGroup.Item>

                    <ListGroup.Item>
                        <h2>Order Items</h2>
                        {order.orderItems.length === 0 ? <Message>Order is empty</Message> : (
                            <ListGroup variant="flush">
                                {order.orderItems.map((item, index) => (
                                    <ListGroup.Item key={index}>
                                        <Row>
                                            <Col md={1}>
                                                <Image src={item.image} alt={item.name} fluid rounded />
                                            </Col>
                                            <Col>
                                                <Link to={`/product/${item._id}`}>
                                                    {item.name}
                                                </Link>
                                            </Col>
                                            <Col md={4}>
                                                {item.qty} x {item.price} = ${item.qty * item.price}
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                        )}
                    </ListGroup.Item>
                </ListGroup>
            </Col>

            <Col md={4}>
                <Card>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h2>Order Summary</h2>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Items</Col>
                                <Col>$ {order.itemsPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Shipping</Col>
                                <Col>$ {order.shippingPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Tax</Col>
                                <Col>$ {order.taxPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Row>
                                <Col>Total</Col>
                                <Col>$ {order.totalPrice}</Col>
                            </Row>
                        </ListGroup.Item>
                        {!order.isPaid && (
                            <ListGroup.Item>
                                {loadingPay && <Loader />}
                                {sdkReady ? <Loader /> : (
                                    <PayPalScriptProvider
                                        options={{
                                            "client-id": "test",
                                        }}
                                    >
                                        <PayPalButtons createOrder={(data, actions) => {
                                            return actions.order
                                                .create({
                                                    purchase_units: [
                                                        {
                                                            amount: {
                                                                // currency_code: currency,
                                                                value: order.totalPrice,
                                                            },
                                                        },
                                                    ],
                                                })
                                        }}
                                            onApprove={(data, actions) => {

                                                return actions.order.capture().then(function (details) {

                                                    console.log("paypal details", details)

                                                    payOrder(id, details)
                                                    alert("Transaction completed by " + details.payer.name.given_name)
                                                })
                                            }}
                                        />
                                    </PayPalScriptProvider>

                                )}
                            </ListGroup.Item>
                        )}
                    </ListGroup>
                </Card>
            </Col>
        </Row>
    </>
}

export default OrderScreen;