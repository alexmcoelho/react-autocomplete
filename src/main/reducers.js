import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import AutocompleteReducer from '../common/form/autocomplete/autocompleteReducer';

const rootReducer = combineReducers({
    form: formReducer,
    autocompleteReducer: AutocompleteReducer,
});

export default rootReducer;