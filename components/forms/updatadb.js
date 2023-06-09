import { Button } from "@mui/material";
import React, { Component } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import { TextInput } from "react-native";
import {REACT_APP_WEB_API} from '@env'
import {REACT_APP_LOCAL_API} from '@env'
function postformUpdate(id,name,age){
  const url ="https://stajprojewebapi.azurewebsites.net/";
    console.log(name);
    console.log(age);
    const data = { id:id,name: name,age:age };
    const formData = new FormData();
    formData.append('id',id);
    formData.append('name',name);
    formData.append('age',age);
    console.log(formData);
fetch(REACT_APP_WEB_API+"update", {
  method: "POST", 
  body:formData,
})
  .then((response) => response.json())
  .then((formData) => {
    console.log("Success:", formData);
  })
  .catch((error) => {
    console.error("Error:", error);
  }).finally(()=>{
    window.location.href="/table"
  });
}
//
const FormAppUpdate = () => {
    const [text, onChangeText] = React.useState('');
    const [number, onChangeNumber] = React.useState('');
    const [id, onChangeId] = React.useState('');
    return (
      <View  style={{paddingTop:75}}>
        <TextInput
          onChangeText={onChangeId}
          value={id}
          placeholder="id"
        />
        <TextInput
          onChangeText={onChangeText}
          value={text}
          placeholder="name"  
        />
        <TextInput
          onChangeText={onChangeNumber}
          value={number}
          placeholder="age"
          keyboardType="numeric"
        />
        <Button onClick={()=>postformUpdate(id,text,number)} variant="contained">buton</Button>
        </View>
    );
  };
  

  export default FormAppUpdate;