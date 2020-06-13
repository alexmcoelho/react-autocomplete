import { reduxForm, Field } from 'redux-form';
import React, { Component } from 'react';
import InputAutocomplete from '../common/form/autocomplete/inputAutocomplete';
import { connect } from 'react-redux';
import { getList, selectObj, returnObj, init } from '../common/form/autocomplete/autocompleteActions';
import { bindActionCreators } from 'redux';
import { city1, city2, category1, entityCity, entityCategory } from '../common/form/autocomplete/keyAutocomplete';

class Form extends Component {

  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.init();
  }

  onSubmit(v) {
    console.log('Sem tratamento de dados: ', v);
    const o = {
      ...v, 
      city1: { id: returnObj(city1) }, 
      city2: { id: returnObj(city2) },
      category1: { id: returnObj(category1) }
    };
    console.log('Com tratamento de dados: ', o);
  }

  handleFetchCity = ({ value }) => {
    this.props.getList(value, entityCity, "name");
  }

  handleFetchCategory = ({ value }) => {
    this.props.getList(value, entityCategory, "name");
  }

  render() {
    const { handleSubmit, suggestions } = this.props;
    return (
      <div className='form'>
        <section className='content'>
          <div className="nav-tabs-custom">
            <form onSubmit={handleSubmit(v => this.onSubmit(v))}>
              <div className='box-body'>

                <div className='row'>
                  <div className="col-xs-12">
                    <h2>Autocomplete</h2>
                  </div>
                </div>

                <div className="col-xs-12 col-sm-4">
                  <div className='form-group'>
                    <label>Cidade 1</label>
                    <Field
                      name={city1}
                      component={InputAutocomplete}
                      suggestions={suggestions}
                      handleFetch={this.handleFetchCity}
                      returnName={false}
                      valueJSON={city1}
                    />
                  </div>
                </div>
                <div className="col-xs-12 col-sm-4">
                  <div className='form-group'>
                    <label>Cidade 2</label>
                    <Field
                      name={city2}
                      component={InputAutocomplete}
                      suggestions={suggestions}
                      handleFetch={this.handleFetchCity}
                      returnName={false}
                      valueJSON={city2}
                    />
                  </div>
                </div>
                <div className="col-xs-12 col-sm-4">
                  <div className='form-group'>
                    <label>Categoria</label>
                    <Field
                      name={category1}
                      component={InputAutocomplete}
                      suggestions={suggestions}
                      handleFetch={this.handleFetchCategory}
                      returnName={false}
                      valueJSON={category1}
                    />
                  </div>
                </div>
              </div>
              
              <div className='box-footer'>
                <button type="submit" className='btn btn-primary'>Enviar</button>
              </div>
            </form>
          </div>
        </section>
      </div>
    );
  }
}


Form = reduxForm({
  form: 'simple',
})(Form);

const mapStateToProps = state => ({ 
  suggestions: state.autocompleteReducer.suggestions 
});
const mapDispatchToProps = dispatch => bindActionCreators({ getList, selectObj, init }, dispatch);
export default connect(mapStateToProps, mapDispatchToProps)(Form);
