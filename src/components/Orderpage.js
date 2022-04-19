import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getorderlist } from '../action/user'

function Orderpage() {
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getorderlist())

    }, [])
    const orderlist = useSelector((state) => state.orderlist)
    console.log(orderlist)
    return (
        <div className="orderitem">
            <div className="container">
                <h2 className="text-center">Orders</h2>
                <div className="row">
                    {
                        orderlist.map((val, index) => {
                            return <div className="col-12 mainorder">
                                <div className="row ">
                                    <div className="col-4 col-md-2 mainleft">
                                        <img src={val.data.pimg[0]} className="img-fluid" />
                                    </div>
                                    <div className="col-8 col-md-10 mainright">
                                        <p className="l1">{val.data.pname}</p>
                                        <p className="l2">{val.data.qyt}</p>
                                        <p className="l3">₹ {val.data.qyt*val.data.price}</p>

                                    </div>
                                </div>


                            </div>


                        })
                    }

                </div>
            </div>


        </div>
    )
}

export default Orderpage
