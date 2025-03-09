import React from "react";
import Image from "next/image";
import Heading from "@/components/common/Heading";

const HeaderAdmin: React.FC = () => {
    return (
        <header className="flex items-center justify-between px-4 py-2 md:px-8">
            <Heading text="Administrator!" size={12}/>
            <div className="flex items-center">
                <div className="relative w-14 h-10 md:w-24 md:h-16">
                    <Image src="/assets/bcc.png" alt="Logo" fill style={{objectFit: "contain"}}/>
                </div>
                <div className="relative w-24 h-10 md:w-40 md:h-16">
                    <Image src="/assets/partners.png" alt="Logo" fill style={{objectFit: "contain"}}/>
                </div>
            </div>
        </header>
    );
};

export default HeaderAdmin;
