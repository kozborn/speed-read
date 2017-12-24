import React from 'react';
import { shallow } from 'enzyme';
import Header from '../../components/Header';

let wrapper;

describe("Header", () => {
  it("should render Header without crashing", () => {
    wrapper = shallow(<Header />);
    expect(wrapper.exists()).toBe(true);
  });
});
