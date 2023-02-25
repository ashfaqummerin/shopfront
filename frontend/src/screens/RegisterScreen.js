import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { Row, Col, Button, Form } from "react-bootstrap";
import axios from "axios";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { USER_REGISTER_REQUEST, USER_REGISTER_SUCCESS, USER_REGISTER_FAIL, USER_LOGIN_SUCESS } from "../redux/userSlice";


const RegisterScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [message, setMessage] = useState(null)
    const redirect = window.location.search ? window.location.search.split("=")[1] : "/"


    // Register User Action

    const register = async (name, email, password) => {
        try {
            dispatch(USER_REGISTER_REQUEST())
            const config = {
                headers: { "Content-Type": "application/json" }
            }
            const { data } = await axios.post("/api/users", { name, email, password }, config)

            dispatch(USER_REGISTER_SUCCESS(data))
            dispatch(USER_LOGIN_SUCESS(data))
            localStorage.setItem("userInfo", JSON.stringify(data))
        } catch (error) {
            dispatch(USER_REGISTER_FAIL(error))
        }
    }
    // State from store

    const userRegister = useSelector(state => state.userLogin)
    const { loading, error, userInfo } = userRegister

    useEffect(() => {
        if (userInfo) {
            navigate(redirect)
        }
    }, [navigate, userInfo, redirect])

    const submitHandler = (e) => {
        e.preventDefault()
        if (password !== confirmPassword) {
            setMessage("Password do not match")
        } else {
            register(name, email, password)
        }
    }

    return (<FormContainer>
        <h1>Sign up</h1>
        {message && <Message variant="danger">{message}</Message>}
        {error && <Message variant="danger">{error}</Message>}
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
            <Button type="submit" variant="primary" className="my-4">Register</Button>
        </Form>

        <Row>
            <Col>
                {/* Already have an account? <Link to="/login">Login</Link> */}
                Already have an account? <Link to={redirect ? `login?redirect=${redirect}` : "/login"}>Login</Link>
            </Col>
        </Row>
    </FormContainer>);
}

export default RegisterScreen;