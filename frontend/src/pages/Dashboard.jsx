import { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

function Dashboard() {

  const navigate = useNavigate();

  const [tests, setTests] = useState([]);

  const user = JSON.parse(
    localStorage.getItem('user')
  );

  useEffect(() => {

    fetchTests();

  }, []);

  const fetchTests = async () => {

    try {

      const res = await axios.get(
        'http://localhost:5000/api/test/all-tests'
      );

      setTests(res.data);

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
    <Navbar />

      <div
        className="
          flex
          flex-col
          md:flex-row
          justify-between
          md:items-center
          gap-4
          mb-10
        "
      >

        <h1
          className="
            text-3xl
            md:text-4xl
            font-bold
          "
        >
          Available Tests
        </h1>

     

      </div>

      <div
        className="
          grid
          md:grid-cols-2
          lg:grid-cols-3
          gap-6
        "
      >

        {

          tests.map((test, index) => (

            <motion.div
              key={test._id}
              initial={{
                opacity: 0,
                y: 50
              }}
              animate={{
                opacity: 1,
                y: 0
              }}
              transition={{
                duration: 0.5,
                delay: index * 0.1
              }}
              className="
                bg-white/10
                backdrop-blur-lg
                border
                border-white/20
                rounded-3xl
                p-6
                shadow-xl
                hover:scale-105
                transition
              "
            >

              <h2
                className="
                  text-2xl
                  font-semibold
                  mb-4
                "
              >
                {test.title}
              </h2>

              <p className="mb-2">
                ⏱️ Time:
                {' '}
                {test.timeLimit}
                {' '}
                mins
              </p>

              <p className="mb-6">
                ❓ Questions:
                {' '}
                {test.questions.length}
              </p>

              <button
                onClick={() =>
                  navigate(`/test/${test._id}`)
                }
                className="
                  w-full
                  py-3
                  rounded-xl
                  bg-gradient-to-r
                  from-[#c73f46]
                  to-[#3fa986]
                  hover:from-[#8f2872]
                  hover:to-[#0b0c0c]
                  transition-all
                  duration-300
                "
              >
                Start Test 🚀
              </button>

            </motion.div>

          ))

        }

      </div>

    </div>

  );

}

export default Dashboard;