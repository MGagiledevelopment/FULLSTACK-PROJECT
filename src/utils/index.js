export const timeStamp =  (date)=>{
    return date.toLocaleString('en-GB',{
        day: 'numeric',
        month: 'short'
    })
}



