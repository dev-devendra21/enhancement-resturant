import {useState} from 'react'
import './index.css'
import {useCart} from '../../context/CartContext'

const Button = props => {
  const {id, addToCart, decreaseQuantity, increaseQuantity} = props
  const {cart} = useCart()
  const dishQuantity = cart.find(dish => dish.id === id)?.quantity
  const [quantity, setQuantity] = useState(dishQuantity || 0)
  return (
    <div className="main-btn-container">
      <div className="button-container">
        <button
          onClick={() => setQuantity(quantity > 0 ? quantity - 1 : 0)}
          type="button"
          className="button-action"
        >
          -
        </button>
        <p>{quantity}</p>
        <button
          onClick={() => setQuantity(quantity + 1)}
          type="button"
          className="button-action"
        >
          +
        </button>
      </div>
      {quantity > 0 && (
        <button
          type="button"
          className="add-to-cart-btn"
          onClick={() => addToCart(id, quantity)}
        >
          ADD TO CART
        </button>
      )}
    </div>
  )
}

export default Button
