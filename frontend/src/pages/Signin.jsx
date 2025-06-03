import { Button } from "../components/ui/Button";
import { Heading } from "../components/ui/Heading";
import { InputBox } from "../components/ui/Inputbox";
import { Subheading } from "../components/ui/Subheading";
import { Bottomwarning } from "../components/ui/Bottomwarning";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import axios from "axios";

export const Signin = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const HandleSignin = async () => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        {
          username,
          password,
        }
      );

      localStorage.setItem("token", response.data.token);
      toast.success("SignIn successful 🎉");
      navigate("/dashboard");
    } catch (error) {
      toast.error("SignIn failed ❌");
      console.error("Signin error:", error.response?.data || error.message);
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center">
      <div className="flex flex-col items-center rounded-t-lg w-[450px] h-[500px] bg-white shadow-2xl">
        <div className="rounded-lg w-full mt-4 text-center p-4 h-max ">
          <Heading label={"Sign In"} />
          <Subheading label={"Enter your credentials to access your account"} />
          <div className="mt-10">
            <InputBox
              placeholder="subodhsingh@gmail.com"
              label={"Email Id"}
              onChange={(e) => {
                setUserName(e.target.value);
              }}
            />
            <InputBox
              placeholder="hkirat123"
              label={"Password"}
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          </div>
          <div className="pt-4">
            <Button label={"Sign In"} onClick={HandleSignin} />
          </div>
          <Bottomwarning
            label={"Don't have an account?"}
            buttonText={"Sign up"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  );
};
