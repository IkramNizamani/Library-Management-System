import React from 'react'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import { Container } from 'react-bootstrap'
import HomeScreen from './screens/HomeScreen'
import LoginScreen from './screens/LoginScreen'
import RegisterScreen from './screens/RegisterScreen'
import ProfileScreen from './screens/ProfileScreen'
import UserListScreen from './screens/UserListScreen'
import UserEditScreen from './screens/UserEditScreen'
import UserBookListScreen from './screens/UserBookListScreen'
import UserHistoryScreen from './screens/UserHistoryScreen'

const App = () => {
  return (
    <Router>
      <Header />
      <main className='py-3'>
        <Container>
          <Route path='/login' component={LoginScreen} />
          <Route path='/register' component={RegisterScreen} />
          <Route path='/profile' component={ProfileScreen} />
          <Route path='/admin/userList' exact component={UserListScreen} />
          <Route
            path='/admin/userList/search/:keyword'
            component={UserListScreen}
          />
          <Route
            path='/admin/user/:id/bookList'
            component={UserBookListScreen}
          />
          <Route
            path='/admin/user/:id/userHistory'
            component={UserHistoryScreen}
          />
          <Route path='/admin/user/:id/edit' component={UserEditScreen} />
          <Route path='/' component={HomeScreen} exact />
        </Container>
      </main>
      <Footer />
    </Router>
  )
}

export default App
