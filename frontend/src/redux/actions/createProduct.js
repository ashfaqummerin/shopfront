import { PRODUCT_CREATE_REQUEST, PRODUCT_CREATE_SUCCESS, PRODUCT_CREATE_FAIL } from "../productCreateSlice"
import { useSelector, useDispatch } from "react-redux"
import axios from "axios"

export const useCreateProduct = () => {
    const dispatch = useDispatch()
    // STATE FROM REDUX STORE
    const { loading, success, error, product } = useSelector(state => state.productCreate)
    const { userInfo } = useSelector(state => state.userLogin)

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

    return { createProduct, success, loading, product, error }

}

export default useCreateProduct