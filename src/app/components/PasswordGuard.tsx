"use client";
import React, {useState} from "react";
import Button from "@/components/common/Button";
import Background from "@/components/layout/Background";
import {useAlert} from "@/context/AlertContext";

const PasswordGuard: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const [password, setPassword] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const correctPassword = process.env.NEXT_PUBLIC_APP_PASSWORD || "BCC@5p11nwheel";
    const {alert} = useAlert();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (password === correctPassword) {
            setIsAuthenticated(true);
        } else {
            alert("Incorrect password! Please try again.");
            setPassword("");
        }
    };

    if (!isAuthenticated) {
        return (
            <Background>
                <div className="flex items-center justify-center min-h-screen">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-96 z-20">
                        <h2 className="text-2xl font-bold text-center mb-4">BCC SpinWheel</h2>
                        <form onSubmit={handleSubmit} className="flex flex-col space-y-4">
                            <input
                                type="password"
                                className="p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-400"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <Button
                                text="Submit"
                                variant="filled"
                                size="large"
                                fullWidth
                                type="submit"
                            />
                        </form>
                    </div>
                </div>
            </Background>
        );
    }

    return <>{children}</>;
};

export default PasswordGuard;
