"use client";
import React, {useState} from "react";
import {DndContext, closestCenter} from "@dnd-kit/core";
import {SortableContext, arrayMove, verticalListSortingStrategy} from "@dnd-kit/sortable";
import SortableItem from "@/components/SortableItem";
import NonSortableItem from "@/components/NonSortableItem";
import {useSpinContext} from "@/context/SpinContext";
import {AiOutlinePlusCircle} from "react-icons/ai";

const ItemList: React.FC = () => {
    const {items, setItems, setCheatItemId} = useSpinContext();
    const [newItemLabel, setNewItemLabel] = useState("");

    const handleAddItem = () => {
        if (!newItemLabel) return;
        const newId = items.length > 0 ? Math.max(...items.map((it) => it.id)) + 1 : 1;
        setItems([...items, {id: newId, label: newItemLabel, active: false, pinned: false}]);
        setNewItemLabel("");
    };

    const handleEditItemName = (id: number, newLabel: string) => {
        setItems((prev) => prev.map((item) => (item.id === id ? {...item, label: newLabel} : item)));
    };

    const handleToggleActive = (id: number) => {
        setItems((prev) =>
            prev.map((item) => (item.id === id ? {
                ...item,
                active: !item.active,
                pinned: item.active ? false : item.pinned
            } : item))
        );
    };

    const handleTogglePin = (id: number) => {
        setItems((prev) => {
            const updatedItems = prev.map((item) => (item.id === id ? {...item, pinned: !item.pinned} : item));

            updatedItems.sort((a, b) => Number(b.pinned) - Number(a.pinned));

            setCheatItemId(updatedItems.length > 0 && updatedItems[0].pinned ? updatedItems[0].id : null);

            return updatedItems;
        });
    };

    const handleRemoveItem = (id: number) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    const handleDragEnd = (event: any) => {
        const {active, over} = event;
        if (!over || active.id === over.id) return;

        const oldIndex = items.findIndex((item) => item.id === active.id);
        const newIndex = items.findIndex((item) => item.id === over.id);

        setItems((prev) => arrayMove(prev, oldIndex, newIndex));
    };

    return (
        <div className="w-full h-full overflow-y-auto">
            <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                <SortableContext items={items.filter((item) => item.pinned)} strategy={verticalListSortingStrategy}>
                    <ul className="space-y-2">
                        {items.filter((item) => item.pinned).map((item) => (
                            <SortableItem
                                key={item.id}
                                item={item}
                                editItemName={handleEditItemName}
                                toggleActive={handleToggleActive}
                                togglePin={handleTogglePin}
                                removeItem={handleRemoveItem}
                            />
                        ))}
                        {items.filter((item) => !item.pinned).map((item) => (
                            <NonSortableItem
                                key={item.id}
                                item={item}
                                editItemName={handleEditItemName}
                                toggleActive={handleToggleActive}
                                togglePin={handleTogglePin}
                                removeItem={handleRemoveItem}
                            />
                        ))}
                    </ul>
                </SortableContext>
            </DndContext>
            <div className="flex items-center gap-2 pt-2">
                <input
                    type="text"
                    value={newItemLabel}
                    onChange={(e) => setNewItemLabel(e.target.value)}
                    placeholder="Tambah item baru..."
                    className="border p-2 w-full rounded-lg"
                />
                <button onClick={handleAddItem} className="bg-green-500 text-white px-4 py-2 rounded-lg">
                    <AiOutlinePlusCircle size={20}/>
                </button>
            </div>
        </div>
    );
};

export default ItemList;
