import { Col, Row } from "react-bootstrap";
import Product from "../components/Product";
import Message from "../components/Message";
import Loader from "../components/Loader";
import Paginate from "../components/Paginate";
import { useListProducts } from "../redux/actions/getProducts"
import { useParams } from "react-router-dom";
import ProductCarousel from "../components/ProductCarousel";
import Meta from "../components/Meta";
import { useEffect } from "react";


const HomeScreen = () => {
    const { keyword } = useParams()
    const { pageNumber } = useParams() || 1
    const { products, loading, error, page, pages, listProducts } = useListProducts()

    useEffect(() => {
        listProducts(keyword, pageNumber)
    }, [])

    return (
        <>
            <Meta />
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