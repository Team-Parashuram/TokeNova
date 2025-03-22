import { useAccount } from "wagmi";
import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "./components/Layout";
import {
  HomePage,
  EventDetail,
  CreateEvent,
  MyEvents,
  LandingPage,
  MyTickets,
} from "./Pages";
import Theme from "./store/ThemeStore";

const App = () => {
  const { address } = useAccount();

  return (
    <>
      {address ? (
        <Layout>
          <Routes>
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route path="/home" element={<HomePage />} />
            {/* <Route path="/event/:id" element={<EventDetail />} /> */}
            <Route path="/create-event" element={<CreateEvent />} />
            <Route path="/my-events" element={<MyEvents />} />
            {/* my tickets */}
            <Route path="/my-tickets" element={<MyTickets />} />
            <Route path="*" element={<Navigate to="/home" replace />} />
          </Routes>
          <Theme />
        </Layout>
      ) : (
        <div>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
          <Theme />
        </div>
      )}
    </>
  );
};

export default App;