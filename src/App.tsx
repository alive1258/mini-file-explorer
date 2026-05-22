import { useState } from "react";
import MainPanel from "./components/MainPanel/MainPanel";
import Sidebar from "./components/Sidebar/Sidebar";
import { ChevronLeftIcon } from "./components/common/Icon";

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex h-screen bg-black text-white overflow-hidden">
      {/* BACKDROP (mobile only) */}
      {mobileOpen && (
        <div
          onClick={() => setMobileOpen(false)}
          className="fixed inset-0 bg-black/60 z-40 md:hidden"
        />
      )}

      {/* SIDEBAR WRAPPER */}
      <div
        className={`
          fixed md:static z-50
          h-full
          transition-transform duration-300
          md:translate-x-0
          ${mobileOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}
          ${collapsed ? "md:w-16" : "md:w-72"}
          w-72
        `}
      >
        <Sidebar
          collapsed={collapsed}
          setCollapsed={setCollapsed}
          setMobileOpen={setMobileOpen}
        />
      </div>

      {/* MAIN */}
      <div className="flex-1 min-w-0 w-full">
        <MainPanel />
      </div>

      {/* FLOAT BUTTON */}
      <button
        onClick={() => setMobileOpen(true)}
        className="md:hidden fixed top-2 left-2 z-10 bg-gray-900/60 px-2 py-1 rounded-lg border border-gray-700"
      >
        ☰
      </button>

      {/* DESKTOP COLLAPSE TOGGLE */}
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="hidden md:block fixed bottom-4 left-4 z-50 bg-gray-900/60 p-2 rounded-lg border border-gray-700"
      >
        <ChevronLeftIcon
          className={`transition-transform ${collapsed ? "rotate-180" : ""}`}
        />
      </button>
    </div>
  );
}

export default App;
