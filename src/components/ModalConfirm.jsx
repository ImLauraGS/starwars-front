import {
  Button,
  Card,
  CardBody,
  CardFooter,
} from "@material-tailwind/react";

export default function ModalConfirm({ isOpen, onClose, message }) {
  return (
    <div className={`fixed inset-0 bg-gray-900 bg-opacity-50 flex items-center justify-center z-50 ${isOpen ? 'visible' : 'invisible'}`}>
      <Card
        open={isOpen}
        handler={onClose}
        className="w-full max-w-md bg-lime-600 text-black flex flex-col justify-center items-center p-5 gap-3 rounded-2xl"
      >
        <CardBody>
          <p>{message}</p>
        </CardBody>
        <CardFooter>
          <Button variant="filled" onClick={onClose} className="px-5 py-1 rounded-xl text-white">
            Close
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
}

