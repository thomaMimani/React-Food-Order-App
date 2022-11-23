import CartIcon from "../Cart/CartIcon"
import classes from './HeaderCartButton.module.css'
import CartContext from "../../store/card-context"
import { useContext, useEffect, useState } from "react"
const HeaderCartButton = props =>{

    const [btnIsHighlited , setBtnIsHighlited]=useState(false)

    const cartCtx =useContext(CartContext)

    const numberOfCartItems=cartCtx.items.reduce((curNumb, item)=>{
        return curNumb+item.amount
    },0)

    const btnClasses = `${classes.button} ${btnIsHighlited? classes.bump : ''}`
    const {items}= cartCtx
    useEffect(()=>{
        if(items.length===0) return
        setBtnIsHighlited(true)
       const timer = setTimeout(() => {
            setBtnIsHighlited(false)
        }, 300);

        return ()=>{
            clearTimeout(timer)
        }

    },[items])

    return <button onClick={props.onClick} className={btnClasses}>
        
        <span className={classes.icon}>
            <CartIcon/>
        </span>
        <span >Your Cart</span>
        <span className={classes.badge}>
            {numberOfCartItems}
        </span>
    </button>
}

export default HeaderCartButton