import React from "react";
import { Outlet } from "react-router";

const AuthLayouts = () => {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-3xl">
        {/* Aqui se renderiza el componente login-page o register-page */}
        <Outlet />
      </div>
    </div>
  );
};

export default AuthLayouts;
