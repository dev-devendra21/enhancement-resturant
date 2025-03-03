import {Switch, Route, withRouter} from 'react-router-dom'
import {CartContextProvider} from './context/CartContext'
import Home from './components/Home'
import Header from './components/Header'
import Cart from './components/Cart'
import Login from './components/Login'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

const App = props => {
  const {history} = props
  const isLogin = history.location.pathname === '/login'
  return (
    <CartContextProvider>
      {isLogin ? '' : <Header />}
      <Switch>
        <Route path="/login" component={Login} />
        <ProtectedRoute exact path="/" component={Home} />
        <ProtectedRoute path="/cart" component={Cart} />
      </Switch>
    </CartContextProvider>
  )
}

export default withRouter(App)
