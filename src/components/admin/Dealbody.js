import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import { delProduct, editProduct, getoneProduct,getProduct } from '../../action/product'
import Spost from './Spost'
import Pusher from 'pusher-js'
import Deallist from './Deallist'
function Dealbody() {
    
    const product = useSelector(state => state.product)
    console.log("hui hshh ", product)

    
    return (
        <div className="card mt-5">
            <table>
                <tbody className="text-center">
                    <tr>
                        {/* <th>Sl.no</th> */}
                        <th>Product Name</th>
                        <th>Price</th>
                        <th>Image</th>
                        <th>Dealofday/ Sale/Topf</th>
                    </tr>
                    {
                        product.map((val, index) => {
                            return <Deallist val={val} index={index}/>
                        })
                    }

                </tbody>
            </table>

             
        </div>
    )
}

export default Dealbody
