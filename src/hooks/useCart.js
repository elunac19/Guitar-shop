import { useState, useEffect, useMemo } from "react"
import { db } from "../data/db"

const useCart = () => {

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

    //Derivative State
    const isCartEmpty = useMemo( () => cart.length === 0, [cart] )
    const totalCartPrice = useMemo( () => cart.reduce((total, item) => total + (item.price * item.quantity), 0), [cart] )

      return{
        data,
        cart,
        addToCart,
        removeFromCart,
        increaseItemQuantity,
        decreaseItemQuantity,
        clearCart,
        isCartEmpty,
        totalCartPrice
      }

}

export default useCart