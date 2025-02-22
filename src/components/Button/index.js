import './index.css'
import {useCart} from '../../context/CartContext'

const Button = props => {
  const {id, addToCart, decreaseQuantity, increaseQuantity} = props
  const {cart} = useCart()

  const quantity = cart?.find(item => item.id === id)?.quantity
  return (
    <>
      {quantity === undefined ? (
        <button type="button" className="add-to-cart-btn" onClick={addToCart}>
          ADD TO CART
        </button>
      ) : (
        <div className="button-container">
          <button
            onClick={decreaseQuantity}
            type="button"
            className="button-action"
          >
            -
          </button>
          <p>{quantity !== undefined ? quantity : 0}</p>
          <button
            onClick={increaseQuantity}
            type="button"
            className="button-action"
          >
            +
          </button>
        </div>
      )}
    </>
  )
}

export default Button
