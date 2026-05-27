import { useNavigate } from 'react-router-dom';

function Navbar() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem('user')
  );

  const handleLogout = () => {

    localStorage.removeItem('token');

    localStorage.removeItem('user');

    navigate('/');

  };

  return (

    <div
      className="
        w-full
        bg-white/10
        backdrop-blur-2xl
        border
        border-white/20
        shadow-2xl
        rounded-3xl
        px-6
        py-4
        flex
        flex-col
        md:flex-row
        justify-between
        items-center
        gap-4
        mb-8
      "
    >

      {/* LOGO */}
      <h1
        className="
          text-3xl
          font-extrabold
          bg-gradient-to-r
          from-[#61a6aa]
          via-[#14a0a8]
          to-[#3fa986]
          bg-clip-text
          text-transparent
        "
      >
        🚀 Exam System
      </h1>

      {/* NAV LINKS */}
      <div
        className="
          flex
          flex-wrap
          items-center
          gap-4
        "
      >

        {/* DASHBOARD */}
        <button
          onClick={() =>
            navigate('/dashboard')
          }
          className="
            px-5
            py-2
            rounded-xl
            bg-gradient-to-r
            from-[#496a87]
            via-[#61a6aa]
            to-[#14a0a8]
            hover:scale-105
            transition-all
            duration-300
            text-white
            font-medium
            shadow-lg
          "
        >
          Dashboard
        </button>

        {/* LEADERBOARD */}
        <button
          onClick={() =>
            navigate('/leaderboard')
          }
          className="
            px-5
            py-2
            rounded-xl
            bg-gradient-to-r
            from-[#496a87]
            via-[#61a6aa]
            to-[#14a0a8]
            hover:scale-105
            transition-all
            duration-300
            text-white
            font-medium
            shadow-lg
          "
        >
          Leaderboard 🏆
        </button>

        {

          user?.role === 'admin' && (

            <button
              onClick={() =>
                navigate('/admin')
              }
              className="
                px-5
                py-2
                rounded-xl
                bg-gradient-to-r
                from-[#496a87]
                via-[#61a6aa]
                to-[#14a0a8]
                hover:scale-105
                transition-all
                duration-300
                text-white
                font-medium
                shadow-lg
              "
            >
              Admin Panel 👨‍💼
            </button>

          )

        }

        {/* LOGOUT */}
        <button
          onClick={handleLogout}
          className="
            px-5
            py-2
            rounded-xl
            bg-gradient-to-r
            from-[#c73f46]
            to-[#3fa986]
            hover:from-[#8f2872]
            hover:to-[#0b0c0c]
            transition-all
            duration-300
            text-white
            font-semibold
            shadow-lg
          "
        >
          Logout
        </button>

      </div>

    </div>

  );

}

export default Navbar;