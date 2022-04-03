import "./Header.css";
import {BsCart3} from 'react-icons/bs';
import { IoMenu } from "react-icons/io5";
import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
import { useContext, useState } from "react";
import Modal from "../Modal/Modal";
import { RiDeleteBinLine } from "react-icons/ri";

import { IoCloseOutline } from "react-icons/io5";
import { Context } from "../../Context/OrderFoods";

const Header =() =>{
let [count, setCount] = useState(1);
const {orderFoods,setOrderFoods} = useContext(Context);


function incrementCount() {
count = count + 1;
setCount(count);
}
function decrementCount() {
if(count<=0){ 
    count=1
 } count=count - 1; 
 setCount(count); 
} 
    const [korzinkaModal, setKorzinkaModal]=useState(false);
    const [deleteKorzinkaModal,setDeleteKorzinkaModal]=useState(false); function openKorzinkaModal(){
    setKorzinkaModal(!korzinkaModal); } function openDeleteKorzinkaModal(){ setDeleteKorzinkaModal(!deleteKorzinkaModal)
    } return ( 
    <header className="header">
         <div className="container">
        <div className="header-left">
            <button className="menu-btn">
                <IoMenu />
            </button>
            <Link to="/" className="logo-link">
            SFood
            </Link>
            <ul className="header-list">
                <li className="header-item">
                    <NavLink activeClassName="header-item--active" to="/" 
                    className="header-link" exact>
                        Главная
                    </NavLink>
                </li>
                <li className="header-item">
                    <NavLink activeClassName="header-item--active"
                     to="/filial" className="header-link">
                             Филиалы
                    </NavLink>
                </li>
                <li className="header-item">
                    <NavLink activeClassName="header-item--active"
                     to="/about" className="header-link">
                        О нас
                    </NavLink>
                </li>
           
                <li className="header-item">
                    <NavLink activeClassName="header-item--active" to="/contact" className="header-link">
                        Контакты
                    </NavLink>
                </li>

            </ul>
        </div>
        <div className="header-right">
            <button className="basket-btn" onClick={()=>openKorzinkaModal()}>
                <BsCart3 />
                {orderFoods.length > 0 && (
                <p>{orderFoods.map((food)=>
                (<span>{food.count}</span>))}</p>)}
            </button>

            <button className="login-btn">
                Войти
            </button>
        </div>

        <Modal className="modal" show={korzinkaModal} w={800} mh={400}>
            <button className="close-btn" onClick={()=>setKorzinkaModal()}>
                <IoCloseOutline />
            </button>
            <div className="modal-box">
                {orderFoods.length > 0 &&(
                <ul className="modal-list">
                    {orderFoods.map((food)=>(
                    <li className="modal-item">
                        <img className="modal-img"
                            src={food.img} />
                        <p className="modal-title">
                        {food.title}
                        </p>
                        <div className="modal-blok">
                            <button className="modal-minus" onClick={decrementCount}>
                                -
                            </button>
                            <span className="modal-count">
                                {food.count}
                            </span>
                            <button className="modal-plus" onClick={incrementCount}>
                                +
                            </button>
                        </div>
                        <p className="modal-price">
                        {(food.price * food.count).toFixed(1)} сум
                        </p>
                        <button className="modal-btn" onClick={()=>{
                                setOrderFoods(orderFoods.filter
                                (ovqat => ovqat.id !== food.id))
                                }}>
                            <RiDeleteBinLine />
                        </button>
                    </li>
                    ))}
                </ul>
                )}
            </div>
        </Modal>
    </div>

    </header>
    )
    }

    export default Header;