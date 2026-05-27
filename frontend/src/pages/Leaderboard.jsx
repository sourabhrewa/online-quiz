import { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Leaderboard() {

  const navigate = useNavigate();

  const [results, setResults] = useState([]);

  useEffect(() => {

    fetchResults();

  }, []);

  const fetchResults = async () => {

    try {

      const res = await axios.get(
        'http://localhost:5000/api/result/all'
      );

      const sortedResults =
        res.data.sort(
          (a, b) => b.score - a.score
        );

      setResults(sortedResults);

    } catch (error) {

      console.log(error);

    }

  };

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
          flex
flex-col
md:flex-row
justify-between
gap-4
md:items-center
mb-10
        "
      >

        <h1
          className="
            text-5xl
            font-bold
          "
        >
          🏆 Leaderboard
        </h1>

        <button
          onClick={() =>
            navigate('/dashboard')
          }
          className="
            px-5
            py-3
            rounded-2xl
            bg-gradient-to-r
            from-[#496a87]
            via-[#61a6aa]
            to-[#14a0a8]
            hover:scale-105
            transition
          "
        >
          Dashboard
        </button>

      </div>

      <div className="space-y-5">

        {

          results.map(
            (result, index) => (

              <div
                key={result._id}
                className="
                  bg-white/10
                  backdrop-blur-lg
                  border
                  border-white/20
                  rounded-3xl
                  p-6
                  flex
                  justify-between
                  items-center
                  shadow-xl
                  hover:scale-[1.02]
                  transition
                "
              >

                <div>

                  <h2
                    className="
                      text-2xl
                      font-bold
                    "
                  >
                    #{index + 1}
                  </h2>

                  <p
                    className="
                      text-gray-300
                      mt-1
                    "
                  >
                    {result.userEmail}
                  </p>

                </div>

                <div
                  className="
                    text-3xl
                    font-bold
                    text-cyan-400
                  "
                >
                  {result.score}
                  /
                  {result.total}
                </div>

              </div>

            )
          )

        }

      </div>

    </div>

  );

}

export default Leaderboard;