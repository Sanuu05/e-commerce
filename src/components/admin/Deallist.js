import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { delProduct, editProduct, getoneProduct, dealofday,sale ,nodealofday,nosale,topf,notopf} from '../../action/product'
import { AiOutlineCheck ,AiOutlineClose,AiFillDelete} from "react-icons/ai";
function Deallist({val,index}) {
    const dispatch = useDispatch()
    


  
    
   
    return (
        <>
            <tr>
                {/* <td>{index + 1}</td> */}
                <td>{val.name}</td>
                <td>₹{val.price}</td>
                <td><img src={val.pimg} className="pdtimgg img-fluid" /></td>
                <td>{val.dealofday?<AiOutlineClose onClick={()=>dispatch(nodealofday(val._id))} />:<AiOutlineCheck className="editicon1" onClick={()=>dispatch(dealofday(val._id))} />}
                /{val.sale?<AiOutlineClose onClick={()=>dispatch(nosale(val._id))} />:<AiOutlineCheck className="editicon1" onClick={()=>dispatch(sale(val._id))}/>}
                /{val.topf?<AiOutlineClose onClick={()=>dispatch(notopf(val._id))} />:<AiOutlineCheck className="editicon1" onClick={()=>dispatch(topf(val._id))}/>}</td>

            </tr>
            
        </>
    )
}

export default Deallist
