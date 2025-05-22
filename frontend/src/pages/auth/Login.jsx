import { useState, useEffect, useContext } from "react";
import {
  FaChevronRight,
  FaDollarSign,
  FaUser,
  FaLock,
  FaEnvelope,
  FaEye,
  FaEyeSlash,
  FaFacebookF,
} from "react-icons/fa";
import { FcGoogle } from "react-icons/fc";
import InputField from "../../components/input/input";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosinstance";
import { API_ENDPOINTS } from "../../utils/apiPaths";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
  });
  const [error, setError] = useState(null);
  const [animate, setAnimate] = useState(false);

  const { updateUser } = useContext(UserContext);

  useEffect(() => {
    setAnimate(true);
  }, []);

  const toggleForm = () => {
    setAnimate(false);
    setTimeout(() => {
      setIsLogin(!isLogin);
      setAnimate(true);
    }, 300);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateEmail(formData.email)) {
      setError("please enter a valid email address");
      return;
    }
    if (!formData.password.length) {
      setError("please enter a password");
      return;
    }
    setError(null);
    console.log("Form Data:", formData);
    if (isLogin) {
      // Handle login logic
      console.log("Logging in with", formData);
      try {
        const response = await axiosInstance.post(API_ENDPOINTS.AUTH.LOGIN, {
          email: formData.email,
          password: formData.password,
        });

        const { token, user } = response.data;
        if (token) {
          localStorage.setItem("token", token);
          updateUser(user); // Update user context
          // Redirect to dashboard or perform any other action
          navigate("/dashboard");
        }
      } catch (error) {
        console.log(error, "error");

        if (error.response && error.response.data.message) {
          // Handle unauthorized access
          setError(error.response.data.message);
        } else {
          // Handle timeout error
          setError("Something went wrong, please try again.");
        }
      }
    } else {
      // Handle registration logic
      console.log("Registering with", formData);
      try {
        const response = await axiosInstance.post(
          API_ENDPOINTS.AUTH.REGISTER,
          formData
        );
        console.log(response.data, "response");
        const { token, user } = response.data;
        if (token) {
          localStorage.setItem("token", token);
          updateUser(user); // Update user context
          // Redirect to dashboard or perform any other action
          navigate("/dashboard");
        }
      } catch (error) {
        console.log(error, "error");
        if (error.response && error.response.data.message) {
          setError(error.response.data.message);
        } else {
          setError("Something went wrong, please try again.");
        }
      }
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 p-4">
      <div className="w-full max-w-2xl md:max-w-4xl">
        <div className="bg-white rounded-3xl shadow-2xl">
          <div class="flex flex-col lg:flex-row gap-4">
            {/* Form Section */}
            <div className="w-full md:w-3/5 p-6 sm:p-8 md:p-10">
              {/* Logo */}
              <div
                className={`transition-all duration-500 ${
                  animate
                    ? "translate-y-0 opacity-100"
                    : "-translate-y-5 opacity-0"
                }`}
              >
                <div className="flex items-center mb-6">
                  <div className="bg-indigo-600 text-white rounded-full p-2">
                    <FaDollarSign size={20} />
                  </div>
                  <h1 className="text-xl sm:text-2xl font-bold text-gray-800 ml-3">
                    ExpenseTracker
                  </h1>
                </div>
              </div>

              <h2
                className={`text-2xl sm:text-3xl font-bold text-gray-800 mb-6 transition-all duration-500 ${
                  animate
                    ? "translate-x-0 opacity-100"
                    : "translate-x-5 opacity-0"
                }`}
              >
                {isLogin ? "Welcome Back" : "Create Account"}
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
                {!isLogin && (
                  <InputField
                    label="Full Name"
                    icon={<FaUser className="text-indigo-500" />}
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    delay="100"
                    animate={animate}
                  />
                )}
                <InputField
                  label="Email Address"
                  icon={<FaEnvelope className="text-indigo-500" />}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="you@example.com"
                  type="email"
                  delay="150"
                  animate={animate}
                />
                <InputField
                  label="Password"
                  icon={<FaLock className="text-indigo-500" />}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                  delay="200"
                  animate={animate}
                  showPasswordToggle
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
                {error && (
                  <div className="text-red-500 text-sm mt-2">
                    {error} {/* Display error message */}
                  </div>
                )}

                {isLogin && (
                  <div
                    className={`text-right text-sm text-indigo-600 hover:text-indigo-800 cursor-pointer transition-all duration-500 delay-250 ${
                      animate
                        ? "opacity-100 translate-y-0"
                        : "opacity-0 translate-y-2"
                    }`}
                  >
                    Forgot password?
                  </div>
                )}

                <button
                  type="submit"
                  className={`w-full bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 rounded-xl flex justify-center items-center group transition duration-300 shadow-lg mt-2 sm:mt-4 cursor-pointer `}
                >
                  {isLogin ? "Sign In" : "Create Account"}
                  <FaChevronRight className="ml-2 group-hover:translate-x-1 transition-transform duration-300" />
                </button>

                {/* Social Auth */}
                <div
                  className={`mt-6 sm:mt-8 transition-all duration-500 delay-400 ${
                    animate ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                      <div className="w-full border-t border-gray-300" />
                    </div>
                    <div className="relative flex justify-center text-sm text-gray-500 bg-white px-2">
                      Or continue with
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mt-5">
                    <SocialButton icon={<FcGoogle size={20} />} text="Google" />
                    <SocialButton
                      icon={<FaFacebookF size={20} className="text-blue-600" />}
                      text="Facebook"
                    />
                  </div>
                </div>
              </form>
            </div>
            <div className=" bg-gradient-to-br from-indigo-600 to-purple-600 p-6 sm:p-8 md:p-10 flex items-center justify-center text-center rounded-2xl ">
              <div
                className={`transition-all duration-500 delay-100 ${
                  animate
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-2"
                }`}
              >
                <div className="inline-flex items-center justify-center bg-white text-indigo-600 rounded-full p-3 mb-5">
                  <FaDollarSign size={24} />
                </div>
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                  {isLogin ? "New Here?" : "One of Us?"}
                </h2>
                <p className="text-indigo-100 mb-6 text-base sm:text-lg leading-relaxed">
                  {isLogin
                    ? "Sign up and discover a better way to track your expenses!"
                    : "Already have an account? Sign in now!"}
                </p>
                <button
                  onClick={toggleForm}
                  className=" cursor-pointer bg-transparent hover:bg-white/20 border-2 border-white text-white font-medium py-2 px-6 rounded-xl transition duration-300"
                >
                  {isLogin ? "Sign Up" : "Sign In"}
                </button>
              </div>
            </div>
          </div>
        </div>
        {/* Footer */}
        <div className="text-center text-gray-600 text-sm mt-6">
          © 2025 ExpenseTracker. All rights reserved.
        </div>
      </div>
    </div>
  );
};

/* ----------------- Subcomponents ------------------ */

const SocialButton = ({ icon, text }) => (
  <button className="flex justify-center items-center py-2.5 px-4 border border-gray-300 bg-white hover:bg-gray-50 rounded-xl transition duration-300 shadow-sm cursor-pointer">
    {icon}
    <span className="ml-2 font-medium text-gray-700">{text}</span>
  </button>
);

export default Login;
