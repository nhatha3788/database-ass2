import * as React from "react";
import { styled, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import CssBaseline from "@mui/material/CssBaseline";
import MuiAppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import List from "@mui/material/List";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import LocalShippingOutlinedIcon from '@mui/icons-material/LocalShippingOutlined';
import { useState } from "react";
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import KienHang from "./KienHang";
import KhachHang from "./KhachHang";
import Dashboard from "./Dashboard";
import ChuyenXe from "./ChuyenXe";
import BienBan from "./BienBan";
import Customer from "../assets/customer.png";
import Clipboard from "../assets/clipboard.png";
import BoxPng from "../assets/box.png";


const drawerWidth = 240;

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    marginLeft: `-${drawerWidth}px`,
    ...(open && {
      transition: theme.transitions.create("margin", {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen
      }),
      marginLeft: 0
    })
  })
);

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open"
})(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen
    })
  })
}));

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "flex-end"
}));

export default function PersistentDrawerLeft() {
  const [component, setComponent] = useState("Dashboard");
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };
  const menu = ["Dashboard", "Quản lý khách hàng", "Quản lý kiện hàng", "Danh sách biên bản", "Quản lý chuyến xe"];
  const icon = [<HomeOutlinedIcon></HomeOutlinedIcon>, <img src={Customer} style={{width: "24px"}}></img>, <img src={Clipboard} style={{width: "24px"}}></img>, <img src={BoxPng} style={{width: "24px"}}></img>, <LocalShippingOutlinedIcon></LocalShippingOutlinedIcon>]

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed" open={open}>
        <Toolbar style={{ backgroundColor: "#EEF1FF"}}>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{ mr: 2, ...(open && { display: "none" }) }}
            style={{color: '#6867AC'}}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div" style={{color: '#6867AC', fontWeight: 'bold'}}>
            Transportation Service
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box"
          }
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader style={{ backgroundColor: "#EEF1FF"}}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon style={{color: '#6867AC'}}/>
            ) : (
              <ChevronRightIcon />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List style={{ backgroundColor: "#EEF1FF"}}>
          {menu.map((text, index) => (
            <ListItem
              key={text}
              disablePadding
              button
              onClick={() => setComponent(menu[index])}
              style={{color: 'rgba(0, 0, 0, 0.54)'}}
            >
              <ListItemButton>
                <ListItemIcon>
                  {icon[index]}
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
        {/* <Divider /> */}
        <List style={{ backgroundColor: "#EEF1FF", height: '500px'}}>
        </List>
      </Drawer>
      <Main open={open}>
        <DrawerHeader />
        {component === "Dashboard" ? (
          <Dashboard></Dashboard>
        ) : component === "Quản lý kiện hàng" ? (
          <KienHang></KienHang>
        ) : component === "Quản lý khách hàng" ? (
          <KhachHang></KhachHang>
        ): component === "Danh sách biên bản" ? (
          <BienBan></BienBan>
        ) : component === "Quản lý chuyến xe" ? (
          <ChuyenXe></ChuyenXe>
        ) : ""
        }
      </Main>
    </Box>
  );
}
