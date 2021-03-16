import React, { useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap'

const SearchBox = ({ history }) => {
  const [keyword, setKeyword] = useState('')

  const submitHandler = (e) => {
    e.preventDefault()
    if (keyword.trim()) {
      history.push(`/admin/userList/search/${keyword}`)
    } else {
      history.push('/admin/userList')
    }
  }

  return (
    <Form onSubmit={submitHandler}>
      <Row>
        <Col md='10' className='p-0'>
          <Form.Control
            type='text'
            name='q'
            onChange={(e) => setKeyword(e.target.value)}
            placeholder='Search Students...'
          ></Form.Control>
        </Col>
        <Col md='2' className='p-0'>
          <Button type='submit' variant='outline-info' block className='p-2'>
            Search
          </Button>
        </Col>
      </Row>
    </Form>
  )
}

export default SearchBox
