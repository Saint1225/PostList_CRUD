import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";

const LoginRegisterForm = ({
  isLoginPage,
  isLoginRegisterLoading,
  handleSubmit,
}) => {
  const [isMinPasswordValid, setIsMinPasswordValid] = useState(true);

  const usernameRef = useRef();
  const emailRef = useRef();
  const passwordRef = useRef();
  const roleRef = useRef();

  const navigate = useNavigate();

  const inputGeneralStyle =
    "solid border-2 rounded-xl border-yellow w-72 mb-6 mx-12 px-2";

  const labelGeneralStyle = "mx-12";

  const handleBackToLoginButton = () => {
    navigate("/");
  };

  const handleNavigateToRegisterButton = () => {
    navigate("register");
  };

  const handleOnSubmit = () => {
    if (passwordRef.current.value.trim().length < 6)
      setIsMinPasswordValid(false);
    else {
      setIsMinPasswordValid(true);
      handleSubmit({
        username: usernameRef.current?.value ?? "",
        email: emailRef.current?.value ?? "",
        password: passwordRef.current?.value ?? "",
        role: roleRef.current?.value ?? "",
      });
    }
  };

  return (
    <div className="flex flex-col text-black px-6 py-3 rounded-lg bg-white my-auto">
      <h1 className="text-2xl font-bold mx-auto my-6">
        {isLoginPage ? "Login" : "Register User"}
      </h1>
      {!isLoginPage && (
        <>
          <p className={labelGeneralStyle}>Username</p>
          <input ref={usernameRef} className={inputGeneralStyle} />
        </>
      )}
      <p className={labelGeneralStyle}>Email</p>
      <input ref={emailRef} className={inputGeneralStyle} />
      <p className={labelGeneralStyle}>Password</p>
      <input
        ref={passwordRef}
        type="password"
        className={`${inputGeneralStyle} ${!isMinPasswordValid && "!mb-1"}`}
      />
      {!isMinPasswordValid && (
        <p className=" text-red text-sm mx-12 mb-3">
          Password must be at least 6 characters
        </p>
      )}
      {!isLoginPage && (
        <>
          <p className={labelGeneralStyle}>Role</p>
          <select ref={roleRef} className={`${inputGeneralStyle} py-1`}>
            <option value="">--Please choose an option--</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </>
      )}

      <button
        className=" bg-yellow rounded-xl mb-6 mt-4 mx-12 py-1"
        onClick={handleOnSubmit}
        disabled={isLoginRegisterLoading}
      >
        {isLoginRegisterLoading ? (
          <div className="flex flex-row justify-center">
            <Spinner className="text-white/75" />
          </div>
        ) : isLoginPage ? (
          "Login"
        ) : (
          "Register"
        )}
      </button>
      {isLoginPage ? (
        <button
          className="mx-12 mb-6 text-xl text-yellow"
          onClick={handleNavigateToRegisterButton}
          disabled={isLoginRegisterLoading}
        >
          Create an account
        </button>
      ) : (
        <button
          className="mx-12 mb-6 text-xl text-yellow"
          onClick={handleBackToLoginButton}
          disabled={isLoginRegisterLoading}
        >
          Back to Login Page
        </button>
      )}
    </div>
  );
};

export default LoginRegisterForm;
