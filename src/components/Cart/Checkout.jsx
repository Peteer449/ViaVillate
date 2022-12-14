import { addDoc, collection } from "firebase/firestore";
import { db,updateItem } from "../../utils/firebase";
import {useState,useContext} from "react";
import { CartContext } from "../Context/CartContext";

export default function Checkout(){
  const {cart,getTotal,clear} = useContext(CartContext)

  //Datos del comprador
  const [buyer,setBuyer]=useState({
    Name:"",
    Email:"",
    Phone:""
  })
  const [orderId,setOrderId]=useState()

  const {Name,Email,Phone}=buyer

  //Creo una collection con el nombre de "orders" y le paso data desde handleSubmit
  const generateOrder = async(data) =>{
    try{
      const col = collection(db,"orders")
      const order = await addDoc(col,data)
      setOrderId(order.id)
      clear()
    }catch(error){
      console.error(error)
    }
  }

  function handleInputChange(event){
    setBuyer({
      ...buyer,
      [event.target.name]:event.target.value
    })
  }

  //Consigo los items que compro haciendole un map al cart
  //Busco cual va a ser el total con la funcion getTotal del context
  //Paso los datos del comprador, los items, el total y la fecha a generateOrder
  function handleSubmit(event){
    event.preventDefault()
    const items = cart.map(item=>{
      updateItem(item.id, item.stock-item.cant)
      return({
      id:item.id,
      title:item.name,
      price:item.price,
      cant:item.cant
    })})
    const date = new Date()
    const total = getTotal()
    const data = {buyer,items,date,total}
    generateOrder(data)
  }

  return(
    <>
    {
    //Si mi es undefined paso el formulario para llenar con informacion del comprador
    }
    {orderId?(
    <h1>Tu orden de compra es: {orderId}</h1>):(
        <form onSubmit={handleSubmit} className="col-10 offset-1 text-light mt-5 mb-5">
          <div className="mb-3">
            <label htmlFor="name" className="form-label ">Nombre y apellido</label>
            <input
              required
              className="form-control"
              id="name"
              type="text"
              name="Name"
              placeholder="Nombre"
              value={Name}
              onChange={handleInputChange}
              />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Direccion de Email</label>
            <input
              required
              className="form-control"
              id="email"
              type="email"
              name="Email"
              placeholder="Email"
              value={Email}
              onChange={handleInputChange}
              />
          </div>
          <div className="mb-3">
            <label htmlFor="phone" className="form-label">Numero de telefono</label>
            <input
              required
              className="form-control"
              id="phone"
              type="text"
              name="Phone"
              placeholder="Telefono"
              value={Phone}
              onChange={handleInputChange}
              />
          </div>
          <div className="mb-3 form-check">
            <input 
              className="form-check-input"
              name="checkbox"
              type="checkbox"
              id="checkbox"
              required
              />  
            <label htmlFor="checkbox" className="form-check-label">
              Estas de acuerdo con pasar a buscar los productos por el local cuando se indique que estan listos?
            </label>
          </div>
          <input
          type="submit"
          value="Finalizar compra"
          className="btn btn-primary"
          />
        </form>
      )}
    </>
  )
}