import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { getUserDetails } from '../actions/userActions'

const UserBookListScreen = ({ match }) => {
  const userId = match.params.id

  const dispatch = useDispatch()

  const userAddBook = useSelector((state) => state.userAddBook)
  const { loading, error, books } = userAddBook

  const userDetails = useSelector((state) => state.userDetails)
  const { user } = userDetails

  useEffect(() => {
    dispatch(getUserDetails(userId))
  }, [dispatch, userId])

  return (
    <>
      <h1>{user.name} Book History</h1>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <Table striped bordered hover responsive className='table-sm'>
          <thead>
            <tr>
              <th>BOOK-ID</th>
              <th>BOOK NAME</th>
              <th>ISSUED AT</th>
              <th>RETURN DATE</th>
              <th>RETURN</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book._id}>
                <td>{book.bookID}</td>
                <td>{book.bookName}</td>
                <td>{book.issuedAt}</td>
                <td>{book.returnDate}</td>
                <td>
                  {' '}
                  {book.isReturn ? (
                    <i className='fas fa-check' style={{ color: 'green' }}></i>
                  ) : (
                    <i className='fas fa-times' style={{ color: 'red' }}></i>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </>
  )
}

export default UserBookListScreen
