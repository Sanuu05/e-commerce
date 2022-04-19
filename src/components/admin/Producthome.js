import React,{ useEffect, useState }  from 'react'
import AdminNavbar from './AdminNavbar'
import ProductForm from './ProductForm'
import ProductPost from './ProductPost'
import { useDispatch } from 'react-redux'
import { delProduct, editProduct, getoneProduct,getProduct } from '../../action/product'
import Spost from './Spost'
import Pusher from 'pusher-js'
function Producthome() {
    const [resdata, setresdata]= useState()
    const [del, setdel]= useState()
    const [edit, setitem] = useState()
    const dispatch = useDispatch()
    useEffect(() => {
        const pusher = new Pusher('30b83b9b426488afe28c', {
            cluster: 'ap2'
        });

        const channel = pusher.subscribe('pdtinsert');
        channel.bind('insert', function (data) {
        
            setresdata(JSON.stringify(data));
        });
        const channels = pusher.subscribe('pdtdelete');
        channels.bind('delete', function (data) {
            setdel(JSON.stringify(data));
        });
        const channel1 = pusher.subscribe('pdtupdate');
        channel1.bind('update', function (data) {
            // alert(JSON.stringify(data));
            setitem(JSON.stringify(data));
        });
        
    })
    
    useEffect(() => {
        dispatch(getProduct())
    }, [resdata,del,edit,dispatch])
    return (
        <div className="pdthome container">
           <AdminNavbar/> 
           <div className="row">
                    <div className="col-md-8 col-12 order-md-0 order-1">
                        <ProductPost />
                    </div>
                    <div className="col-md-4 col-12 order-md-1 order-0">
                        <ProductForm />
                    </div>
                </div>
        </div>
    )
}

export default Producthome
