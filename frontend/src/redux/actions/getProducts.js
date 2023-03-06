import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from "../productSlice"

export const useListProducts = async (keyword = "") => {
    const dispatch = useDispatch()


    // PRODUCTS STATE FROM STORE
    const { products, loading, error } = useSelector(state => state.productList)

    try {
        dispatch(PRODUCT_LIST_REQUEST())
        const { data } = await axios.get(`/api/products?keyword=${keyword}`)
        dispatch(PRODUCT_LIST_SUCCESS(data))
    } catch (error) {
        dispatch(PRODUCT_LIST_FAIL(error))
    }

    return { products, loading, error }
}

export default useListProducts