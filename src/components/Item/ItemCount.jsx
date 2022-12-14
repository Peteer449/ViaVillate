import {useState,useContext} from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../Context/CartContext";
export default function ItemCount(props){
  const [howMuchToAdd, setHowMuchToAdd] = useState(0)
  const [activateCart,setActivateCart] = useState(false)
  const {addItem} = useContext(CartContext)

  //Revisamos que tecla se presiono para saber si agregar o sacar cantidad de howMuchToAdd
  function handleHowMuchToAdd(event){
    event.target.value === "-" & howMuchToAdd > 0  && setHowMuchToAdd(howMuchToAdd - 1)
    event.target.value === "+" &howMuchToAdd < props.stock && setHowMuchToAdd(howMuchToAdd + 1)
  }
  return(
    <>
      <div className="d-flex align-items-center border p-2 border-primary rounded bg-white">
        <button className="btn btn-primary" disabled={howMuchToAdd===0} onClick={handleHowMuchToAdd} value="-">-</button>
        <small className="flex-fill text-center fs-5">{howMuchToAdd}</small>
        <button className="btn btn-primary" disabled={howMuchToAdd===props.stock} onClick={handleHowMuchToAdd} value="+">+</button>
      </div>
      <button className="btn btn-primary col-12 mt-2" disabled={howMuchToAdd===0} onClick={()=>addItem({...props.item},props.itemId,howMuchToAdd,setActivateCart)}>Agregar al carrito</button>
      <Link to="/carrito"><button className={activateCart?"btn btn-primary col-12 mt-2":"invisible"}>Ir al carrito</button></Link>
    </>
  )
}