import { useNavigate } from "react-router-dom";

export default function Navbar() {
    const navigate = useNavigate();
  return (
    <nav className="bg-[#F5F5F0]/80 sticky top-0 z-40 backdrop-blur-md border-b border-gray-300/60">
      <div className="flex max-w-6xl mx-auto px-6 h-16 items-center justify-between">
        <div className="flex items-center gap-2.5">
          <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center">
            <span className="text-white text-xs font-bold">F</span>
          </div>
          <span className="font-bold text-lg text-gray-900">Financify</span>
        </div>

        <div className="hidden md:flex items-center gap-8 text-md font-medium text-gray-500">
          <a href="#features" className="hover:text-gray-900 transition-colors">
            Solutions
          </a>
          <a href="#features" className="hover:text-gray-900 transition-colors">
            Resources
          </a>
          <a href="#" className="hover:text-gray-900 transition-colors">
            About
          </a>
          <a href="#" className="hover:text-gray-900 transition-colors">
            Pricing
          </a>
        </div>

        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/dashboard')} className="btn-primary text-md cursor-pointer">
            Go to Dashboard
          </button>
        </div>
      </div>
    </nav>
  );
}
