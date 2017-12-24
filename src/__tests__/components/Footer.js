import React from 'react';
import { shallow } from 'enzyme';
import Footer from '../../components/Footer';

let wrapper;

describe("App", () => {
  it("should render Footer without crashing", () => {
    wrapper = shallow(<Footer />);
    expect(wrapper.exists()).toBe(true);
  });
});
