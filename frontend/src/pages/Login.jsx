import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Login() {

  const navigate = useNavigate();

  const [isLogin, setIsLogin] = useState(true);

  const [name, setName] = useState('');

  const [email, setEmail] = useState('');

  const [password, setPassword] = useState('');

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      if (isLogin) {

        const res = await axios.post(
          'http://localhost:5000/api/auth/login',
          {
            email,
            password
          }
        );

        localStorage.setItem(
          'token',
          res.data.token
        );

        localStorage.setItem(
          'user',
          JSON.stringify(res.data.user)
        );

        if (res.data.user.role === 'admin') {

          navigate('/admin');

        } else {

          navigate('/dashboard');

        }

      } else {

        await axios.post(
          'http://localhost:5000/api/auth/register',
          {
            name,
            email,
            password
          }
        );

        alert('Registration Successful ✅');

        setIsLogin(true);

      }

    } catch (error) {

      console.log(error);

      alert('Something went wrong');

    }

  };

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
         max-w-md w-full
          bg-white/10
          backdrop-blur-xl
          border
          border-white/20
          rounded-3xl
          shadow-2xl
          p-6 md:p-8
        "
      >

        <div className="text-center mb-8">

          <h1
            className="
              text-4xl
              font-bold
              text-white
              mb-2
            "
          >
            Online Exam Portal
          </h1>

          <p className="text-gray-300">
            {
              isLogin
                ? 'Login to continue'
                : 'Create your account'
            }
          </p>

        </div>

        <form onSubmit={handleSubmit}>

          {

            !isLogin && (

              <input
                type="text"
                placeholder="Full Name"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="
                  w-full
                  mb-4
                  px-4
                  py-3
                  rounded-xl
                  bg-white/10
                  border
                  border-gray-500
                  text-white
                  placeholder-gray-300
                  outline-none
                  focus:border-cyan-400
                "
              />

            )

          }

          <input
            type="email"
            placeholder="Email Address"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="
              w-full
              mb-4
              px-4
              py-3
              rounded-xl
              bg-white/10
              border
              border-gray-500
              text-white
              placeholder-gray-300
              outline-none
              focus:border-cyan-400
            "
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="
              w-full
              mb-6
              px-4
              py-3
              rounded-xl
              bg-white/10
              border
              border-gray-500
              text-white
              placeholder-gray-300
              outline-none
              focus:border-cyan-400
            "
          />

          <button
            type="submit"
            className="
              w-full
              py-3
              rounded-xl
              text-white
              font-semibold
              bg-gradient-to-r
              from-[#496a87]
              via-[#61a6aa]
              to-[#14a0a8]
              hover:scale-105
              transition-all
              duration-300
              shadow-lg
            "
          >
            {
              isLogin
                ? 'Login'
                : 'Register'
            }
          </button>

        </form>

        <p
          className="
            text-center
            mt-6
            text-gray-300
            cursor-pointer
            hover:text-cyan-400
            transition
          "
          onClick={() =>
            setIsLogin(!isLogin)
          }
        >
          {
            isLogin
              ? 'Create New Account'
              : 'Already have an account?'
          }
        </p>

      </div>

    </div>

  );

}

export default Login;