"use client";
import React, {
    createContext,
    useContext,
    useState,
    useEffect,
    useRef
} from "react";
import { useAlert } from "@/context/AlertContext";

export interface WheelItem {
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
    unsavedChanges: boolean;
}

const SpinContext = createContext<SpinContextProps | undefined>(undefined);

export const SpinContextProvider: React.FC<{ children: React.ReactNode }> = ({
                                                                                 children
                                                                             }) => {
    // Load items from localStorage initially
    const getStoredItems = () => {
        if (typeof window !== "undefined") {
            const stored = localStorage.getItem("spinwheel_items");
            return stored ? JSON.parse(stored) : [];
        }
        return [];
    };

    const getStoredTitle = () => {
        if (typeof window !== "undefined") {
            return localStorage.getItem("spinwheel_title") || "Final Pitching BCC 2025";
        }
        return "Final Pitching BCC 2025";
    };

    const [title, setTitle] = useState(getStoredTitle);
    const [items, setItems] = useState<WheelItem[]>(getStoredItems);
    const [cheatItemId, setCheatItemId] = useState<number | null>(null);
    const [removeAfterSelect, setRemoveAfterSelect] = useState<boolean>(false);
    const [unsavedChanges, setUnsavedChanges] = useState<boolean>(false);
    const { alert } = useAlert();

    const isInitialRender = useRef(true);
    const debounceTimer = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        async function fetchItems() {
            try {
                const res = await fetch("/api/loadItems");
                if (res.ok) {
                    const data = await res.json();
                    if (data.items.length > 0) {
                        setItems(data.items); // ✅ Only update if data exists
                        localStorage.setItem("spinwheel_items", JSON.stringify(data.items));
                    }
                    setTitle(data.title || "Final Pitching BCC 2025");
                    localStorage.setItem("spinwheel_title", data.title || "Final Pitching BCC 2025");
                    setUnsavedChanges(false);
                }
            } catch (error: any) {
                alert(`Error loading items: ${error.message}`, "error");
            }
        }

        fetchItems().then();
    }, [alert]);

    useEffect(() => {
        if (isInitialRender.current) {
            isInitialRender.current = false;
            return;
        }
        if (debounceTimer.current) {
            clearTimeout(debounceTimer.current);
        }
        debounceTimer.current = setTimeout(() => {
            saveChanges().then();
        }, 500);
    }, [items, title]);

    useEffect(() => {
        setUnsavedChanges(true);
        localStorage.setItem("spinwheel_items", JSON.stringify(items));
        localStorage.setItem("spinwheel_title", title);
    }, [title, items]);

    const saveChanges = async () => {
        try {
            const res = await fetch("/api/saveItems", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ title, items })
            });
            if (!res.ok) {
                alert("Failed to save items", "error");
                return;
            }
            setUnsavedChanges(false);
        } catch (error: any) {
            alert(`Error saving items: ${error.message}`, "error");
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
                saveChanges,
                unsavedChanges
            }}
        >
            {children}
        </SpinContext.Provider>
    );
};

export const useSpinContext = (): SpinContextProps => {
    const context = useContext(SpinContext);
    if (!context) {
        throw new Error("useSpinContext must be used within SpinContextProvider");
    }
    return context;
};
