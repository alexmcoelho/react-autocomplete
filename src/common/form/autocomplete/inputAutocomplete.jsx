import React from 'react';
import { selectObj } from './autocompleteActions';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import AutoSuggest from 'react-autosuggest';

class Input extends React.PureComponent {
    
    constructor(props) {
        super(props);
        this.state = {
            filteredSuggestions: [],
            obj: {}
        };
    }

    handleClear = () => {
        this.setState({ filteredSuggestions: [] });
    }

    handleGetSuggestion = (props) => {
        this.setState({obj: props});
        return props.label;
    }
    
    handleSuggestionHighlighted = ({ suggestion }) => {
        this.setState({ highlightedSuggestion: suggestion });
    }
    
    renderSuggestion = (props) => {
        return (
            <span>{props.label}</span>
        );
    }

    handleSuggestionSelected = (event, { suggestion, suggestionValue, index, method }) => {
        const { input } = this.props;
        input.onChange(suggestion.label);
        if (method === 'enter') {
            event.preventDefault();
        }
        let obj = {};
        obj[input.name] = suggestion.value;
        this.props.selectObj(obj);
    }

    render() {
        const { input, handleFetch, suggestions } = this.props;
        
        const theme = {
            container: 'autosuggest',
            input: 'form-control',
            suggestionsContainer: 'dropdown',
            suggestionsList: `dropdown-menu ${suggestions && suggestions.length ? 'show' : ''}`,
            suggestion: 'dropdown-item',
            suggestionFocused: 'active',
            suggestionHighlighted: 'react-autosuggest__suggestion--highlighted'

        };
        return (
            <div>
                <AutoSuggest
                    theme={theme}
                    suggestions={suggestions}
                    onSuggestionsFetchRequested={handleFetch}
                    onSuggestionsClearRequested={this.handleClear}
                    getSuggestionValue={this.handleGetSuggestion}
                    renderSuggestion={this.renderSuggestion}
                    onSuggestionHighlighted={this.handleSuggestionHighlighted}
                    onSuggestionSelected={this.handleSuggestionSelected}
                    inputProps={input}
                />

            </div>
        );
    }

}
const mapDispatchToProps = dispatch => bindActionCreators({ selectObj }, dispatch);
const mapStateToProps = state => ({
    suggestions: state.autocompleteReducer.suggestions
});
export default connect(mapStateToProps, mapDispatchToProps)(Input);