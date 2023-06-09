import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Button, Checkbox, FormControl, FormControlLabel, InputLabel, MenuItem, Select } from "@mui/material";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import FormApp from "../forms/formapi";
import CapacityForm from "../forms/capacityForm";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { useNavigate } from "react-router-dom"
import {REACT_APP_WEB_API} from '@env'
import {REACT_APP_LOCAL_API} from '@env'
const renderDeleteButton = (params) => {
  return (
    <strong>
      <Button
        variant="contained"
        color="primary"
        size="small"
        style={{ marginLeft: 16 }}
        onClick={async () => {
          await fetch("https://localhost:44347/atm/delete/" + params.row.id, {
            method: "POST",
          }).finally(() => {
            window.location.href = "/table";
          });
        }}
      >
        Delete
      </Button>
    </strong>
  );
};
const renderDetailButton = (params) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <Box>
      <Button
        variant="contained"
        color="success"
        size="small"
        style={{ marginLeft: 16 }}
        onClick={handleOpen}
      >
        Detail
      </Button>
      <Modal
        sx={{ mt: 1, borderRadius: "50%", border: 0 }}
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            update
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <CapacityForm capacity={params.row.capacity} />
          </Typography>
        </Box>
      </Modal>
    </Box>
  );
};
const columns = [
  { field: "id", headerName: "id", width: 70 },
  { field: "paraYatırma", headerName: "PY", width: 100 },
  { field: "paraÇekme", headerName: "PÇ", width: 100 },
  { field: "longitude", headerName: "Long", width: 100 },
  { field: "latitude", headerName: "Lat", width: 100 },
  { field: "tl", headerName: "TL", width: 100 },
  { field: "status", headerName: "Status", width: 100 },
  {
    field: "detailButton",
    headerName: "DetailCapacity",
    width: 150,
    renderCell: renderDetailButton,
    disableClickEventBubbling: true,
  },
  {
    field: "DeleteButton",
    headerName: "Delete",
    width: 150,
    renderCell: renderDeleteButton,
    disableClickEventBubbling: true,
  },
];

let rows1 = [];
async function useForceUpdate() {
  const [value, setValue] = React.useState([]);
  if (rows1.length == 0) {
    await fetch(REACT_APP_WEB_API+"atm")
      .then((res) => res.json())
      .then((text) => {
        rows1 = text;
        return text;
      });
  }
}

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
const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});
const url ="https://stajprojewebapi.azurewebsites.net/";
export default function DataTable() {
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [sortModel, setSortModel] = React.useState([
    {
      field: "status",
      sort: "desc",
    },
  ]);
  const [value, setValue] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  React.useEffect(() => {
    if (value.length < 1) {
      fetch(REACT_APP_WEB_API+'atm')
        .then((res) => res.json())
        .then((text) => {
          setValue(text);
        });
    }
    //eslint-disable-next-line react-hook/exhaustive-deps
  }, []);
  function handleClick() {
    setLoading(!loading);
  }
  return (
    <div style={{ height: 600, width: "65%", paddingTop: 75, paddingLeft: 15 }}>
      {AddButton(handleOpen, open, handleClose)}
      {dataGridFunction(loading, handleClick, value, sortModel)}
    </div>
  );
}
function dataGridFunction(loading, handleClick, value, sortModel) {
  return <Box
    sx={styleBox}
  >
    {buttonsFunction(loading, handleClick)}
    <DataGrid
      loading={value.length > 0 ? false : true}
      rows={value}
      sortModel={sortModel}
      columns={columns}
      pageSize={5}
      pagination={true}
      rowsPerPageOptions={[5, 10, 15]}
      //pageSizeOptions={[5, 10, 15, 100]}
      autoPageSize={true}
      getRowClassName={(params) => params.row.status == true ? "blue" : "red"} />
  </Box>;
}

function buttonsFunction(loading, handleClick) {
  const [state, setState] = React.useState({
    traffic: false,
    routeType: "fastest",
  });
  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const[message,setMessage]=React.useState("");
  const handleChangeInput = (event) => {
    setState({ routeType: event.target.value, traffic: state.traffic });
  };
  const navigate = useNavigate();
  return <div >
    <Button
      endIcon={<LocalAtmIcon />}
      variant="contained"
      color="warning"
      disabled={loading}
      onClick={async () => {
        handleClick();
        setMessage("para çekim işlemi yapılıyor.")
        await fetch(REACT_APP_WEB_API+"simulate", {
          method: "POSt",
        }).finally(() => {
         window.location.href = "/table";
        });
       
      }}
    >
      <span>para çekme</span>
    </Button>
    <Snackbar open={loading} autoHideDuration={3000}>
      <Alert severity="success" sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
    <Button
    style={{margin:15}}
      endIcon={<LocalShippingIcon />}
      variant="contained"
      color="info"
      onClick={handleOpen}
    >
      rota oluştur
    </Button>
    <Button
    style={{margin:15}}
      variant="contained"
      color="info"
      onClick={async ()=>{
        await fetch(REACT_APP_WEB_API+"excel", {
          method: "POSt",
        }).finally(() => {
          alert("dosya gönderildi");
        });
      }}
    >
       excel 
    </Button>
    <Modal open={open} onClose={handleClose}>
      <Box sx={style}>
        <FormControlLabel
          label="traffic"
          control={
            <Checkbox
              checked={state.traffic}
              onChange={handleChange}
              name="traffic"
              inputProps={{ "aria-label": "controlled" }}
            />
          }
        />
        <FormControl >
          <InputLabel id="demo-simple-select-label">routeType</InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={state.routeType}
            label="routeType"
            onChange={handleChangeInput}>
            <MenuItem value={"fastest"}>fastest</MenuItem>
            <MenuItem value={"eco"}>eco</MenuItem>
            <MenuItem value={"shortest"}>shortest</MenuItem>
          </Select>
        </FormControl>
        <Button onClick={() => {
          console.log(state.routeType + " " + state.traffic);
          navigate('/tomtom', {
            replace: true,
            state: { traffic: state.traffic, routeType: state.routeType }
          },)
        }}>oluştur</Button>
      </Box>
    </Modal>
  </div>;

}

function AddButton(handleOpen, open, handleClose) {

  return (
    <>
      <Button variant="contained" color="secondary" onClick={handleOpen}>
        Ekle
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            title
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            <FormApp />
          </Typography>

        </Box>
      </Modal>
    </>
  );
}
