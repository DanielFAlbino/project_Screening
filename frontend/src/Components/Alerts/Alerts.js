import React from "react";
import { Alert, AlertTitle } from "@material-ui/lab";
function AlertMessage({ message }) {
  return (
    <Alert severity="success">
      <AlertTitle>Success</AlertTitle>
      {message}
    </Alert>
  );
}

export default AlertMessage;
