import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { addcategory, getcategory, delcategory, addpincode, getpincode, delpincode } from './../../action/product'
import { AiTwotoneDelete } from "react-icons/ai";
import AdminNavbar from './AdminNavbar'
function Addcate() {
    const dispatch = useDispatch()
    const [data, setdata] = useState({
        category: ""
    })
    const [pincoded, setpincode] = useState({
        pincode:"",time:""
    })
    const history = useHistory()

    const addcath = useSelector((state) => state.acart.addcategory)
    const delcath = useSelector((state) => state.acart.delcategory)
    useEffect(() => {
        dispatch(getcategory())
        dispatch(getpincode())
    }, [addcath, delcath])
    const cath = useSelector((state) => state.addcat)
    const pin = useSelector((state) => state.pincode)
    console.log("hjhjhj", cath)
    const submit = () => {

        dispatch(addcategory(data))
        setdata({
            category: ""
        })
    }
    const submitpin = () => {

        dispatch(addpincode(pincoded))
        setpincode({
            pincode: "",time:""
        })
    }
    console.log('pincoed',pincoded)
    return (
        <div className="addc container">

            <AdminNavbar />
            <div className=" ">
                <div className="row">
                    <div className="col-md-8 col-10 offset-1 offset-md-2 addf mt-5 ">
                        <div className="addinp">
                            <input type="text" placeholder="type category" className="shadow" onChange={(e) => setdata({ category: e.target.value })} />
                            <button className="shadow" onClick={submit}>Add Category</button>
                        </div>
                        <div className="addinp ">
                            <div className='d-flex shadow'>
                                <input type="text" value={pincoded.pincode} placeholder="Pincode" className=" w-50" onChange={(e) => setpincode({...pincoded, pincode: e.target.value })} />
                                <input type="number" value={pincoded.time} placeholder="Est. time" className="w-50" onChange={(e) => setpincode({...pincoded, time : e.target.value })} />
                            </div>

                            <button className="shadow" onClick={submitpin}>Add Pincode</button>
                        </div>
                        
                        
                       





                    </div>
                    <div className='col-6'>
                    <h2>Category</h2>
                        <div className="catylist">
                            <div className="catylist1 ">
                                {

                                    cath ?
                                        cath.map((val, i) => {
                                            return (
                                                <div className="cat">
                                                    <p> {val.category}<AiTwotoneDelete onClick={() => dispatch(delcategory(val._id))} /></p>

                                                </div>)
                                        }) : null
                                }

                            </div>


                        </div>
                    </div>
                    <div className='col-6'>
                    <h2>Pincode</h2>
                        <div className="catylist">
                            <div className="catylist1 ">
                                {

                                    pin ?
                                        pin.map((val, i) => {
                                            return (
                                                <div className="cat">
                                                    <p> {val.pincode}, {val?.time} days<AiTwotoneDelete onClick={() => dispatch(delpincode(val._id))} /></p>

                                                </div>)
                                        }) : null
                                }

                            </div>


                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default Addcate
