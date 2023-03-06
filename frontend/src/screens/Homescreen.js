import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { useEffect } from "react";
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from "../redux/productSlice"
import axios from "axios"
import Message from "../components/Message";
import Loader from "../components/Loader";
import { useDispatch, useSelector } from 'react-redux'
import { useGetProducts } from "../redux/actions/getProducts"
import { useParams, useNavigate } from "react-router-dom";


const HomeScreen = () => {
    const navigate = useNavigate()
    const { keyword } = useParams()
    const dispatch = useDispatch()
    const { products, loading, error } = useSelector(state => state.productList)
    // const { products, loading, error } = useGetProducts()
    useEffect(() => {
        const getProducts = async (keyword = "") => {
            try {
                dispatch(PRODUCT_LIST_REQUEST())
                const { data } = await axios.get(`/api/products?keyword=${keyword}`)
                dispatch(PRODUCT_LIST_SUCCESS(data))
            } catch (error) {
                dispatch(PRODUCT_LIST_FAIL(error))
            }
        }
        getProducts(keyword)
    }, [dispatch, keyword])

    return (
        <>
            <h1>Latest Products</h1>
            {loading ? <Loader /> : error ? <Message>{error}</Message> : <Row>
                {products?.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}

            </Row>}


        </>
    );
}

export default HomeScreen;