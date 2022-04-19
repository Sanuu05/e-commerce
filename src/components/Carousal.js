import React from 'react'
import img1 from './images/photo1.jpg'
import img2 from './images/photo2.png'
import img3 from './images/photo2.jpeg'
import img4 from './images/c1.png'
import img5 from './images/c2.png'
import img6 from './images/c3.png'
function Carousal() {
    const imgs = [img1, img2, img3]
    return (
        <div className="home ">
            {/* <div className="homepageds row">
                <div className="col-md-6 offset-md-3 col-12 offset-0">
                <h1>jskajs ajsas</h1>
                </div>
                <div className="col-md-6 offset-md-3 col-12 offset-0">
                <h1>jskajs ajsas</h1>
                </div>
                
            </div> */}
            <div id="carouselExampleSlidesOnly" class="carousel slide carousel-fade" data-bs-ride="carousel">
                <div class="carousel-inner">
                    {/* <div className="homepaged row m-0">
                        <div className="col-md-6  col-12  head_off">
                            <p className="mx-5">Best Prices</p>
                            <h1 className="mx-5">
                                

                                Incredible Prices<br/> on All Your <br/> Favorite Items</h1>
                                <div className="home_btn mx-5">
                                <button>Show NOW</button>

                                </div>
                               
                        </div>
                        <div className="col-md-6  col-12  head_off d-none d-md-block">
                         
                        </div>

                    </div> */}


                    <div class="carousel-item active">
                        <img src={img4} class="carimg" alt="..." />
                    </div>
                    <div class="carousel-item">
                        <img src={img5} class="carimg" alt="..." />
                    </div>
                    <div class="carousel-item">
                    <img src={img6} class="carimg" alt="..." />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Carousal
