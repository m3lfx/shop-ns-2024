import React, { Fragment, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { MDBDataTable } from 'mdbreact'

import 'react-toastify/dist/ReactToastify.css';

import MetaData from '../Layout/MetaData'
import Loader from '../Layout/Loader'
import Sidebar from './SideBar'
import { errMsg, successMsg,} from '../../utils/helpers';
// import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux'
import { allUsers,  clearErrors, deleteUser } from '../../actions/userActions'
import { DELETE_USER_RESET } from '../../constants/userConstants'


const UsersList = () => {
    const dispatch = useDispatch();
    const { loading, error, users } = useSelector(state => state.allUsers);
    const { isDeleted } = useSelector(state => state.user)

    // const [loading, setLoading] = useState(true)
    // const [error, setError] = useState('')
    // const [allUsers, setAllUsers] = useState([])
    // const [isDeleted, setIsDeleted] = useState('')
    let navigate = useNavigate();
    // const config = {
    //     headers: {
    //         'Content-Type': 'application/json', 
    //         'Authorization': `Bearer ${getToken()}`
    //     }
    // }
    // const listUsers = async () => {
    //     try {

    //         const { data } = await axios.get(`${import.meta.env.VITE_API}/admin/users`, config)
    //         setAllUsers(data.users)
    //         setLoading(false)

    //     } catch (error) {
    //         setError(error.response.data.message)
            
    //     }
    // }
    // const deleteUser = async (id) => {
    //     try {
    //         const { data } = await axios.delete(`${import.meta.env.VITE_API}/admin/user/${id}`, config)
    //         setIsDeleted(data.success)
    //         setLoading(false)
            
    //     } catch (error) {
    //        setError(error.response.data.message)
            
    //     }
    // }

    useEffect(() => {
        dispatch(allUsers());
        if (error) {
            errMsg(error);
            // setError('')
            dispatch(clearErrors())
        }
        if (isDeleted) {
            successMsg('User deleted successfully');
            navigate('/admin/users');
            dispatch({ type: DELETE_USER_RESET })

        }

    }, [error, isDeleted, dispatch, navigate])


    const deleteUserHandler = (id) => {
       dispatch(deleteUser(id))
    }
    const setUsers = () => {
        const data = {
            columns: [
                {
                   label: 'User ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Email',
                    field: 'email',
                    sort: 'asc'
                },
                {
                    label: 'Role',
                    field: 'role',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                },
            ],
            rows: []
        }
        users.forEach(user => {
            data.rows.push({
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
                actions: <>
                    <Link to={`/admin/user/${user._id}`} className="btn btn-primary py-1 px-2">
                        <i className="fa fa-pencil"></i>
                    </Link>
                    <button className="btn btn-danger py-1 px-2 ml-2" onClick={() => deleteUserHandler(user._id)}>
                        <i className="fa fa-trash"></i>
                    </button>
                </>
            })
        })
        return data;
    }
    return (
        <>
            <MetaData title={'All Users'} />
            <div className="row">
                <div className="col-12 col-md-2">
                    <Sidebar />
                </div>
                <div className="col-12 col-md-10">
                    <>
                        <h1 className="my-5">All Users</h1>
                        {loading ? <Loader /> : (
                            <MDBDataTable
                                data={setUsers()}
                                className="px-3"
                                bordered
                                striped
                                hover
                            />
                        )}
                    </>
                </div>
            </div>
        </>
    )
}

export default UsersList
