import * as React from "react";
import Card from '@mui/material/Card';
import CardActionArea from '@mui/material/CardActionArea';
import CardContent from '@mui/material/CardContent';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Background from '../assets/bg.jpg';

export default function Dashboard(){
    return (
        <div>
            <Box sx={{ flexGrow: 1 }} >
                <Grid 
                    container
                    spacing={5} 
                    columns={16}  
                    justifyContent="left"
                    flexDirection={{ xs: "column", sm: "row" }}
                    columnSpacing={3}
                >
                    <Grid item xs={10} md={5} lg={10}>
                    <Card>
                        <CardContent style={{height: '500px', backgroundImage: `url(${Background})`, backgroundSize: '700px 500px',  backgroundRepeat: 'no-repeat'}}>
                        </CardContent>
                    </Card>
                    </Grid>
                    <Grid item xs={10} md={5} lg={6}>
                        <Card>
                            <CardContent>
                            <Typography gutterBottom variant="h6" style={{marginBottom: "25px"}}>
                                <strong>Dịch vụ vận chuyển</strong>
                            </Typography>
                            <Typography variant="body2" style={{marginBottom: "20px"}}>
                                Đây là trang được sử dụng nhằm quản lý các hoạt động của dịch vụ vận chuyển.
                            </Typography>
                            <Typography variant="body2" style={{marginBottom: "25px"}}>
                                Nếu có thắc mắc cần giải đáp, vui lòng liên hệ theo hotline <Typography variant="body2" style={{color: "#6867AC"}}>19001080.</Typography>
                            </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </div>
    );

}