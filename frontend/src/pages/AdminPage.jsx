import { useNavigate } from 'react-router-dom';

function AdminPage() {

  const navigate = useNavigate();

  const user = JSON.parse(
    localStorage.getItem('user')
  );

  if (user.role !== 'admin') {

    return (

      <div
        className="
          min-h-screen
          flex
          items-center
          justify-center
          bg-black
          text-white
          text-4xl
          font-bold
        "
      >
        Access Denied ❌
      </div>

    );

  }

  return (

    <div
      className="
        min-h-screen
        bg-gradient-to-br
        from-[#0f172a]
        via-[#111827]
        to-[#1e293b]
        text-white
        p-4 md:p-8
      "
    >

      <div
        className="
          bg-white/10
          backdrop-blur-xl
          border
          border-white/20
          rounded-3xl
          p-5 md:p-10
          shadow-2xl
        "
      >

        <h1
          className="
            text-5xl
            font-bold
            mb-4
          "
        >
          👨‍💼 Admin Panel
        </h1>

        <p
          className="
            text-xl
            text-gray-300
            mb-10
          "
        >
          Welcome Admin:
          {' '}
          {user.name}
        </p>

        <div
          className="
            grid
            md:grid-cols-2
            gap-6
          "
        >

          <button
            onClick={() =>
              navigate('/create-test')
            }
            className="
              p-6
              rounded-3xl
              text-2xl
              font-bold
              bg-gradient-to-r
              from-[#496a87]
              via-[#61a6aa]
              to-[#14a0a8]
              hover:scale-105
              transition-all
              duration-300
            "
          >
            ➕ Create Test
          </button>

          <button
            onClick={() =>
              navigate('/leaderboard')
            }
            className="
              p-6
              rounded-3xl
              text-2xl
              font-bold
              bg-gradient-to-r
              from-[#c73f46]
              to-[#3fa986]
              hover:from-[#8f2872]
              hover:to-[#0b0c0c]
              transition-all
              duration-300
            "
          >
            🏆 Leaderboard
          </button>

        </div>

      </div>

    </div>

  );

}

export default AdminPage;