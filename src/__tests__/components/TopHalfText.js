import React from 'react';
import Immutable from 'immutable';
import { shallow } from 'enzyme';
import TopHalfText from '../../components/TopHalfText';

let wrapper;

const text = Immutable.fromJS({
  'text': "Lorem ipsum",
  'title': "Dolor sit amet",
})

describe("TopHalfText", () => {
  it("should render TopHalfText without crashing", () => {
    wrapper = shallow(<TopHalfText
      text={text}
    />);
    expect(wrapper.exists()).toBe(true);
  });
});
