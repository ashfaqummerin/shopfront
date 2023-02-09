import { Link, useParams } from "react-router-dom"
import { Row, Col, Image, ListGroup, Card, Button } from "react-bootstrap"
import Rating from "../components/Rating"
import { useEffect } from "react"
import axios from "axios"
import { PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL } from "../redux/productSlice"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../components/Loader"
import Message from "../components/Message"
const ProductScreen = () => {
    const dispatch = useDispatch()
    const { loading, error, product } = useSelector(state => state.productList)
    // const [product, setProduct] = useState({})
    const { id } = useParams()

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                dispatch(PRODUCT_DETAIL_REQUEST())
                const { data } = await axios.get(`/api/products/${id}`)
                dispatch(PRODUCT_DETAIL_SUCCESS(data))
            } catch (error) {
                dispatch(PRODUCT_DETAIL_FAIL(error))
            }
            // const res = await axios.get(`/api/products/${id}`)
            // setProduct(res.data)
        }

        fetchProducts()

    }, [dispatch])

    return (
        <>
            <Link to="/" className="btn btn-light my-3">Go Back</Link>
            {loading ? <Loader /> : error ? <Message>{error}</Message> :
            <Row>
                <Col md={6}>
                    <Image src={product?.image} alt={product?.name} fluid></Image>
                </Col>

                <Col md={3}>
                    <ListGroup variant="flush">
                        <ListGroup.Item>
                            <h3>{product?.name}</h3>
                        </ListGroup.Item>
                        <ListGroup.Item>
                            <Rating value={product?.rating} text={`${product?.numReviews} reviews`} />
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Price: ${product?.price}
                        </ListGroup.Item>
                        <ListGroup.Item>
                            Description: {product?.description}
                        </ListGroup.Item>
                    </ListGroup>
                </Col>
                <Col md={3}>
                    <Card>
                        <ListGroup variant="flush">
                            <ListGroup.Item>
                                <Row>
                                    <Col>Price:</Col>
                                    <Col>${product?.price}</Col>
                                </Row>
                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Row>
                                    <Col>Status:</Col>
                                    <Col>{product?.countInStock > 0 ? "In Stock" : "Out Of Stock"}</Col>
                                </Row>

                            </ListGroup.Item>
                            <ListGroup.Item>
                                <Button className="btn-block" type="button" disabled={product?.countInStock === 0}>Add to Cart</Button>
                            </ListGroup.Item>
                        </ListGroup>
                    </Card>
                </Col>
            </Row>
            }

        </>
    )
}

export default ProductScreen;