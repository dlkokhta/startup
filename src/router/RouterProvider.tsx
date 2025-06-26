import { Route, Routes } from "react-router-dom";

import { Homepage } from "../pages/homePage";
import { ROUTES } from "../enums";

export const RouterProvider = () => {
  return (
    <Routes>
      <Route path={ROUTES.Home} element={<Homepage />} />
    </Routes>
  );
};
