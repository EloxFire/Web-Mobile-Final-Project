import React, {useState, useEffect, Fragment} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon } from '@ionic/react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, MultiFactorUser } from 'firebase/auth';
import './overview.css';

const Overview: React.FC = () => {

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="container">
        </div>
      </IonContent>
    </IonPage>
  );
};

export default Overview;
