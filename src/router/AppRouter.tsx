import { Route, Routes } from "react-router-dom";

import { Homepage } from "../pages/homePage";
import { RegistrationPage } from "../pages/registerPage";
import { LoginPage } from "../pages/loginPage";
import { ROUTES } from "../constants";

export const AppRouter = () => {
  return (
    <Routes>
      <Route path={ROUTES.Home} element={<Homepage />} />
      <Route path={ROUTES.Register} element={<RegistrationPage />} />
      <Route path={ROUTES.Login} element={<LoginPage />} />
    </Routes>
  );
};
