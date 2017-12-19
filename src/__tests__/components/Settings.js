import React from 'react';
import Immutable from 'immutable';
import { shallow } from 'enzyme';
import Settings from '../../components/Settings';

let wrapper;

const userDoc = Immutable.fromJS({})
const createNewUserDoc = jest.fn();

describe("Settings", () => {
  it("should render Settings without crashing", () => {
    wrapper = shallow(<Settings
      userDoc={userDoc}
      createNewUserDoc={createNewUserDoc}
    />);
    expect(wrapper.exists()).toBe(true);
  });
});
