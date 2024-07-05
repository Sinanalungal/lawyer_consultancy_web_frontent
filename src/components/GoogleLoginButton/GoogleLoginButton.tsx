import React from "react";
import { IconBrandGoogle } from "@tabler/icons-react";
import { useGoogleLogin } from "@react-oauth/google";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/store"; // Make sure to import the correct type for AppDispatch
import { GoogleLoginAsync } from "../../redux/slice/LoginActions";

const GoogleLoginButton: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();

  const handleSuccess = async (response: { code: string }) => {
    console.log(response, "this is response");
    const res = await dispatch(GoogleLoginAsync(response.code));
    console.log(res, "response payload");
    console.log(res.payload);
    // if(res.payload.registering === true){
    //   navigate
    // }
  };

  const login = useGoogleLogin({
    onSuccess: handleSuccess,
    flow: "auth-code",
  });

  return (
    <button
      onClick={() => login()}
      className="relative group/btn flex space-x-2 items-center justify-start px-4 bg-white w-full text-black rounded-md h-10 font-medium shadow-input  dark:bg-zinc-900 dark:shadow-[0px_0px_1px_1px_var(--neutral-800)]"
      type="button"
    >
      <IconBrandGoogle className="h-4 w-4 text-neutral-800 dark:text-neutral-300" />
      <span className="text-neutral-700 dark:text-neutral-300 text-sm">
        Google
      </span>
      <BottomGradient />
    </button>
  );
};

export default GoogleLoginButton;

const BottomGradient: React.FC = () => {
  return (
    <>
      <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
      <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
    </>
  );
};
