import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userListBook } from '../actions/userActions'
import UserHistoryScreen from './UserHistoryScreen'

const UserScreen = () => {
  const dispatch = useDispatch()

  const userLogin = useSelector((state) => state.userLogin)
  const { error, loading, userInfo } = userLogin

  if (!error) {
    if (!loading) {
      dispatch(userListBook(userInfo._id))
    }
  }
  return <UserHistoryScreen />
}

export default UserScreen
