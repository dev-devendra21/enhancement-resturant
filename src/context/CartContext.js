import {createContext, useContext, useState, useEffect} from 'react'
import Loader from 'react-loader-spinner'

const ApiStatusConstant = {
  INPROCESS: 'INPROCESS',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
}

const CartContext = createContext({
  cart: [],
  restaurantData: {},
  selectedId: '',
  addCartItem: () => {},
  removeCartItem: () => {},
  incrementCartItemQuantity: () => {},
  decrementCartItemQuantity: () => {},
  removeAllCartItems: () => {},
})

const CartContextProvider = ({children}) => {
  const [cart, setCart] = useState([])
  const [restaurantData, setRestaurantData] = useState({
    status: ApiStatusConstant.INPROCESS,
    data: {},
    error: null,
  })
  const [selectedId, setSelectedId] = useState('')

  useEffect(() => {
    const getRestaurantData = async () => {
      const response = await fetch(
        'https://apis2.ccbp.in/restaurant-app/restaurant-menu-list-details',
      )
      const responseData = await response.json()
      if (response.ok) {
        setRestaurantData({
          status: ApiStatusConstant.SUCCESS,
          data: responseData[0],
          error: null,
        })
        setSelectedId(responseData[0].table_menu_list[0].menu_category_id)
      } else {
        setRestaurantData({
          status: ApiStatusConstant.FAILURE,
          data: [],
          error: 'Something went wrong',
        })
      }
    }
    getRestaurantData()
  }, [])

  const addCartItem = (id, payload) => {
    const isItemAlreadyExist = cart.find(dish => dish.id === id)
    if (!isItemAlreadyExist) {
      setCart(prev => [...prev, payload])
    } else {
      setCart(cart.map(item => (item.id === id ? payload : item)))
    }
  }

  const removeCartItem = id => {
    const remove = cart.filter(item => item.id !== id)
    setCart(remove)
  }

  const incrementCartItemQuantity = id => {
    const updatedCart = cart.map(eachItem =>
      eachItem.id === id
        ? {...eachItem, quantity: eachItem.quantity + 1}
        : eachItem,
    )
    setCart(updatedCart)
  }

  const decrementCartItemQuantity = id => {
    const updatedCart = cart.map(eachItem => {
      if (eachItem.id === id) {
        if (eachItem.quantity > 0) {
          return {...eachItem, quantity: eachItem.quantity - 1}
        }
        return null
      }
      return eachItem
    })
    const filteredCart = updatedCart.filter(item => item && item.quantity !== 0)

    setCart(filteredCart)
  }

  const removeAllCartItems = () => {
    setCart([])
  }

  if (restaurantData.status === ApiStatusConstant.INPROCESS) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
        }}
      >
        <Loader type="Oval" color="#4fab0d" height={80} width={80} />
      </div>
    )
  }

  return (
    <>
      <CartContext.Provider
        value={{
          cart,
          restaurantData,
          selectedId,
          setSelectedId,
          addCartItem,
          removeCartItem,
          incrementCartItemQuantity,
          decrementCartItemQuantity,
          removeAllCartItems,
        }}
      >
        {children}
      </CartContext.Provider>
    </>
  )
}

const useCart = () => useContext(CartContext)

export {CartContextProvider, useCart}

export default CartContext
