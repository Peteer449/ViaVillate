import Cart from "./Cart"
import { useContext } from "react"
import { CartContext } from "../Context/CartContext"
import { Link } from "react-router-dom"
export default function CartList(){
  const itemsCart = useContext(CartContext)

  //Hago un if para verificar si el cart en el context esta vacio
  //Si no lo esta hacemos un map en el cart para poder mandar los datos a <Cart/>

  if(itemsCart.cart.length===0){
    return(
      <>
        <h1>Tu carrito esta vacio</h1>
      </>
    )
  }
  return(
  <div className="d-flex flex-wrap gap-3 p-3 justify-content-center">
    <div className="col-8 justify-content-between d-flex">
      <button className="btn btn-danger col-4" onClick={()=>itemsCart.clear()}>Vaciar carrito</button>
      <Link to="/checkout" className="col-4"><button className="btn btn-primary col-12">Finalizar compra</button></Link>
    </div>
    {itemsCart.cart.map((product,index)=>{
      return <Cart productsMaped={product} key={index} />
    }
    )}
    <div className="fs-4 text-center col-12 text-light">Tu total es ${itemsCart.getTotal()}</div>
  </div>
  )
}