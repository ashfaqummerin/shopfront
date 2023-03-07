import { useDispatch, useSelector } from "react-redux"
import axios from "axios"
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from "../productSlice"
import { useParams } from "react-router-dom"

export const useListProducts = () => {
    const dispatch = useDispatch()

    // PRODUCTS STATE FROM STORE
    const { products, loading, error, pages, page } = useSelector(state => state.productList)
    // LIST PRODUCT ACTION
    const listProducts = async (keyword = "", pageNumber = "") => {
        try {
            dispatch(PRODUCT_LIST_REQUEST())
            const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)
            dispatch(PRODUCT_LIST_SUCCESS(data))
        } catch (error) {
            dispatch(PRODUCT_LIST_FAIL(error))
        }
    }

    return { products, loading, error, page, pages, listProducts }
}

export default useListProducts
