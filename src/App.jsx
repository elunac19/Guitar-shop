import { useState, useEffect } from "react"
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { db } from "./data/db"

function App() {

  const initialCart = () => {
    const localStorageCart = localStorage.getItem('cart')
    return localStorageCart ? JSON.parse(localStorageCart) : []
  }
  //Only when simulating db
  const [data, setData] = useState(db)
  const [cart, setCart] = useState(initialCart)
  
  const MAX_ITEMS = 5
  const MIN_ITEMS = 1

  useEffect( () => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

  function addToCart(item){
    //findIndex returns -1 if the element doesnt exists.
    const itemIndex = cart.findIndex((indexItem) => indexItem.id === item.id)

    if(itemIndex >= 0){
      const updateCart = [...cart]    
      if(updateCart[itemIndex].quantity >= MAX_ITEMS) return 
      updateCart[itemIndex] = {...updateCart[itemIndex], quantity: updateCart[itemIndex].quantity + 1}
      setCart(updateCart)

    }else{
      setCart([...cart, {...item, quantity: 1}])
    }
  }

  function removeFromCart(itemId){
    setCart(cart.filter((item)=>item.id !== itemId))
  }

  function increaseItemQuantity(itemId){
    const updateCart = cart.map((item) => {
      if(item.id === itemId && item.quantity < MAX_ITEMS){
        return {...item, quantity: item.quantity + 1}
      }
      return item
    })
    setCart(updateCart)
  }

  function decreaseItemQuantity(itemId){
    const updateCart = cart.map((item) => {
      if(item.id === itemId && item.quantity > MIN_ITEMS){
        return {...item, quantity: item.quantity - 1}
      }
      return item
    })
    setCart(updateCart)
  }

  function clearCart(){
    setCart([])
  }

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseItemQuantity={increaseItemQuantity}
        decreaseItemQuantity={decreaseItemQuantity}
        clearCart={clearCart}
      />
      <main className="container-xl mt-5">
          <h2 className="text-center">Guitar Colletion</h2>

          <div className="row mt-5">
            {data.map((guitar)=> (
                <Guitar
                  key={guitar.id}
                  guitar={guitar}
                  addToCart={addToCart}
                />
            ))}

          </div>
      </main>


      <footer className="bg-dark mt-5 py-5">
          <div className="container-xl">
              <p className="text-white text-center fs-4 mt-4 m-md-0">GuitarLA - All rights reserved</p>
          </div>
      </footer>
    </>
  )
}

export default App
