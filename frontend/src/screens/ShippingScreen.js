import { useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import FormContainer from "../components/FormContainer";
import { CART_SAVE_SHIPPING_ADDRESS } from "../redux/cartSlice"
import { useNavigate } from "react-router-dom";

const ShippingScreen = () => {
    const cart = useSelector(state => state.cart)
    const { shippingAddress } = cart
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [address, setAddress] = useState(shippingAddress.address)
    const [city, setCity] = useState(shippingAddress.city)
    const [postalCode, setPostalCode] = useState(shippingAddress.postalCode)
    const [country, setCountry] = useState(shippingAddress.country)
    // const [address, setAddress] = useState("")
    // const [city, setCity] = useState("")
    // const [postalCode, setPostalCode] = useState("")
    // const [country, setCountry] = useState("")
    const submitHandler = (e) => {
        e.preventDefault()
        dispatch(CART_SAVE_SHIPPING_ADDRESS({ address, city, postalCode, country }))
        navigate("/payment")
    }

    return (<FormContainer>
        <h1>Shipping</h1>
        <Form onSubmit={submitHandler}>
            <Form.Group controlId="address">
                <Form.Label>Address</Form.Label>
                <Form.Control type="text" placeholder="Enter Address" required value={address} onChange={e => setAddress(e.target.value)
                }></Form.Control>
            </Form.Group>
            <Form.Group controlId="city">
                <Form.Label>City</Form.Label>
                <Form.Control type="text" placeholder="Enter City" required value={city} onChange={e => setCity(e.target.value)} ></Form.Control>
            </Form.Group>
            <Form.Group controlId="postalCode">
                <Form.Label>Postal Code</Form.Label>
                <Form.Control type="text" placeholder="Enter Postal Code" required value={postalCode} onChange={e => setPostalCode(e.target.value)}></Form.Control>
            </Form.Group>
            <Form.Group controlId="country">
                <Form.Label>Enter Country</Form.Label>
                <Form.Control type="text" placeholder="Enter Country" required value={country} onChange={e => setCountry(e.target.value)}></Form.Control>
            </Form.Group>

            <Button className="my-3" type="submit" variant="primary"> Continue </Button>
        </Form>
    </FormContainer>);
}

export default ShippingScreen;