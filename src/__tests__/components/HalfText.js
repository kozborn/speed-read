import React from 'react';
import Immutable from 'immutable';
import { shallow } from 'enzyme';
import HalfText from '../../components/HalfText';

let wrapper;

const text = Immutable.fromJS({
  'text': "Lorem ipsum",
  'title': "Dolor sit amet",
})

const handlerComponent = ({ children }) => <span>{children}</span>

describe("Half Text", () => {
  it("should render HalfText without crashing", () => {
    wrapper = shallow(<HalfText
      text={text}
      handlerComponent={handlerComponent}
    />);
    expect(wrapper.exists()).toBe(true);
  });
});
