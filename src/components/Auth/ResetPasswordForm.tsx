import React, { useState, FormEvent, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useToast } from "../Toast/ToastManager";
import CustomInput from "../Input/Input";
import CustomButton from "../Button/Button";

const ResetPasswordForm: React.FC = () => {
  const { token } = useParams();
  const [password, setPassword] = useState<string>("");
  const [confirmPassword, setConfirmPassword] = useState<string>("");
  const [message, setMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false); // State to manage loading
  const { addToast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setMessage("Passwords do not match.");
      return;
    }

    setLoading(true);

    console.log({
      token: token,
      password: password,
    });

    try {
      const response = await axios.post<{ message: string }>(
        `${import.meta.env.VITE_BASE_URL}/api/resetpassword/`,
        {
          token: token,
          password: password,
        }
      );
      addToast("success", response.data.message);
      navigate("/");
    } catch (error) {
      setMessage("Unable to reset password");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const linkValidation = async () => {
      try {
        const response = await axios.post<{ message: string }>(
          `${import.meta.env.VITE_BASE_URL}/api/resetvalidation/`,
          {
            token: token,
          }
        );
        if (response.status === 200) {
          addToast("info", "Give a valid valid password");
        }
      } catch (error) {
        addToast("danger", "Reset Link is Invalid");
        setTimeout(() => {
          navigate("/");
        }, 1000);
      }
    };
    linkValidation();
  }, []);

  return (
    <>
      <h1 className="text-2xl font-roboto text-center mb-10 font-bold">Change Password</h1>
      <form onSubmit={handleSubmit}>
        <CustomInput
          inputType="password"
          placeholder="Enter New Password"
          name="new-password"
          id="new-password"
          label="new-password"
          value={password}
          onChange={(e) => {
            setPassword(e.target.value);
          }}
          // error={message}
          required={true}
        />
        <CustomInput
          inputType="password"
          placeholder="Confirm Password"
          name="confirm-password"
          id="confirm-password"
          label="confirm-password"
          value={confirmPassword}
          onChange={(e) => {
            setConfirmPassword(e.target.value);
          }}
          // error={message}
          required={true}
        />
        <p className="mt-[1px] w-full text-center text-[10px] text-red-600">
          {message}
        </p>
        <CustomButton
          text={`${loading ? "Working on it.." : "Reset password"}`}
          type={!loading ? "submit" : "button"}
          className={`bg-[#131314] py-3 w-full text-white   hover:bg-slate-900 `}
        />
      </form>
    </>
  );
};

export default ResetPasswordForm;
