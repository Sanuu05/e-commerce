import React from 'react'
import { useSelector } from 'react-redux'
import img1 from './images/photo7.jpg'
import { NavLink } from 'react-router-dom'
function Dealsofday() {
    const product = useSelector(state => state.product)
    const filpdt = product.filter(state => state.dealofday === true)
    console.log("pdyt", product)
    return (
        <div className="divbdeal">
            <div className="dealday ">
                <div className="deal_title text-center">
                    <h2>Deals Of the Day</h2>
                </div>
                <div className="row mt-5">
                    {
                        filpdt ? filpdt.slice(0, 6).map((val, i) => {
                            return (

                                <div className=" col-md-2 col-12 px-2 ">
                                    <div className='dealmain'>
                                        <NavLink to={`/details/${val._id}`} className="text-decoration-none bg-dark">
                                            <div className="dealimg">
                                                <img src={val.pimg[0]} className="img-fluid" />
                                            </div>
                                            <div className="dealdetail">
                                                <p>{val.name}</p>
                                                <p>₹{val?.price - ((val?.price) * (val?.discount / 100))}</p>
                                            </div>
                                        </NavLink>
                                    </div>

                                </div>

                            )
                        }) : null
                    }


                </div>
                <div className="deal_title text-center">
                    <button className="show"><a href="/more/deal">Show More</a></button>
                </div>
            </div>
        </div>
    )
}

export default Dealsofday
