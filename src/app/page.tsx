"use client";

import { useState } from "react";
import { Menu } from "lucide-react";
import { NestedDrawer } from "@/components/NestedDrawer";
import { sampleMenuData } from "@/data/sampleMenuData";

export default function Home() {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <div className="flex min-h-screen items-center justify-center bg-white font-sans">
      <button
        onClick={() => setIsDrawerOpen(true)}
        className="px-8 py-3 bg-blue-600 text-white rounded-full font-medium hover:bg-blue-700 transition-all duration-200 shadow-md hover:shadow-lg active:scale-95 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        Open Menu
      </button>

      <NestedDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        menuData={sampleMenuData}
      />
    </div>
  );
}
