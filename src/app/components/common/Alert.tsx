import React from "react";
import {AlertInterface} from "@/context/AlertContext";
import {AiOutlineCheckCircle, AiOutlineInfoCircle, AiOutlineCloseCircle, AiOutlineClose} from "react-icons/ai";

interface AlertContainerProps {
    alerts: AlertInterface[];
    removeAlert: (id: string) => void;
}

const Alert: React.FC<AlertContainerProps> = ({alerts, removeAlert}) => {
    return (
        <div
            className="fixed top-5 right-5 left-5 md:left-auto md:right-8 flex flex-col gap-4 z-[9999] max-w-sm mx-auto md:mx-0">
            {alerts.map((alert) => (
                <div
                    key={alert.id}
                    className={`relative flex items-start gap-3 px-5 py-3 rounded-lg shadow-lg border-l-4 transition-transform duration-500 ease-in-out transform ${
                        alert.visible ? "translate-y-0 opacity-100" : "-translate-y-5 opacity-0"
                    }
                    ${alert.type === "success"
                        ? "bg-green-500 border-green-700 text-white"
                        : alert.type === "error"
                            ? "bg-red-500 border-red-700 text-white"
                            : "bg-blue-500 border-blue-700 text-white"
                    }`}
                >
                    <div className="flex-shrink-0 mt-1">
                        {alert.type === "success" && <AiOutlineCheckCircle className="w-6 h-6 text-white"/>}
                        {alert.type === "info" && <AiOutlineInfoCircle className="w-6 h-6 text-white"/>}
                        {alert.type === "error" && <AiOutlineCloseCircle className="w-6 h-6 text-white"/>}
                    </div>

                    <p className="text-sm font-medium break-words max-w-[250px] sm:max-w-full overflow-hidden text-ellipsis">
                        {alert.message}
                    </p>

                    {/* Tombol Close */}
                    <button onClick={() => removeAlert(alert.id)} className="absolute top-2 right-2">
                        <AiOutlineClose className="w-4 h-4 text-white hover:text-gray-300"/>
                    </button>
                </div>
            ))}
        </div>
    );
};

export default Alert;
