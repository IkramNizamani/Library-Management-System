import React from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'
import Loader from '../components/Loader'
import Message from '../components/Message'

const UserHistoryScreen = () => {
  const userBookList = useSelector((state) => state.userBookList)
  const { error, loading, user } = userBookList

  return (
    <>
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <h2 className='text-center'>{user.name} Book History</h2>
          <Table striped bordered hover responsive className='table-sm'>
            <thead>
              <tr>
                <th>ISBN</th>
                <th>BOOK NAME</th>
                <th>ISSUED AT</th>
                <th>RETURN DATE</th>
                <th>RETURN</th>
              </tr>
            </thead>
            <tbody>
              {user.books.map((book) => (
                <tr key={book._id}>
                  <td>{book.ISBN}</td>
                  <td>{book.bookName}</td>
                  <td>{book.issuedAt}</td>
                  <td>{book.returnDate}</td>
                  <td>
                    {' '}
                    {book.isReturn ? (
                      <i
                        className='fas fa-check'
                        style={{ color: 'green' }}
                      ></i>
                    ) : (
                      <i className='fas fa-times' style={{ color: 'red' }}></i>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        </>
      )}
    </>
  )
}

export default UserHistoryScreen
