import { Dialog, DialogHeader, DialogBody } from "@material-tailwind/react";

const SuccessModal = ({ isSuccessful, message }) => {
  return (
    <Dialog open={isSuccessful}>
      <DialogHeader className="ml-4">Success</DialogHeader>
      <DialogBody className="ml-4 text-lg text-blue-gray-900">
        {message}
      </DialogBody>
    </Dialog>
  );
};

export default SuccessModal;
