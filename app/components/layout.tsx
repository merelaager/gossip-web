import React from "react";

export function Layout({ children }: { children: React.ReactNode }) {
    return (
        <div className="h-screen w-full bg-pink-400 font-mono">{children}</div>
    );
}
