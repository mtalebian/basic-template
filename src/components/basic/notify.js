import { toast } from "react-toastify";

export const notify = {
    error: (title, message, props) => {
        if (title instanceof Error) {
            var ex = title;
            title = ex.message;
        } else if (title === "object" && title.response) {
            const ex = title;
            title = ex.response.data;
            message = ex.toString();
        }
        if (!message) toast.error(title);
        else
            toast.error(
                ({ closeToast }) => (
                    <>
                        <h5>{title}</h5>
                        <small>{message}</small>
                    </>
                ),
                props
            );
    },

    success: (title, message, props) => {
        if (!message) toast.success(title);
        else
            toast.success(
                ({ closeToast }) => (
                    <>
                        <h5>{title}</h5>
                        <small>{message}</small>
                    </>
                ),
                props
            );
    },

    info: (title, message, props) => {
        if (!message) toast.info(title, { position: "bottom-center", ...props });
        else
            toast.info(
                ({ closeToast }) => (
                    <>
                        <h5>{title}</h5>
                        <small>{message}</small>
                    </>
                ),
                { position: "bottom-center", ...props }
            );
    },

    warning: (title, message, props) => {
        if (!message) toast.info(title);
        else
            toast.warning(
                ({ closeToast }) => (
                    <>
                        <h5>{title}</h5>
                        <small>{message}</small>
                    </>
                ),
                props
            );
    },

    dark: (title, message, props) => {
        if (!message) toast.dark(title, { position: "bottom-center", ...props });
        else
            toast.dark(
                ({ closeToast }) => (
                    <>
                        <h5>{title}</h5>
                        <small>{message}</small>
                    </>
                ),
                { position: "bottom-center", ...props }
            );
    },

    close: (id) => toast.dismiss(id),
};
