import React, {useState, useEffect, Fragment} from 'react';
import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonIcon, IonButton } from '@ionic/react';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged, updateProfile } from 'firebase/auth';
import './overview.css';

const Overview: React.FC = () => {

  const monthNames = ["janvier", "févirer", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];
  const [user, setUser] = useState<any>({
    "uid": "N/A",
    "username": "N/A",
    "email": "N/A",
    "emailVerified": "N/A",
    "phone": "N/A",
    "pictureUrl": "N/A"
  });

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        console.log("User signed in");
        console.log(user);
        setUser({
          "uid": user.uid,
          "username": user.displayName ? user.displayName : null,
          "email": user.email,
          "emailVerified": user.emailVerified,
          "phone": user.phoneNumber ? user.phoneNumber : "",
          "pictureUrl": user.photoURL ? user.photoURL : ""
        })
        // ...
      } else {
        console.log("User signed out");
      }
    });
  }, []);

  return (
    <IonPage>
      <IonContent fullscreen>
        <div className="container">
          <p className="overview-title"><span>B</span>onjour, {user.username}</p>
          <div className="overview-balance-container">
            <p className="overview-balance-container-title"><span>V</span>os dépenses de {monthNames[new Date().getMonth()].toString()}</p>
            <p className="overview-balance-container-value">537.21 <span>€</span></p>
          </div>
        </div>
      </IonContent>
    </IonPage>
  )
};

export default Overview;
