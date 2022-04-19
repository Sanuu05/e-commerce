import React, { useEffect, useState } from 'react'
import img1 from './images/photo7.jpg'
import { useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
function More() {
    const { moret } = useParams()
    console.log(moret)

    const loop = useSelector(state => state.product)
    const loopfilter = loop.filter(state => state.dealofday === true)
    const loopsalefilter = loop.filter(state => state.sale === true)
    const [mainloop, setmainloop] = useState()
    console.log("main", mainloop)

    return (
        <div className="more">

            
                {moret === "sale" ?
                <div className="dealday ">
                <div className="deal_title text-center">
                    <h2>Sale</h2>
                </div>
                <div className="row">{
                    loopsalefilter.map((val) => {
                        return (
                            
                                <div className=" col-md-3 col-12 dealmain my-4">
                                    <div className="card ">
                                        <div className="dealimg">
                                            <img src={val.pimg[0]} className="img-fluid" />
                                            <p>Sale</p>
                                        </div>
                                        <div className="dealdetail">
                                            <p>{val.name}</p>
                                            <p>₹{val?.price - ((val?.price) * (val?.discount / 100))}</p>
                                            <NavLink to={`/details/${val._id}`}><button>View</button></NavLink>
                                        </div>
                                    </div>
                                </div>
                            

                        )
                    })}</div>
                    </div> :
                    <div className="dealday ">
                                <div className="deal_title text-center">
                                    <h2>Deals Of the Day</h2>
                                </div>
                                <div className="row">           {
                    loopfilter.map((val) => {
                        return (
                            
                            <div className=" col-md-3 col-12 dealmain my-4">
                                <div className="card ">
                                    <div className="dealimg">
                                        <img src={val.pimg[0]} className="img-fluid" />
                                    </div>
                                    <div className="dealdetail">
                                        <p>{val.name}</p>
                                        <p>₹{val?.price - ((val?.price) * (val?.discount / 100))}</p>
                                        <NavLink to={`/details/${val._id}`}><button>View</button></NavLink>
                                    </div>
                                </div>
                            </div>
                            

                        )
                    })
                }
                </div>
                </div>
                }


            
            {/* <div className="deal_title text-center">
                <button className="show">Show More</button>
            </div> */}
        
        </div >
        
    )
}

export default More
