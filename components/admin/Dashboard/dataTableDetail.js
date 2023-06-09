import * as React from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import IconButton from '@mui/material/IconButton';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {REACT_APP_WEB_API} from '@env'
import {REACT_APP_LOCAL_API} from '@env'
function createData(
  name,
  calories,
  fat,
  carbs,
  protein,
  price,
) {
  return {
    name,
    calories,
    fat,
    carbs,
    protein,
    price,
    history: [
      {
        date: '2020-01-05',
        customerId: '11091700',
        amount: 3,
      },
      {
        date: '2020-01-02',
        customerId: 'Anonymous',
        amount: 1,
      },
    ],
  };
}

function Row(props) {
    console.log(props);
  const { row } = props.row;
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <TableRow sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell>
          <IconButton
            aria-label="expand row"
            size="small"
            onClick={() => setOpen(!open)}
          >
            {open ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
          </IconButton>
        </TableCell>
        <TableCell align="left" component="th" scope="row">
          {props.row.atmId}
        </TableCell>
        <TableCell align="left">{props.row.status.toString()}</TableCell>
        <TableCell align="left">{props.row.tl.toString()}</TableCell>
      </TableRow>
      <TableRow>
        <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Box sx={{ margin: 1 }}>
              <Typography variant="h6" gutterBottom component="div">
                KapaciteDetail
              </Typography>
              <Table size="small" aria-label="purchases">
                <TableHead>
                  <TableRow>
                    <TableCell>mevcutBanknot10</TableCell>
                    <TableCell>mevcutBanknot20</TableCell>
                    <TableCell align="right">mevcutBanknot50</TableCell>
                    <TableCell align="right">mevcutBanknot100</TableCell>
                    <TableCell align="right">mevcutBanknot200</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                    <TableRow key={props.row.capacity.date}>
                      <TableCell component="th" scope="row">
                        {props.row.capacity.mevcutBanknot10}
                      </TableCell>
                      <TableCell>{props.row.capacity.mevcutBanknot20}</TableCell>
                      <TableCell align="right">{props.row.capacity.mevcutBanknot50}</TableCell>
                      <TableCell>{props.row.capacity.mevcutBanknot100}</TableCell>
                      <TableCell align="right">{props.row.capacity.mevcutBanknot200}</TableCell>
                    </TableRow>
                </TableBody>
              </Table>
            </Box>
          </Collapse>
        </TableCell>
      </TableRow>
    </React.Fragment>
  );
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0, 3.99),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3, 4.99),
  createData('Eclair', 262, 16.0, 24, 6.0, 3.79),
  createData('Cupcake', 305, 3.7, 67, 4.3, 2.5),
  createData('Gingerbread', 356, 16.0, 49, 3.9, 1.5),
];
export default function CollapsibleTable() {
  const url ="https://stajprojewebapi.azurewebsites.net/atm";
    const [value, setValue] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    React.useEffect(() => {
      if (value.length < 1) {
        fetch(REACT_APP_WEB_API+"atm")
          .then((res) => res.json())
          .then((text) => {
            setValue(text);
          });
      }
      //eslint-disable-next-line react-hook/exhaustive-deps
    }, [value]);
    function handleClick() {
      setLoading(!loading);
    }
  return (
    <TableContainer styl component={Paper}>
      <Table  stickyHeader aria-label="sticky table" >
        <TableHead>
          <TableRow>
            <TableCell/>
            <TableCell align="right">atmId</TableCell>
            <TableCell align="right">status</TableCell>
            <TableCell align="right">tl</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {value.map((row) => (
            <Row key={row.atmId} row={row} />
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}