"use client";
import React, {useState} from "react";
import {LuCheck, LuPin, LuTrash} from "react-icons/lu";
import {WheelItem} from "@/context/SpinContext";

interface NonSortableItemProps {
    item: WheelItem;
    editItemName: (id: number, newLabel: string) => void;
    toggleActive: (id: number) => void;
    togglePin: (id: number) => void;
    removeItem: (id: number) => void;
}

const NonSortableItem: React.FC<NonSortableItemProps> = ({
                                                             item,
                                                             editItemName,
                                                             toggleActive,
                                                             togglePin,
                                                             removeItem
                                                         }) => {
    const [editedLabel, setEditedLabel] = useState<string>(item.label);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const handleBlur = () => {
        editItemName(item.id, editedLabel);
        setIsEditing(false);
    };

    return (
        <li className="flex items-center justify-between p-2 bg-gray-100 rounded-lg shadow-sm">
            <div className="flex items-center gap-3">
                <button
                    className={`w-6 h-6 rounded border flex items-center justify-center ${
                        item.active ? "bg-green-500 text-white" : "bg-gray-300"
                    }`}
                    onClick={() => toggleActive(item.id)}
                >
                    {item.active && <LuCheck/>}
                </button>
                {isEditing ? (
                    <input
                        type="text"
                        value={editedLabel}
                        onChange={(e) => setEditedLabel(e.target.value)}
                        onBlur={handleBlur}
                        className="text-sm p-1 bg-transparent outline-none border-yellow-500"
                    />
                ) : (
                    <span
                        onClick={() => setIsEditing(true)}
                        className="text-sm cursor-pointer"
                    >
            {item.label}
          </span>
                )}
            </div>
            <div className="flex items-center gap-2">
                <button
                    className={`text-xl ${item.pinned ? "text-yellow-500" : "text-gray-400"}`}
                    onClick={() => togglePin(item.id)}
                >
                    <LuPin/>
                </button>
                <button className="text-red-500 text-xl" onClick={() => removeItem(item.id)}>
                    <LuTrash/>
                </button>
            </div>
        </li>
    );
};

export default NonSortableItem;
