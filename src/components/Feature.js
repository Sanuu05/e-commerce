import React from 'react'
import { useSelector } from 'react-redux'
import img1 from './images/photo7.jpg'
import {NavLink} from 'react-router-dom'
function Feature() {
    const product = useSelector(state => state.product)
    const filpdt = product.filter(state=>state.topf===true)
    console.log("pdyt", filpdt)
    return (
        <div className="divbdeal">
        <div className="dealday ">
            <div className="deal_title text-center">
                <h2>Top Feature</h2>
            </div>
            <div className="row">
                {
                    filpdt?filpdt.slice(0,6).map((val,i)=>{
                        return(
                       
                            <div className=" col-md-2 col-12 dealmain ">
                                 <NavLink to={`/details/${val._id}`} className="text-decoration-none bg-dark">
                    <div className="dealimg">
                        <img src={val.pimg[0]} className="img-fluid"/>
                    </div>
                    <div className="dealdetail">
                        <p>{val.name}</p>
                        <p>₹{val?.price - ((val?.price) * (val?.discount / 100))}</p>
                    </div>
                    </NavLink> 
                </div>

                    )
                    }):null
                }
                
              
                </div> 
                <div className="deal_title text-center">
                <button className="show"><a href="/more/deal">Show More</a></button>
            </div>
            </div>
        </div>
    )
}

 export default Feature
