import "./App.css";

import User from "./Users";
import UserDetails from "./UserDetails";
import { useState } from "react";

const App = () => {
  const [userId, setUserId] = useState<any>();

  return (
    <div className="App">
      <div
        style={{ padding: 20, width: "30%", borderRight: "2px solid white" }}
      >
        <User setUserId={setUserId} />{" "}
      </div>
      <div style={{ padding: 20, width: "70%" }}>
        <UserDetails userId={userId} />
      </div>
    </div>
  );
};

export default App;
