import React from 'react'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Loader from '../components/Loader'
import Message from '../components/Message'
import { Col, Row, Image, Button } from 'react-bootstrap'
import cl from './images/CL.jpg'
import UserScreen from '../screens/UserScreen'

const HomeScreen = () => {
  const userLogin = useSelector((state) => state.userLogin)
  const { loading, error, userInfo } = userLogin

  return (
    <>
      {error && <Message variant='danger'>{error}</Message>}
      {loading && <Loader />}
      {!userInfo ? (
        <Row>
          <Col sm='12' md='7' lg='6' xl='6'>
            <Image src={cl} rounded fluid block />
          </Col>
          <Col sm='12' md='5' lg='6' xl='6'>
            <p className='text-center my-5'>
              {' '}
              <h5>already a member?</h5>
              <Link to='/login' className='btn btn-outline-success btn-block'>
                <i class='fas fa-user'></i> Sign In
              </Link>
            </p>

            <p className='text-center'>
              <h5>new member?</h5>
              <Button href='/register' variant='outline-info' block>
                <i class='fas fa-user-plus'></i> Sign Up
              </Button>
            </p>
          </Col>
        </Row>
      ) : userInfo.isAdmin ? (
        <h1
          className='text-center my-5'
          style={{ color: 'darkred', lineHeight: '1.5' }}
        >
          Hi, <span style={{ color: 'darkblue' }}>{userInfo.name}</span> Website
          Currently Is In BETA Version, Working on it.
        </h1>
      ) : (
        <UserScreen />
      )}
    </>
  )
}

export default HomeScreen
