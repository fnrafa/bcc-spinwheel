"use client";
import React, {createContext, ReactNode, useContext, useState} from "react";
import Alert from "@/components/common/Alert";

export interface AlertInterface {
    id: string;
    message: string;
    type: "success" | "error" | "info";
    visible: boolean;
}

interface AlertContextType {
    alert: (message: string, type?: "success" | "error" | "info") => void;
    alerts: AlertInterface[];
    removeAlert: (id: string) => void;
}

const AlertContext = createContext<AlertContextType | undefined>(undefined);

export const AlertProvider: React.FC<{ children: ReactNode }> = ({children}) => {
    const [alerts, setAlerts] = useState<AlertInterface[]>([]);

    const alert = (message: string, type: "success" | "error" | "info" = "info") => {
        const id = Date.now().toString();
        setAlerts((prev) => [...prev, {id, message, type, visible: true}]);

        setTimeout(() => removeAlert(id), 5000);
    };

    const removeAlert = (id: string) => {
        setAlerts((prev) => prev.map(alert =>
            alert.id === id ? {...alert, visible: false} : alert
        ));

        setTimeout(() => {
            setAlerts((prev) => prev.filter(alert => alert.id !== id));
        }, 500);
    };

    return (
        <AlertContext.Provider value={{alert, alerts, removeAlert}}>
            {children}
            <Alert alerts={alerts} removeAlert={removeAlert}/>
        </AlertContext.Provider>
    );
};

export const useAlert = () => {
    const context = useContext(AlertContext);
    if (!context) {
        throw new Error("useAlert must be used within an AlertProvider");
    }
    return context;
};
