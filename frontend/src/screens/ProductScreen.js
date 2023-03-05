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
import { PRODUCT_CREATE_REVIEW_REQUEST, PRODUCT_CREATE_REVIEW_SUCCESS, PRODUCT_CREATE_REVIEW_FAIL, PRODUCT_CREATE_REVIEW_RESET } from "../redux/productReviewSlice"


const ProductScreen = () => {
    const dispatch = useDispatch()
    const { id } = useParams()
    const [qty, setQty] = useState(1)
    const [rating, setRating] = useState(0)
    const [comment, setComment] = useState("")

    // STATES FROM REDUX

    const { loading, error, product } = useSelector(state => state.productList)
    const { success: successProductReview, error: errorProductReview } = useSelector(state => state.productReviewCreate)
    const { userInfo } = useSelector(state => state.userLogin)

    // CREATE PRODUCT REVIEW ACTION
    const createProductReview = async (productId, review) => {
        try {
            dispatch(PRODUCT_CREATE_REVIEW_REQUEST())

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`
                }
            }

            await axios.post(`/api/products/${productId}/reviews`, review, config)
            dispatch(PRODUCT_CREATE_REVIEW_SUCCESS())

        } catch (error) {
            dispatch(PRODUCT_CREATE_REVIEW_FAIL(error.response.data.message))
        }

    }

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
        if (successProductReview) {
            alert("Review Submitted")
            setComment("")
            setRating(0)
            dispatch(PRODUCT_CREATE_REVIEW_RESET())
        }

        fetchProducts()

    }, [dispatch, id, successProductReview])

    const addToCartHandler = () => {
        // product["qty"] = qty
        dispatch(CART_ADD_ITEM({ ...product, qty: Number(qty) }))
    }

    const submitHandler = (e) => {
        e.preventDefault()
        createProductReview(id, { rating, comment })
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
            <Row>
                <Col md={6}>
                    <h2>Reviews</h2>
                    {product?.reviews?.length === 0 && <Message>No reviews</Message>}
                    {/* {product && product.reviews && product.reviews.length === 0 && <Message>No Reviews</Message>} */}
                    {product.reviews?.map((review) => (
                        <ListGroup.Item key={(review._id)}>
                            <strong>{review.name}</strong>
                            <Rating value={review.rating} />
                            <p>{review.createdAt}</p>
                            <p>{review.comment}</p>
                        </ListGroup.Item>
                    ))}
                    <ListGroup.Item>
                        <h2>Write a Customer Review</h2>
                        {errorProductReview && <Message variant="danger">{errorProductReview}</Message>}
                        {userInfo ? (
                            <Form onSubmit={submitHandler}>
                                <Form.Group controlId="rating">
                                    <Form.Label>Rating</Form.Label>
                                    <Form.Control as="select" value={rating} onChange={(e => setRating(e.target.value))}>
                                        <option value="">Select...</option>
                                        <option value="1">1 - Poor</option>
                                        <option value="2">2 - Fair</option>
                                        <option value="3">3 - Good</option>
                                        <option value="4">4 - Very Good</option>
                                        <option value="5">5 - Excellent</option>
                                    </Form.Control>
                                </Form.Group>
                                <Form.Group controlId="comment">
                                    <Form.Label>Comment</Form.Label>
                                    <Form.Control as="textarea" row="3" value={comment} onChange={e => setComment(e.target.value)}>

                                    </Form.Control>
                                    <Button type="submmit" variant="primary"> Submit</Button>
                                </Form.Group>
                            </Form>
                        ) : <Message>Please <Link to="/login">sign in</Link> to write a review </Message>}
                    </ListGroup.Item>
                </Col>
            </Row>

        </>
    )
}

export default ProductScreen;