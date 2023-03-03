import { useDispatch, useSelector } from "react-redux"
import axios from "axios";
import { Button, Table, Row, Col } from "react-bootstrap"
import Message from "../components/Message";
import Loader from "../components/Loader";
import { LinkContainer } from "react-router-bootstrap"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import { PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL, PRODUCT_DELETE_RESET } from "../redux/productDeleteSlice";
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from "../redux/productSlice"; 
import { PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL, PRODUCT_CREATE_RESET } from "../redux/productCreateSlice";
import { PRODUCT_UPDATE_RESET } from "../redux/productUpdateSlice";

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

    const productCreate = useSelector(state => state.productCreate)
    const { loading: loadingCreate, success: successCreate, error: errorCreate, product: createdProduct } = productCreate

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = productUpdate

    // LIST PRODUCTS ACTION

    const listProducts = async () => {
        try {
            dispatch(PRODUCT_LIST_REQUEST())
            console.log("called from list screen")
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

    // PRODUCT CREATE ACTION

    const createProduct = async () => {
        try {
            dispatch(PRODUCT_CREATE_REQUEST())

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const { data } = await axios.post("/api/products", {}, config)
            dispatch(PRODUCT_CREATE_SUCCESS(data))
        } catch (error) {
            dispatch(PRODUCT_CREATE_FAIL(error))
        }
    }

    useEffect(() => {
        if (userInfo.isAdmin) {

            if (successCreate) navigate(`/admin/product/${createdProduct._id}/edit`)
            if (successDelete) dispatch(PRODUCT_DELETE_RESET())
            if (successUpdate) dispatch(PRODUCT_UPDATE_RESET())
            listProducts()
        } else {
            navigate("/login") 
        }
    }, [userInfo, successDelete, successCreate, navigate, dispatch])

    const deleteHandler = (id) => {
        if ((window.confirm("Are you sure"))) {
            deleteProduct(id)
        }
    }

    const createProductHandler = () => {
        createProduct()
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
            {loadingCreate && <Loader />}
            {errorCreate && <Message variant="danger">{errorCreate}</Message>}
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
                                    <LinkContainer to={`/admin/product/${product._id}/edit`}>
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