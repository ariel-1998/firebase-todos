import { toast } from "react-toastify";

export const errorToast = (errMessage: string) => {
  toast.error(errMessage, {
    position: "top-right",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
  });
};
