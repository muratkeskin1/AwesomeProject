import {REACT_APP_WEB_API} from '@env'
import {REACT_APP_LOCAL_API} from '@env'
export function postformatm(id,py,pc,ad,lat,long ) {
  const url ="https://stajprojewebapi.azurewebsites.net/";
    const formData = new FormData();
    formData.append("ATMId", id);
    formData.append("ParaYatırma", py);
    formData.append("ParaÇekme", pc);
    formData.append("USD", ad);
    formData.append("TL", !ad);
    formData.append("Euro", !ad);
    formData.append("Latitude", lat);
    formData.append("Longitude", long);
    console.log(formData);
    fetch(REACT_APP_WEB_API+"atm", {
      method: "POST",
      body: formData,
    })
      .then((response) =>  {
        alert("eklendi");
        window.location.href="/table" 
        response.json(); })
      .then((formData) => {
        console.log("Success:", formData);
      });
  }
  