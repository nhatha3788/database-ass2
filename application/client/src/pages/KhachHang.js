import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import SearchOutlinedIcon from '@mui/icons-material/SearchOutlined';


const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
      padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
      padding: theme.spacing(1),
    },
}));
function BootstrapDialogTitle(props) {
    const { children, onClose, ...other } = props;
    return (
      <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
        {children}
        {onClose ? (
          <IconButton
            aria-label="close"
            onClick={onClose}
            sx={{
              position: 'absolute',
              right: 8,
              top: 8,
              color: (theme) => theme.palette.grey[500],
            }}
          >
            <CloseIcon />
          </IconButton>
        ) : null}
      </DialogTitle>
    );
  }
  
BootstrapDialogTitle.propTypes = {
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};



export default function KhachHang (){
    const [open, setOpen] = React.useState(false);
    const [openResult, setOpenResult] = React.useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpenResult = () => {
        setOpenResult(true);
    };
    const handleCloseResult = () => {
        setOpenResult(false);
    };

    const [data, setData] = useState([]);
    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/get/khachhang");
        setData(response.data);
    }

    useEffect(() => {
        loadData();
    },[])

    const columns = [
        { field: 'MA_KH', headerName: 'Mã khách hàng', width: 100 },
        { field: 'SSN', headerName: 'SSN', width: 150 },
        { field: 'TEN', headerName: 'Họ và tên', width: 200 },
        { field: 'EMAIL',headerName: 'Email', width: 300, height: 500},
    ];
    
    const [input, setInput] = useState({
        MA_KH: "",
        NAM:""
    });
    const [res, setRes] = useState([]);
    const handleChange = ({ currentTarget: target }) => {
        setInput({ ...input, [target.name]: target.value });
    };
    const handleSubmit = async (e) => {
        //e.preventDefault();
        if(!input.MA_KH || !input.NAM){
            toast.error("Please provide value into each input field");
        }
        else {
            const sendData = {
                MA_KH: input.MA_KH,
                NAM: input.NAM
            };
            axios.post(`http://localhost:5000/api/post/timkhachhang`, {MA_KH: sendData.MA_KH})
            .then((result) => {
                console.log(result.data[0]);
                if(result.data.length === 0){
                    toast.error("Customer ID not exist");
                }
                else {
                    axios.post(`http://localhost:5000/api/post/doanhthu`, sendData)
                    .then((result) => {
                        console.log(sendData);
                        console.log(result);
                        setRes(result.data[0]);
                        console.log(res);
                        //alert("Sucess");
                        handleClose(); 
                        handleOpenResult(); 
                    })
                    .catch((error) => {
                        console.log(error.response);
                        alert("Invalid");
                    });
                    // setInput({
                    //     ...input,
                    //     MA_KH: "",
                    //     NAM:""
                    // });
                }
            })
        }
    };

    return(
        <div >
            <Box sx={{ flexGrow: 1 }} >
                <Grid 
                    container
                    spacing={5} 
                    columns={16}  
                    justifyContent="left"
                    flexDirection={{ xs: "column", sm: "row" }}
                    columnSpacing={3}
                >
                    <Grid item xs={12.9} md={12.9} lg={12.9}>
                        <Button variant="outlined" onClick={handleClickOpen} style={{float: 'right'}} >
                        <SearchOutlinedIcon></SearchOutlinedIcon> Doanh thu theo khách hàng
                        </Button>
                    </Grid>
                    <Grid item xs={16} md={16} lg={16}>
                        <BootstrapDialog
                            onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={open}
                        >
                            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                            Doanh thu theo khách hàng
                            </BootstrapDialogTitle>
                            <DialogContent dividers>
                                <Box
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { m: 1, width: '20ch' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                    >
                                        <TextField id="outlined-basic" label="Mã khách hàng" variant="outlined" InputLabelProps={{shrink: true}} name="MA_KH" value={input.MA_KH}
                                                onChange={handleChange} required/>
                                        <TextField id="outlined-basic" label="Năm" variant="outlined" type="number" InputLabelProps={{shrink: true}} InputProps={{ inputProps: { min: "2000", max: "2022", step: "1" } }} name="NAM" value={input.NAM}
                                                onChange={handleChange} required/>
                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={()=>{handleSubmit()}}>
                                    Tra cứu
                                </Button>
                            </DialogActions>
                        </BootstrapDialog>

                        <BootstrapDialog
                            onClose={handleCloseResult}
                            aria-labelledby="customized-dialog-title"
                            open={openResult}
                        >
                            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseResult}>
                            Doanh thu theo khách hàng
                            </BootstrapDialogTitle>
                            <DialogContent dividers>
                                <Box
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { m: 1, width: '50ch' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                    >
                                        <Typography>Doanh thu của khách hàng {input.MA_KH} trong năm {input.NAM}: {res[0] && res[0].RESULT}</Typography>
                                </Box>
                            </DialogContent>
                        </BootstrapDialog>

                        <div style={{ height: 500, width: '61%', margin: 'auto' }}>
                            <DataGrid
                                rows={data}
                                columns={columns}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                //checkboxSelection
                                getRowId={row => row.MA_KH}
                                rowHeight={50}
                                components={{ Toolbar: GridToolbar }}
                            />
                        </div>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );
}