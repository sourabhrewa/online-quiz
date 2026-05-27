import { useEffect, useState } from 'react';
import axios from 'axios';
import {
  useParams,
  useNavigate
} from 'react-router-dom';

function TestPage() {

  const { id } = useParams();

  const navigate = useNavigate();

  const [test, setTest] = useState(null);

  const [answers, setAnswers] = useState({});

  const [timeLeft, setTimeLeft] = useState(0);

  useEffect(() => {

    fetchTest();

  }, []);

  useEffect(() => {

    if (timeLeft <= 0) return;

    const timer = setInterval(() => {

      setTimeLeft((prev) => prev - 1);

    }, 1000);

    return () => clearInterval(timer);

  }, [timeLeft]);

  const handleAnswer = (
    questionIndex,
    optionIndex
  ) => {

    setAnswers({
      ...answers,
      [questionIndex]: optionIndex
    });

  };

  const fetchTest = async () => {

    try {

      const res = await axios.get(
        `http://localhost:5000/api/test/${id}`
      );

      setTest(res.data);

      setTimeLeft(
        res.data.timeLimit * 60
      );

    } catch (error) {

      console.log(error);

    }

  };

  const handleSubmit = async () => {

    let score = 0;

    test.questions.forEach(
      (question, index) => {

        if (
          answers[index] ===
          question.correctAnswer
        ) {

          score++;

        }

      }
    );

    try {

      await axios.post(
        'http://localhost:5000/api/result/save',
        {
          userEmail: 'test@gmail.com',
          score,
          total: test.questions.length
        }
      );

    } catch (error) {

      console.log(error);

    }

    navigate('/result', {
      state: {
        score,
        total: test.questions.length
      }
    });

  };

  if (!test) {

    return (
      <h1 className="text-white">
        Loading...
      </h1>
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
          flex
flex-col
md:flex-row
justify-between
gap-5
md:items-center
mb-10
        "
      >

        <h1
          className="
           text-3xl md:text-4xl
            font-bold
          "
        >
          {test.title}
        </h1>

        <div
          className="
            bg-red-500
            px-6
            py-3
            rounded-2xl
            text-xl
            font-bold
            shadow-lg
          "
        >
          ⏱️
          {' '}
          {Math.floor(timeLeft / 60)}
          :
          {String(
            timeLeft % 60
          ).padStart(2, '0')}
        </div>

      </div>

      <div className="space-y-6">

        {

          test.questions.map(
            (q, index) => (

              <div
                key={index}
                className="
                  bg-white/10
                  backdrop-blur-lg
                  border
                  border-white/20
                  rounded-3xl
                  p-6
                  shadow-xl
                "
              >

                <h2
                  className="
                    text-2xl
                    font-semibold
                    mb-6
                  "
                >
                  {index + 1}.
                  {' '}
                  {q.question}
                </h2>

                <div className="space-y-4">

                  {

                    q.options.map(
                      (option, i) => (

                        <label
                          key={i}
                          className="
                            flex
                            items-center
                            gap-3
                            bg-white/5
                            p-4
                            rounded-xl
                            cursor-pointer
                            hover:bg-white/20
                            transition
                          "
                        >

                          <input
                            type="radio"
                            name={`question-${index}`}
                            checked={
                              answers[index] === i
                            }
                            onChange={() =>
                              handleAnswer(index, i)
                            }
                          />

                          {option}

                        </label>

                      )
                    )

                  }

                </div>

              </div>

            )
          )

        }

      </div>

      <button
        onClick={handleSubmit}
        className="
          w-full
          mt-10
          py-4
          rounded-2xl
          text-xl
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
        Submit Test 🚀
      </button>

    </div>

  );

}

export default TestPage;