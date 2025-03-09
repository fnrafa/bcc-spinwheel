import React from "react";
import Image from "next/image";
import Button from "@/components/common/Button";
import { LuClock } from "react-icons/lu";

const Header: React.FC = () => {
    return (
        <header className="flex items-center justify-between px-4 py-2 md:px-8">
            <div className="flex items-center">
                <div className="relative w-16 h-10 md:w-24 md:h-16 lg:w-36 lg:h-20">
                    <Image src="/assets/bcc.png" alt="Logo" fill style={{ objectFit: "contain" }} />
                </div>
                <div className="relative w-20 h-10 md:w-28 md:h-16 lg:w-48 lg:h-20">
                    <Image src="/assets/partners.png" alt="Logo" fill style={{ objectFit: "contain" }} />
                </div>
            </div>

            <Button
                icon={<LuClock />}
                text="History"
                variant="filled"
                onClick={() => console.log("History Clicked")}
                size="small"
            />
        </header>
    );
};

export default Header;
