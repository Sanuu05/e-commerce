import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useParams, useHistory } from 'react-router-dom'
import img1 from './images/photo7.jpg'
import { addtocart } from '../action/user'
import { getpincode } from '../action/product'

function Productdetails() {
    const [abt, setabt] = useState(false)
    const history = useHistory()
    const { pdid } = useParams()
    const [qyt, setqyt] = useState()
    const [numstock, setnumstock] = useState()
    const [pincode, setpincode] = useState()
    const [pincodefind, setpincodefind] = useState()
    
    const loop = useSelector(state => state.product)
    const detail = loop.find(state => state._id === pdid)
    const[simg,setsimg] = useState(detail?.pimg[0])
    console.log("hello", detail)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getpincode())
    }, [])
    useEffect(() => {
        if (detail ? detail.stock ? detail.stock > 10 : null : null) {
            setnumstock(10)
        } else {
            setnumstock(detail ? detail.stock ? detail.stock : null : null)
        }
    }, [])
    const usertoken = localStorage.getItem('normaltoken')
    const pin = useSelector((state) => state.pincode)
  
    const checkpin = ()=>{
        const find = pin?.find(p=>p.pincode==pincode)
        console.log('pin',find)
        if(find===undefined){
            setpincodefind("no")
        }else{
            setpincodefind(find)
        }
        
    }
    
    return (
        <div className="prodetails">
            <div className="row">
                <div className="col-xl-12 offset-xl-0 col-md-12 offset-md-0 col-12 offset-0 pd1">
                    <div className="row">
                        <div className="col-md-6 col-12  prodetailimg">
                            <div className='div1'>
                                <ol>
                                    {
                                        detail?.pimg?.map((v,i)=>{
                                            return <li className={simg===v?"active":""} style={{width:'60px',height:'60px'}} onMouseOver={()=>setsimg(v)}><img src={v} style={{height:'50px',width:'50px',objectFit:'contain'}} /> </li>
                                        })
                                    }
                                </ol>
                                </div>
                                <div className='detail_img card'>
                                <img src={simg} className="img-fluid" />
                                    </div>
                           
                        </div>
                        <div className="col-md-6 col-12 left">
                            <h2>{detail ? detail.name ? detail.name : null : null}</h2>
                            <div className='pricedetail'>
                                <p className="price">₹{detail?.price - ((detail?.price) * (detail?.discount / 100))}</p>
                                <p className="mprice">₹{detail ? detail.price ? detail.price : null : null}</p>
                                <p className="dis">₹{detail?.discount} %</p>

                            </div>


                            {
                                detail ? detail.stock ? detail.stock === 0 ? null : <select value={qyt} onChange={(e) => setqyt(e.target.value)} className="mb-2" >
                                    {
                                        [...Array(numstock).keys()].map((x) => {
                                            return <option value={x + 1}>{x + 1}</option>
                                        })
                                    }


                                </select> : null : null
                            }
                            <div className='dil my-4'>
                                <p className='mb-5 '>Delivery</p>
                                <div className='dilc'>
                                    <input type='number' placeholder='pincode' onChange={(e)=>setpincode(e.target.value)} />
                                    <button onClick={checkpin}>Check</button>
                                    {pincodefind?
                                        pincodefind==="no"?<p className=' mt-2' style={{color:'red'}}>Delivery not available</p>:<p className=' mt-2'>Delivery in {pincodefind?.time} days</p>:<p className=' mt-2'>Type pincode for check</p>
                                    }
                                    
                                   
                                </div>
                                

                            </div>
                          
                            
                            <div className="pdtbtn">
                                {
                                    detail?.stock === 0 ? <button className="b2">Out Of Stock</button> : <button className="b1" onClick={detail ? () => usertoken ? dispatch(addtocart({ cart: { cartitem: detail._id, pimg: detail.pimg, pname: detail.name, stock: detail.stock, price: detail.price, qyt: qyt, discount: detail?.discount } })) : history.push('/login') : null}>Add to CArt</button>
                                }

                                {/* <button>Buy Now</button> */}


                            </div>
                            <div className='detailsm mt-3'>
                                <h2>Highlights</h2>
                                <ol>
                                    {
                                        detail?.highlight?.map((v) => {
                                            return <li>{v}</li>
                                        })
                                    }
                                </ol>
                            </div>
                            <div className='detailsm cardd  mt-3 '>
                                <h2>Description</h2>
                                <p>{detail ? detail.detail ? detail.detail : null : null}</p>
                            </div>
                            <div className='detailsm cardd  mt-3 '>
                                <h3>Specifications</h3>
                                {
                                    detail?.alldetail?.map((v) => {
                                        return <div className='row cardd mx-1'>
                                            <div className='col-12'>
                                                <h2>{v?.head}</h2>
                                            </div>
                                            {
                                                v?.list?.map((vv) => {
                                                    return <>
                                                        <div className='col-4'>
                                                            <p>{vv?.title}</p>
                                                        </div>
                                                        <div className='col-8'>
                                                            <p>{vv?.des}</p>
                                                        </div>
                                                    </>
                                                })
                                            }
                                        </div>
                                    })
                                }
                            </div>



                        </div>
                    </div>

                </div>
            </div>


        </div>
    )
}

export default Productdetails
