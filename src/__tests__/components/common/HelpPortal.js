import React from 'react'
import { shallow, mount } from 'enzyme'
import Modal from '../../../components/common/Modal'
import HelpPortal from '../../../components/common/HelpPortal'

describe("Help portal", () => {
  it("should render help modal with trigger", () => {
    const component = shallow(<HelpPortal helpKey="test-key" />)
    expect(component.exists()).toBe(true);
  })

  it("should render modal component", () => {
    const component = mount(<HelpPortal helpKey="test-key" />)
    expect(component.find(Modal).exists()).toBe(true);
  })
})
