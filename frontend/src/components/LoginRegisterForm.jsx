import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Spinner } from "@material-tailwind/react";
import { useForm } from "react-hook-form";

const LoginRegisterForm = ({
  isLoginPage,
  isLoginRegisterLoading,
  handleFormSubmit,
}) => {
  // const [isMinPasswordValid, setIsMinPasswordValid] = useState(true);

  // const usernameRef = useRef();
  // const emailRef = useRef();
  // const passwordRef = useRef();
  // const roleRef = useRef();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  const inputGeneralStyle =
    "solid border-2 rounded-xl border-yellow w-72 mx-12 px-2";

  const labelGeneralStyle = "mx-12";

  const errorMessageStyle = "mx-12 mb-2 h-5 text-red";

  const usernameValidationRule = {
    required: "username is needed!",
    minLength: {
      value: 3,
      message: "At least 3 characters please!",
    },
  };

  const emailValidationRule = {
    required: "Email is needed!",
    minLength: {
      value: 5,
      message: "At least 5 characters bah",
    },
    pattern: {
      value:
        /[-A-Za-z0-9!#$%&'*+\/=?^_`{|}~]+(?:\.[-A-Za-z0-9!#$%&'*+\/=?^_`{|}~]+)*@(?:[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?\.)+[A-Za-z0-9](?:[-A-Za-z0-9]*[A-Za-z0-9])?/,
      message: "Please enter a valid email address",
    },
  };

  const passwordValidationRule = {
    required: "Passoword leh?",
    minLength: {
      value: 6,
      message: "Password must be at least 6 characters",
    },
  };

  const userRoleValidationRule = { required: "Choose one lah" };

  const handleBackToLoginButton = () => {
    navigate("/");
  };

  const handleNavigateToRegisterButton = () => {
    navigate("register");
  };

  const handleOnSubmit = (data) => {
    // if (passwordRef.current.value.trim().length < 6)
    //   setIsMinPasswordValid(false);
    // else {
    //   setIsMinPasswordValid(true);
    //   handleFormSubmit({
    //     username: usernameRef.current?.value ?? "",
    //     email: emailRef.current?.value ?? "",
    //     password: passwordRef.current?.value ?? "",
    //     role: roleRef.current?.value ?? "",
    //   });
    // }
    handleFormSubmit({
      username: data.username,
      email: data.email,
      password: data.password,
      role: data.role,
    });
  };

  return (
    <form
      onSubmit={handleSubmit(handleOnSubmit)}
      className="flex flex-col text-black px-6 py-3 rounded-lg bg-white my-auto"
    >
      <h1 className="text-2xl font-bold mx-auto my-6">
        {isLoginPage ? "Login" : "Register User"}
      </h1>
      {!isLoginPage && (
        <>
          <p className={labelGeneralStyle}>Username</p>
          {/* <input ref={usernameRef} className={inputGeneralStyle} /> */}
          <input
            type="text"
            placeholder="User name"
            {...register("username", usernameValidationRule)}
            className={inputGeneralStyle}
          />
          <p className={errorMessageStyle}>{errors.username?.message}</p>
        </>
      )}
      <p className={labelGeneralStyle}>Email</p>
      {/* <input ref={emailRef} className={inputGeneralStyle} /> */}
      <input
        type="text"
        placeholder="Email"
        {...register("email", emailValidationRule)}
        className={inputGeneralStyle}
      />
      <p className={errorMessageStyle}>{errors.email?.message}</p>
      <p className={labelGeneralStyle}>Password</p>
      <input
        // ref={passwordRef}
        type="password"
        placeholder="Password"
        {...register("password", passwordValidationRule)}
        // className={`${inputGeneralStyle} ${!isMinPasswordValid && "!mb-1"}`}
        className={inputGeneralStyle}
      />
      <p className={errorMessageStyle}>{errors.password?.message}</p>
      {/* {!isMinPasswordValid && (
        <p className=" text-red text-sm mx-12 mb-3">
          Password must be at least 6 characters
        </p>
      )} */}
      {!isLoginPage && (
        <>
          <p className={labelGeneralStyle}>Role</p>
          {/* <select ref={roleRef} className={`${inputGeneralStyle} py-1`}> */}
          <select
            {...register("role", userRoleValidationRule)}
            className={`${inputGeneralStyle} py-1`}
          >
            <option value="">--Please choose an option--</option>
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </>
      )}
      <p className={errorMessageStyle}>{errors.role?.message}</p>

      <button
        className=" bg-yellow rounded-xl mb-6 mt-4 mx-12 py-1"
        // onClick={() => handleFormSubmit(handleOnSubmit)}
        type="submit"
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
    </form>
  );
};

export default LoginRegisterForm;
