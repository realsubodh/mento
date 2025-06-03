// It ensures unauthorized users can't access private routes just by typing the URL in the browser.
import { useNavigate } from "react-router-dom";

export const PrivateRoute = ({ children }) => {
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  return token ? children : navigate("/signin");
};
