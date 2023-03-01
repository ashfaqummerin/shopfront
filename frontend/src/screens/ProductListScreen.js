import { useDispatch, useSelector } from "react-redux"
import axios from "axios";
import { Button, Table, Row, Col } from "react-bootstrap"
import Message from "../components/Message";
import Loader from "../components/Loader";
import { LinkContainer } from "react-router-bootstrap"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL } from "../redux/productDeleteSlice";
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from "../redux/productSlice"; 

const ProductListScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    // PRODUCTS LIST STATE FROM STORE
    const productList = useSelector(state => state.productList)
    const { loading, error, products } = productList

    const productDelete = useSelector(state => state.productDelete)
    const { loading: loadingDelete, error: errorDelete, success: successDelete } = productDelete

    // LIST PRODUCTS ACTION

    const listProducts = async () => {
        try {
            dispatch(PRODUCT_LIST_REQUEST())
            const { data } = await axios.get(`/api/products`)
            dispatch(PRODUCT_LIST_SUCCESS(data))
        } catch (error) {
            dispatch(PRODUCT_LIST_FAIL(error))
        }
    }

    // PRODUCT DELETE ACTION
    const deleteProduct = async (id) => {
        try {
            dispatch(PRODUCT_DELETE_REQUEST())

            const config = {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            }

            await axios.delete(`/api/products/${id}`, config)
            dispatch(PRODUCT_DELETE_SUCCESS())

        } catch (error) {
            dispatch(PRODUCT_DELETE_FAIL(error))
        }
    }
    useEffect(() => {

        if (userInfo && userInfo.isAdmin) {
            listProducts()
        } else {
            navigate("/login")
        }
    }, [userInfo, successDelete])

    const deleteHandler = (id) => {
        if ((window.confirm("Are you sure"))) {
            deleteProduct(id)
        }
    }

    const createProductHandler = () => {
        console.log("create")
    }

    return (
        <>
            <Row className="align-items-center">
                <Col>
                    <h1>Products</h1>
                </Col>
                <Col className="text-right">
                    <Button className="my-3" onClick={createProductHandler}>
                        <i className="fas fa-plus" /> Create Product
                    </Button>
                </Col>
            </Row>
            {loadingDelete && <Loader />}
            {errorDelete && <Message variant="danger">{errorDelete}</Message>}
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <Table striped bordered hover responsive className="table-sm" >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>PRICE</th>
                            <th>CATEGORY</th>
                            <th>BRAND</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product._id}>
                                <td>{product._id}</td>
                                <td>{product.name}</td>
                                <td>$ {product.price}</td>
                                <td>{product.category}</td>
                                <td>{product.brand}</td>
                                <td>
                                    <LinkContainer to={`/admin/products/${product._id}/edit`}>
                                        <Button variant="light" className="btn-sm">
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(product._id)}>
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>);
}

export default ProductListScreen;