import React, { useEffect, useState } from 'react'
import Carousal from './components/Carousal'
import Navbar from './components/Navbar'
import Poffer from './components/Poffer'
import Dealsofday from './components/Dealsofday'
import Offertemp from './components/Offertemp'
import Offertemp1 from './components/Offertemp1'
import Shopcat from './components/Shopcat'
import { Switch, Route } from 'react-router-dom'
import More from './components/More'
import Productdetails from './components/Productdetails'
import Producthome from './components/admin/Producthome'
import Addcate from './components/admin/Addcate'
import Deal from './components/admin/Deal'
import Pusher from 'pusher-js'
import { useDispatch,useSelector } from 'react-redux'
import { getProduct } from './action/product'
import Sale from './components/Sale'
import Cathpdt from './components/Cathpdt'
import Signup from './components/admin/Adminlogin/Signup'
import Login from './components/admin/Adminlogin/Login'
import { loadNormalUser } from './action/user'
import ScrollToTop from './ScrollToTop'
import Cart from './components/Cart'
import Razopay from './components/Razopay'
import Contactus from './components/Contactus'
import Footer from './components/Footer'
import Order from './components/admin/Order'
import Feature from './components/Feature'
import Orderpage from './components/Orderpage'
import Addproduct from './components/admin/Addproduct'
import Dashboard from './components/admin/Dashboard'
function App() {
  const [resdata, setresdata] = useState()
  const [del, setdel] = useState()
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
  }, [resdata, del, edit, dispatch])
  
  const posta = useSelector((state) => state.acart.post)
  // const dispatch = useDispatch()
  useEffect(() => {
    dispatch(loadNormalUser())
  }, [dispatch, posta])
  return (
    <div className="App">
      
      <Switch>
        
        <Route exact path="/">
          <Navbar />
          <Carousal />
          <Poffer />
          <Dealsofday />
          <Offertemp />
          <Sale />
          <Offertemp1 />
          <Shopcat />
          {/* <Feature /> */}
          {/* <Contactus/> */}
          <Footer/>

        </Route>
        <Route path="/more/:moret">
          <Navbar />
          <More />
          <Footer/>
        
        </Route>
        <Route path="/details/:pdid">
          <Navbar />
          <Productdetails />
          <Footer/>
        </Route>
        {/* <Route exact path="/admin">
          <Producthome />
        </Route> */}
        <Route exact path="/admin/addcath">
          <Addcate />
        </Route>
        <Route exact path="/admin/deal">
          <Deal />
        </Route>
        <Route exact path="/admin">
          <Dashboard />
        </Route>
        <Route exact path="/admin/addproduct">
          <Addproduct />
        </Route>
        <Route exact path="/admin/order">
          <Order />
        </Route>
        <Route path="/category/:cath">
          <Navbar />
          <Cathpdt />
          <Footer/>
        </Route>
        <Route path="/signup">
          <Navbar />
          <Signup />
          <Footer/>
        </Route>
        <Route path="/login">
          <Navbar />
          <Login />
          <Footer/>
        </Route>
        <Route path="/cart">
          <Navbar/>
          <Cart/>
          <Footer/>
        </Route>
        <Route path="/razo">
          <Navbar/>
          <Razopay/>
          <Footer/>
        </Route>
        <Route path="/myorder">
          <Navbar/>
          <Orderpage/>
          <Footer/>
        </Route>
      </Switch>




    </div>
  );
}

export default App;
