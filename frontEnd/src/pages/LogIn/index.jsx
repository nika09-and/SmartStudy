import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../auth/AuthContext";
import styles from "./index.module.css";
import google from "../../assets/googleLogIn.svg";
import gitHub from "../../assets/gitHubLogIn.svg";
import divider from "../../assets/divider.svg";

const LogIn = () => {
  const { login, signup, signInWithGoogle, signInWithGitHub } = useAuth();
  const [isLoginMode, setIsLoginMode] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  function handleToggle() {
    setIsLoginMode(!isLoginMode);
    setError("");
  }

  function handleInputChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  async function handleGoogleSignIn() {
    try {
      setError("");
      await signInWithGoogle();
      // OAuth will redirect, profile creation happens in AuthContext
    } catch (err) {
      setError(err.message || "Google sign-in failed. Please try again.");
    }
  }

  async function handleGitHubSignIn() {
    try {
      setError("");
      await signInWithGitHub();
      // OAuth will redirect, profile creation happens in AuthContext
    } catch (err) {
      setError(err.message || "GitHub sign-in failed. Please try again.");
    }
  }

  async function handleLoginSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await login(formData.email, formData.password);
      alert("Login successful!");
      navigate("/");
    } catch (err) {
      setError(err.message || "Login failed. Please check your credentials.");
    }
  }

  async function handleSignupSubmit(e) {
    e.preventDefault();
    setError("");

    try {
      await signup(formData.email, formData.password, {
        name: formData.name,
        lastName: formData.lastName,
      });
      alert("Signup successful! Please log in.");
      setIsLoginMode(true);
      setFormData({
        name: "",
        lastName: "",
        email: "",
        password: "",
      });
    } catch (err) {
      setError(err.message || "Signup failed. Please try again.");
    }
  }

  return (
    <div className={styles.wholeContainer}>
      <div className={styles.logInContainer}>
        <div className={styles.upperMain}>
          <p className={styles.upperMainText}>
            {isLoginMode ? "Log In" : "Sign Up"}
          </p>
          <p className={styles.upperMainSubText}>
            {isLoginMode
              ? "Enter your personal data to access your account."
              : "Create your account to get started."}
          </p>
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>

        <div className={styles.lowerMain}>
          {/* --- EASY LOGIN BUTTONS (always shown) --- */}
          <div className={styles.easyLogIn}>
            <div
              className={styles.googleLogIn}
              onClick={handleGoogleSignIn}
              style={{ cursor: "pointer" }}
              title="Sign in with Google"
            >
              <img src={google} alt="Google Logo" className={styles.images} />
            </div>
            <div
              className={styles.gitHubLogIn}
              onClick={handleGitHubSignIn}
              style={{ cursor: "pointer" }}
              title="Sign in with GitHub"
            >
              <img src={gitHub} alt="GitHub Logo" className={styles.images} />
            </div>
          </div>

          <img src={divider} alt="divider" className={styles.divider} />

          {isLoginMode ? (
            <form className={styles.logInForm} onSubmit={handleLoginSubmit}>
              <div className={styles.emailContaier}>
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className={styles.input}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.passContaier}>
                <label htmlFor="password" className={styles.label}>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className={styles.input}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
                <div className={styles.forgotPass}>
                  <p className={styles.forgotPassText}>Forgot password?</p>
                  <a href="#" className={styles.forgotPassLink}>
                    Send Email
                  </a>
                </div>
              </div>

              <button type="submit" className={styles.logInButton}>
                Log In
              </button>
            </form>
          ) : (
            <form className={styles.signUpForm} onSubmit={handleSignupSubmit}>
              <div className={styles.nameContianer}>
                <div className={styles.name}>
                  <label htmlFor="name" className={styles.label}>
                    Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Enter your name"
                    className={styles.input}
                    value={formData.name}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                <div className={styles.lastName}>
                  <label htmlFor="lastName" className={styles.label}>
                    Last Name
                  </label>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter your last name"
                    className={styles.input}
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className={styles.emailContaier}>
                <label htmlFor="email" className={styles.label}>
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className={styles.input}
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                />
              </div>
              <div className={styles.passContaier}>
                <label htmlFor="password" className={styles.label}>
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className={styles.input}
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <button type="submit" className={styles.logInButton}>
                Sign Up
              </button>
            </form>
          )}

          <div className={styles.CreateAccount}>
            <p className={styles.createText}>
              {isLoginMode
                ? "Don't have an account?"
                : "Already have an account?"}
            </p>
            <a onClick={handleToggle} href="#" className={styles.signUpLink}>
              {isLoginMode ? "Sign Up" : "Log In"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
