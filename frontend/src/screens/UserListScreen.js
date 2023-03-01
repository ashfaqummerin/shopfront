import { USER_LIST_REQUEST, USER_LIST_SUCCESS, USER_LIST_FAIL } from "../redux/userListSlice";
import { USER_DELETE_REQUEST, USER_DELETE_SUCCESS, USER_DELETE_FAIL } from "../redux/userDeleteSlice";
import { useDispatch, useSelector } from "react-redux"
import axios from "axios";
import { Button, Table } from "react-bootstrap"
import Message from "../components/Message";
import Loader from "../components/Loader";
import { LinkContainer } from "react-router-bootstrap"
import { useCallback, useEffect } from "react";
import { useNavigate } from "react-router-dom"

const UserListScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin
    // USER LIST STATE FROM STORE
    const userList = useSelector(state => state.userList)
    const { loading, error, users } = userList

    const userDelete = useSelector(state => state.userDelete)
    const { success: successDelete } = userDelete

    // LIST USERS ACTION
    const listUsers = async () => {
        try {
            dispatch(USER_LIST_REQUEST())
            const config = {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            }
            const { data } = await axios.get("/api/users", config)
            dispatch(USER_LIST_SUCCESS(data))
        } catch (error) {
            dispatch(USER_LIST_FAIL(error))
        }
    }

    // USER DELETE ACTION
    const deleteUser = async (id) => {
        try {
            dispatch(USER_DELETE_REQUEST())

            const config = {
                headers: { Authorization: `Bearer ${userInfo.token}` }
            }
            const { data } = await axios.delete(`/api/users/${id}`, config)

            dispatch(USER_DELETE_SUCCESS())

        } catch (error) {
            dispatch(USER_DELETE_FAIL(error))

        }
    }
    useEffect(() => {
        if (userInfo && userInfo.isAdmin) {
            listUsers()
        } else {
            navigate("/login")
        }
    }, [successDelete])

    // USE CALLBACK HOOK
    // const getUsers = useCallback(() => {
    //     listUsers()
    // }, [userInfo])

    const deleteHandler = (id) => {
        if ((window.confirm("Are you sure"))) {
            deleteUser(id)
        } 

    }

    return (
        <>
            <h1>Users</h1>
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <Table striped bordered hover responsive className="table-sm" >
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>NAME</th>
                            <th>EMAIL</th>
                            <th>ADMIN</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td>{user._id}</td>
                                <td>{user.name}</td>
                                <td><a href={`mailto:${user.email}`}>{user.email}</a></td>
                                <td>
                                    {user.isAdmin ? <i className="fas fa-check" style={{ color: "green" }}></i> : <i className="fas fa-times" style={{ color: "red" }}></i>}
                                </td>
                                <td>
                                    <LinkContainer to={`/user/${user._id}/edit`}>
                                        <Button variant="light" className="btn-sm">
                                            <i className="fas fa-edit"></i>
                                        </Button>
                                    </LinkContainer>
                                    <Button variant="danger" className="btn-sm" onClick={() => deleteHandler(user._id)}>
                                        <i className="fas fa-trash"></i>
                                    </Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </>);
}

export default UserListScreen;