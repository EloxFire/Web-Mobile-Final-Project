import React, {useState, useEffect, Fragment} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon } from '@ionic/react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, MultiFactorUser } from 'firebase/auth';
import { UserInterface } from '../../interfaces';
import { fingerPrintOutline } from 'ionicons/icons';
import './home.css';

const Home: React.FC = () => {

  return (
    <IonPage>
      <IonContent fullscreen>
        <p className="app-version">v0.0.3</p>
        <div className="container">
          <div className="login-top-container">
            <p className="login-title"><span>S</span>olver</p>
            <p className="login-subtitle">Une nouvelle façon<br/>de faire ses comptes</p>
          </div>
          <div className="login-bottom-container">
            <div className="login-signin-container">
              <a href="/signin" className="button signin-button signin-button-classic">Connexion</a>
              <a href="/signin" className="button signin-button signin-button-biometric"><IonIcon icon={fingerPrintOutline}/></a>
            </div>
            <div className="login-signup-container">
              <a href="/signup" className="button signup-button">Pas encore de compte ?</a>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Home;
