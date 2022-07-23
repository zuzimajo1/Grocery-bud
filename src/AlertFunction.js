import React, { useEffect } from "react";

export const AlertFunction = ({ alert, removeAlert, title, }) => {
  useEffect(() => {
    const Timeout = setTimeout(() => {
      removeAlert();
    }, 2000);

    return () => clearTimeout(Timeout);
  }, [title]);

  const { msg, type } = alert;
  return (
    <div className={`alertdiv2-${type}`}>
      <h2 className={`alertmessage`}>{msg}</h2>
    </div>
  );
};
