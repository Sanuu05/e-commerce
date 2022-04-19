import React from 'react'
import img1 from './images/photo7.jpg'
import { useSelector } from 'react-redux'
import {NavLink} from 'react-router-dom'
function Moresale() {
    const loop = useSelector(state => state.product)
    return (
        <div className="more">
        <div className="dealday ">
            <div className="deal_title text-center">
                <h2>Deals Of the Day</h2>
            </div>
            <div className="row">
                {
                    loop.map((val)=>{
                        return(
                            <div className=" col-md-3 col-12 dealmain my-3">
                    <div className="card ">
                    <div className="dealimg">
                        <img src={val.pimg[0]} className="img-fluid"/>
                    </div>
                    <div className="dealdetail">
                        <p>{val.name}</p>
                        <p>₹{val?.price - ((val?.price) * (val?.discount / 100))}</p>
                        <button><NavLink to='/more/sale'>View</NavLink> </button>
                    </div>
                    </div>
                </div>
                            
                        )
                    })
                }
                
               
                </div> 
                {/* <div className="deal_title text-center">
                <button className="show">Show More</button>
            </div> */}
            </div>
        </div>
    )
}

export default Moresale
