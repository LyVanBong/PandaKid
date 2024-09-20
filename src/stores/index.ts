import UIStore from './ui';
import SessionStore from './session';

const stores = {
  uiStore: new UIStore(),
  sessionStore: new SessionStore(),
};

export default stores;
