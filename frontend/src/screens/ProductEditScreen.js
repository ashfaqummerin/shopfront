import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Button, Form } from "react-bootstrap";
import axios from "axios";
import Message from "../components/Message";
import Loader from "../components/Loader";
import FormContainer from "../components/FormContainer";
import { PRODUCT_DETAIL_REQUEST, PRODUCT_DETAIL_SUCCESS, PRODUCT_DETAIL_FAIL } from "../redux/productSlice"
import { PRODUCT_UPDATE_REQUEST, PRODUCT_UPDATE_SUCCESS, PRODUCT_UPDATE_FAIL, PRODUCT_UPDATE_RESET } from "../redux/productUpdateSlice";
import { PRODUCT_CREATE_RESET } from "../redux/productCreateSlice";

const ProductEditScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [name, setName] = useState("")
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState("")
    const [brand, setBrand] = useState("")
    const [category, setCategory] = useState("")
    const [countInStock, setCountInStock] = useState(0)
    const [description, setDescription] = useState("")
    const [uploading, setUploading] = useState(false)

    const productId = useParams().id

    // PRODUCT DETAILS FROM STORE
    const productDetails = useSelector(state => state.productDetails)
    const { loading, error, product } = productDetails

    const productUpdate = useSelector(state => state.productUpdate)
    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = productUpdate

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    // PRODUCT DETAILS ACTION
    const getProductDetails = async () => {
        try {
            dispatch(PRODUCT_DETAIL_REQUEST())
            const { data } = await axios.get(`/api/products/${productId}`)
            dispatch(PRODUCT_DETAIL_SUCCESS(data))
        } catch (error) {
            dispatch(PRODUCT_DETAIL_FAIL(error))
        }
    }

    //PRODUCT UPDATE ACTION
    const updateProduct = async (product) => {
        try {
            dispatch(PRODUCT_UPDATE_REQUEST())

            const config = {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const { data } = await axios.put(`/api/products/${product._id}`, product, config)
            dispatch(PRODUCT_UPDATE_SUCCESS(data))

        } catch (error) {
            dispatch(PRODUCT_UPDATE_FAIL(error))
        }
    }
    useEffect(() => {
        if (successUpdate) {
            dispatch(PRODUCT_CREATE_RESET())
            navigate("/admin/productlist")
        } else {

            if (!product.name || product._id !== productId) {
                getProductDetails(productId)
            } else {
                setName(product.name)
                setPrice(product.price)
                setImage(product.image)
                setBrand(product.brand)
                setCategory(product.category)
                setDescription(product.description)
                setCountInStock(product.countInStock)
            }
        }
    }, [product._id, successUpdate, productId])

    const uploadFileHandler = async (e) => {
        const file = e.target.files[0]
        const formData = new FormData()
        formData.append("image", file)
        setUploading(true)

        try {
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }
            const { data } = await axios.post("/api/upload", formData, config)
            setImage(data)
            setUploading(false)
        } catch (error) {
            console.log(error)
            setUploading(false)
        }
    }

    const submitHandler = (e) => {
        e.preventDefault()
        updateProduct({
            _id: productId,
            name,
            price,
            image,
            brand,
            category,
            description,
            countInStock
        })
    }

    return (
        <>
            <Link to="/admin/productList" className="btn btn-light">Go Back</Link>

            <FormContainer>
                <h1>Edit Product</h1>
                {loadingUpdate && <Loader />}
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
                {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                    <Form onSubmit={submitHandler}>
                        <Form.Group controlId="name">
                            <Form.Label>Name</Form.Label>
                            <Form.Control type="name" placeholder="Enter Name" value={name} onChange={e => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="price">
                            <Form.Label>Price</Form.Label>
                            <Form.Control type="number" placeholder="Enter Price" value={price} onChange={e => setPrice(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="image">
                            <Form.Label>Image</Form.Label>
                            <Form.Control type="text" placeholder="Enter image url" value={image} onChange={e => setImage(e.target.value)} />
                        </Form.Group> 
                        <Form.Group controlId="formFile">
                            <Form.Control type="file" onChange={uploadFileHandler}></Form.Control>
                            {uploading && <Loader />}

                        </Form.Group>
                        <Form.Group controlId="brand">
                            <Form.Label>Brand</Form.Label>
                            <Form.Control type="text" placeholder="Enter Brand" value={brand} onChange={e => setBrand(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="countInStock">
                            <Form.Label>Count In Stock</Form.Label>
                            <Form.Control type="number" placeholder="Enter countInStock" value={countInStock} onChange={e => setCountInStock(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="category">
                            <Form.Label>Categories</Form.Label>
                            <Form.Control type="text" placeholder="Enter Category" value={category} onChange={e => setCategory(e.target.value)} />
                        </Form.Group>

                        <Form.Group controlId="description">
                            <Form.Label>Description</Form.Label>
                            <Form.Control type="text" placeholder="Enter Description" value={description} onChange={e => setDescription(e.target.value)} />
                        </Form.Group>

                        <Button type="submit" variant="primary" className="my-4">Update</Button>
                    </Form>
                )}
            </FormContainer>
        </>)
}

export default ProductEditScreen;