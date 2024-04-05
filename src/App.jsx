import Header from "./components/Header"
import Guitar from "./components/Guitar"
import useCart from "./hooks/useCart"

function App() {

  const { data, cart, addToCart, removeFromCart, increaseItemQuantity, decreaseItemQuantity, clearCart, isCartEmpty, totalCartPrice } = useCart()

  return (
    <>
      <Header
        cart={cart}
        removeFromCart={removeFromCart}
        increaseItemQuantity={increaseItemQuantity}
        decreaseItemQuantity={decreaseItemQuantity}
        clearCart={clearCart}
        isCartEmpty={isCartEmpty}
        totalCartPrice={totalCartPrice}
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
