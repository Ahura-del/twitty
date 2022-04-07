import React from "react";
import { Alert } from "@mui/material";

const AlertHandle = () => {
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <div style={{ width: "70%", position: "absolute", zIndex: 2 }}>
        <Alert severity="error">Please connect to the internet</Alert>
      </div>
    </div>
  );
};

export default AlertHandle;
