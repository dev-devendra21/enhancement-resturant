import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {AiOutlineShoppingCart} from 'react-icons/ai'
import './index.css'
import {useCart} from '../../context/CartContext'

const Header = props => {
  const {cart, restaurantData} = useCart()
  let restaurantName = ''
  if (restaurantData.status === 'SUCCESS') {
    restaurantName = restaurantData.data.restaurant_name
  }
  const {history} = props
  const handleLogout = () => {
    Cookies.remove('token')
    history.replace('/login')
  }
  return (
    <>
      <nav className="nav-bar">
        <Link to="/" className="nav-link">
          <h1 className="restaurant-name">{restaurantName}</h1>
        </Link>
        <div className="cart-container">
          <p className="my-orders">My Orders</p>
          <button type="button" className="cart-btn" data-testid="cart">
            <Link to="/cart" className="nav-link">
              <p className="cart-icon-container">
                <span className="cart-count">{cart.length}</span>
                <AiOutlineShoppingCart className="cart-icon" />
              </p>
            </Link>
          </button>
          <div>
            <button type="button" className="logout-btn" onClick={handleLogout}>
              Logout
            </button>
          </div>
        </div>
      </nav>
      <hr className="horizontal-line" />
    </>
  )
}

export default withRouter(Header)
