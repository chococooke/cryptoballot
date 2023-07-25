import { Contract, ethers } from 'ethers';
import { useEffect, useState } from 'react';
import contractAbi from "./contracts/Election.json";
import Header from './components/Header';
import Footer from './components/Footer';
import Proposal from './components/Elections';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from './components/Home';
import ElectionInfo from './components/ElectionInfo';
import ErrorElement from './components/ErrorElement';
import './css/style.css'


function App() {
  const { ethereum } = window;
  const [walletStatus, setWalletStatus] = useState(false);
  const [account, setAccount] = useState(ethereum.selectedAddress);
  const [blockchainData, setBlockchainData] = useState({
    provider: null,
    signer: null,
    contract: null
  });

  const connectWallet = async () => {
    if (ethereum) {
      const contractAddress = process.env.REACT_APP_CONTRACT_ADDRESS;
      console.log(contractAddress)
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      setBlockchainData({
        provider,
        signer,
        contract: new Contract(contractAddress, contractAbi.abi, signer),
      })
      setWalletStatus(true);
    } else {
      console.log("Metamask is not installed");
    }
  }

  const disconnectWallet = async () => {
    await setBlockchainData({
      provider: null,
      signer: null,
      provider: null
    })
    setWalletStatus(false);
    setAccount(null);
  }

  window.ethereum.on('accountsChanged', handleAccountsChanged);

  function handleAccountsChanged(accounts) {
    if (accounts.length === 0) {
      console.log('Please connect to MetaMask.');
    } else if (accounts[0] !== account) {
      setAccount(accounts[0])
      console.log("account changed to ", accounts[0]);
    }
    ethereum.on('accountsChanged', handleAccountsChanged)
  }

  useEffect(() => {
    setAccount(ethereum.selectedAddress);
  }, [walletStatus, account]);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Home />,
      errorElement: <ErrorElement />
    },
    {
      path: "/app",
      element: <div className="App">
        <Header
          account={account}
          walletStatus={walletStatus}
          connect={connectWallet}
          disconnect={disconnectWallet}
          contract={blockchainData.contract}
        />
        <Proposal account={account} contract={blockchainData.contract} walletStatus={walletStatus} />
        <Footer />
      </div>
    },
    {
      path: "/election/:id",
      element: <>
        <Header
          contract={blockchainData.contract}
          walletStatus={walletStatus}
          connect={connectWallet}
          disconnect={disconnectWallet}
          account={account}
        />
        <ElectionInfo contract={blockchainData.contract} />
      </>
    }
  ])

  return (
    <RouterProvider router={router} />
  );

}
export default App;