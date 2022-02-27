import AuthContext from "../../store/auth-context";
import { useHistory } from "react-router-dom";
import { useRef, useContext } from "react";
import classes from "./ProfileForm.module.css";

const ProfileForm = () => {
  const history = useHistory();
  const authCtx = useContext(AuthContext);

  const API_KEY = process.env.REACT_APP_API_KEY;
  const API_URL_UPDATE = `https://identitytoolkit.googleapis.com/v1/accounts:update?key=${API_KEY}`;

  const newPasswordInputRef = useRef();

  const submitHandler = (event) => {
    event.preventDefault();

    const enteredNewPassword = newPasswordInputRef.current.value;

    fetch(API_URL_UPDATE, {
      method: "POST",
      body: JSON.stringify({
        idToken: authCtx.token,
        password: enteredNewPassword,
        returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => {
      history.replace("/");
    });
  };

  return (
    <form onSubmit={submitHandler} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor="new-password" minLength="7">
          Nueva contraseña
        </label>
        <input ref={newPasswordInputRef} type="password" id="new-password" />
      </div>
      <div className={classes.action}>
        <button>Cambiar contraseña</button>
      </div>
    </form>
  );
};

export default ProfileForm;
