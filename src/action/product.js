import axios from 'axios'
const port = "https://devoecom.herokuapp.com"
// const port = "http://localhost:1988"

export const postProduct =(data)=> async(dispatch)=>{
    try {
        const product = await axios.post(`${port}/pdt/post`, data)
        // dispatch({type:"FETCH_PRODUCT" , payload:product})
    } catch (error) {
        console.log(error)
    }
}
export const getProduct =(data)=> async(dispatch)=>{
    try {
        const product = await axios.get(`${port}/pdt/get`)
        console.log("lol", product)
        dispatch({type:"FETCH_PRODUCT" , payload:product})
    } catch (error) {
        console.log(error)
    }
}
export const delProduct =(id)=> async(dispatch)=>{
    try {
        console.log(id)
        const product = await axios.delete(`${port}/pdt/delete/${id}`)
        // dispatch({type:"FETCH_PRODUCT" , payload:product})
    } catch (error) {
        console.log(error)
    }
}
export const getoneProduct =(id)=> async(dispatch)=>{
    try {
        const product = await axios.get(`https://cake-world.herokuapp.com/product/getitem/${id}`)
        dispatch({type:"EDIT_PRODUCT" , payload:product})
    } catch (error) {
        console.log(error)
    }
}
export const editProduct =(id,data)=> async(dispatch)=>{
    try {
        // console.log(id,data)
        const product = await axios.patch(`${port}/pdt/edit/${id}`,data)
        // dispatch({type:"EDIT_PRODUCT" , payload:product})
    } catch (error) {
        console.log(error)
    }
}
// query action 

export const dealofday =(id)=> async(dispatch)=>{
    try {
        // console.log("sss",id)
        const product = await axios.patch(`${port}/pdt/dealofday/${id}`)
        // dispatch({type:"EDIT_PRODUCT" , payload:product})
    } catch (error) {
        console.log(error)
    }
}
export const nodealofday =(id)=> async(dispatch)=>{
    try {
        // console.log("sss",id)
        const product = await axios.patch(`${port}/pdt/nodealofday/${id}`)
        // dispatch({type:"EDIT_PRODUCT" , payload:product})
    } catch (error) {
        console.log(error)
    }
}
export const sale =(id)=> async(dispatch)=>{
    try {
        // console.log("sss",id)
        const product = await axios.patch(`${port}/pdt/sale/${id}`)
        // dispatch({type:"EDIT_PRODUCT" , payload:product})
    } catch (error) {
        console.log(error)
    }
}
export const topf =(id)=> async(dispatch)=>{
    try {
        // console.log("sss",id)
        const product = await axios.patch(`${port}/pdt/topf/${id}`)
        // dispatch({type:"EDIT_PRODUCT" , payload:product})
    } catch (error) {
        console.log(error)
    }
}
export const nosale =(id)=> async(dispatch)=>{
    try {
        // console.log("sss",id)
        const product = await axios.patch(`${port}/pdt/nosale/${id}`)
        // dispatch({type:"EDIT_PRODUCT" , payload:product})
    } catch (error) {
        console.log(error)
    }
}
export const notopf =(id)=> async(dispatch)=>{
    try {
        // console.log("sss",id)
        const product = await axios.patch(`${port}/pdt/notopf/${id}`)
        // dispatch({type:"EDIT_PRODUCT" , payload:product})
    } catch (error) {
        console.log(error)
    }
}

export const postQuery =(data)=> async(dispatch)=>{
    try {
        const product = await axios.post("https://cake-world.herokuapp.com/query/post", data)
        // dispatch({type:"FETCH_PRODUCT" , payload:product})
    } catch (error) {
        console.log(error)
    }
}
export const getQuery =(data)=> async(dispatch)=>{
    try {
        const product = await axios.get("https://cake-world.herokuapp.com/query/get")
        dispatch({type:"FETCH_QUERY" , payload:product})
    } catch (error) {
        console.log(error)
    }
}
export const delQuery =(id)=> async(dispatch)=>{
    try {
        // console.log(id)
        const product = await axios.delete(`https://cake-world.herokuapp.com/query/delete/${id}`)
        // dispatch({type:"FETCH_PRODUCT" , payload:product})
    } catch (error) {
        console.log(error)
    }
}
export const postTop =(val)=> async(dispatch)=>{
    try {
        const product = await axios.post("https://cake-world.herokuapp.com/product/tproduct", val)
        dispatch({type:"POST_TOP" , payload:product})
    } catch (error) {
        console.log(error)
    }
}
export const getTop =(val)=> async(dispatch)=>{
    try {
        const product = await axios.get("https://cake-world.herokuapp.com/product/tproduct")
        dispatch({type:"FETCH_TOP" , payload:product})
    } catch (error) {
        console.log(error)
    }
}
export const delTop =(id)=> async(dispatch)=>{
    try {
        const product = await axios.delete(`https://cake-world.herokuapp.com/product/tproduct/${id}`)
        dispatch({type:"DEL_TOP" , payload:product})
    } catch (error) {
        console.log(error)
    }
}




export const addcategory = (dataa)=>async(dispatch) =>{
    try {
        // const token = localStorage.getItem('normaltoken')
        const { data } = await axios.post(`${port}/pdt/category`,dataa)
        dispatch({type:"ADDCATEGORY" , payload : data})
    } catch (error) {
        
    }
}
export const getcategory = ()=>async(dispatch) =>{
    try {
        // const token = localStorage.getItem('normaltoken')
        const { data } = await axios.get(`${port}/pdt/category`)
        console.log("hello from cath")
        dispatch({type:"CATEGORY" , payload : data})
    } catch (error) {
        
    }
}
export const delcategory = (id)=>async(dispatch) =>{
    try {
        // const token = localStorage.getItem('normaltoken')
        console.log(id)
        const { data } = await axios.delete(`${port}/pdt/category/${id}`)
        dispatch({type:"DELCATEGORY" , payload : data})
    } catch (error) {
        
    }
}


export const addpincode = (dataa)=>async(dispatch) =>{
    try {
        // const token = localStorage.getItem('normaltoken')
        console.log('ddd',dataa)
        const { data } = await axios.post(`${port}/pdt/pincode`,dataa)
        dispatch({type:"ADDCATEGORY" , payload : data})
    } catch (error) {
        
    }
}
export const getpincode = ()=>async(dispatch) =>{
    try {
        // const token = localStorage.getItem('normaltoken')
        const { data } = await axios.get(`${port}/pdt/pincode`)
        console.log("hello from cath")
        dispatch({type:"PINCODE" , payload : data})
    } catch (error) {
        
    }
}
export const delpincode = (id)=>async(dispatch) =>{
    try {
        // const token = localStorage.getItem('normaltoken')
        console.log(id)
        const { data } = await axios.delete(`${port}/pdt/pincode/${id}`)
        dispatch({type:"DELCATEGORY" , payload : data})
    } catch (error) {
        
    }
}