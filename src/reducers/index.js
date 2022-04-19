import {combineReducers} from 'redux';
import product from './product'
// import edit from './editproduct'
import acart from './Acart'
// import top from './top'
// import refresh from './refresh'
import addcat from './addcat'
import normal from './normal'
import cart from './cart'
import orderlist from './orderlist'
import pincode from './pincode';
export default combineReducers({
    product,
    acart,
    normal,
    addcat,
    cart,
    orderlist,
    pincode

})