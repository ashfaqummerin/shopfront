import { Carousel, Image } from "react-bootstrap";
import Loader from "./Loader";
import Message from "./Message";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { PRODUCT_TOP_REQUEST, PRODUCT_TOP_SUCCESS, PRODUCT_TOP_FAIL } from "../redux/productTopSlice"
import axios from "axios";
const ProductCarousel = () => {
    const dispatch = useDispatch()

    // TOP RATED PRODUCTS STATE FROM STORE
    const { loading, error, products } = useSelector(state => state.productTopRated)

    // TOP RATED PRODUTS ACTION
    const listTopRatedProducts = async () => {
        try {
            PRODUCT_TOP_REQUEST()

            const { data } = await axios.get("/api/products/top")
            dispatch(PRODUCT_TOP_SUCCESS(data))
        } catch (error) {
            dispatch(PRODUCT_TOP_FAIL(error))
        }
    }

    useEffect(() => {
        listTopRatedProducts()
    }, [dispatch])

    return loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
        <Carousel slide={false} className="bg-dark">
            {products.map(product => (
                <Carousel.Item key={product._id} interval={9999}>
                    <Link to={`/product/${product._id}`}>
                        <Image src={product.image} alt={product.name} fluid />
                        <Carousel.Caption className="carousel-caption">
                            <h2>{product.name}</h2>
                            <h2>$ {product.price}</h2>
                        </Carousel.Caption>

                    </Link>
                </Carousel.Item>
            ))}

        </Carousel>
    )
}

export default ProductCarousel;