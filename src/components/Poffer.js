import React from 'react'
import { NavLink } from 'react-router-dom'
import img1 from './images/photo5.jpg'
import img2 from './images/photo6.jpg'
function Poffer() {
    return (
        <div className=" poffer py-5">
            <div className="row">
                <div className="col-md-6 col-12 poffer1 mb-2">
                    <div className="oimage">
                        <img src={img1} className="img-fluid" />
                    </div>
                    <div className="offdetail">
                        <p>Holiday Deals</p>
                        <h2>Up to 30% off</h2>
                        <h4>Selected Smartphone Brands </h4>
                        <NavLink to="/category/mobile">
                        <button>Shop</button>
                        </NavLink>
                    </div>

                </div>
                <div className="col-md-6 col-12 poffer1 mb-2">
                    <div className="oimage">
                        <img src={img2} className="img-fluid" />
                    </div>
                    <div className="offdetail">
                        <p>Holiday Deals</p>
                        <h2>Up to 30% off</h2>
                        <h4>Selected Smartphone Brands </h4>
                        <NavLink to="/category/audio">
                        <button>Shop</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Poffer
