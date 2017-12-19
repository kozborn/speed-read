import React from 'react';
import Immutable from 'immutable';
import { shallow } from 'enzyme';
import Fixations from '../../components/Fixations';

let wrapper;

const text = Immutable.fromJS({
  'text': "Lorem ipsum",
  'title': "Dolor sit amet",
})

const savePreferences = jest.fn()

describe("Fixations", () => {
  it("should render Fixations without crashing", () => {
    wrapper = shallow(<Fixations
      text={text}
      savePreferences={savePreferences}
      fixationsSettings={Immutable.Map()}
    />);
    expect(wrapper.exists()).toBe(true);
  });
});
