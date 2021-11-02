export const timeStamp =  (date)=>{
const prueba = new Date( date * 1000 )
    return prueba.toLocaleString('en-GB',{
        day: 'numeric',
        month: 'short',
    }) 
}



