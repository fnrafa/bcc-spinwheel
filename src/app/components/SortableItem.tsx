"use client";
import React, {useState} from "react";
import {useSortable} from "@dnd-kit/sortable";
import {CSS} from "@dnd-kit/utilities";
import {LuCheck, LuPin, LuTrash} from "react-icons/lu";
import {WheelItem} from "@/context/SpinContext";

interface SortableItemProps {
    item: WheelItem;
    editItemName: (id: number, newLabel: string) => void;
    toggleActive: (id: number) => void;
    togglePin: (id: number) => void;
    removeItem: (id: number) => void;
}

const SortableItem: React.FC<SortableItemProps> = ({
                                                       item,
                                                       editItemName,
                                                       toggleActive,
                                                       togglePin,
                                                       removeItem
                                                   }) => {
    const {attributes, listeners, setNodeRef, transform, transition} = useSortable({
        id: item.id
    });
    const [editedLabel, setEditedLabel] = useState<string>(item.label);
    const [isEditing, setIsEditing] = useState<boolean>(false);

    const style = {
        transform: CSS.Transform.toString(transform),
        transition
    };

    const handleBlur = () => {
        editItemName(item.id, editedLabel);
        setIsEditing(false);
    };

    return (
        <li
            ref={setNodeRef}
            style={style}
            {...attributes}
            className="flex items-center justify-between p-2 bg-gray-100 rounded-lg shadow-sm cursor-grab"
        >
            <div
                {...listeners}
                data-drag-handle
                className="flex items-center gap-3 flex-grow"
            >
                <button
                    className={`w-6 h-6 rounded border flex items-center justify-center ${
                        item.active ? "bg-green-500 text-white" : "bg-gray-300"
                    }`}
                    onClick={(e) => {
                        e.stopPropagation();
                        toggleActive(item.id);
                    }}
                    onPointerDown={(e) => e.stopPropagation()} // Cegah drag dari tombol
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
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsEditing(true);
                        }}
                        className="text-sm cursor-pointer"
                    >
                        {item.label}
                    </span>
                )}
            </div>
            <div className="flex items-center gap-2">
                <button
                    className={`text-xl ${item.pinned ? "text-yellow-500" : "text-gray-400"}`}
                    onClick={(e) => {
                        e.stopPropagation();
                        togglePin(item.id);
                    }}
                    onPointerDown={(e) => e.stopPropagation()} // Cegah drag dari tombol
                >
                    <LuPin/>
                </button>
                <button
                    className="text-red-500 text-xl"
                    onClick={(e) => {
                        e.stopPropagation();
                        removeItem(item.id);
                    }}
                    onPointerDown={(e) => e.stopPropagation()} // Cegah drag dari tombol
                >
                    <LuTrash/>
                </button>
            </div>
        </li>
    );
};

export default SortableItem;
