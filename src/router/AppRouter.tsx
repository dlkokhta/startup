import { Route, Routes } from "react-router-dom";

import { Homepage } from "../pages/homePage";
import { RegisterPage } from "../pages/auth/registerPage";
import { ROUTES } from "../constants";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={ROUTES.Home} element={<Homepage />} />
      <Route path={ROUTES.Register} element={<RegisterPage />} />
    </Routes>
  );
};
