import { createContext} from 'react'

export const Auth = createContext({IsLoggedIn:false , LoggedIn: () => {} , Logout: () => {}})