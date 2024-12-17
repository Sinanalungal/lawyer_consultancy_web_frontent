import React, { useState, FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import CustomInput from "../Input/Input";
import CustomButton from "../Button/Button";
import { useToast } from "../Toast/ToastManager";

const ForgotPasswordForm: React.FC = () => {
  const [email, setEmail] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const navigate = useNavigate();
  const { addToast } = useToast();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post<{ message: string }>(
        `${import.meta.env.VITE_BASE_URL}/api/forgotpassword/`,
        { email }
      );
      addToast("success", response.data.message);
      navigate("/");
    } catch (error) {
      setMessage("Please provide proper credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="py-24">
        <h1 className="text-2xl  text-center mb-10 font-bold">
          Forgot Password
        </h1>
        <form onSubmit={handleSubmit}>
          <CustomInput
            inputType="email"
            placeholder="Your email address"
            name="email"
            id="email"
            label="email"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              setMessage("");
            }}
            error={message}
            required={true}
          />
          <CustomButton
            text={`${loading ? "Working on it.." : "Reset password"}`}
            type={!loading ? "submit" : "button"}
            className={`bg-[#131314] py-3 w-full text-white   hover:bg-slate-900 `}
          />
        </form>
      </div>
    </>
  );
};

export default ForgotPasswordForm;
