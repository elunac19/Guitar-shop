import { useState } from "react"
import Header from "./components/Header"
import Guitar from "./components/Guitar"
import { db } from "./data/db"

function App() {

  //Only when simulating db
  const [data, setData] = useState(db)
  const [cart, setCart] = useState([])

  function addToCart(item){
    //If the item doesnt exist it returns -1.
    const itemExists = cart.findIndex((indexItem) => indexItem.id === item.id)

    if(itemExists >= 0){
      const updateCart = [...cart]    
      updateCart[itemExists] = {...updateCart[itemExists], quantity: updateCart[itemExists].quantity + 1}
      setCart(updateCart)

    }else{
      setCart([...cart, {...item, quantity: 1}])
    }
  }

  function removeFromCart(itemId){
    setCart([...cart].filter((item)=>item.id !== itemId))
  }

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
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
