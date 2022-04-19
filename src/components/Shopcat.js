import React from 'react'
import { AiFillCamera,AiFillMobile } from "react-icons/ai";
import { GiDeliveryDrone,GiLaptop,GiHeadphones ,GiTablet, GiTv} from "react-icons/gi";
import {BsLaptop} from 'react-icons/bs'
import {NavLink} from 'react-router-dom'
function Shopcat() {
    const loop= [{logo:<AiFillCamera/>,title:"camera"},{logo:<AiFillMobile/>,title:"mobile"},{logo:<GiDeliveryDrone/>,title:"drone"},{logo:<BsLaptop/>,title:"laptop"},{logo:<GiHeadphones/>,title:"audio"}]
    // ,{logo:<GiTablet/>,title:"tablets"},{logo:<GiTv/>,title:"tv"}
    return (
        <div className="shopcat">
            <div className="shopcatmain">
                <div className="row">
                    {
                        loop.map((val)=>{
                            return(
                                <div className="col-md-4 col-12  shopcat1">
                                    <NavLink to={`/category/${val.title}`} className="text-decoration-none link-dark">
                                <div className="shopcat1img">
                        {val.logo}
                        <h4>{val.title}</h4>
                    </div>
                    </NavLink>
                    </div>
                            )
                        })
                    }
                    
                
            </div>
            </div>
            
        </div>
    )
}

export default Shopcat
