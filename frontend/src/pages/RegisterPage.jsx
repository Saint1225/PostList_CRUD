import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useErrorBoundary } from "react-error-boundary";
import LoginRegisterForm from "../components/LoginRegisterForm";
import SuccessModal from "../components/SuccessModal";
import { registerAccount } from "../services/account";

const RegisterPage = () => {
  const [isRegisterSuccessful, setIsRegisterSuccessful] = useState(false);
  const [isRegisterLoading, setIsRegisterLoading] = useState(false);
  const [successModalMessage, setSuccessModalMessage] = useState("");

  const navigate = useNavigate();
  const { showBoundary } = useErrorBoundary();

  const handleRegisterButtonClicked = (registerInfo) => {
    setIsRegisterLoading(true);
    const registerPayload = {
      username: registerInfo.username,
      email: registerInfo.email,
      password: registerInfo.password,
      role: registerInfo.role,
    };
    registerAccount(registerPayload)
      .then((res) => {
        if (res) {
          const { data } = res;
          console.log(data);
          setSuccessModalMessage(data.message);
          setIsRegisterSuccessful(true);
          setIsRegisterLoading(false);
          setTimeout(() => navigate("/"), 2000);
        }
      })
      .catch((error) => {
        setIsRegisterLoading(false);
        showBoundary(error.message);
      });
  };

  return (
    <div className="flex justify-center h-full">
      <LoginRegisterForm
        isLoginPage={false}
        isLoginRegisterLoading={isRegisterLoading}
        handleSubmit={handleRegisterButtonClicked}
      />
      <SuccessModal
        isSuccessful={isRegisterSuccessful}
        message={successModalMessage}
      />
    </div>
  );
};

export default RegisterPage;
