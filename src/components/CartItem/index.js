import './index.css'

const CartItem = ({item, quantityIncrement, quantityDecrement, removeItem}) => {
  const {name, image, price, quantity, id} = item
  return (
    <li className='cart-item'>
      <div>
        <img src={image} alt={name} className='item-image' />
        <p className='item-name'>{name}</p>
      </div>

      <div className='quantity-container'>
        <button
          type='button'
          className='btn-primary'
          onClick={() => quantityDecrement(id)}
        >
          -
        </button>
        <p>{quantity}</p>
        <button
          type='button'
          className='btn-primary'
          onClick={() => quantityIncrement(id)}
        >
          +
        </button>
      </div>
      <div>
        <p className='item-price'>{price * quantity}</p>
      </div>
      <div>
        <button
          type='button'
          className='remove-item-btn'
          onClick={() => removeItem(id)}
        >
          X
        </button>
      </div>
    </li>
  )
}

export default CartItem
