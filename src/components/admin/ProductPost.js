import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { delProduct, editProduct, getoneProduct,getProduct } from '../../action/product'
import Spost from './Spost'
import Pusher from 'pusher-js'
function ProductPost() {
    
    const product = useSelector(state => state.product)
   
    // const pdt = product===[]?[1,2]:product
    // console.log("hui hshh ", pdt)
    

    
    return (
        <div className="card mt-5">
            <table>
                <tbody className="text-center">
                    <tr>
                        {/* <th>Sl.no</th> */}
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Edit/ Delete</th>
                    </tr>
                    {
                        product.map((val, index) => {
                            return <Spost val={val} index={index}/>
                        })
                    }

                </tbody>
            </table>

             
        </div>
    )
}

export default ProductPost
