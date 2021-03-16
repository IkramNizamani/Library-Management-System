import { createStore, combineReducers, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
// import {
//   productListReducer,
//   productDetailsReducer,
//   productDeleteReducer,
//   productCreateReducer,
//   productUpdateReducer,
// } from './reducers/productReducers'
// import { cartReducer } from './reducers/cartReducers'
import {
  userLoginReducer,
  userRegisterReducer,
  userDetailsReducer,
  userUpdateProfileReducer,
  userListReducer,
  userDeleteReducer,
  userUpdateReducer,
  userAddBookReducer,
  userBookListReducer,
} from './reducers/userReducers'
// import {
//   orderCreateReducer,
//   orderDetailsReducer,
//   orderPayReducer,
//   orderListMyReducer,
// } from './reducers/orderReducers'

const reducer = combineReducers({
  // productList: productListReducer,
  // productDetails: productDetailsReducer,
  // productDelete: productDeleteReducer,
  // productCreate: productCreateReducer,
  // productUpdate: productUpdateReducer,
  // cart: cartReducer,
  userLogin: userLoginReducer,
  userRegister: userRegisterReducer,
  userDetails: userDetailsReducer,
  userUpdateProfile: userUpdateProfileReducer,
  userList: userListReducer,
  userDelete: userDeleteReducer,
  userUpdate: userUpdateReducer,
  userAddBook: userAddBookReducer,
  userBookList: userBookListReducer,
  // orderCreate: orderCreateReducer,
  // orderDetails: orderDetailsReducer,
  // orderPay: orderPayReducer,
  // orderListMy: orderListMyReducer,
})

// const cartItemsFromStorage = localStorage.getItem('cartItems')
//   ? JSON.parse(localStorage.getItem('cartItems'))
//   : []

const userInfoFromStorage = localStorage.getItem('userInfo')
  ? JSON.parse(localStorage.getItem('userInfo'))
  : null

const bookInfoFromStorage = localStorage.getItem('books')
  ? JSON.parse(localStorage.getItem('books'))
  : null

// const shippingAddressFromStorage = localStorage.getItem('shippingAddress')
//   ? JSON.parse(localStorage.getItem('shippingAddress'))
//   : {}

const initialState = {
  // cart: {
  //   cartItems: cartItemsFromStorage,
  //   shippingAddress: shippingAddressFromStorage,
  // },
  userLogin: { userInfo: userInfoFromStorage },
  userAddBook: { books: bookInfoFromStorage },
}
const middleware = [thunk]

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
)

export default store
