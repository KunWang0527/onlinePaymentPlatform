import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import MainPage from "./components/MainPage";
import UserLogin from "./components/UserLogin";
import UserSignUp from "./components/UserSignup";
import ChangePassword from "./components/ChangePassword";
import AccountPage from "./components/Account";
import DeactiveAccount from "./components/DeactiveAccount";
import FeaturePage from "./components/FeaturePage";
import HelpPage from "./components/Help";
import PaymentMain from "./payment/PaymentMain";
import PaymentHistory from "./payment/PaymentHistory";
import PaymentPeriod from "./payment/PaymentPeriod";
import PaymentPending from "./payment/PaymentPending";
import PaymentFinished from "./payment/PaymentFinished";
import PaymentProcess from "./payment/PaymentProcess";

function App() {
  return (
    <Router>
      <div className="App">
        {/* Use Routes instead of Switch */}
        <Routes>
          {/* <Route path="/" element={<MainPage />} /> */}
          <Route path="/" element={<MainPage />} />
          <Route path="/login" element={<UserLogin />} />
          <Route path="/signup" element={<UserSignUp />} />
          <Route path="/payment" element={<PaymentMain />} />
          <Route path="/payment-pending" element={<PaymentPending />} />
          <Route path="/payment-finished" element={<PaymentFinished />} />
          <Route
            path="/payment-process"
            element={<PaymentProcess />}
          />
          <Route
            path="/history"
            element={<PaymentHistory />}
          />
          <Route
            path="/period"
            element={<PaymentPeriod />}
          />
          <Route
            path="/features"
            element={<FeaturePage />}
          />
          <Route
            path="/help"
            element={<HelpPage />}
          />
          <Route path="/account" element={<AccountPage />} />
          <Route path="/deactive" element={<DeactiveAccount />} />
          <Route path="/change-password" element={<ChangePassword />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
