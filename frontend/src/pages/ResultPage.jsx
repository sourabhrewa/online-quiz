import { useLocation, useNavigate } from 'react-router-dom';

function ResultPage() {

  const location = useLocation();

  const navigate = useNavigate();

  const { score, total } =
    location.state || {};

  const percentage =
    ((score / total) * 100).toFixed(0);

  return (

    <div
      className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-gradient-to-br
        from-[#0f172a]
        via-[#111827]
        to-[#1e293b]
        px-4
      "
    >

      <div
        className="
          w-full
          max-w-lg
          bg-white/10
          backdrop-blur-xl
          border
          border-white/20
          rounded-3xl
          shadow-2xl
          p-10
          text-center
          text-white
        "
      >

        <h1
          className="
            text-5xl
            font-bold
            mb-6
          "
        >
          🎉 Test Completed
        </h1>

        <div
          className="
            text-7xl
            font-bold
            mb-6
            text-cyan-400
          "
        >
          {score}
          /
          {total}
        </div>

        <p
          className="
            text-2xl
            mb-8
            text-gray-300
          "
        >
          Percentage:
          {' '}
          {percentage}
          %
        </p>

        <button
          onClick={() =>
            navigate('/dashboard')
          }
          className="
            w-full
            py-4
            rounded-2xl
            text-xl
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
          Back to Dashboard 🚀
        </button>

      </div>

    </div>

  );

}

export default ResultPage;