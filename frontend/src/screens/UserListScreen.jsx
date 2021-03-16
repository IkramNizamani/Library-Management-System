import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { LinkContainer } from 'react-router-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Table, Button } from 'react-bootstrap'
import Message from '../components/Message'
import Loader from '../components/Loader'
import SearchBox from '../components/SearchBox'
import { listUsers, deleteUser } from '../actions/userActions'

const UserListScreen = ({ history, match }) => {
  const dispatch = useDispatch()

  const keyword = match.params.keyword

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userLogin = useSelector((state) => state.userLogin)
  const { userInfo } = userLogin

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete } = userDelete

  let filteredUsers = []

  if (!loading) {
    filteredUsers = users.filter((user) => user._id !== userInfo._id)
  }
  useEffect(() => {
    if (userInfo && userInfo.isAdmin) {
      dispatch(listUsers(keyword))
    } else {
      history.push('/login')
    }
  }, [dispatch, history, userInfo, successDelete, keyword])

  const deleteHandler = (id) => {
    if (window.confirm('Are You Sure?')) {
      dispatch(deleteUser(id))
    }
  }
  return (
    <>
      <Route render={({ history }) => <SearchBox history={history} />} />
      <h1>Users</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>NAME</th>
              <th>EMAIL</th>
              <th>ROLL-NUMBER</th>
              <th>PHONE</th>
              <th>EMAIL</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredUsers.map((user) => (
              <tr key={user._id}>
                <td>{user.name}</td>
                <td>
                  {' '}
                  <a href={`mailto:${user.email}`}>{user.email}</a>{' '}
                </td>
                <td>{user.rollNumber}</td>
                <td>{user.phoneNumber}</td>
                <td>
                  <LinkContainer to={`/admin/user/${user._id}/edit`}>
                    <Button variant='light' className='btn-sm'>
                      <i className='fas fa-edit'></i>
                    </Button>
                  </LinkContainer>
                  <Button
                    variant='danger'
                    className='btn-sm'
                    onClick={() => deleteHandler(user._id)}
                  >
                    <i className='fas fa-trash'></i>
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserListScreen
