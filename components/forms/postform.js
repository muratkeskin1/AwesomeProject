
import {REACT_APP_WEB_API} from '@env'
import {REACT_APP_LOCAL_API} from '@env'
export function postform(name, age) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("age", age);
  console.log(formData);
  const url ="https://stajprojewebapi.azurewebsites.net/";
  fetch(REACT_APP_WEB_API+"user", {
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
