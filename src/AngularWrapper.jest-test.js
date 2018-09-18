import React from 'react';
import { shallow } from 'enzyme';
import AngularWrapper from './AngularWrapper';

describe('AngularWrapper', () => {
  it('should render', () => {
    const element = shallow(
      <AngularWrapper
        moduleName="plopWrapper"
        component="plop"
      />,
    );

    expect(element).toMatchSnapshot();
  });

  it('should set the proper angular attributes', () => {
    const element = shallow(
      <AngularWrapper
        moduleName="plopWrapper"
        component="plop"
        bindings={{
          foo: 'bar',
        }}
        interpolateBindings={{
          boo: 'faz',
        }}
      />,
    );

    expect(element.instance().angularComponent).toEqual(<plop boo="{{boo}}" foo="foo" />);
  });

  it('should update the scope when props are updated', () => {
    const element = shallow(
      <AngularWrapper
        moduleName="plopWrapper"
        component="plop"
        bindings={{
          foo: 'bar',
        }}
        interpolateBindings={{
          boo: 'faz',
        }}
      />,
    );

    element.instance().angularRef = { $scope: { $digest: jest.fn() } };

    element.setProps({ interpolateBindings: { boo: 'qaz' } });
    expect(element.instance().angularRef.$scope).toMatchObject({ boo: 'qaz', foo: 'bar' });

    element.setProps({ bindings: { foo: 'baz' } });
    expect(element.instance().angularRef.$scope).toMatchObject({ boo: 'qaz', foo: 'baz' });

    expect(element.instance().angularRef.$scope.$digest).toHaveBeenCalledTimes(2);
  });
});
