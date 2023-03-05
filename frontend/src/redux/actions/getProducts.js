import { useDispatch, useSelector } from "react-redux"
import { useEffect } from "react"
import axios from "axios"
import { PRODUCT_LIST_REQUEST, PRODUCT_LIST_SUCCESS, PRODUCT_LIST_FAIL } from "../productSlice"

export const useGetProducts = async () => {
    const { products, loading, error } = useSelector(state => state.productList)

    const dispatch = useDispatch()
    try {
        dispatch(PRODUCT_LIST_REQUEST())
        const { data } = await axios.get("/api/products")
        dispatch(PRODUCT_LIST_SUCCESS(data))
    } catch (error) {
        dispatch(PRODUCT_LIST_FAIL(error))
    }

    return { products, loading, error }
}

export default useGetProducts