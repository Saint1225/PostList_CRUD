import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useErrorBoundary } from "react-error-boundary";
import { jwtDecode } from "jwt-decode";
import { UserContext } from "../store/UserContext";
import LoginRegisterForm from "../components/LoginRegisterForm";
import SuccessModal from "../components/SuccessModal";
import { loginAccount } from "../services/account";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const LoginPage = () => {
  const [isLoginSuccessful, setIsLoginSuccessful] = useState(false);
  const [isLoginLoading, setIsLoginLoading] = useState(false);
  const [successModalMessage, setSuccessModalMessage] = useState("");
  const { dispatchUserProfile } = useContext(UserContext);
  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();
  const queryClient = useQueryClient();

  const loginMutation = useMutation({
    mutationFn: loginAccount,
    onSuccess: (res) => {
      const { data } = res;
      setSuccessModalMessage(data.message);
      setIsLoginSuccessful(true);
      dispatchUserProfile({
        type: "UPDATE",
        role: jwtDecode(data.token).role,
        email: jwtDecode(data.token).email,
        userId: data.userId,
        username: data.username,
      });
      localStorage.setItem("token", `Bearer ${data.token}`);
      setIsLoginLoading(false);
      setTimeout(() => navigate("post"), 2000);
    },
    onError: (error) => {
      setIsLoginLoading(false);
      showBoundary(error.message);
    },
  });

  const handleLoginButtonClicked = (loginInfo) => {
    setIsLoginLoading(true);
    const loginPayload = {
      email: loginInfo.email,
      password: loginInfo.password,
    };
    // loginAccount(loginPayload)
    //   .then((res) => {
    //     if (res) {
    //       const { data } = res;
    //       console.log(data);
    //       setSuccessModalMessage(data.message);
    //       setIsLoginSuccessful(true);
    //       dispatchUserProfile({
    //         type: "UPDATE",
    //         role: jwtDecode(data.token).role,
    //         email: jwtDecode(data.token).email,
    //         userId: data.userId,
    //         username: data.username,
    //       });
    //       localStorage.setItem("token", `Bearer ${data.token}`);
    //       setIsLoginLoading(false);
    //       setTimeout(() => navigate("post"), 2000);
    //     }
    //   })
    //   .catch((error) => {
    //     setIsLoginLoading(false);
    //     showBoundary(error.message);
    //   });

    //*** Alternative with useMutate ***//
    loginMutation.mutate(loginPayload);
    queryClient.setQueryData(["login"], () => loginPayload);
  };

  return (
    <div className="flex justify-center h-full">
      <LoginRegisterForm
        isLoginPage={true}
        isLoginRegisterLoading={isLoginLoading}
        handleFormSubmit={handleLoginButtonClicked}
      />
      <SuccessModal
        isSuccessful={isLoginSuccessful}
        message={successModalMessage}
      />
    </div>
  );
};

export default LoginPage;
