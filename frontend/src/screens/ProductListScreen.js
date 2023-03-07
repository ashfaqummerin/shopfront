import { useDispatch, useSelector } from "react-redux"
import { Button, Table, Row, Col } from "react-bootstrap"
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import { LinkContainer } from "react-router-bootstrap"
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom"
import { PRODUCT_DELETE_RESET } from "../redux/productDeleteSlice";
import { PRODUCT_UPDATE_RESET } from "../redux/productUpdateSlice";
import useDeleteProduct from "../redux/actions/deleteProduct";
import useCreateProduct from "../redux/actions/createProduct";
import useListProducts from "../redux/actions/getProducts"
import { PRODUCT_CREATE_RESET } from "../redux/productCreateSlice";

const ProductListScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { pageNumber } = useParams() || 1

    const { userInfo } = useSelector(state => state.userLogin)
    const { loading, error, products, page, pages, listProducts } = useListProducts()

    const { loading: loadingDelete, error: errorDelete, success: successDelete, deleteProduct } = useDeleteProduct()

    const { createProduct, loading: loadingCreate, success: successCreate, error: errorCreate, product: createdProduct } = useCreateProduct()
    const { success: successUpdate } = useSelector(state => state.productUpdate)


    useEffect(() => {
        if (userInfo.isAdmin) {

            if (successCreate) {
                navigate(`/admin/product/${createdProduct._id}/edit`)
                dispatch(PRODUCT_CREATE_RESET())
            }
            if (successDelete) dispatch(PRODUCT_DELETE_RESET())
            if (successUpdate) dispatch(PRODUCT_UPDATE_RESET())
            listProducts("", pageNumber)
        } else {
            navigate("/login") 
        }
    }, [userInfo, successDelete, successCreate, navigate, dispatch, pageNumber])

    const deleteHandler = (id) => {
        if (window.confirm("Are you sure?")) {
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
                <>
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
                    <Paginate page={page} pages={pages} isAdmin={true} />
                </>
            )}
        </>);
}

export default ProductListScreen;