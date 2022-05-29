import { Box, Typography, createTheme, ThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import detectEthereumProvider from "@metamask/detect-provider";
import blue from '@mui/material/colors/blue'

import Navbar from './components/Navbar';
import Calendar from './components/Calendar';

const theme = createTheme({
  palette: {
    primary: {
      main: '#355070'
    },
    secondary: blue
  },
  typography: {
    fontFamily: 'Quicksand',
    fontWeightLight: 400,
    fontWeightRegular: 500,
    fontWeightMedium: 600,
    fontWeightBold: 700
  }
});

function App() {
  const [account, setAccount] = useState('');

  useEffect(() => {
    isConnected();
  }, []);

  const isConnected = async () => {
    const provider = await detectEthereumProvider();
    const accounts = await provider.request({ method: "eth_accounts" });
    if (accounts.length >= 1) {
      setAccount(accounts[0]);
    } else {
      console.log("Do Not find authorized accounts");
    }
  }

  const connectWallet = async () => {
    try {
      const provider = await detectEthereumProvider();
      const accounts = await provider.request({ method: "eth_requestAccounts" });
      if (accounts.length >= 1) {
        setAccount(accounts[0]);
      } else {
        console.log("No accounts found");
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ThemeProvider theme={ theme }>
      <Box sx={{ margin: "20px"}}>
        <Navbar connectWallet={ connectWallet } accountValue={ account } />

        <Box sx={{ marginTop: "80px" }}>
          {
            !account &&
            <Typography variant="h6" color="crimson" sx={{ fontStyle: "italic" }}>
              Please connect to your wallet first.
            </Typography>
          }
          { 
            account &&
            <Calendar account={ account } />
          }
        </Box>
      </Box>
    </ThemeProvider>
  );
}

export default App;
