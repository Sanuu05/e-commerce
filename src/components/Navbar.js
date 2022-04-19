import React, { useEffect, useState } from 'react'
import { AiOutlineSearch ,AiOutlineShoppingCart,AiOutlineUser ,AiOutlineMenu,AiOutlineClose} from "react-icons/ai";
import $ from 'jquery'
import {NavLink} from 'react-router-dom'
import {getcategory} from './../action/product'
import { useDispatch, useSelector } from 'react-redux'
import {nlogout, getcart} from '../action/user'
import {Modal,Button} from 'react-bootstrap'
function Navbar() {
    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const loop = useSelector(state => state.product)
    console.log('alllop',loop)
    useEffect(() => {
        $('.clikmenu').click(function () {
            $('.lower_nav').addClass('cmenu')
            $('.right_menu').addClass('mbtn2')
        })
        $('.clikcancel').click(function () {
            $('.lower_nav').removeClass('cmenu')
            $('.right_menu').removeClass('mbtn2')
        })
       
        $('.molink').click(function () {
            $('.lower_nav').removeClass('cmenu')
            $('.right_menu').removeClass('mbtn2')
            
        })
    }, [])
    const usertoken = localStorage.getItem('normaltoken')
    const cartdata = useSelector(state=>state.cart.allcart)
    const upd = useSelector((state) => state.acart.add)
    const totalItem = () => {
        return cartdata.reduce((qty, item) => Number(item.qyt) + qty, 0)
    }
    
    const dispatch = useDispatch()
    useEffect(()=>{
        dispatch(getcart())
    },[upd,usertoken])
    
    useEffect(() => {
        dispatch(getcategory())
    }, [])
    const cath = useSelector((state) => state.addcat)
    console.log("nav", cath)
    // const usertoken = localStorage.getItem('normaltoken')
    const noramluser = localStorage.getItem('normaluser')
    const normalobj = JSON.parse(noramluser)
    console.log("Ss",normalobj)
    const[result,setresult] = useState()
    const onsearch =(e)=>{
      
            // console.log('aaa', word)
            if(e){
            const newlist = loop?.filter((con) => {
                return Object.values(con).join(" ").toLowerCase().includes(e.toLowerCase())
            })
            setresult(newlist)
        }else{
            setresult('')
        }
        
    }
 console.log('axxx',result)
 useEffect(()=>{
    if(result===undefined){
        setShow(false)
        
    }else{
        setShow(true)
    }

},[result])
    
    return (
        <div className="navbar p-0 m-0" style={{position:'relative'}}>
            <div className="upper_main">
                <div className="upper_nav">
                    <div className="title">
                        <NavLink className="text-decoration-none" to="/">TechMart</NavLink>
                    </div>
                    <div className="search" style={{position:'relative'}}>
                    <div className="search">
                        <input type="text"  placeholder="Search" onChange={(e)=>onsearch(e.target.value)}/>
                        
                            
                            
                        {/* <button><AiOutlineSearch/></button> */}
                        </div>
                        <div style={{position:'relative',zIndex:99,backgroundColor:'white',width:'100%',background:'red'}}>

                       
                        {
                            result?<div className='srch' >
                                {
                                    result.map((v,i)=>{
                                        return(
                                            <p>
                                        <a style={{textDecoration:'none',color:'black',marginTop:'15px'}} href={`/details/${v._id}`} >{v.name}</a>
                                        </p>
                                        )
                                    })
                                }
                            

                        </div>:null
                        }
                         </div >
                        
                        
                    </div>
                    
                    <div className="right_menu">
                        {
                            usertoken?<div class="dropdown">
                            <h4 class="dropbtn">{normalobj.name}</h4>
                            <div class="dropdown-content">
                            <NavLink to="/myorder" >Orders</NavLink>
                              <a href="#"><button className="btn btn-danger" onClick={()=>dispatch(nlogout())}>Logout</button></a>
                              {/* <a href="#">Link 3</a> */}
                            </div>
                          </div>:<NavLink to="/login"><h4><AiOutlineUser/>Log In</h4></NavLink>
                        }
                        {/* <NavLink to="/login"><h4><AiOutlineUser/>Log In</h4></NavLink> */}
                        
                        <p><NavLink to="/cart"><AiOutlineShoppingCart/>{cartdata.length}</NavLink></p>
                        <h2 className="clikmenu"><AiOutlineMenu/></h2>
                        <h2 className="clikcancel"><AiOutlineClose/></h2>
                    </div>
                    {/* <div className="menu_icon">
                        <AiOutlineMenu/>
                    </div> */}
                </div>
                <div className="sear" style={{position:'relative'}}>
                <div className="searchop">
                        <input type="text" placeholder="Search" onChange={(e)=>onsearch(e.target.value)}/>
                        <button><AiOutlineSearch/></button>
                    </div>
                    {
                            result?<div className='seard' style={{position:'absolute',zIndex:99,backgroundColor:'white',width:'100%',maxHeight:'50vh',overflow:'scroll',padding:'20px'}}>
                                {
                                    result.map((v,i)=>{
                                        return(
                                            <p>
                                        <a style={{textDecoration:'none',color:'black',marginTop:'15px'}} href={`/details/${v._id}`} >{v.name}</a>
                                        </p>
                                        )
                                    })
                                }
                            

                        </div>:null
                        }
                    </div>
                    </div>
                <div className="lower_nav">
                    <ol>
                    <NavLink to="/category/all" className="molink"> <li className="text-capitalize">All</li></NavLink>
                        {cath?
                        cath.map((val,i)=>{
                            return  <NavLink  to={`/category/${val.category}`} className="molink"><li className="text-capitalize">{val.category}</li></NavLink>
                        }):null
                        }
                        
                        
                    </ol>
                </div>
                {/* <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>Woohoo, you're reading this text in a modal!</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal> */}
            
            
        </div>

    )
}

export default Navbar
