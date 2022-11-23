import { Fragment } from 'react'
import classes from './Modal.module.css'
import ReactDOM from "react-dom";

const Backdrop = props =>{
    return <div onClick={props.onHide}  className={classes.backdrop}></div>
}

const ModalOverlay = props =>{
    return <div   className={classes.modal}>
        <div className={classes.content}>{props.children}</div>
    </div>
}

const portal=document.getElementById('overlays')

const Modal = props =>{
    return <Fragment>
        {ReactDOM.createPortal(<Backdrop onHide={props.onHide} />,portal)}
        {ReactDOM.createPortal(<ModalOverlay  >{props.children}</ModalOverlay>,portal)}

    </Fragment>
}

export default Modal