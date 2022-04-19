import React, { useEffect, useState } from 'react'
import img1 from './images/photo7.jpg'
import { useSelector } from 'react-redux'
import { NavLink, useParams } from 'react-router-dom'
function Cathpdt() {
    const { cath } = useParams()
    console.log(cath)

    const loop = useSelector(state => state.product)
    const loopfilter = loop.filter(state => state.type === cath)
    // const loopsalefilter = loop.filter(state => state.sale === true)
    // const [mainloop, setmainloop] = useState()
    console.log("main", loop)

    return (
        <div className="more">

            
                
                <div className="dealday ">
                <div className="deal_title text-center">
                    <h2 className="text-uppercase">{cath}</h2>
                </div>
                <div className="row">
                    {
                        cath==="all"?
                        loop.map((val) => {
                            return (
                                
                                    <div className=" col-md-3 col-12 dealmain my-4">
                                        <div className="card ">
                                            <div className="dealimg">
                                                <img src={val.pimg[0]} className="img-fluid" />
                                                {
                                                    val.sale?<p>Sale</p>:null
                                                }
                                                
                                            </div>
                                            <div className="dealdetail">
                                                <p>{val.name}</p>
                                                <p>₹{val?.price - ((val?.price) * (val?.discount / 100))}</p>
                                                <NavLink to={`/details/${val._id}`}><button>View</button></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                
    
                            )
                        }): loopfilter.map((val) => {
                            return (
                                
                                    <div className=" col-md-3 col-12 dealmain my-3">
                                        <div className="card ">
                                            <div className="dealimg">
                                                <img src={val.pimg[0]} className="img-fluid" />
                                                {
                                                    val.sale?<p>Sale</p>:null
                                                }
                                            </div>
                                            <div className="dealdetail">
                                                <p>{val.name}</p>
                                                <p>₹{val?.price - ((val?.price) * (val?.discount / 100))}</p>
                                                <NavLink to={`/details/${val._id}`}><button>View`</button></NavLink>
                                            </div>
                                        </div>
                                    </div>
                                
    
                            )
                        })
                    }
                    {
                   }</div>
                    </div> 
                    
                


            
            
        
        </div >
        
    )
}

export default Cathpdt
