import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import { useEffect } from "react";
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from "../redux/productSlice"

import axios from "axios"
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import { useDispatch, useSelector } from 'react-redux'
// import { useListProducts } from "../redux/actions/getProducts"
import { useParams } from "react-router-dom";
import ProductCarousel from "../components/ProductCarousel";


const HomeScreen = () => {
    const { keyword } = useParams()
    const { pageNumber } = useParams() || 1
    const dispatch = useDispatch()
    const { products, loading, error, page, pages } = useSelector(state => state.productList)
    // const { products, loading, error } = useGetProducts()

    useEffect(() => {
        const listProducts = async (keyword = "", pageNumber = "") => {
            try {
                dispatch(PRODUCT_LIST_REQUEST())
                const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)
                dispatch(PRODUCT_LIST_SUCCESS(data))
            } catch (error) {
                dispatch(PRODUCT_LIST_FAIL(error))
            }
        }
        listProducts(keyword, pageNumber)
    }, [dispatch, keyword, pageNumber])

    return (
        <>
            {!keyword && <ProductCarousel />}
            <h1>Latest Products</h1>
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> :
                (<>
                    <Row>
                {products?.map(product => (
                    <Col key={product._id} sm={12} md={6} lg={4} xl={3}>
                        <Product product={product} />
                    </Col>
                ))}

                    </Row>
                    <Paginate page={page} pages={pages} keyword={keyword ? keyword : ""} />
                </>
                )}


        </>
    );
}

export default HomeScreen;