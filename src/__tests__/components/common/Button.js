import React from 'react';
import { shallow } from 'enzyme';
import Button from '../../../components/common/Button';

const onClick = jest.fn();

describe("Button component", () => {
  it("should render button component without crashing", () => {
    const btn = shallow(<Button onClick={onClick}>Test</Button>);
    expect(btn.exists()).toBe(true);
  });
  it("should call onClick props when clicked", () => {
    const btn = shallow(<Button onClick={onClick}>Test</Button>);
    btn.simulate('click');
    expect(onClick).toHaveBeenCalled();
  });
});
