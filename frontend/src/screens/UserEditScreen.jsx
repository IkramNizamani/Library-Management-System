import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Form, Button, Row, Col } from 'react-bootstrap'
import { useSelector, useDispatch } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import FormContainer from '../components/FormContainer'
import {
  getUserDetails,
  updateUser,
  userBookAdd,
  userListBook,
} from '../actions/userActions'
import { USER_UPDATE_RESET } from '../constants/userConstants'

const UserEditScreen = ({ match, history }) => {
  const userId = match.params.id
  const dispatch = useDispatch()
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [rollNumber, setRollNumber] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')

  const [bookName, setBookName] = useState('')
  const [isbn, setISBN] = useState('')
  const [returnDate, setReturnDate] = useState(null)

  const userDetails = useSelector((state) => state.userDetails)
  const { loading, error, user } = userDetails

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate

  useEffect(() => {
    if (successUpdate) {
      dispatch({ type: USER_UPDATE_RESET })
      history.push('/admin/userList')
    } else {
      if (!user.name || user._id !== userId) {
        dispatch(getUserDetails(userId))
      } else {
        setName(user.name)
        setEmail(user.email)
        setRollNumber(user.rollNumber)
        setPhoneNumber(user.phoneNumber)
      }
    }
  }, [user, dispatch, userId, history, successUpdate])

  const submitUserHandler = (e) => {
    e.preventDefault()
    dispatch(
      updateUser({
        _id: userId,
        name,
        email,
        rollNumber,
        phoneNumber,
      })
    )
  }
  const submitBookHandler = (e) => {
    e.preventDefault()
    dispatch(
      userBookAdd({
        bookRefUser: userId,
        bookName,
        isbn,
        returnDate,
      })
    )
    history.push(`/admin/user/${userId}/bookList`)
  }

  const userBookHistoryHandler = () => {
    dispatch(userListBook(userId))
    history.push(`/admin/user/${userId}/userHistory`)
  }

  return (
    <>
      <Link to='/admin/userList' className='btn btn-outline-info btn-lg py-3'>
        Go Back
      </Link>
      <FormContainer>
        <Row>
          <Col>
            <h1>Edit Student</h1>
          </Col>
          <Col className='text-right my-2'>
            <Link
              onClick={userBookHistoryHandler}
              className='btn  btn-outline-info'
            >
              Student Book History
            </Link>
          </Col>
        </Row>

        {loadingUpdate && <Loader />}
        {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
        {loading ? (
          <Loader />
        ) : error ? (
          <Message variant='danger'>{error}</Message>
        ) : (
          <>
            <Row>
              <Col>
                <Form onSubmit={submitUserHandler}>
                  <Form.Group controlId='name'>
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter name'
                      value={name}
                      onChange={(e) => {
                        setName(e.target.value)
                      }}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='email'>
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type='email'
                      placeholder='Enter email'
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value)
                      }}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='rollnumber'>
                    <Form.Label>Roll Number</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter roll number'
                      value={rollNumber}
                      onChange={(e) => {
                        setRollNumber(e.target.value)
                      }}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='phonenumber'>
                    <Form.Label>Phone Number</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter phone number'
                      value={phoneNumber}
                      onChange={(e) => {
                        setPhoneNumber(e.target.value)
                      }}
                    ></Form.Control>
                  </Form.Group>

                  <Button
                    type='submit'
                    variant='outline-success'
                    className='my-3'
                  >
                    Update Student
                  </Button>
                </Form>
                <h1>Add Book</h1>
                <Form onSubmit={submitBookHandler}>
                  <Form.Group controlId='isbn'>
                    <Form.Label>ISBN</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter book id'
                      value={isbn}
                      onChange={(e) => {
                        setISBN(e.target.value)
                      }}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='bookname'>
                    <Form.Label>Book Name</Form.Label>
                    <Form.Control
                      type='text'
                      placeholder='Enter book name'
                      value={bookName}
                      onChange={(e) => {
                        setBookName(e.target.value)
                      }}
                    ></Form.Control>
                  </Form.Group>

                  <Form.Group controlId='returndate'>
                    <Form.Label>Book Return Date</Form.Label>
                    <Form.Control
                      type='date'
                      placeholder='Enter book return date'
                      value={returnDate}
                      onChange={(e) => {
                        setReturnDate(e.target.value)
                      }}
                    ></Form.Control>
                  </Form.Group>

                  <Button
                    type='submit'
                    variant='outline-success'
                    className='my-3'
                  >
                    Add Book
                  </Button>
                </Form>
              </Col>
            </Row>
          </>
        )}
      </FormContainer>
    </>
  )
}

export default UserEditScreen
