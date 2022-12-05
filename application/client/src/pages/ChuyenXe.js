import React, {useState, useEffect} from "react";
import {Link, useNavigate} from "react-router-dom";
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
import Icon from '@mui/material/Icon';
import { withStyles } from '@material-ui/styles';
import AddCircleOutlineOutlinedIcon from '@mui/icons-material/AddCircleOutlineOutlined';



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

const CustomColor = withStyles({
    root: {
      background: "-webkit-linear-gradient(180deg, #426DEC 0%, #86C991 100%)",
      WebkitBackgroundClip: "text",
      WebkitTextFillColor: "transparent"
    }
})(Typography);

export default function ChuyenXe (){
    const navigate = useNavigate();
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

    const [dataInterTrip, setDataInterTrip] = useState([]);
    const [dataLocalTrip, setDataLocalTrip] = useState([]);
    const [dataTransport, setDataTransport] = useState([]);
    // const loadData = async () => {
    //     const response = await axios.get("http://localhost:5000/api/get/chuyenxelientinh");
    //     setDataInterTrip(response.data);
    //     console.log(response.data);
    // };
    useEffect(() => {
        axios.get("http://localhost:5000/api/get/chuyenxelientinh")
        .then ((response) => {
        setDataInterTrip(response.data);
        console.log(response.data);
        })
    },[])

    useEffect(() => {
        axios.get("http://localhost:5000/api/get/cuocxenoithanh")
        .then ((response) => {
        setDataLocalTrip(response.data);
        })
    },[]);

    useEffect(() => {
        axios.get("http://localhost:5000/api/get/cho")
        .then ((response) => {
            setDataTransport(response.data);
        })
    },[]);

    const columnsInterTrip = [
        { field: 'MA_CHUYEN', headerName: 'Mã khách hàng', width: 70 },
        { field: 'QUANG_DUONG', headerName: 'Quãng đường', width: 120 },
        { field: 'MA_XE', headerName: 'Mã xe', width: 80 },
        { field: 'MA_TAI_XE',headerName: 'Mã tài xế', width: 100, height: 500},
        { field: 'MA_LO_XE', headerName: 'Mã lơ xe', width: 100 },
        { field: 'MA_KHO_DI', headerName: 'Mã kho đi', width: 100 },
        { field: 'NGAY_XUAT_KHO', headerName: 'Ngày xuất kho', width: 200 },
        { field: 'MA_NGUOI_XUAT', headerName: 'Mã người xuất', width: 100 },
        { field: 'MA_KHO_DEN', headerName: 'Mã kho đến', width: 100},
        { field: 'NGAY_NHAP_KHO', headerName: 'Ngày nhập kho', width: 200 },
        { field: 'MA_NGUOI_NHAP', headerName: 'Mã người nhập', width: 100 },
        { field: 'SO_KIEN_HANG', headerName: 'Số kiện hàng', width: 100 },
        { field: 'KHOI_LUONG_HIEN_TAI', headerName: 'Khối lượng hiện tại', width: 100 },
    ];
    const columnsLocalTrip = [
        { field: 'MA_CHUYEN', headerName: 'Mã chuyến xe', width: 100 },
        { field: 'MA_KHO', headerName: 'Mã kho', width: 80 },
        { field: 'MA_XE', headerName: 'Mã xe', width: 80 },
        { field: 'MA_TAI_XE',headerName: 'Mã tài xế', width: 80, height: 500},
        { field: 'MA_LO_XE', headerName: 'Mã lơ xe', width: 80 },
        { field: 'TRONG_LUONG_HIEN_TAI', headerName: 'Trọng lượng hiện tại', width: 150 },
    ];
    const columnsTransport = [
        { field: 'MA_KIEN_HANG', headerName: 'Mã kiện hàng', width: 150 },
        { field: 'MA_CHUYEN_XE', headerName: 'Mã chuyến xe', width: 150 },
    ];
    
    
    const [input, setInput] = useState({
        MA_KIEN_HANG: "",
        MA_CHUYEN_XE: ""
    });
    const [res, setRes] = useState([]);
    const handleChange = ({ currentTarget: target }) => {
        setInput({ ...input, [target.name]: target.value });
    };
    const handleSubmit = async (e) => {
        //e.preventDefault();
        if(!input.MA_KIEN_HANG|| !input.MA_CHUYEN_XE){
            toast.error("Please provide value into each input field");
        }
        else {
            const sendData = {
                MA_KIEN_HANG: input.MA_KIEN_HANG,
                MA_CHUYEN_XE: input.MA_CHUYEN_XE
            };
            //console.log(sendData);
            axios.post(`http://localhost:5000/api/insert`, sendData)
            .then((res) => {
                console.log(res);
                toast.success("Insert successfully");
                handleClose(); 
                //handleOpenResult(); 
                <ChuyenXe></ChuyenXe>
                setInput({
                    ...input,
                    MA_KIEN_HANG: "",
                    MA_CHUYEN_XE: ""
                });
            })
            .catch((error) => {
                console.log(error.response);
                toast.error(error.response);
            });
            
        }
    };

    return(
        <div>
            <Box sx={{ flexGrow: 1 }} >
                <Grid 
                    container
                    spacing={2} 
                    columns={16}  
                    justifyContent="left"
                    flexDirection={{ xs: "column", sm: "row" }}
                    //columnSpacing={1}
                >
                    <Grid item xs={12.9} md={12.9} lg={15.2}>
                        <Button variant="outlined" onClick={handleClickOpen} style={{float: 'right'}} >
                        <AddCircleOutlineOutlinedIcon/> Thêm kiện hàng, chuyến xe
                        </Button>
                    </Grid>
                    <Grid item xs={16} md={16} lg={16}>
                        <BootstrapDialog
                            onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={open}
                        >
                            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose}>
                            Thêm kiện hàng, chuyến xe
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
                                        <TextField id="outlined-basic" label="Mã kiện hàng" variant="outlined" InputLabelProps={{shrink: true}} type ="number" name="MA_KIEN_HANG" value={input.MA_KIEN_HANG}
                                                onChange={handleChange} required/>
                                        <TextField id="outlined-basic" label="Mã chuyến xe" variant="outlined" InputLabelProps={{shrink: true}} type ="number" name="MA_CHUYEN_XE" value={input.MA_CHUYEN_XE}
                                                onChange={handleChange} required/>
                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={()=>{handleSubmit()}}>
                                    Save changes
                                </Button>
                            </DialogActions>
                        </BootstrapDialog>
                    </Grid>
                    <Grid item lg={16}>
                        <CustomColor><Typography><strong>CUỐC XE NỘI THÀNH</strong></Typography></CustomColor>
                    </Grid>
                    <Grid item lg={8}>
                    <div style={{ height: 500, width: '100%', marginLeft: '61px' }}>
                        <DataGrid
                            rows={dataLocalTrip}
                            columns={columnsLocalTrip}
                            //pageSize={5}
                            //rowsPerPageOptions={[5]}
                            //checkboxSelection
                            getRowId={row => row.MA_CHUYEN}
                            rowHeight={50}
                            components={{ Toolbar: GridToolbar }}
                        />
                    </div>
                    </Grid>
                    <Grid item xs={16} md={16} lg={6}>
                    <div style={{ height: 500, width: '100%', marginLeft: '100px' }}>
                        <DataGrid
                            rows={dataTransport}
                            columns={columnsTransport}
                            //pageSize={5}
                            //rowsPerPageOptions={[5]}
                            //checkboxSelection
                            getRowId={row => row.MA_KIEN_HANG}
                            rowHeight={50}
                            components={{ Toolbar: GridToolbar }}
                        />
                    </div>
                    </Grid>
                    <Grid item lg={16}>
                        <CustomColor><Typography><strong>CHUYẾN XE LIÊN TỈNH</strong></Typography></CustomColor>
                    </Grid> 
                    <Grid item xs={16} md={16} lg={16}>
                        <div style={{ height: 500, width: '90%', margin: 'auto' }}>
                            <DataGrid
                                rows={dataInterTrip}
                                columns={columnsInterTrip}
                                //pageSize={5}
                                //rowsPerPageOptions={[5]}
                                //checkboxSelection
                                getRowId={row => row.MA_CHUYEN}
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