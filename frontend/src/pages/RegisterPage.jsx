import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useErrorBoundary } from "react-error-boundary";
import LoginRegisterForm from "../components/LoginRegisterForm";
import SuccessModal from "../components/SuccessModal";
import { registerAccount } from "../services/account";
import { useMutation } from "@tanstack/react-query";

const RegisterPage = () => {
  const [isRegisterSuccessful, setIsRegisterSuccessful] = useState(false);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [successModalMessage, setSuccessModalMessage] = useState("");

  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();

  const registerMutation = useMutation({
    mutationFn: registerAccount,
    onSuccess: (res) => {
      if (res) {
        const { data } = res;
        setSuccessModalMessage(data.message);
        setIsRegisterSuccessful(true);
        setIsRegisterLoading(false);
        setTimeout(() => navigate("/"), 2000);
      }
    },
    onError: (error) => {
      setIsRegisterLoading(false);
      showBoundary(error.message);
    },
  });

  const handleRegisterButtonClicked = (registerInfo) => {
    setIsRegisterLoading(true);
    const registerPayload = {
      username: registerInfo.username,
      email: registerInfo.email,
      password: registerInfo.password,
      role: registerInfo.role,
    };
    // registerAccount(registerPayload)
    //   .then((res) => {
    //     if (res) {
    //       const { data } = res;
    //       console.log(data);
    //       setSuccessModalMessage(data.message);
    //       setIsRegisterSuccessful(true);
    //       setIsRegisterLoading(false);
    //       setTimeout(() => navigate("/"), 2000);
    //     }
    //   })
    //   .catch((error) => {
    //     setIsRegisterLoading(false);
    //     showBoundary(error.message);
    //   });

    // Alternative with useMutation //
    registerMutation.mutate(registerPayload);
  };

  return (
    <div className="flex justify-center h-full">
      <LoginRegisterForm
        isLoginPage={false}
        isLoginRegisterLoading={isRegisterLoading}
        handleFormSubmit={handleRegisterButtonClicked}
      />
      <SuccessModal
        isSuccessful={isRegisterSuccessful}
        message={successModalMessage}
      />
    </div>
  );
};

export default RegisterPage;
