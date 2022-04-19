import React, { useEffect, useState } from 'react'
import { postProduct } from '../../action/product'
import { useDispatch, useSelector } from 'react-redux'
import { getcategory } from './../../action/product'
import { AiFillEdit, AiFillDelete, AiOutlineEye } from "react-icons/ai";
function ProductForm() {
    const [name, setname] = useState("")
    const [price, setprice] = useState("")
    const [discount, setdiscount] = useState("")
    const [pic, setpic] = useState([])
    const [picdata, setpicdata] = useState([])
    const [pdetail, setpdetail] = useState("")
    const [stock, setstock] = useState("")
    const [type, settype] = useState("")
    const [hightext, sethightext] = useState()
    const [high, sethigh] = useState([])
    const [heading, setheading] = useState()
    const [dlist, setdlist] = useState([])
    const [alldlist, setalldlist] = useState([])
    const [st, setst] = useState({
        title: "", des: ''
    })
    console.log("dlist", pic)
    const dispatch = useDispatch()
    useEffect(() => {
        dispatch(getcategory())
    }, [])
    const cath = useSelector((state) => state.acart.category)
    const submit = () => {
        if (pic && price && name) {
            pic?.map((v,i)=>{
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
                        setpicdata((old)=>{
                            return [...old,data.url]
                        })
                       
                       
                    }).catch(err => console.log(err))
            })
            
        }
    }
    const remove = (e) => {
        const filter = high?.filter((p) => p !== e)
        sethigh(filter)
    }
    console.log('vc',{picdata,pic})
    
    useEffect(()=>{
        if(picdata?.length>0)
        if(picdata?.length===pic.length){
            alert('hello')
            dispatch(postProduct({ name: name, price: price, pimg: picdata, type: type, stock: stock, detail: pdetail,highlight:high,alldetail:alldlist,discount:discount }))

            setname("")
            setprice("")
            setpic([])
            setpicdata([])
        

        }

    },[picdata])
    console.log('mycath', cath)
    return (
        <div className="card ">
            <div className="card-header">
                <h4>Product Detail</h4>
            </div>
            <div className="card-body">
                <input type="text" placeholder="Product Name" onChange={(e) => setname(e.target.value)} />

                <textarea placeholder="Product details" onChange={(e) => setpdetail(e.target.value)} />

                <input type="Number" placeholder="Price" onChange={(e) => setprice(e.target.value)} />
                <input type="Number" placeholder="Discount (%)" onChange={(e) => setdiscount(e.target.value)} />

                <input type="Stock" placeholder="Stock" onChange={(e) => setstock(e.target.value)} />
                <select value={type} onChange={(e) => settype(e.target.value)} className="shadow" required>
                    <option value="">Select Category</option>
                    {cath ?
                        cath.map((val, id) => {
                            return (
                                <option key={id} value={val?.category}>{val?.category}</option>
                            )
                        }) : null
                    }


                </select>
               
                <div className='listdiv'>
                    <h2>Highlights</h2> 
                    <ul>
                        {
                            high?.map((v) => {
                                return <li>{v} <AiFillDelete onClick={() => remove(v)} /></li>
                            })
                        }
                    </ul>
                    <div className='forminp'>
                        <input type='text' value={hightext} placeholder='add' onChange={(e) => sethightext(e.target.value)} />
                        <button onClick={() => {
                            sethigh((old) => {
                                return [...old, hightext]
                            })
                            sethightext('')
                        }} >Add</button>
                    </div>


                </div>
                <div className='listdiv'>
                <div className='row'>
                {
                        alldlist?.map((v)=>{
                            return <>
                            <div className='col-12 mt-3'>
                            <h2>{v?.head}</h2>
                            </div>
                            
                            {
                                v?.list?.map((vv)=>{
                                    return <>
                                    <div className='col-4'>
                                        <p>{vv?.title} :</p>
                                    </div>
                                    <div className='col-8'>
                                        <p>{vv?.des}</p>
                                    </div>
                                </>

                                })
                            }
                            
                            
                            
                            </>
                        })
                    }
                    </div>
                    
                </div>
                <div className='alldetail'>
                    <input type='text' className='w-100' placeholder='Heading' onChange={(e) => setheading(e.target.value)} />
                    <div className='row'>
                        {
                            dlist.map((v) => {
                                return <>
                                    <div className='col-4'>
                                        <p>{v?.title} :</p>
                                    </div>
                                    <div className='col-8'>
                                        <p>{v?.des}</p>
                                    </div>
                                </>


                            })
                        }

                    </div>
                    <div className='inp'>
                        <input type='text' value={st.title} placeholder='Title' onChange={(e) => setst({ ...st, title: e.target.value })} />
                        <input type='text' value={st.des} placeholder='Description' onChange={(e) => setst({ ...st, des: e.target.value })} />
                        <button onClick={() => {
                            // setdlist({...dlist,list:st})
                            // setdlist({...dlist,list})
                            setdlist((old) => {
                                return [...old, st]
                            })
                            setst({
                                title: "", des: ''
                            })
                        }} >add</button>
                    </div>
                    


                </div>
                <button className='mt-2' onClick={()=>{
                    setalldlist((old)=>{
                        return [...old,{head:heading,list:dlist}]
                    })
                    setst({
                        title: "", des: ''
                    })
                    setdlist([])

                }}>Add List</button>

                <input type="file" onChange={(e) =>{
                    setpic((old)=>{
                        return [...old,e.target.files[0]]
                    })

                } }/>
                <button className=" btn btn-primary mt-2" onClick={submit} >Submit</button>
            </div>
        </div>
    )
}

export default ProductForm
