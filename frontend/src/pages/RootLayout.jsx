import { useContext, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { jwtDecode } from "jwt-decode";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
} from "@material-tailwind/react";
import { UserContext } from "../store/UserContext";

function Fallback({ error, resetErrorBoundary }) {
  return (
    <Dialog open={true} handler={resetErrorBoundary}>
      <DialogHeader className="ml-4">Error</DialogHeader>
      <DialogBody className="ml-4 text-lg text-blue-gray-900">
        {error.message}
      </DialogBody>
      <DialogFooter>
        <Button
          variant="gradient"
          color="deep-orange"
          onClick={resetErrorBoundary}
        >
          <span>Close</span>
        </Button>
      </DialogFooter>
    </Dialog>
  );
}

const Rootlayout = () => {
  const { role, dispatchUserProfile } = useContext(UserContext);
  useEffect(() => {
    if (role === "" && localStorage.getItem("token")) {
      const userInfo = jwtDecode(localStorage.getItem("token"));
      dispatchUserProfile({
        type: "UPDATE",
        role: userInfo.role,
        email: userInfo.email,
        userId: userInfo.userId,
        username: userInfo.username,
      });
    }
  }, [role]);
  return (
    <div className="h-screen w-screen flex justify-center overflow-x-hidden">
      <ErrorBoundary FallbackComponent={Fallback} onReset={(details) => {}}>
        <Outlet />
      </ErrorBoundary>
    </div>
  );
};

export default Rootlayout;
