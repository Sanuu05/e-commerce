import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useDispatch } from 'react-redux'
import { delProduct, editProduct, getoneProduct } from '../../action/product'
import { AiFillEdit, AiFillDelete } from "react-icons/ai";
function Spost({ val, index }) {
    const dispatch = useDispatch()

    const [editname, seteditname] = useState()
    const [editprice, seteditprice] = useState()
    const [editpic, seteditpic] = useState([])
    const [editpicd, seteditpicd] = useState([])
    const [stock, setstock] = useState()
    const [type, settype] = useState()
    const [detail, setdetail] = useState()
    const [discount, setdiscount] = useState()
    const cath = useSelector((state) => state.acart.category)
    const editone = () => {
        seteditname(val.name)
        seteditprice(val.price)
        setstock(val.stock)
        settype(val.type)
        setdetail(val.detail)
        setdiscount(val?.discount)
    }
    console.log('dd',editpic)
    const change = () => {

        if (editpic && editname && editname) {
            {
                editpic.map((v, i) => {
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
                            seteditpicd((old)=>{
                                return [...old,data.url]
                            })
                            // dispatch(editProduct(val._id, { name: editname, price: editprice, pimg: data.url, type: type, stock: stock, detail: detail, type: type }))


                        }).catch(err => console.log(err))
                })

            }
        } else {
            dispatch(editProduct(val._id, { name: editname, price: editprice, stock: stock, detail: detail, type: type }))
        }
    }

    return (
        <>
            <tr className="mt-2">
                {/* <td>{index + 1}</td> */}
                <td>{val.name}</td>
                <td>₹{val.price}</td>
                <td><img src={val.pimg} className="pdtimgg img-fluid" /></td>
                <td><AiFillEdit className="editicon" onClick={editone} data-bs-toggle="modal" data-bs-target={`#exampleModal${index}`} />/<AiFillDelete className="editicon" onClick={() => dispatch(delProduct(val._id))} /></td>

            </tr>
            <div class="modal fade" id={`exampleModal${index}`} tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog">
                    <div class="modal-content">
                        <div class="modal-header">
                            <h5 class="modal-title" id="exampleModalLabel">Modal titlenew</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            <input type="text" placeholder="name" value={editname} onChange={(e) => seteditname(e.target.value)} />
                            <input type="number" placeholder="Price" value={editprice} onChange={(e) => seteditprice(e.target.value)} />
                            <input type="Number" placeholder="Discount" value={discount} onChange={(e) => setdiscount(e.target.value)} />
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

                            <img src={val.pimg} alt="ss" className="mod_img img-fluid" />
                            <input type="file" onChange={(e) => {
                                seteditpic((old) => {
                                    return [...old, e.target.files[0]]
                                })

                            }} />
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                            <button type="button" class="btn btn-primary" onClick={change} data-bs-dismiss="modal">Save changes</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Spost
