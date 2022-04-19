import React from 'react'
import { useSelector } from 'react-redux'
import img1 from './images/photo7.jpg'
import {NavLink} from 'react-router-dom'
function Sale() {
    const product = useSelector(state => state.product)
    const filpdt = product.filter(state=>state.sale===true)
    console.log("pdytaasasas", filpdt)
    return (
        <div className="divbdeal">
        <div className="dealday ">
            <div className="deal_title text-center ">
                <h2 className="sale">Sale</h2>
            </div>
            <div className="row">
                {
                    filpdt?filpdt.slice(0,6).map((val,i)=>{
                        return(
                            <div className='col-md-2 col-12 px-2'>
                            <div className=" dealmain">
                                <NavLink to={`/details/${val._id}`} className="text-decoration-none bg-dark">
                    <div className="dealimg">
                        <img src={val.pimg[0]} className="img-fluid"/>
                        <p>Sale</p>
                    </div>
                    <div className="dealdetail">
                        <p>{val.name}</p>
                        <p>₹{val?.price - ((val?.price) * (val?.discount / 100))}</p>
                    </div>
                    </NavLink>
                </div>
                </div>

                        )
                    }):null
                }
                
              
                </div> 
                <div className="deal_title text-center">
                <NavLink to="/more/sale"><button className="show">Show More</button></NavLink>
            </div>
            </div>
        </div>
    )
}

 export default Sale
