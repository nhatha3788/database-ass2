import React, {useState, useEffect} from "react";
import {Link} from "react-router-dom";
import {toast} from "react-toastify";
import axios from "axios";
import { DataGrid, GridToolbar } from '@mui/x-data-grid';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
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


export default function KienHang (){
    const [open, setOpen] = React.useState(false);
    const [openResult, setOpenResult] = React.useState(false);
    const [openPackage, setOpenPackage] = React.useState(false);
    const [openResultPackage, setOpenResultPackage] = React.useState(false);
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

    const handleClickOpenPackage = () => {
        setOpenPackage(true);
    };
    const handleClosePackage = () => {
        setOpenPackage(false);
    };
    const handleOpenResultPackage = () => {
        setOpenResultPackage(true);
    };
    const handleCloseResultPackage = () => {
        setOpenResultPackage(false);
    };

    const [data, setData] = useState([]);
    const loadData = async () => {
        const response = await axios.get("http://localhost:5000/api/get/kienhang");
        setData(response.data);
    }

    useEffect(() => {
        loadData();
    },[])

    const columns = [
        { field: 'ID', headerName: 'ID', width: 50 },
        { field: 'LOAI', headerName: 'Loại', width: 150 },
        { field: 'KHOI LUONG', headerName: 'Khối lượng', width: 100 },
        { field: 'NOI_DI',headerName: 'Nơi đi', width: 300, height: 500},
        { field: 'NOI_DEN',headerName: 'Nơi đến',width: 300},
        { field: 'PHI_LIEN_TINH',headerName: 'Phí liên tỉnh',width: 100},
        { field: 'MA_NGUOI_NHAN',headerName: 'Mã người nhận',width: 100},
        { field: 'MA_NGUOI_GUI',headerName: 'Mã người gửi',width: 100},
        { field: 'MA_BBN',headerName: 'Mã biên bản nhận',width: 100},
        { field: 'MA_BBG',headerName: 'Mã biên bản gửi',width: 100},
    ];
    
    const [input, setInput] = useState({
        NID: "",
        GID: "",
        NGAY_GUI: ""
    });
    const [res, setRes] = useState([]);
    const handleChange = ({ currentTarget: target }) => {
        setInput({ ...input, [target.name]: target.value });
    };
    const handleSubmit = async (e) => {
        //e.preventDefault();
        if(!input.GID || !input.NID || !input.NGAY_GUI){
            toast.error("Please provide value into each input field");
        }
        else{
            const sendData = {
                GID: input.GID,
                NID: input.NID,
                NGAY_GUI: input.NGAY_GUI
            };
            axios.post(`http://localhost:5000/api/post/timkhachhang`, {MA_KH: sendData.GID})
            .then((result) => {
                if(result.data.length === 0){
                    toast.error("Sender ID not exist");
                }
                else {
                    axios.post(`http://localhost:5000/api/post/timkhachhang`, {MA_KH: sendData.NID})
                    .then((result) => {
                        if(result.data.length === 0){
                            toast.error("Receiver ID not exist");
                        }
                        else {
                            axios.post(`http://localhost:5000/api/post/ngaynhan`, sendData)
                            .then((result) => {
                                console.log(sendData);
                                console.log(result);
                                console.log(result.data[0]);
                                setRes(result.data[0]);
                                console.log(res);
                                //alert("Sucess");
                                handleClose();
                                handleOpenResult();
                            })
                            .catch((error) => {
                                console.log(error.response);
                            });
                            setInput({
                                ...input,
                                NID: "",
                                GID: "",
                                NGAY_GUI: ""
                            });
                        }
                    })
                }
            })
        }
    };

    const [customerId, setCustomerId] = useState(0);
    const [numPackage, setNumPackage] = useState(0);
    const submitCountPackage = () => {
        if(!customerId){
            toast.error("Please provide value into input field");
        }
        else{
            axios.post(`http://localhost:5000/api/post/timkhachhang`, {MA_KH: customerId})
            .then((result) => {
                if(result.data.length === 0){
                    toast.error("Customer ID not exist");
                }
                else {
                    axios.post("http://localhost:5000/api/count-package", {
                        customerId: customerId})
                    .then((response) => {
                        setNumPackage(response.data[0].numPackages);
                        handleClosePackage();
                        handleOpenResultPackage();
                    });
                    // setCustomerId(0);
                    setNumPackage(0);
                }
            })
        }
    
    };
    
    const columnsDay = [
        { field: 'ID', headerName: 'ID', width: 60 },
        { field: 'NGAY_NHAN', headerName: 'Ngày nhận', width: 300 },
    ];

    return(
        <div >
            <Box sx={{ flexGrow: 1 }} >
                <Grid 
                    container
                    spacing={1.5} 
                    columns={16}  
                    justifyContent="left"
                    flexDirection={{ xs: "column", sm: "row" }}
                    columnSpacing={10}
                >
                    <Grid item xs={14.4} md={14.4} lg={14.4}>
                        <Button variant="outlined" onClick={handleClickOpen} style={{float: 'right'}}>
                        <SearchOutlinedIcon></SearchOutlinedIcon> Tra cứu ngày nhận hàng
                        </Button>
                    </Grid>
                    <Grid item xs={16} md={16} lg={16}>
                        <BootstrapDialog
                            onClose={handleClose}
                            aria-labelledby="customized-dialog-title"
                            open={open}
                        >
                            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClose} >
                                Tra cứu ngày nhận hàng
                            </BootstrapDialogTitle>
                            <DialogContent dividers>
                                <Box
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { m: 1, width: '18ch' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                    >
                                        <TextField id="outlined-basic" label="Mã người gửi" variant="outlined" InputLabelProps={{shrink: true}} name="GID" value={input.GID}
                                                onChange={handleChange} required/>
                                        <TextField id="outlined-basic" label="Mã người nhận" variant="outlined" InputLabelProps={{shrink: true}} name="NID" value={input.NID}
                                                onChange={handleChange} required/>
                                        <TextField label="Ngày gửi" variant="outlined" type="date" InputLabelProps={{shrink: true}} name="NGAY_GUI" value={input.NGAY_GUI}
                                                onChange={handleChange} required/>
                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={()=>{ handleSubmit()}}>
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
                            Tra cứu ngày nhận hàng
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
                                    <Typography>Thời gian nhận các đơn hàng: </Typography>
                                    <div style={{ height: 200, width: '80%', margin: 'auto' }}>
                                    <DataGrid
                                        rows={res}
                                        columns={columnsDay}
                                        pageSize={5}
                                        rowsPerPageOptions={[5]}
                                        //checkboxSelection
                                        getRowId={row => row.ID}
                                        getRowHeight={() => 'auto'}
                                />
                                    </div>
                            </Box>
                            </DialogContent>
                        </BootstrapDialog>
                    </Grid>

                    <Grid item xs={14.4} md={14.4} lg={14.4}>
                        <Button variant="outlined" onClick={handleClickOpenPackage} style={{float: 'right'}}>
                        <SearchOutlinedIcon></SearchOutlinedIcon>Tra cứu số kiện hàng khách hàng đã nhận
                        </Button>
                    </Grid>
                    <Grid item xs={16} md={16} lg={16}>
                        <BootstrapDialog
                            onClose={handleClosePackage}
                            aria-labelledby="customized-dialog-title"
                            open={openPackage}
                        >
                            <BootstrapDialogTitle id="customized-dialog-title" onClose={handleClosePackage} >
                                Tra cứu số kiện hàng khách hàng đã nhận
                            </BootstrapDialogTitle>
                            <DialogContent dividers>
                                <Box
                                    component="form"
                                    sx={{
                                        '& > :not(style)': { m: 1, width: '50ch', margin: 'auto' },
                                    }}
                                    noValidate
                                    autoComplete="off"
                                    >
                                        <TextField id="outlined-basic" label="Mã khách hàng" variant="outlined" InputLabelProps={{shrink: true}} name="customerId"
                                            onChange={(e) => { setCustomerId(e.target.value);}} required/>
                                </Box>
                            </DialogContent>
                            <DialogActions>
                                <Button autoFocus onClick={()=>{submitCountPackage()}}>
                                    Tra cứu
                                </Button>
                            </DialogActions>
                        </BootstrapDialog>

                        <BootstrapDialog
                            onClose={handleCloseResultPackage}
                            aria-labelledby="customized-dialog-title"
                            open={openResultPackage}
                        >
                        <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseResultPackage}>
                        Tra cứu số kiện hàng khách hàng đã nhận
                        </BootstrapDialogTitle>
                        <DialogContent dividers>
                            <Box
                                component="form"
                                sx={{
                                    '& > :not(style)': { m: 1, width: '55ch' },
                                }}
                                noValidate
                                autoComplete="off"
                                >
                                    <Typography> Số kiện hàng mà khách hàng {customerId} đã nhận từ dịch vụ vận chuyển: {numPackage}</Typography>
                            </Box>
                            </DialogContent>
                        </BootstrapDialog>
                    </Grid>
                    <Grid item xs={16} md={16} lg={16}>
                            <div style={{ height: 500, width: '80%', margin: 'auto' }}>
                                <DataGrid
                                    rows={data}
                                    columns={columns}
                                    pageSize={5}
                                    rowsPerPageOptions={[5]}
                                    //checkboxSelection
                                    getRowId={row => row.ID}
                                    getRowHeight={() => 'auto'}
                                    components={{ Toolbar: GridToolbar }}
                                />
                            </div>
                            </Grid>
                </Grid>
            </Box>
        </div>
    );
}