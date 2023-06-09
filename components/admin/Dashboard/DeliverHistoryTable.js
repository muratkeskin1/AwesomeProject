import { Box } from '@mui/system';
import { DataGrid } from '@mui/x-data-grid';
import React from 'react'
import {REACT_APP_WEB_API} from '@env'
import {REACT_APP_LOCAL_API} from '@env'
const columns = [
    { field: "id", headerName: "id", width: 70 },
    { field: "totalDistance", headerName: "totalDistance", width: 100 },
    { field: "totalTimeMinute", headerName: "totalTimeMinute", width: 100 },
    { field: "totalRoute", headerName: "totalRoute", width: 100 },
    { field: "date", headerName: "date", width: 150 },
  ];

const style = {
    mt: 1,
    borderRadius: "10%",
    border: 0,
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
  
    boxShadow: 24,
    p: 4,
  };
  const styleBox = {
    height: 600,
    width: "100%",
    "& .blue": {
      backgroundColor: "#75aee0",
      color: "#1a3e72",
    },
    "& .red": {
      backgroundColor: "#eb7c9c",
      color: "#1a3e72",
    },
  }
export default function DeliverHistoryTable() {
  const url ="https://stajprojewebapi.azurewebsites.net/deliverhistory";
  const [open, setOpen] = React.useState(false);
  const [value, setValue] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    if (value.length < 1) {
      fetch(REACT_APP_WEB_API+"deliverhistory")
        .then((res) => res.json())
        .then((text) => {
          setValue(text);
        });
    }
    //eslint-disable-next-line react-hook/exhaustive-deps
  }, [value]);
  return (
    <Box
    sx={styleBox}
  >
    <DataGrid
      loading={value.length > 0 ? false : true}
      rows={value}
      columns={columns}
      pageSize={5}
      pagination={true}
      rowsPerPageOptions={[5, 10, 15]}
      pageSizeOptions={[5, 10, 15, 100]}
      autoPageSize={true}/>
  </Box>
  );
}
