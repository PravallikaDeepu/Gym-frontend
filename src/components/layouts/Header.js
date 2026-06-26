import { useNavigate } from "react-router-dom";

function Header() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <header className="w-full bg-white shadow-md px-6 py-4 flex items-center justify-between">
      
      {/* Left - Logo */}
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 bg-blue-600 rounded-full"></div>
        <h2 className="text-blue-600 font-bold text-lg">Gym Manager</h2>
      </div>

      {/* Center - Welcome */}
      <h2 className="text-gray-700 font-bold">
        Welcome,{" "}
        <span className="text-blue-600 font-semibold">
          {user?.firstName} {user?.lastName}
        </span>
      </h2>

      {/* Right - Logout */}
      <button
        onClick={handleLogout}
        className="text-red-500 font-medium flex items-center gap-2"
      >
        Logout
      </button>
    </header>
  );
}

export default Header;