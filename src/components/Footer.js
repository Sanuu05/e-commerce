import React from 'react'
import { NavLink } from 'react-router-dom'

function Footer() {
    return (
        <div className="footer">
            <div className="container-fluid">
                <div className="row">
                    <div className="col-md-3 col-12 footersub">
                        <h2>Store Location</h2>
                        <ol>
                            <li>1/A Railpark, Iswar Chatterjee Road, Sodpur, Kolkata, West Bengal 700110</li>

                        </ol>
                    </div>
                    <div className="col-md-3 col-12 footersub foot1">
                        <h2>Shop</h2>
                        <ol className="p-0 m-0">
                            <NavLink to="/category/all"> <li>All</li></NavLink>
                            <NavLink to="/category/camera">   <li>Camera</li></NavLink>
                            <NavLink to="/category/mobile">   <li>Mobile</li></NavLink>
                            <NavLink to="/category/drone"> <li>Drone</li></NavLink>
                            <NavLink to="/category/laptop">  <li>Laptop</li></NavLink>

                            <NavLink to="/category/audio">  <li>Audio</li></NavLink>
                            <NavLink to="/more/sale">  <li>Sale</li></NavLink>
                            <NavLink to="/more/deal">  <li>Deal Of Day</li></NavLink>
                           
                          
                         
                          
                            
                           
                            
                           
                           

                        </ol>
                    </div>
                    <div className="col-md-3 col-12 footersub foot1">
                        <h2>Customer Support</h2>
                        <ol className="p-0 m-0">
                            <li>Contact Us</li>
                            <li>Help Center</li>
                            <li>About Us</li>
                            

                        </ol>
                    </div>
                    <div className="col-md-3 col-12 footersub foot1">
                        <h2>Policy</h2>
                        <ol className="p-0 m-0">
                            <li>Shipping & Returns </li>
                            <li>Terms & Conditions</li>
                            <li>Payment Methods </li>
                            <li>FAQ</li>
                            
                           

                        </ol>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default Footer
