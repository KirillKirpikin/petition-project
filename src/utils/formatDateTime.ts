export const formatDateTime = (inputDateTime: Date) => {
    const date = new Date(inputDateTime);
  
   
    // const hours = date.getHours();
    // const minutes = date.getMinutes();  
   
    const day = date.getDate();
    const month = date.getMonth() + 1; // Месяцы в JavaScript начинаются с 0
  
    
    // const formattedTime = `${hours < 10 ? '0' : ''}${hours}:${minutes < 10 ? '0' : ''}${minutes}`;
  
    
    const formattedDate = `${day < 10 ? '0' : ''}${day}.${month < 10 ? '0' : ''}${month}.${date.getFullYear().toString().substr(-2)}`;
  
    
    return `${formattedDate}`;
}