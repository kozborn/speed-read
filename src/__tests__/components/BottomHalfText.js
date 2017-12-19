import React from 'react';
import Immutable from 'immutable';
import { shallow } from 'enzyme';
import BottomHalfText from '../../components/BottomHalfText';

let wrapper;

const text = Immutable.fromJS({
  'text': "Lorem ipsum",
  'title': "Dolor sit amet",
})

describe("BottomHalfText", () => {
  it("should render BottomHalfText without crashing", () => {
    wrapper = shallow(<BottomHalfText
      text={text}
    />);
    expect(wrapper.exists()).toBe(true);
  });
});
