import { Link } from "react-router-dom";

const Header = ({ account, walletStatus, disconnect, connect, contract }) => {


    return (
        <>
            <div className="app_header">
                <h2 className="app_header__brand"><Link to="/app">Crypto<span>Ballot</span></Link></h2>
                <small style={{ color: "orangeRed" }}>{walletStatus ? "" : "Please connect your wallet to use the App"}</small>
                <ul className="app_header__nav">
                    {
                        account !== null ?
                            <li className="app_header__nav-item account">
                                <p title={account}>
                                    {account
                                        ? <> <i className="fa-solid fa-wallet"></i>{account.substring(0, 9) + "..."} </>
                                        : "account"}
                                </p>
                            </li>
                            : ""
                    }
                    <li className="app_header__nav-item">
                        <button className="btn" onClick={() => { walletStatus ? disconnect() : connect() }}>
                            {walletStatus ? "Disconnect" : "Connect Wallet"}
                        </button>
                    </li>
                </ul>
            </div >

        </>
    )
}

export default Header;