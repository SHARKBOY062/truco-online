import { BrowserRouter, Routes, Route } from "react-router-dom";

// Layout principal
import AppLayout from "./layouts/AppLayout";

// AUTH
import Login from "./pages/Auth/Login";
import Register from "./pages/Auth/Register";

// WALLET
import Balance from "./pages/Wallet/Balance";
import Transactions from "./pages/Wallet/Transactions";
import Deposit from "./pages/Wallet/Deposit";
import DepositQR from "./pages/Wallet/DepositQR";
import Withdraw from "./pages/Wallet/Withdraw";

// LOBBY
import Lobby from "./pages/Lobby/Lobby";

// ACCOUNT
import Account from "./pages/Account/Account";

// INVITE
import Invite from "./pages/Invite/Invite";

// GAME ROOM (NOVO)
import TrucoRoom from "./pages/GameRoom/TrucoRoom";

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>

        <Route element={<AppLayout />}>

          {/* HOME */}
          <Route path="/" element={<Lobby />} />

          {/* MINHA CONTA */}
          <Route path="/account" element={<Account />} />

          {/* INDIQUE E GANHE */}
          <Route path="/invite" element={<Invite />} />

          {/* SALA DO TRUCO PAULISTA */}
          <Route path="/game/truco/paulista" element={<TrucoRoom mode="paulista" />} />

          {/* CARTEIRA */}
          <Route path="/wallet/balance" element={<Balance />} />
          <Route path="/wallet/transactions" element={<Transactions />} />
          <Route path="/wallet/deposit" element={<Deposit />} />
          <Route path="/wallet/deposit/:id" element={<DepositQR />} />
          <Route path="/wallet/withdraw" element={<Withdraw />} />

        </Route>

        {/* AUTH */}
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />

      </Routes>
    </BrowserRouter>
  );
}
