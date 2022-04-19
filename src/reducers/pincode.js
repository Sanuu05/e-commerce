export default (state =[], action)=>{
    switch(action.type){
        case "PINCODE":
            return action.payload
       
        default: return state    
    }
}