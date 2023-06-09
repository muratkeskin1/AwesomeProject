import { StyleSheet } from "react-native";
import FormAppUpdate from "./components/forms/updatadb";
import Button from "@mui/material/Button";
import Login from "./login";
import DataTable from "./components/datagrid/usertable";
import { BrowserRouter, Navigate, Route, Routes, useNavigate } from "react-router-dom";
import ResponsiveAppBar from "./components/appbar/appbar";
import { Toolbar } from "@mui/material";
import DraggableMarker from './components/maps/googlemap'
import MapTest from "./components/maps/routingtest";
import FileUpload from "./components/maps/fileUpload";
import MapTestTomTom from "./components/maps/tomtom";
import Dashboard from "./components/admin/Dashboard/dashboard";
import LoginPage from "./components/userActions/login";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useEffect, useState } from "react";
import LoadingScreen from "./components/userActions/loadingScreen";
import RegisterScreen from "./components/userActions/register";
import MainScreen from "./components/admin/Dashboard/sidepage";
import {REACT_APP_WEB_API} from '@env'
import {REACT_APP_LOCAL_API} from '@env'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJASe-uB1K2nEIdLjsEOylEpmaPxdRucY",
  authDomain: "atmroute.firebaseapp.com",
  projectId: "atmroute",
  storageBucket: "atmroute.appspot.com",
  messagingSenderId: "1095297508233",
  appId: "1:1095297508233:web:2d78991483ac747329f758",
  measurementId: "G-YZ1NNREHZ9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
function Log() {

  //google, yandex, mapbox, tomtom, grapphhopper,   
  //tablo çizdirme ve gösterme, karşılaştırma, sonuç kısmı, kullanılabilirlik
  //directions map routing karşılaştırma kapasiteleri ve fiyatları ile
  return (
    <div>
      <Button
        onClick={() => {
          alert("test");
        }}
        variant="contained"
      >
        buton
      </Button>
      <h2>log</h2>
    </div>
  );
}
function test(){
  return (
    <NavigationContainer>
      <Stack.Navigator>
        {isLoggedIn ? (
          <Stack.Screen
            name="Home"
            component={MapTest}
            options={{
              headerTitle: 'Home',
              headerRight: () => (
                <Button onPress={handleLogout} title="Logout" />
              ),
            }}
          />
        ) : (
          <Stack.Screen
            name="Login"
            component={LoginPage}
            options={{
              headerTitle: 'Login',
            }}
            initialParams={{ handleLogin }}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}
// <Route path="tomtom" element={<MapTestTomTom/>}/>    
export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogout = () => {
    setIsLoggedIn(false);
  };
  const ProtectedRoute = ({ component: Comp, loggedIn, path, ...rest }) => {
    return (
      <Route
        path={path}
        {...rest}
        render={(props) => {
          return loggedIn ? <Comp {...props} /> : <Redirect to="/" />;
        }}
      />
    );
  };
 
 useEffect(()=>{
  (async () => {
    const auth =  getAuth();
    onAuthStateChanged(auth,(user)=>{
      if(user){
        console.log(user)
        setIsLoggedIn(true);
      }
      else{
        setIsLoggedIn(false)
      }
    })
})()
 }, [isLoggedIn]);
  console.log(isLoggedIn)
  console.log(REACT_APP_WEB_API)
  if(isLoggedIn){
    return (
      <BrowserRouter>
      <ResponsiveAppBar>
  <Toolbar>{/* */}</Toolbar>
  </ResponsiveAppBar>
        <Routes>
          <Route path="/" >
            <Route index element={<Login name="main" />} />
            <Route path="table"   Component={DataTable}/>
            <Route path="update" element={<FormAppUpdate />} />
            <Route path="*" element={<Login name="not exist" />} />
            <Route path="map" element={<DraggableMarker />}/>
            <Route path="maptest" element={<MapTest/>}/>
            <Route path="fileUpload" element={<FileUpload/>}/>
            <Route path="tomtom" Component={(props) =><MapTestTomTom {...props}/>}/>    
            <Route path="admin/dashboard" element={<Dashboard/>}/> 
            <Route path="/login" element={<LoginPage/>}/> 
            <Route path="/register" element={<RegisterScreen/>}/> 
            <Route path="/sidemenu" element={<MainScreen/>}/> 
          </Route>
        </Routes>
      </BrowserRouter>
    );}
    else{ return(  <BrowserRouter>
        <Routes>
          <Route path="/" >
            <Route index element={<Login name="main" />} />
            <Route path="*" element={<LoadingScreen />} />
            <Route path="/login" element={<LoginPage/>}/> 
          </Route>
        </Routes>
      </BrowserRouter>)}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    margin: 15,
  },
});
