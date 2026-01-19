import React from "react";

function Page() {
    return (
        <div className="min-h-screen flex font-sans">
            {/* Left Side - Gradient Section */}
            <div className="hidden md:flex w-1/2 items-center justify-center
                bg-gradient-to-br from-[#226BC6] to-[#433ED1] text-white p-16">
                <div>
                    <h1 className="text-4xl font-bold mb-4">
                        Smart Tech Platform
                    </h1>
                    <p className="text-lg opacity-90">
                        Powerful • Secure • Scalable
                    </p>
                </div>
            </div>

            {/* Right Side - Grid Background */}
            <div className="relative w-full md:w-1/2 flex items-center justify-center bg-[#06587D]">
                {/* Grid Overlay */}
                <div
                    className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage:
                            "linear-gradient(#228BC6 1px, transparent 1px), linear-gradient(90deg, #228BC6 1px, transparent 1px)",
                        backgroundSize: "40px 40px",
                    }}
                ></div>

                {/* Card */}
                <div className="relative bg-white rounded-2xl shadow-2xl p-10 w-full max-w-md">
                    <h2 className="text-2xl font-bold text-[#002C42] mb-2">
                        Welcome Back
                    </h2>
                    <p className="text-gray-500 mb-6">
                        Sign in to continue
                    </p>

                    <button
                        className="w-full py-3 rounded-lg text-white font-semibold
                        bg-[#433ED1] hover:opacity-90 transition"
                    >
                        Primary Button
                    </button>

                    <button
                        className="w-full mt-4 py-3 rounded-lg font-semibold
                        text-[#433ED1] border border-[#433ED1] hover:bg-[#433ED1] hover:text-white transition"
                    >
                        Secondary Action
                    </button>
                </div>
            </div>
            <div>
                <p>1. Dark Text / Depth → #002C42</p>
                <p>2. Card Background → #FFFFFF</p>
                <p>3. Grid Background → #06587D</p>
                <p>4. Grid Lines / Glow → #228BC6</p>
                <p>5. Left Gradient → #226BC6 → #433ED1</p>
                <p>6. Primary Button → #433ED1</p>
            </div>
        </div>
    );
}

export default Page;
