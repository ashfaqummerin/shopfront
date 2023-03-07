import { PRODUCT_DELETE_REQUEST, PRODUCT_DELETE_SUCCESS, PRODUCT_DELETE_FAIL } from "../productDeleteSlice"
import axios from "axios"
import { useSelector, useDispatch } from "react-redux"

export const useDeleteProduct = () => {
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.userLogin)
    const { loading, error, success } = useSelector(state => state.productDelete)
    const deleteProduct = async (id) => {
        try {
            dispatch(PRODUCT_DELETE_REQUEST())

            const config = {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            }

            await axios.delete(`/api/products/${id}`, config)
            dispatch(PRODUCT_DELETE_SUCCESS())

        } catch (error) {
            dispatch(PRODUCT_DELETE_FAIL(error))
        }
    }

    return { deleteProduct, loading, error, success }

}

export default useDeleteProduct