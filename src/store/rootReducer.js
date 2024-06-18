import { combineReducers } from 'redux';
import auth from './auth/reducer';
import setting from './setting/reducer';
import app from './app/reducer';
import ecomerce from './ecomerce/reducer';
import categories from './categories/reducer';
import favsItems from './favourite/reducer';
import comments from './comments/reducer';
import rate from './rate/reducer';
import TermsAndConditions from './TermsAndConditions/reducer';
import search from './search/reducer';
import contact from './contact/reducer';
import faq from './faq/reducer';
import singleProduct from './products/reducer';
import userItems from './userItems/reducer';
import AboutUs from './TermsAndConditions/reducer';
import cities from './cities/reducer';
import Recent from './userItems/reducer';
import socialLinks from './socialLinks/reducer';
import addItems from './addItems/reducer';
import IncreaseAnalatycis from './contact/reducer';
import UserProfile  from './User/reducer';

export default combineReducers({
    auth,
    setting,
    app,
    ecomerce,
    categories,
    singleProduct,
    contact,
    favsItems,
    comments,
    rate,
    TermsAndConditions,
    search,
    faq,
    userItems,
    AboutUs,
    addItems,
    cities,
    IncreaseAnalatycis,
    socialLinks,
    Recent,
    UserProfile
});
