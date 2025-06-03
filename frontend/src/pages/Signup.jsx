import { useState } from "react"
import {useNavigate} from "react-router-dom"
import {toast} from "react-hot-toast"
import { InputBox } from "../components/ui/Inputbox"
import { Heading } from "../components/ui/Heading"
import { Subheading } from "../components/ui/Subheading"
import { Bottomwarning } from "../components/ui/Bottomwarning"
import { Button } from "../components/ui/Button"
import axios from "axios"

export const Signup = ()=>{
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [username, setUserName] = useState("")
    const [password, setPassword] = useState("")
    // const navigate = useNavigate()
    const handleSignup = async ()=>{
        try {
            const response = await axios.post("http://localhost:3000/api/v1/user/signup",{
                username,
                firstName,
                lastName,
                password
            })
            localStorage.setItem("token", response.data.token)
            toast.success("Signup successful 🎉")
            // navigate("/dashboard")
        } catch (error) {
            toast.error("Signup failed!")
        }
    }
    return (
        <div className=" h-screen flex justify-center">
          <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-100 text-center p-2 h-max px-4 shadow-2xl">
              <Heading label={"Sign Up"} />
              <Subheading label={"Enter your information to create an account"} />
              <InputBox onChange={e => setFirstName(e.target.value)} placeholder="John" label={"First Name"} />
              <InputBox onChange={e => setLastName(e.target.value)} placeholder="Doe" label={"Last Name"} />
              <InputBox onChange={e => setUserName(e.target.value)} placeholder="harkirat@gmail.com" label={"Email"} />
              <InputBox onChange={e => setPassword(e.target.value)} placeholder="123456" label={"Password"} />
              <div className="pt-4">
                <Button onClick={handleSignup} label={"Sign up"} />
              </div>
              <Bottomwarning label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
            </div>
          </div>
        </div>
      );

}