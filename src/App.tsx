import React from 'react';
import { Redirect, Route } from 'react-router-dom';
import {
  IonApp,
  IonIcon,
  IonLabel,
  IonRouterOutlet,
  IonTabBar,
  IonTabButton,
  IonTabs,
} from '@ionic/react';
import { IonReactRouter } from '@ionic/react-router';
import { ellipse, square, triangle } from 'ionicons/icons';
import Home from './pages/Home/Home';
import Profil from './pages/Profil/Profil';
import Stats from './pages/Stats/Stats';
import LoginPage from './pages/LoginPage/LoginPage';
import RegisterPage from './pages/RegisterPage/RegisterPage';
import Overview from './pages/Overview/Overview';

/* Core CSS required for Ionic components to work properly */
import '@ionic/react/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/react/css/normalize.css';
import '@ionic/react/css/structure.css';
import '@ionic/react/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/react/css/padding.css';
import '@ionic/react/css/float-elements.css';
import '@ionic/react/css/text-alignment.css';
import '@ionic/react/css/text-transformation.css';
import '@ionic/react/css/flex-utils.css';
import '@ionic/react/css/display.css';

/* Theme variables */
import './theme/variables.css';

const App: React.FC = () => {
  let vh = window.innerHeight * 0.01;
  document.documentElement.style.setProperty('--vh', `${vh}px`);

  return(
    <IonApp>
      <IonReactRouter>
        {/* <IonTabs> */}
          <IonRouterOutlet>
            <Route exact path="/profil">
              <Profil />
            </Route>
            <Route exact path="/home">
              <Home />
            </Route>
            <Route path="/stats">
              <Stats />
            </Route>
            <Route path="/signin">
              <LoginPage />
            </Route>
            <Route path="/signup">
              <RegisterPage />
            </Route>
            <Route path="/overview">
              <Overview />
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>

          {/* <IonTabBar slot="bottom">
            <IonTabButton tab="Profil" href="/profil">
              <IonIcon icon={triangle} />
              <IonLabel>Profil</IonLabel>
            </IonTabButton>
            <IonTabButton tab="Overview" href="/overview">
              <IonIcon icon={ellipse} />
              <IonLabel>Overview</IonLabel>
            </IonTabButton>
            <IonTabButton tab="Stats" href="/stats">
              <IonIcon icon={square} />
              <IonLabel>Statistiques</IonLabel>
            </IonTabButton>
          </IonTabBar>
        </IonTabs> */}
      </IonReactRouter>
    </IonApp>
  )
}

export default App;
