import { CircularProgress } from '@mui/material'
import React from 'react'

export default function LoadingScreen() {
  return (
    <div style={{display:"flex",
        height:"100%",
        width:"100%",
        justifyContent:"center",
        alignItems:"center"}}> <CircularProgress /></div>
   
  )
}
