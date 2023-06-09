import React from 'react'
import Sidepage from './sidepage'
import VerticalTabs from './sidepage'
import DraggableMarker from '../../maps/googlemap'
import CollapsibleTable from './dataTableDetail'
import DeliverHistoryTable from './DeliverHistoryTable'
import ChartComponent from './chartComponent'
import { useEffect } from 'react'
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { Navigate, useNavigate } from 'react-router-dom'

export default function Dashboard() {
  //solda 4 tane page route + 
  //chart, +trafik, geçmiş veriler,+ bildirimin gösterilmesi sağ üstte+
  //login, yeni admin eklem++
  //admin page de haritaların anlık olarak görüntülenmesi ++
  //daha sonra eklenecek modüllerin takiblinin yapılması 
  //modüllerin eklenmesi+ ve publish edilmesi azure veya başka bir ortamda kısa süreli olarak+
  // 7 haftada bunları yapmam lazım
  return (
    <><div style={{
      paddingTop: 75,
      width: '20%',
      height: '100%',
      backgroundColor: 'gray',
    }}>
    
    </div>
      <div style={{
        paddingTop: 75,
        width: '40%',
        height:'60%',
        backgroundColor: 'darkgrey',
      }}>
        <DraggableMarker height='100%' width='100%'/>
        <DeliverHistoryTable/>
      </div>
      <div style={{
        paddingTop: 75,
        width: '40%',
        height:'60%',
        justifyContent:'right',
        backgroundColor: 'darkgrey',
      }}>
        <CollapsibleTable/>
        <ChartComponent/>
      </div>
    </>
  )
}
