import { Link, useParams } from "react-router-dom"
import { Row, Col, Image, ListGroup, Card, Button, Form } from "react-bootstrap"
import Rating from "../components/Rating"
import { useEffect, useState } from "react"
import axios from "axios"
import { PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL } from "../redux/productSlice"
import { useDispatch, useSelector } from "react-redux"
import Loader from "../components/Loader"
import Message from "../components/Message"
import { CART_ADD_ITEM } from "../redux/cartSlice"


const ProductScreen = () => {
    const dispatch = useDispatch()
    const { loading, error, product } = useSelector(state => state.productList)
    const { id } = useParams()
    const [qty, setQty] = useState(1)

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                dispatch(PRODUCT_DETAIL_REQUEST())
                const { data } = await axios.get(`/api/products/${id}`)
                dispatch(PRODUCT_DETAIL_SUCCESS(data))
            } catch (error) {
                dispatch(PRODUCT_DETAIL_FAIL(error))
            }
        }

        fetchProducts()

    }, [dispatch, id])

    const addToCartHandler = () => {
        // product["qty"] = qty
        dispatch(CART_ADD_ITEM({ ...product, qty: Number(qty) }))
    }

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
                                {product.countInStock > 0 && (
                                    <ListGroup.Item>
                                        <Row>
                                            <Col>Qty</Col>
                                            <Col>
                                                <Form.Control as="select" defaultValue={qty} onChange={e => setQty(e.target.value)}>
                                                    {[...Array(product.countInStock).keys()].map(x => (
                                                        <option key={x + 1} value={x + 1}>{x + 1}</option>
                                                    ))}
                                                </Form.Control>
                                            </Col>
                                        </Row>
                                    </ListGroup.Item>
                                )}
                                <ListGroup.Item>
                                    <Button className="btn-block" type="button" disabled={product?.countInStock === 0} onClick={addToCartHandler}>
                                        Add to Cart
                                    </Button>
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