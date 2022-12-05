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
import { withStyles } from '@material-ui/styles';


const CustomColor = withStyles({
    root: {
      background: "-webkit-linear-gradient(180deg, #426DEC 0%, #86C991 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent"
    }
})(Typography);

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

    const [dataSend, setDataSend] = useState([]);
    const [dataReceive, setDataReceive] = useState([]);
    useEffect(() => {
        axios.get("http://localhost:5000/api/get/bienbangui")
        .then((response)=>{
            setDataSend(response.data);
        })
    })
    useEffect(() => {
        axios.get("http://localhost:5000/api/get/bienbannhan")
        .then((response)=>{
            setDataReceive(response.data);
        })
    })

    const columnsSend = [
        { field: 'BBGID', headerName: 'Mã biên bản', width: 100 },
        { field: 'NGAY_GUI', headerName: 'Ngày gửi', width: 200 },
        { field: 'PHI_NOI_THANH', headerName: 'Phí nội thành', width: 200 },
        { field: 'MA_CUOC_XE',headerName: 'Mã cuốc xe', width: 100, height: 500},
        { field: 'MA_NGUOI_GUI',headerName: 'Mã người gửi', width: 150, height: 500},
    ];
    const columnsReceive = [
        { field: 'BBNID', headerName: 'Mã biên bản', width: 100 },
        { field: 'NGAY_NHAN', headerName: 'Ngày nhận', width: 200 },
        { field: 'PHI_NOI_THANH', headerName: 'Phí nội thành', width: 200 },
        { field: 'MA_CUOC_XE',headerName: 'Mã cuốc xe', width: 100, height: 500},
        { field: 'MA_NGUOI_NHAN',headerName: 'Mã người nhận', width: 150, height: 500},
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
                    setInput({
                        ...input,
                        MA_KH: "",
                        NAM:""
                    });
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
                    <Grid item xs={16} md={16} lg={16}>
                        <CustomColor><Typography><strong>BIÊN BẢN GỬI</strong></Typography></CustomColor>
                        <div style={{ height: 500, width: '65%', margin: 'auto' }}>
                            <DataGrid
                                rows={dataSend}
                                columns={columnsSend}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                //checkboxSelection
                                getRowId={row => row.BBGID}
                                rowHeight={50}
                                components={{ Toolbar: GridToolbar }}
                            />
                        </div>
                    </Grid>
                    <Grid item xs={16} md={16} lg={16}>
                        <CustomColor><Typography><strong>BIÊN BẢN NHẬN</strong></Typography></CustomColor>
                        <div style={{ height: 500, width: '65%', margin: 'auto' }}>
                            <DataGrid
                                rows={dataReceive}
                                columns={columnsReceive}
                                pageSize={5}
                                rowsPerPageOptions={[5]}
                                //checkboxSelection
                                getRowId={row => row.BBNID}
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