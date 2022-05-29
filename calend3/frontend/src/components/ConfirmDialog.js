import { Dialog, Typography, Box, Link, CircularProgress, Button, Container } from "@mui/material";

const ConfirmDialog = ({ mined, showSignature, transactionHash, closeButtonClicked }) => {
    return (
        <Dialog open={ true }>
            <Container sx={{ padding: "10px", textAlign: "center" }}>
                <Typography variant="h5" gutterBottom>
                    { mined && "Appointment Confirmed" }
                    { !mined && !showSignature && "Confirming Your Appointment..." }
                    { !mined && showSignature && "Please Sign to Confirm transaction" }
                </Typography>
                <Box sx={{ textAlign: "left", padding: "0px 20px 20px 20px" }}>
                    {
                        mined &&
                        <Box>
                            <Typography gutterBottom>
                                Your appointment has been confirmed and is on the blockchain.
                            </Typography>
                            <Link href={ `https://goerli.etherscan.io/tx/${transactionHash}` }
                                target="_blank" rel="noopener">
                                View on Etherscan
                            </Link>
                        </Box>
                    }
                    {
                        !mined && !showSignature && 
                        <Box>
                            <Typography>
                                Please wait while we confirm your appointment on the blockchain...
                            </Typography>
                        </Box>
                    }
                    {
                        !mined && showSignature && 
                        <Box>
                            <Typography>
                                Please sign the transaction to confirm your appointment.
                            </Typography>
                        </Box>
                    }
                </Box>
                {
                    !mined && <CircularProgress />
                }
                {
                    mined &&
                    <Button onClick={ closeButtonClicked }>
                        Close
                    </Button>
                }
            </Container>
        </Dialog>
    );
}
 
export default ConfirmDialog;