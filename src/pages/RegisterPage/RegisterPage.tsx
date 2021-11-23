import React, {useState, useEffect, Fragment} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon } from '@ionic/react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import './register.css';

const RegisterPage: React.FC = () => {

  const [username, setUsername] = useState("");
  const [userMail, setUserMail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordConfirmation, setUserPasswordConfirmation] = useState("");
  const [user, setUser] = useState<object | undefined>(undefined);

  const registerNewUser = (e: React.SyntheticEvent) => {
    e.preventDefault();

    const auth = getAuth();
    createUserWithEmailAndPassword(auth, username, userPassword)
    .then((userInfos) => {
      console.log(userInfos.user);
      // Setting user
      setUser({
        uid: userInfos.user.uid ? userInfos.user.uid : "",
        username: userInfos.user.displayName ? userInfos.user.displayName : "",
        email: userInfos.user.email ? userInfos.user.email : "",
        emailVerified: userInfos.user.emailVerified ? userInfos.user.emailVerified : false,
        phone: userInfos.user.phoneNumber ? userInfos.user.phoneNumber : "",
        pictureUrl: userInfos.user.photoURL ? userInfos.user.photoURL : ""
      })
    }).catch((error) => {
      console.log(error);
    })
  }

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="container">
          <p className="signup-title"><span>I</span>nscription</p>

          <form className="signup-form" onSubmit={registerNewUser}>
            <div className="form-block-column">
              <label htmlFor="signup-username-input">Nom d'utilisateur</label>
              <input onChange={(e) => setUsername(e.target.value)} className="signup-input" id="signup-username-input" type="text" placeholder="Nom d'utilisateur"/>
            </div>
            <div className="form-block-column">
              <label htmlFor="signup-username-input">Email</label>
              <input onChange={(e) => setUserMail(e.target.value)} className="signup-input" id="signup-username-input" type="text" placeholder="Nom d'utilisateur"/>
            </div>
            <div className="form-block-column">
              <label htmlFor="signup-password-input">Mot de passe</label>
              <input onChange={(e) => setUserPassword(e.target.value)} className="signup-input" id="signup-password-input" type="password" placeholder="Mot de passe"/>
            </div>
            <div className="form-block-column">
              <label htmlFor="signup-password-input">Vérification mot de passe</label>
              <input onChange={(e) => setUserPasswordConfirmation(e.target.value)} className="signup-input" id="signup-password-input" type="password" placeholder="Mot de passe"/>
            </div>
            <div className="form-block-column">
              <button type="submit" className="button signup-button">Inscription</button>
            </div>
          </form>
          <p id="signup-feedback" className="signup-feedback"></p>
          <p id="signup-feedback-error" className="signup-feedback"></p>
          <a className="signup-pass-forgot" href="/forgot">Mot de passe oublié ?</a>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default RegisterPage;
