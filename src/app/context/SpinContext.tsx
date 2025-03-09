"use client";
import React, { createContext, useState, useContext } from "react";

interface WheelItem {
    id: number;
    label: string;
    active: boolean;
    pinned: boolean;
}

interface SpinContextProps {
    title: string;
    setTitle: React.Dispatch<React.SetStateAction<string>>;
    items: WheelItem[];
    setItems: React.Dispatch<React.SetStateAction<WheelItem[]>>;
    cheatItemId: number | null;
    setCheatItemId: React.Dispatch<React.SetStateAction<number | null>>;
    removeAfterSelect: boolean;
    setRemoveAfterSelect: React.Dispatch<React.SetStateAction<boolean>>;
}

const SpinContext = createContext<SpinContextProps | undefined>(undefined);

export const SpinContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [title, setTitle] = useState("Final Pitching BCC 2025");
    const [items, setItems] = useState<WheelItem[]>([
        { id: 1, label: "Kelompok 1", active: true, pinned: true },
        { id: 2, label: "Kelompok 2", active: true, pinned: false },
        { id: 3, label: "Kelompok 3", active: true, pinned: false },
    ]);
    const [cheatItemId, setCheatItemId] = useState<number | null>(1);
    const [removeAfterSelect, setRemoveAfterSelect] = useState<boolean>(false);

    return (
        <SpinContext.Provider
            value={{
                title,
                setTitle,
                items,
                setItems,
                cheatItemId,
                setCheatItemId,
                removeAfterSelect,
                setRemoveAfterSelect,
            }}
        >
            {children}
        </SpinContext.Provider>
    );
};

export const useSpinContext = () => {
    const context = useContext(SpinContext);
    if (!context) {
        throw new Error("useSpinContext must be used within SpinContextProvider");
    }
    return context;
};
