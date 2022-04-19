import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { Address, addtocart, delCart, getcart } from '../action/user';
import { useHistory } from 'react-router-dom'
import { deleted } from '../action/user'

function Razopay() {
    const [succmsg, setsuccmsg] = useState()
    const dispatch = useDispatch()
    const [discount, setdiscount] = useState(0)
    const [cinput, csetinput] = useState()
    const [logc1, setlogc1] = useState(true)
    const [logc2, setlogc2] = useState(false)
    const [check, setcheck] = useState()
    const [showsum, setshowsum] = useState(false)
    const [showsum1, setshowsum1] = useState(true)
    const allcdel = useSelector((state) => state.acart.cdel)
    const [nadd, setnadd] = useState(false)

    const posts = useSelector((state) => state.cart.allcart)
    const userda = useSelector((state) => state.normal?.user?.user)
    console.log('userdd', userda)
    const delcartitem = useSelector((state) => state.acart.del)
    const cartqytup = useSelector((state) => state.acart.del)
    const cartdata = useSelector(state => state.cart.allcart)
    console.log('allcart', cartdata)
    useEffect(() => {
        dispatch(getcart())

    }, [succmsg, allcdel, cartqytup, delcartitem])



    const getmaintotal = () => {
        return posts?.reduce((price, item) => ((item.price * item.qyt)) + price, 0)
    }
    const getdis = () => {
        return posts?.reduce((price, item) => (((item?.price * (item?.discount / 100))) * item.qyt) + price, 0)
    }
    const gettotal = () => {
        return posts?.reduce((price, item) => ((item.price - (item?.price * (item?.discount / 100))) * item.qyt) + price, 0)
    }
    console.log("tt", posts)
    const token = localStorage.getItem("normaltoken")

    const [userdata, setuserdata] = useState({
        name: "", address: "", pincode: "", mobile: "", locality: "", city: "", landmark: "", alternate: "", state: ""
    })
    const disprice = gettotal() * discount / 100
    const paydata = {
        total: Number(gettotal()?.toFixed(2)) ,
        user: userdata,
        totalcart: posts

    }
    const history = useHistory()

    useEffect(() => {
        if (succmsg) {

            history.push('/')
        }
    }, succmsg)
    const del = (data) => {

        dispatch(delCart(data))



    }

    function loadScript(src) {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = src;
            script.onload = () => {
                resolve(true);
            };
            script.onerror = () => {
                resolve(false);
            };
            document.body.appendChild(script);
        });
    }
    async function displayRazorpay() {
        // e.preventDefault()
        const res = await loadScript(
            "https://checkout.razorpay.com/v1/checkout.js"
        );

        if (!res) {
            alert("Razorpay SDK failed to load. Are you online?");
            return;
        }


        const result = await axios.post("https://devoecom.herokuapp.com/normal/orders", paydata);

        if (!result) {
            alert("Server error. Are you online?");
            return;
        }

        const { amount, id: order_id, currency } = result.data;

        const options = {
            key: "rzp_test_fvOAKuvkkgRaoU", // Enter the Key ID generated from the Dashboard
            amount: amount.toString(),
            currency: currency,
            name: "TechMart",
            description: "Test Transaction",
            // image: { logo },
            order_id: order_id,
            handler: async function (response) {
                const data = {
                    orderCreationId: order_id,
                    razorpayPaymentId: response.razorpay_payment_id,
                    razorpayOrderId: response.razorpay_order_id,
                    razorpaySignature: response.razorpay_signature,
                    totaldata: paydata

                };

                const result = await axios.post("https://devoecom.herokuapp.com/normal/success", data, { headers: { "x-auth-token": token } });
                setsuccmsg(result.data.msg)
                dispatch(deleted())
                alert(`${result.data.msg ? "Order placed Sucessfully" : null}`);
            },
            prefill: {
                name: userdata.name,
                email:userda?.email,
                contact:userdata.mobile,
              },
            theme: {
                color: "#61dafb",
            },
        };

        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    return (
        <div className="razopay">
            <div className="container">
                {/* <h2>Shifting Address</h2> */}
                <div className="row">
                    


                    <div className="col-md-8 razoleft  col-12  address my-2 px-2">
                    
                        {
                            logc1 ?
                                <div className='row addressxn my-2 shadow'>
                                    <div className='logdivm'>
                                        <div className='logdiv'>
                                            <p>1</p>
                                            <div className='logm'>
                                                <h4>Login</h4>
                                                <h5>{userda?.name} <span>{userda?.mobile}</span></h5>
                                            </div>

                                        </div>

                                        <button onClick={() => {
                                            setlogc2(true)
                                            setlogc1(false)
                                            setshowsum1(false)
                                            setshowsum(true)
                                        }}>Change</button>


                                    </div>
                                </div>
                                : null
                        }
                   
                        {
                            logc2 ? <div className='row addressx my-2 shadow'>
                                <div className='title'>
                                    <h3>Login</h3>
                                </div>
                                <div className='col-12'>
                                    <div className='logdetail'>
                                        <h2>Name : {userda?.name}</h2>
                                    </div>
                                    <div className='logdetail'>
                                        <h2>Mobile : {userda?.mobile}</h2>
                                    </div>
                                    <div className='logdetail pb-3'>
                                        <button onClick={() => {
                                            setlogc2(false)
                                            setlogc1(true)
                                            
                                        }}>CONTINUE CHECKOUT</button>
                                    </div>
                                </div>
                            </div> : null
                        }
                        {
                            showsum ?
                                <div className='row addressxn my-2 shadow'>
                                    <div className='logdivm'>
                                        <div className='logdiv'>
                                            <p>2</p>
                                            <div className='logm'>
                                                <h4>Delivery Address</h4>
                                                <h5>{userdata?.name} <span>{userdata?.address},{userdata?.city} ,{userdata?.locality} , {userdata?.state}, {userdata?.pincode}</span></h5>
                                            </div>

                                        </div>

                                        <button onClick={() => {
                                            setlogc2(true)
                                            setlogc1(false)
                                            setshowsum(false)
                                            setshowsum1(true)
                                        }}>Change</button>


                                    </div>
                                </div>
                                : null
                        }
                        {
                            showsum1 ? <div className='row addressx my-2 shadow'>

                                <div className='title'>
                                    <h3>Delivery Address</h3>
                                </div>
                                {
                                    userda?.address?.map((v, i) => {
                                        return <div className=' col-12'>
                                            <div className='adb'>
                                                <div className='logtop'>
                                                    <input type='radio' checked={check === i} onClick={() => setcheck(i)} />
                                                    <div className='logtopb'>
                                                        <div className='logtopb1'>
                                                            <h3>{v?.name}</h3>
                                                            <h5>{v?.mobile}</h5>
                                                        </div>
                                                        <div className='logtopb2'>
                                                            <p>{v?.address},{v?.city} ,{v?.locality} , {v?.state}, {v?.pincode} </p>

                                                        </div>
                                                        {
                                                            check === i ? <div className='logtopb2'>
                                                                <button onClick={() => {
                                                                    setshowsum(true)
                                                                    setuserdata({
                                                                        name: v?.name, address: v?.address, pincode: v?.pincode, mobile: v?.mobile, locality: v?.locality, city: v?.city, landmark: v?.landmark, alternate: v?.alternate, state: v?.state
                                                                    })
                                                                    setshowsum1(false)

                                                                }}>Deliver Here</button>
                                                            </div> : null
                                                        }


                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    })
                                }

                            </div> : null
                        }

                        <div className='col-12 my-2'>
                            <button onClick={() => setnadd(true)}>Add New Address</button>
                        </div>


                        {
                            nadd ? <form onSubmit={displayRazorpay} >
                                <div className='row addressx  shadow'>
                                    <div className='title'>
                                        <h3>Add New Address</h3>
                                    </div>
                                    <div className='col-md-6 col-12'>
                                        <input type="text" placeholder="Name" value={userdata.name} onChange={(e) => setuserdata({ ...userdata, name: e.target.value })} required />
                                    </div>
                                    <div className='col-md-6 col-12'>
                                        <input type="number" placeholder="10-digit mobile number" pattern="[0-9]{10}" value={userdata.mobile} onChange={(e) => setuserdata({ ...userdata, mobile: e.target.value })} required />
                                    </div>
                                    <div className='col-md-6 col-12'>
                                        <input type="tel" placeholder="Pincode" pattern="[0-9]{6}" value={userdata.pincode} onChange={(e) => setuserdata({ ...userdata, pincode: e.target.value })} required />
                                    </div>
                                    <div className='col-md-6 col-12'>
                                        <input type="text" placeholder="Locality" value={userdata.locality} onChange={(e) => setuserdata({ ...userdata, locality: e.target.value })} required />
                                    </div>
                                    <div className='col-md-12 col-12'>
                                        <textarea placeholder="Address" value={userdata.address} onChange={(e) => setuserdata({ ...userdata, address: e.target.value })} required />

                                    </div>
                                    <div className='col-md-6 col-12'>
                                        <input type="text" placeholder="City/District/Town" value={userdata.city} onChange={(e) => setuserdata({ ...userdata, city: e.target.value })} required />
                                    </div>
                                    <div className='col-md-6 col-12'>
                                        <input type="text" placeholder="State" value={userdata.state} onChange={(e) => setuserdata({ ...userdata, state: e.target.value })} required />
                                    </div>
                                    <div className='col-md-6 col-12'>
                                        <input type="text" placeholder="Landmark (optonal)" value={userdata.landmark} onChange={(e) => setuserdata({ ...userdata, landmark: e.target.value })} required />
                                    </div>
                                    <div className='col-md-6 col-12'>
                                        <input type="number" placeholder="Alternate Phone (Optional)" pattern="[0-9]{10}" value={userdata.alternate} onChange={(e) => setuserdata({ ...userdata, alternate: e.target.value })} required />
                                    </div>

                                </div>



                                {/* <input type="number" placeholder="Mobile Number" pattern="[0-9]{10}" value={userdata.mobile} onChange={(e) => setuserdata({ ...userdata, mobile: e.target.value })} required />
                            <input type="email" placeholder="Email" value={userdata.email} onChange={(e) => setuserdata({ ...userdata, email: e.target.value })} required /> */}
                                
                                <button className='shadow' onClick={() => dispatch(Address(userdata))}>
                                    Save Address
                                </button>


                            </form> : null
                        }


                        {
                            showsum ?
<>
                                <div className='row addressx shadow my-3'>
                                    <div className='title'>
                                        <h3>Order Summary</h3>
                                    </div>
                                    {
                                        cartdata ?
                                            cartdata.map((val, i) => {
                                                return <div className="col-12 col-md-12 col-xl-12 cartsub   my-2">
                                                    <div className="row">
                                                        <div className="col-4 col-md-4 col-xl-4 ">
                                                            <div className="cart_img">
                                                                <img src={val?.pimg[0]} className="img-fluid" />
                                                            </div>
                                                        </div>
                                                        <div className="col-8 col-md-8 col-xl-8 cart-detail">

                                                            <div className="">
                                                                <h2>{val?.pname}</h2>
                                                                <select value={val?.qyt} onChange={(e) => dispatch(addtocart({ cart: { cartitem: val?.cartitem, pimg: val?.pimg, pname: val?.pname, stock: val?.stock, price: val?.price, qyt: e.target.value } }))} >
                                                                    {
                                                                        [...Array(Number(val?.stock)).keys()].map((x) => {
                                                                            return <option value={x + 1}>{x + 1}</option>
                                                                        })
                                                                    }
                                                                </select>


                                                                <h4>₹{val?.price}</h4>
                                                                <button onClick={() => del(val?.cartitem)}>Remove</button>
                                                            </div>
                                                        </div>
                                                    </div>



                                                </div>
                                            }) : null
                                    }
                                    
                                </div>
                                <button className="shadow float-end" onClick={displayRazorpay}>
                                    Proceed to Payment
                                </button>
                                </> : null
                        }







                    </div>
                    <div className="col-md-4 col-12 cart-right my-2">
                        <div className="card shadow">
                            <form onSubmit={async (e) => {
                                e.preventDefault()
                                try {
                                    const product = await axios.get(`http://localhost:1988/pdt/coupons/${cinput}`)
                                    setdiscount(product?.data?.discount)
                                } catch (error) {
                                    alert('invalid')

                                }

                            }}>
                                {/* <div className='ccode'>
                                <input type='text' placeholder='coupoun code' onChange={(e)=>csetinput(e.target.value)} />
                                <button type='submit'>Apply</button>
                            </div> */}
                            </form>
                            <div className="price_detail">
                                <h2>PRICE DETAILS</h2>
                            </div>
                            <div className="total_price">
                                <div className="d-flex justify-content-between mt-2">
                                    <p>Price({posts.length} item)</p>
                                    <p>₹{getmaintotal()}</p>
                                </div>
                                <div className="d-flex justify-content-between mt-2">
                                    <p>Discount : </p>
                                    <p>₹{getdis()?.toFixed(2)}  </p>
                                </div>
                                <div className="d-flex justify-content-between mt-2">
                                    <p>Delivery Charges : </p>
                                    <p>₹ 0  </p>
                                </div>
                                {
                                    discount > 0 ?
                                        <div className="d-flex justify-content-between">
                                            <p>Discount ({discount}%)</p>
                                            <p>- ₹{disprice}</p>
                                        </div> : null
                                }




                                <h3>Total : ₹{gettotal() - disprice}</h3>
                            </div>
                            <div className="buy_btn">
                                {/* <button className="shadow" onClick={displayRazorpay}>Pay Now</button> */}

                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default Razopay
