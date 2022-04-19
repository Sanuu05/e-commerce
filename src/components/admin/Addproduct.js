import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getcategory, delProduct, editProduct } from './../../action/product'
import AdminNavbar from './AdminNavbar'
import { AiFillEdit, AiFillDelete, AiOutlineEye } from "react-icons/ai";
import ProductForm from './ProductForm'

function Addproduct() {
    const dispatch = useDispatch()
    const cath = useSelector((state) => state.addcat)

    useEffect(() => {
        dispatch(getcategory())
    }, [])

    const product = useSelector(state => state.product)
    console.log("hui hshh ", product)
    const outofstock = product?.filter(state => state.stock === 0)

    const totalitems = product?.reduce((preval, currval) => currval?.stock + preval, 0)



    const [editname, seteditname] = useState()
    const [editprice, seteditprice] = useState()
    const [editpic, seteditpic] = useState([])
    const [stock, setstock] = useState()
    const [type, settype] = useState()
    const [detail, setdetail] = useState()
    const [discount, setdiscount] = useState()
    const [editpicd, seteditpicd] = useState([])
    const [id, setid] = useState()
    // const cath = useSelector((state) => state.acart.category)
    console.log('total1', {
        editpic, editpicd
    })
    const editone = (val) => {
        seteditname(val.name)
        seteditprice(val.price)
        setstock(val.stock)
        settype(val.type)
        setdetail(val.detail)
        setdiscount(val?.discount)
        setid(val?._id)
    }
    const change = (val) => {

        if (editpic && editname && editname) {
            {
                editpic?.map((v, i) => {
                    const data = new FormData()
                    data.append("file", v)
                    data.append("upload_preset", "insta-clone")
                    data.append("cloud_name", "sannu")
                    fetch("https://api.cloudinary.com/v1_1/sannu/image/upload", {
                        method: "post",
                        body: data
                    }).then(res =>
                        res.json())
                        .then(data => {
                            seteditpicd((old) => {
                                return [...old, data.url]

                            })

                            console.log('lenn', [editpic.length, editpicd.length])
                            // if (editpic.length === editpicd.length) {
                            //     alert('done')
                            // }
                            // dispatch(editProduct(val._id, { name: editname, price: editprice, pimg: data.url, type: type, stock: stock, detail: detail, type: type, discount: discount }))


                        }).catch(err => console.log(err))
                })

            }
        } else {
            dispatch(editProduct(val._id, { name: editname, price: editprice, stock: stock, detail: detail, type: type, discount: discount }))
        }
    }
    console.log('lenn22', {
        editpic,editpicd
    })
    useEffect(() => {
        if (editpicd.length > 0) {
            if (editpic.length === editpicd.length) {
                dispatch(editProduct(id, { name: editname, price: editprice, pimg: editpicd, type: type, stock: stock, detail: detail, type: type, discount: discount }))
                seteditpicd([])
                seteditpic([])
            }

        }

    }, [editpicd])

    return (
        <div className="addproduct">
            <AdminNavbar />
            <div className="container">
                <div className="row addpdttop">
                    <div className="upp">
                        <h2>Product Inventory</h2>
                        <button data-bs-toggle="modal" data-bs-target={`#exampleModal`}>Add New Product</button>
                    </div>
                    <div className="col-md-3 p-2">
                        <div className="addpdtcard">
                            <h4>Total Category</h4>
                            <h5>{cath?.length}</h5>
                        </div>
                    </div>
                    <div className="col-md-3 p-2">
                        <div className="addpdtcard">
                            <h4>Total Products</h4>
                            <h5>{product?.length}</h5>
                        </div>
                    </div>
                    <div className="col-md-3 p-2">
                        <div className="addpdtcard">
                            <h4>Total Items</h4>
                            <h5>{totalitems}</h5>
                        </div>
                    </div>
                    <div className="col-md-3 p-2">
                        <div className="addpdtcard">
                            <h4>Out Of Stock</h4>
                            <h5>{outofstock?.length}</h5>
                        </div>
                    </div>

                </div>
                <div className="row">
                    <div className="col-12 col-md-10 offset-1 ">
                        <div className="card mt-5">
                            <table>
                                <tbody >
                                    <tr>
                                        {/* <th>Sl.no</th> */}
                                        <th>Product Name</th>
                                        <th>Price</th>
                                        <th>Image</th>
                                        <th>Edit</th>
                                        <th>Delete</th>
                                    </tr>
                                    {
                                        product.map((val, index) => {
                                            return <>
                                                <tr className="mt-2 itemdetail">
                                                    {/* <td>{index + 1}</td> */}
                                                    <td><AiOutlineEye style={{ color: 'blue', cursor: 'pointer' }} data-bs-toggle="modal" data-bs-target={`#exampleModal${index}`} />  {val.name.substring(0, 40)}...</td>
                                                    <td>₹{val.price}</td>
                                                    <td style={{ display: 'flex', justifyContent: 'center', alignContent: 'center' }}><img src={val.pimg[0]} className="pdtimgg img-fluid" /></td>
                                                    <td><AiFillEdit className="editicon" onClick={() => editone(val)} data-bs-toggle="modal" data-bs-target={`#exampleModal${index}`} /></td>
                                                    <td><AiFillDelete className="editicon" onClick={() => dispatch(delProduct(val._id))} /></td>

                                                </tr>
                                                <div class="modal fade" id={`exampleModal${index}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                                    <div class="modal-dialog">
                                                        <div class="modal-content">
                                                            <div class="modal-header">
                                                                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                            </div>
                                                            <div class="modal-body">
                                                                <input type="text" placeholder="name" value={editname} onChange={(e) => seteditname(e.target.value)} />
                                                                <input type="number" placeholder="Price" value={editprice} onChange={(e) => seteditprice(e.target.value)} />
                                                                <input type="Number" placeholder="Discount" value={discount} onChange={(e) => setdiscount(e.target.value)} />
                                                                {/* <input type="text" placeholder="Type" value={type} onChange={(e)=>settype(e.target.value)}/> */}
                                                                <select value={type} onChange={(e) => settype(e.target.value)} className="shadow" required>
                                                                    <option value="">Select Category</option>
                                                                    {cath ?
                                                                        cath.map((val, id) => {
                                                                            return (
                                                                                <option key={id} value={val.category}>{val.category}</option>
                                                                            )
                                                                        }) : null
                                                                    }


                                                                </select>
                                                                <input type="number" placeholder="Stock" value={stock} onChange={(e) => setstock(e.target.value)} />
                                                                <input type="text" placeholder="Details" value={detail} onChange={(e) => setdetail(e.target.value)} />
                                                                <div className=''>
                                                                    {
                                                                        val.pimg?.map((v,i)=>{
                                                                            return <img src={v} alt="ss1" className="mod_img img-fluid" />
                                                                        })
                                                                    }
                                                                </div>
                                                                
                                                                <input type="file" onChange={(e) => {
                                                                    seteditpic((old) => {
                                                                        return [...old, e.target.files[0]]
                                                                    })

                                                                }} />
                                                            </div>
                                                            <div class="modal-footer">
                                                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                                <button type="button" class="btn btn-primary" onClick={() => change(val)} data-bs-dismiss="modal">Save changes</button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>



                                            </>
                                        })
                                    }

                                    <div class="modal fade" id={`exampleModal`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                                        <div class="modal-dialog">
                                            <div class="modal-content">
                                                <div class="modal-header">
                                                    {/* <h5 class="modal-title" id="exampleModalLabel">Modal title</h5> */}
                                                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                                                </div>
                                                <div class="modal-body">
                                                    <ProductForm />




                                                </div>
                                                {/* <div class="modal-footer">
                                                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                                            <button type="button" class="btn btn-primary"  data-bs-dismiss="modal">Save changes</button>
                                                        </div> */}
                                            </div>
                                        </div>
                                    </div>

                                </tbody>
                            </table>



                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Addproduct
