import "./styles/globals.css";
import React from "react";
import type {Metadata} from "next";
import {SpinContextProvider} from "@/context/SpinContext";
import {AlertProvider} from "@/context/AlertContext";
import PasswordGuard from "@/components/PasswordGuard";

export const metadata: Metadata = {
    title: "Spin the Wheel | BCC",
    description: "Basic Computing Community SpinWheel",
    openGraph: {
        title: "Spin the Wheel | BCC",
        description: "Basic Computing Community SpinWheel",
        url: "https://spinwheel.techwork.store",
        type: "website",
        images: [
            {
                url: "/assets/icon.png",
                width: 1200,
                height: 630,
                alt: "Spin the Wheel Thumbnail",
            },
        ],
    },
    twitter: {
        card: "summary_large_image",
        title: "Spin the Wheel | BCC",
        description: "Basic Computing Community SpinWheel",
        images: ["/assets/icon.png"],
    },
    icons: {
        icon: "/favicon.ico",
        apple: "/apple-touch-icon.png",
    },
};

export default function RootLayout({children}: { children: React.ReactNode }) {
    return (
        <html lang="en">
        <body>
        <AlertProvider>
            <PasswordGuard>
                <SpinContextProvider>
                    {children}
                </SpinContextProvider>
            </PasswordGuard>
        </AlertProvider>
        </body>
        </html>
    );
}
