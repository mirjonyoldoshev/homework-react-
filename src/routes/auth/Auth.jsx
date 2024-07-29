import React from "react";
import { Outlet } from "react-router-dom";
import { GoogleOAuthProvider } from "@react-oauth/google";

const Auth = () => {
  return (
    <div>
      <GoogleOAuthProvider clientId="149228131645-4dp3ef13c6on7g9kembqpevvu03tp6qg.apps.googleusercontent.com">
        <Outlet />
      </GoogleOAuthProvider>
    </div>
  );
};

export default Auth;

// 149228131645-4dp3ef13c6on7g9kembqpevvu03tp6qg.apps.googleusercontent.com
