import React, {useState, useEffect, Fragment} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon } from '@ionic/react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, MultiFactorUser } from 'firebase/auth';
import './login.css';

const LoginPage: React.FC = () => {

  const [username, setUsername] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [user, setUser] = useState<object | undefined>(undefined);

  // const registerNewUser = (e: React.SyntheticEvent) => {
  //   e.preventDefault();
  //
  //   const auth = getAuth();
  //   createUserWithEmailAndPassword(auth, username, userPassword)
  //   .then((userInfos) => {
  //     console.log(userInfos.user);
  //     // Setting user
  //     setUser({
  //       uid: userInfos.user.uid ? userInfos.user.uid : "",
  //       username: userInfos.user.displayName ? userInfos.user.displayName : "",
  //       email: userInfos.user.email ? userInfos.user.email : "",
  //       emailVerified: userInfos.user.emailVerified ? userInfos.user.emailVerified : false,
  //       phone: userInfos.user.phoneNumber ? userInfos.user.phoneNumber : "",
  //       pictureUrl: userInfos.user.photoURL ? userInfos.user.photoURL : ""
  //     })
  //   }).catch((error) => {
  //     console.log(error);
  //   })
  // }

  const loginExistingUser = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const auth = getAuth();
    signInWithEmailAndPassword(auth, username, userPassword)
    .then((userInfos) => {
      // Signed in
      // Setting user
      setUser({
        uid: userInfos.user.uid ? userInfos.user.uid : "",
        username: userInfos.user.displayName ? userInfos.user.displayName : "",
        email: userInfos.user.email ? userInfos.user.email : "",
        emailVerified: userInfos.user.emailVerified ? userInfos.user.emailVerified : false,
        phone: userInfos.user.phoneNumber ? userInfos.user.phoneNumber : "",
        pictureUrl: userInfos.user.photoURL ? userInfos.user.photoURL : ""
      })

      window.location.href = "/overview";

      // ...
    }).catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      let feedback = document.getElementById('signin-feedback')!;
      let feedbackError = document.getElementById('signin-feedback-error')!;
      feedback.style.color = "#D94133";
      feedbackError.style.color = "#D94133";
      feedbackError.innerHTML = errorMessage;
      feedback.innerHTML = "Une erreur est survenue...";

      setInterval(() => {
        feedback.innerHTML = "";
        feedbackError.innerHTML = "";
      }, 5000);
    });
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="container">
          <p className="signin-title"><span>C</span>onnexion</p>

          <form className="signin-form" onSubmit={loginExistingUser}>
            <div className="form-block-column">
              <label htmlFor="signin-username-input">Nom d'utilisateur</label>
              <input onChange={(e) => setUsername(e.target.value)} className="signin-input" id="signin-username-input" type="text" placeholder="Nom d'utilisateur"/>
            </div>
            <div className="form-block-column">
              <label htmlFor="signin-password-input">Mot de passe</label>
              <input onChange={(e) => setUserPassword(e.target.value)} className="signin-input" id="signin-password-input" type="password" placeholder="Mot de passe"/>
            </div>
            <div className="form-block-column">
              <button type="submit" className="button signin-button">Connexion</button>
            </div>
          </form>
          <p id="signin-feedback" className="signin-feedback"></p>
          <p id="signin-feedback-error" className="signin-feedback"></p>
          <a className="signin-pass-forgot" href="/forgot">Mot de passe oublié ?</a>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
