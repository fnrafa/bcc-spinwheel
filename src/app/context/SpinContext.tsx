"use client";
import React, { createContext, useState, useContext, useEffect } from "react";

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
    saveChanges: () => Promise<void>;
}

const SpinContext = createContext<SpinContextProps | undefined>(undefined);

export const SpinContextProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [title, setTitle] = useState("Final Pitching BCC 2025");
    const [items, setItems] = useState<WheelItem[]>([]);
    const [cheatItemId, setCheatItemId] = useState<number | null>(1);
    const [removeAfterSelect, setRemoveAfterSelect] = useState<boolean>(false);

    useEffect(() => {
        async function fetchItems() {
            try {
                const res = await fetch("/api/loadItems");
                if (res.ok) {
                    const data = await res.json();
                    setTitle(data.title);
                    setItems(data.items);
                }
            } catch (error) {
                console.error("Error loading items:", error);
            }
        }
        fetchItems().then();
    }, []);

    const saveChanges = async () => {
        try {
            const res = await fetch("/api/saveItems", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, items }),
            });
            if (!res.ok) {
                console.error("Failed to save items");
            }
        } catch (error) {
            console.error("Error saving items:", error);
        }
    };

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
                saveChanges
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
