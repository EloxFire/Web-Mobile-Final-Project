import React, {useState, useEffect, Fragment} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon } from '@ionic/react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import './register.css';

const RegisterPage: React.FC = () => {

  const [username, setUsername] = useState("");
  const [userMail, setUserMail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const [userPasswordConfirmation, setUserPasswordConfirmation] = useState("");
  const [user, setUser] = useState<object | undefined>(undefined);

  const registerNewUser = (e: React.SyntheticEvent) => {
    e.preventDefault();
    let feedback = document.getElementById('signup-feedback-error')!;

    if(userPassword !== userPasswordConfirmation){
      feedback.style.color = "#D94133";
      feedback.innerHTML = "Les mots de passe ne correspondent pas..."
    }else{
      const auth = getAuth();
      createUserWithEmailAndPassword(auth, userMail, userPassword)
      .then((result) => {
        updateProfile(result.user, {
          displayName: username
        })
        feedback.style.color = "#05C46B";
        feedback.innerHTML = "Inscription réussie !"

        setInterval(() => {
          window.location.href = "/overview";
        }, 2000);
      }).catch((error) => {
        console.log(error);
      });
    }
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
              <label htmlFor="signup-usermail-input">Email</label>
              <input onChange={(e) => setUserMail(e.target.value)} className="signup-input" id="signup-usermail-input" type="text" placeholder="Nom d'utilisateur"/>
            </div>
            <div className="form-block-column">
              <label htmlFor="signup-password-input">Mot de passe</label>
              <input onChange={(e) => setUserPassword(e.target.value)} className="signup-input" id="signup-password-input" type="password" placeholder="Mot de passe"/>
            </div>
            <div className="form-block-column">
              <label htmlFor="signup-password-confirmation-input">Vérification mot de passe</label>
              <input onChange={(e) => setUserPasswordConfirmation(e.target.value)} className="signup-input" id="signup-password-confirmation-input" type="password" placeholder="Mot de passe"/>
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
