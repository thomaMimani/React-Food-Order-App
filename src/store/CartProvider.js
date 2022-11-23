import { useReducer } from "react"
import CartContext from "./card-context"


const deafaultCartState={
    items: [],
    totalAmount:0
}

const cartReducer =(state, action)=>{
    if(action.type==='ADD'){
        const updatedTotalAmont = state.totalAmount+action.item.price * action.item.amount

        const existingCartItemIndex = state.items.findIndex(item=>item.id===action.item.id)
        const existingCartItem=state.items[existingCartItemIndex]
        let updatedItem;
        let updatedItems;

        if(existingCartItem){
            updatedItem={
                ...existingCartItem,
                amount:existingCartItem.amount+ action.item.amount
            }

            updatedItems =[...state.items]
            updatedItems[existingCartItemIndex]=  updatedItem
        } else{
            updatedItem={...action.item}
            updatedItems=state.items.concat(action.item)
        }

        
        return {
            items: updatedItems,
            totalAmount: updatedTotalAmont
            
        }
    }   
    if (action.type ==='REMOVE'){
        const existingCartItemIndex=state.items.findIndex(item=>item.id===action.id)
        const existingCartItem = state.items[existingCartItemIndex]
        const updatedTotalAmont=state.totalAmount-existingCartItem.price
        let updatedItems;
        console.log(existingCartItem)
        if(existingCartItem.amount === 1){
            updatedItems= state.items.filter(item=> item.id !== action.id)
            console.log(updatedItems)
        }else {
            const updatedItem = {...existingCartItem, amount: existingCartItem.amount-1}
            updatedItems= [...state.items]
            updatedItems[existingCartItemIndex]=updatedItem
        }
        
        return {
            items: updatedItems,
            totalAmount:updatedTotalAmont
        }
    } 
    

    return deafaultCartState

}

const CartProvider = props=>{

    const [cartState, dispatchCartAction]=useReducer(cartReducer, deafaultCartState)


    const addItemToCartHandler = (item)=>{
        dispatchCartAction({type: `ADD`, item: item})
    }
    const removeItemFromCartHandler=(id)=>{
        dispatchCartAction({type: `REMOVE`, id: id})
    }
    const cartContext = {
        items :cartState.items,
        totalAmount:cartState.totalAmount,
        addItem:addItemToCartHandler,
        removeItem: removeItemFromCartHandler
    }

    return <CartContext.Provider value={cartContext}>
        {props.children}
    </CartContext.Provider>
}

export default CartProvider