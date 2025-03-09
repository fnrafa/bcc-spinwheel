"use client";
import React, {useState} from "react";
import Background from "@/components/layout/Background";
import {useSpinContext} from "@/context/SpinContext";
import HeaderAdmin from "@/components/layout/HeaderAdmin";
import SpinWheel from "@/components/SpinWheel";
import ItemList from "@/components/ItemList";
import {AiOutlineCheck} from "react-icons/ai";
import {LuTrash} from "react-icons/lu";
import Button from "@/components/common/Button";

export default function AdminPage() {
    const {title, setTitle, setItems} = useSpinContext();

    const [editedItems, setEditedItems] = useState<any[]>([]);


    const handleActivateAll = () => {
        setItems((prev) => prev.map((item) => ({...item, active: true})));
    };

    const handleRemoveAll = () => {
        setItems([]);
    };

    const handleSaveChanges = () => {
        editedItems.forEach(item => {
            setItems(prev => prev.map(prevItem => prevItem.id === item.id ? {
                ...prevItem,
                label: item.label
            } : prevItem));
        });
        setEditedItems([]);
    };

    return (
        <Background>
            <div className="min-h-screen z-10 flex flex-col">
                <HeaderAdmin/>
                <div className="flex flex-col md:flex-row justify-between mx-8 my-4 gap-12 h-full">
                    <div className="w-full md:w-1/2 bg-white p-4 rounded-xl max-h-[80vh] flex flex-col">
                        <div className="mb-4">
                            <label className="block mb-1 font-semibold text-gray-800">Nama Event:</label>
                            <input
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                className="border p-2 w-full rounded-lg"
                            />
                        </div>
                        <div className="flex flex-col flex-grow overflow-y-auto">
                            <ItemList/>
                        </div>
                        <div className="flex flex-col gap-2 mt-4">
                            <div className="flex gap-2">
                                <button
                                    onClick={handleActivateAll}
                                    className="flex items-center justify-center gap-2 w-1/2 bg-blue-500 text-white px-4 py-2 rounded-lg"
                                >
                                    <AiOutlineCheck size={18}/>
                                    Aktifkan Semua
                                </button>
                                <button
                                    onClick={handleRemoveAll}
                                    className="flex items-center justify-center gap-2 w-1/2 bg-red-500 text-white px-4 py-2 rounded-lg"
                                >
                                    <LuTrash size={18}/>
                                    Hapus Semua
                                </button>
                            </div>
                            <div className="mt-4 w-full">
                                <Button
                                    fullWidth={true}
                                    text="Simpan Perubahan"
                                    onClick={handleSaveChanges}
                                />
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-center items-center w-full md:w-1/2">
                        <div className="w-[70vh]">
                            <SpinWheel/>
                        </div>
                    </div>
                </div>
            </div>
        </Background>
    );
}
