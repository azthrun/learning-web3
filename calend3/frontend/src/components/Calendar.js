import { ViewState, EditingState, IntegratedEditing } from "@devexpress/dx-react-scheduler";
import { Scheduler, WeekView, Appointments, AppointmentForm } from "@devexpress/dx-react-scheduler-material-ui";
import { Box, Typography } from "@mui/material";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { ethers } from "ethers";

import { updateAdminState } from "../redux/adminSlice";
import abi from "../abis/Calend3.json";
import Admin from "./Admin";
import ConfirmationDialog from "./ConfirmDialog";

const contractAddress = "0x002cBc86488eB5276E2B8835f48FF7eFAbcAb758";
const contractABI = abi.abi;
const provider = new ethers.providers.Web3Provider(window.ethereum);
const signer = provider.getSigner();
const contract = new ethers.Contract(contractAddress, contractABI, signer);

const Calendar = ({ account }) => {
    const dispatch = useDispatch();
    const isAdmin = useSelector((state) => state.admin.value);
    const showAdminPanel = useSelector((state) => state.adminPanel.value);

    const [apptRate, setApptRate] = useState(0);
    const [appointments, setAppointments] = useState([]);

    const [showDialog, setShowDialog] = useState(false);
    const [showSignature, setShowSignature] = useState(false);
    const [mined, setMined] = useState(false);
    const [transactionHash, setTransactionHash] = useState("");

    useEffect(() => {
        console.log("run")
        getData();
    }, []);

    const getData = async () => {
        const owner = await contract.owner();
        dispatch(updateAdminState(owner.toUpperCase() === account.toUpperCase()));
        
        const rate = await contract.getAppointmentRate();
        setApptRate(ethers.utils.formatEther(rate.toString()));
        
        const appointmentData = await contract.getAppointments();
        transformAndSaveAppointments(appointmentData);
    }

    const transformAndSaveAppointments = (appointmentData) => {
        let data = [];
        appointmentData.forEach(appointment => {
            data.push({
                title: appointment.title,
                startDate: new Date(appointment.startTime * 1000),
                endDate: new Date(appointment.endTime * 1000)
            });
        });
        setAppointments(data);
    }

    const saveChanges = async () => {
        await contract.setAppointmentRate(ethers.utils.parseEther(apptRate.toString()));
    }

    const saveAppointment = async (data) => {
        setShowSignature(true);
        setShowDialog(true);
        setMined(false);

        try {
            const appointment = data.added;
            const title = appointment.title;
            const startTime = appointment.startDate.getTime() / 1000;
            const endTime = appointment.endDate.getTime() / 1000;

            const cost = (endTime - startTime) / 60 * (apptRate * 100) / 100;
            const message = { value: ethers.utils.parseEther(cost.toString()) };
            let transaction = await contract.createAppointment(title, startTime, endTime, message);

            setShowSignature(false);
            await transaction.wait();
            setMined(true);
            setTransactionHash(transaction.hash);
        } catch (error) {
            alert(error.message);
            setShowSignature(false);
            setShowDialog(false);
            setMined(false);
        }
    }

    const dialogClose = () => {
        setShowDialog(false);
        getData();
    }

    return (
        <Box>
            <Typography variant="h4" align="center" gutterBottom>Web3.0 Appointment Scheduling Center</Typography>
            {
                isAdmin && showAdminPanel && <Admin rate={ apptRate } setRate={ setApptRate } saveChanges={ saveChanges } />
            }
            <Box sx={{ backgroundColor: "white"}}>
                <Scheduler data={ appointments }>
                    <ViewState />
                    <EditingState onCommitChanges={ saveAppointment } />
                    <IntegratedEditing />
                    <WeekView startDayHour={ 8 } endDayHour={ 15 } />
                    <Appointments />
                    <AppointmentForm />
                </Scheduler>
            </Box>
            {
                showDialog && 
                <ConfirmationDialog mined={ mined } showSignature={ showSignature } 
                    transactionHash={ transactionHash } closeButtonClicked={ dialogClose } />
            }
        </Box>
    );
}
 
export default Calendar;