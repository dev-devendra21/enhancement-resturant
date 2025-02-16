import CartItem from '../CartItem'

import './index.css'
import {useCart} from '../../context/CartContext'

const Cart = () => {
  const {
    cart,
    removeCartItem,
    incrementCartItemQuantity,
    decrementCartItemQuantity,
    removeAllCartItems,
  } = useCart()
  return (
    <>
      <div className="cart-containers">
        {cart.length === 0 ? (
          <div className="empty-cart-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/nxt-trendz-empty-cart-img.png"
              alt="empty cart"
              className="cart-image"
            />
            <p>No item in the cart</p>
          </div>
        ) : (
          <>
            <div className="btn-remove">
              <button type="button" onClick={removeAllCartItems}>
                Remove All
              </button>
            </div>
            <ul className="cart-container-item">
              {cart.map(value => (
                <CartItem
                  key={value.id}
                  item={value}
                  quantityIncrement={incrementCartItemQuantity}
                  quantityDecrement={decrementCartItemQuantity}
                  removeItem={removeCartItem}
                />
              ))}
            </ul>
          </>
        )}
      </div>
    </>
  )
}

export default Cart
