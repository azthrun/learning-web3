import { Box, Typography, Slider, Button } from "@mui/material";
import BeenhereIcon from '@mui/icons-material/Beenhere';

const Admin = ({ rate, setRate, saveChanges }) => {
    const marks = [
        {
          value: 0.00,
          label: 'Free',
        },
        {
          value: 0.02,
          label: '0.02 ETH/min',
        },
        {
          value: 0.04,
          label: '0.04 ETH/min',
        },
        {
            value: 0.06,
            label: '0.06 ETH/min',
        },
        {
            value: 0.08,
            label: '0.08 ETH/min',
        },
        {
          value: 0.1,
          label: 'Expensive',
        },
    ];

    const handleSliderChanges = (e, newVal) => {
        setRate(newVal);
    }

    return (
        <Box sx={{ width: "80%", margin: "20px auto", textAlign: "center" }}>
            <Typography variant="h5">Set Minutely Rate</Typography>
            <Box sx={{ marginLeft: "25px", marginRight: "25px", marginBottom: "10px" }}>
                <Slider key={ rate } defaultValue={ parseFloat(rate.toString()) } step={ 0.001 } min={ 0 } max={ 0.1 }
                    marks={ marks } valueLabelDisplay="auto" onChangeCommitted={ handleSliderChanges }
                    sx={{ "& .MuiSlider-mark": { color: "white" }, "& .MuiSlider-markLabel": { color: "white" } }} />
            </Box>
            <Button variant="contained" color="secondary" startIcon={ <BeenhereIcon /> } onClick={ saveChanges }>
                Save Changes
            </Button>
        </Box>
    );
}
 
export default Admin;