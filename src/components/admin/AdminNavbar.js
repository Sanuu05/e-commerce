import React from 'react'
import {NavLink} from 'react-router-dom'
function AdminNavbar() {
    return (
        <div className="adminnav">
            <nav class="navbar shadow navbar-expand-lg navbar-light bg-light">
                <div class="container">
                    <NavLink class="navbar-brand" to="/admin">TechMart</NavLink>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse " id="navbarSupportedContent">
                        <ul class="navbar-nav ">
                            <li class="nav-item">
                                <NavLink class="nav-link active" aria-current="page"  to="/admin/addcath">Category</NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink class="nav-link active" aria-current="page" to="/admin/deal">Deal</NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink class="nav-link active" aria-current="page" to="/admin/order">Orders</NavLink>
                            </li>
                            <li class="nav-item">
                                <NavLink class="nav-link active" aria-current="page" to="/admin/addproduct">Add Products</NavLink>
                            </li>






                        </ul>

                    </div>
                </div>
            </nav>

        </div>
    )
}

export default AdminNavbar
