import { AppBar, Button, IconButton, Paper, Popper, Switch, Toolbar, Typography } from "@mui/material";
import CableOutlinedIcon from '@mui/icons-material/CableOutlined';
import PetsIcon from '@mui/icons-material/Pets';
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";

import { updateAdminPanelState } from "../redux/adminPanelSlice";

const Navbar = ({ connectWallet, accountValue }) => {
    const isAdmin = useSelector((state) => state.admin.value);
    const showAdminPanel = useSelector((state) => state.adminPanel.value);
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);

    const switchToggled = (e) => {
        dispatch(updateAdminPanelState(e.target.checked));
    }

    const showAddress = (e) => {
        setAnchorEl(e.currentTarget);
        toggleAddressPopper();
    }

    const toggleAddressPopper = () => {
        setOpen(!open);
    }

    return (
        <AppBar>
            <Toolbar>
                <Typography variant="h5" sx={{ flexGrow: 1, color: "#b56576" }}>
                    DreamBig Calendar
                </Typography>
                {
                    isAdmin &&
                    <>
                        <Switch color="warning" checked={ showAdminPanel } onChange={ switchToggled } />
                        <Typography sx={{ marginRight: "20px" }}>
                            Admin Panel
                        </Typography>
                    </>
                }
                {
                    !accountValue &&
                    <Button variant="contained" size="large" color="secondary" 
                        startIcon={ <CableOutlinedIcon /> } onClick={ connectWallet }>
                        Connect to Wallet
                    </Button>
                }
                {
                    accountValue &&
                    <>
                        <IconButton size="large" sx={{ color: "#eaac8b" }} onClick={ showAddress }>
                            <PetsIcon />
                        </IconButton>
                        <Popper open={ open } anchorEl={ anchorEl } placement="bottom-end">
                            <Paper sx={{ marginTop: "10px", border: 0, boxShadow: 0, backgroundColor: "#6d597a", color: "white", padding: "20px", borderRadius: "20px" }}>
                                <Typography gutterBottom sx={{ color: "#e56b6f" }}>
                                    { accountValue }
                                </Typography>
                                <Button fullWidth sx={{ color: "#eaac8b" }} onClick={ toggleAddressPopper }>
                                    Close
                                </Button>
                            </Paper>
                        </Popper>
                    </>
                }
            </Toolbar>
        </AppBar>
    );
}
 
export default Navbar;