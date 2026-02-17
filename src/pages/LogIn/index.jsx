import styles from "./index.module.css";
import google from "../../assets/googleLogIn.svg";
import gitHub from "../../assets/gitHubLogIn.svg";
import divider from "../../assets/divider.svg";

const LogIn = () => {
  return (
    <div className={styles.wholeContainer}>
      <div className={styles.logInContainer}>
        <div className={styles.upperMain}>
          <p className={styles.upperMainText}>Log In</p>
          <p className={styles.upperMainSubText}>
            Enter your personal data to access your account.
          </p>
        </div>
        <div className={styles.lowerMain}>
          <div className={styles.easyLogIn}>
            <div className={styles.googleLogIn}>
              <img src={google} alt="Google Logo" className={styles.images} />
            </div>
            <div className={styles.gitHubLogIn}>
              <img src={gitHub} alt="GitHub Logo" className={styles.images} />
            </div>
          </div>
          <img src={divider} alt="divider" className={styles.divider} />
          <div className={styles.logInForm}>
            <div className={styles.emailContaier}>
              <label htmlFor="email" className={styles.label}>
                Email
              </label>
              <input
                type="email"
                id="email"
                placeholder="Enter your emali"
                className={styles.input}
              />
            </div>
            <div className={styles.passContaier}>
              <label htmlFor="email" className={styles.label}>
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                className={styles.input}
              />
              <div className={styles.forgotPass}>
                <p className={styles.forgotPassText}>Forgot password?</p>
                <a href="#" className={styles.forgotPassLink}>
                  Send Email
                </a>
              </div>
            </div>
          </div>
          <div className={styles.logInButton}>Log In</div>
          <div className={styles.CreateAccount}>
            <p className={styles.createText}>Don't have an account?</p>
            <a href="#" className={styles.signUpLink}>
              Sign Up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LogIn;
