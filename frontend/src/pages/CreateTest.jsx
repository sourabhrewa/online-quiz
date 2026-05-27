import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function CreateTest() {

  const navigate = useNavigate();

  const [title, setTitle] = useState('');

  const [timeLimit, setTimeLimit] = useState('');

  const [question, setQuestion] =
    useState('');

  const [options, setOptions] =
    useState([
      '',
      '',
      '',
      ''
    ]);

  const [correctAnswer, setCorrectAnswer] =
    useState(0);

  const handleOptionChange = (
    index,
    value
  ) => {

    const updatedOptions = [...options];

    updatedOptions[index] = value;

    setOptions(updatedOptions);

  };

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      await axios.post(
        'http://localhost:5000/api/test/create-test',
        {
          title,
          timeLimit,
          questions: [
            {
              question,
              options,
              correctAnswer
            }
          ]
        }
      );

      alert(
        'Test Created Successfully ✅'
      );

      navigate('/dashboard');

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
        p-8
      "
    >

      <div
        className="
          max-w-3xl
          mx-auto
          bg-white/10
          backdrop-blur-xl
          border
          border-white/20
          rounded-3xl
          p-10
          shadow-2xl
        "
      >

        <h1
          className="
            text-5xl
            font-bold
            mb-10
            text-center
          "
        >
          ➕ Create New Test
        </h1>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
        >

          <input
            type="text"
            placeholder="Test Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="
              w-full
              p-4
              rounded-2xl
              bg-white/10
              border
              border-gray-500
              outline-none
              focus:border-cyan-400
            "
          />

          <input
            type="number"
            placeholder="Time Limit (minutes)"
            value={timeLimit}
            onChange={(e) =>
              setTimeLimit(e.target.value)
            }
            className="
              w-full
              p-4
              rounded-2xl
              bg-white/10
              border
              border-gray-500
              outline-none
              focus:border-cyan-400
            "
          />

          <textarea
            placeholder="Question"
            value={question}
            onChange={(e) =>
              setQuestion(e.target.value)
            }
            className="
              w-full
              p-4
              rounded-2xl
              bg-white/10
              border
              border-gray-500
              outline-none
              focus:border-cyan-400
              h-32
            "
          />

          {

            options.map(
              (option, index) => (

                <input
                  key={index}
                  type="text"
                  placeholder={`Option ${index + 1}`}
                  value={option}
                  onChange={(e) =>
                    handleOptionChange(
                      index,
                      e.target.value
                    )
                  }
                  className="
                    w-full
                    p-4
                    rounded-2xl
                    bg-white/10
                    border
                    border-gray-500
                    outline-none
                    focus:border-cyan-400
                  "
                />

              )
            )

          }

          <input
            type="number"
            placeholder="Correct Answer Index"
            value={correctAnswer}
            onChange={(e) =>
              setCorrectAnswer(
                Number(e.target.value)
              )
            }
            className="
              w-full
              p-4
              rounded-2xl
              bg-white/10
              border
              border-gray-500
              outline-none
              focus:border-cyan-400
            "
          />

          <button
            type="submit"
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
            Create Test 🚀
          </button>

        </form>

      </div>

    </div>

  );

}

export default CreateTest;