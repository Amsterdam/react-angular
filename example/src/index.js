import React from 'react';
import ReactDOM from 'react-dom';
import './angular-module';
import { AngularWrapper } from '../../src';

class ReactWithAngular extends React.Component {
  state = {
    message: 'Hello! this is a interpolate binding (@)',
    foo: 'This is a one-way binding (<)',
  };

  setMessage = () => {
    this.setState({
      message: 'Changed interpolate binding!',
    });
  };

  setFoo = () => {
    this.setState({
      foo: 'Changed binding!',
    });
  };

  render() {
    const { message, foo } = this.state;
    return (
      <div>
        <AngularWrapper
          moduleName="ngExampleWrapper"
          component="ngExampleComponent"
          dependencies={['ngExample']}
          interpolateBindings={{
            message,
          }}
          bindings={{
            foo,
          }}
        />
        <button type="button" onClick={this.setMessage}>Change the interpolate binding!</button>
        <button type="button" onClick={this.setFoo}>Change the binding!</button>
      </div>
    );
  }
}

ReactDOM.render(React.createElement(ReactWithAngular), document.getElementById('root'));
