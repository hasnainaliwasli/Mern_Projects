// const { configureStore } = require("@reduxjs/toolkit");

import { configureStore } from '@reduxjs/toolkit'
import {authReducer} from './auth-slice'


const store = configureStore({
  reducer:{
    auth: authReducer
  }
})

export default store