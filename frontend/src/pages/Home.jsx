import { Menu } from "../components/ui/navbar-menu";
import logo from "../assets/logomento.png";
import { Button } from "../components/ui/button";
import { useNavigate } from "react-router-dom";
import { Heading } from "../components/ui/heading";
import Dashboard from "../assets/dashboard.png"
export const Home = () => {
  const navigate = useNavigate()
  return (
    <>
      <div className=" min-h-screen w-full flex flex-col items-center justify-between gap-50  opacity-100 [background-image:radial-gradient(#000_0.55px,transparent_0.55px),radial-gradient(#000_0.55px,#e7e5e4_0.55px)] [background-size:22px_22px] [background-position:0_0,11px_11px] " style={{ backgroundColor: "oklch(0.923 0.003 48.717)" }}>
        <div className=" flex justify-center">
          <Menu>
            <img src={logo} alt="Logo" className="h-35 w-auto " />
            <Button label={"Login"} onClick={() => navigate("/auth")}/>
          </Menu>
        </div>
        <div className="w-[60%] h-auto">
         <Heading/>
         <img src={Dashboard} alt="" srcset="" className="w-full h-fit rounded-4xl text-center mt-10 mb-10" />
        </div>
      </div>
    </>
  );
};
