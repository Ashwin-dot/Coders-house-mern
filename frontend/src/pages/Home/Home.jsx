import React from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "../../components/shared/Card/Card";
import styles from "./Home.module.css";
import Button from "../../components/shared/Button/Button";

const Home = () => {
  const signInLinkStyle = {
    color: "#0077ff",
    fontWeight: "bold",
    textDecoration: "none",
    marginLeft: "10px",
  };

  const navigate = useNavigate();
  function startRegister() {
    console.log("I am clicked");
    navigate("/authenticate");
  }

  return (
    <div className={styles.cardWrapper}>
      <Card title="Welcome to Codershouse!" icon="logo">
        <p className={styles.text}>
          We’re working hard to get Codershouse ready for everyone! While we
          wrap up the finishing youches, we’re adding people gradually to make
          sure nothing breaks
        </p>
        <div>
          <Button onClick={startRegister} text="Let's Go" />
        </div>
        <div className={styles.signinWrapper}>
          <span className={styles.hasInvite}>Have an invite text?</span>
          <span>
            {/* <Link style={signInLinkStyle} to={"/login"}>
              Sign In
            </Link> */}
          </span>
        </div>
      </Card>
    </div>
  );
};

export default Home;
