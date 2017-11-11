import React from 'react'
import { shallow } from 'enzyme'
import { defaultDoc } from '../../__mocks__/defaultDocMock';
import HomePage from '../../components/HomePage';
import { HomeArticle } from '../../components/HomePage';

let wrapper;

describe("App", () => {
  it("should render App without crashing", () => {
    wrapper = shallow(<HomePage 
      memorizing={defaultDoc.get('memorizing')}
      reading={defaultDoc.get('reading')}
      understanding={defaultDoc.get('understanding')}
      thinking={defaultDoc.get('thinking')}
      anticipating={defaultDoc.get('anticipating')}
    />);
    expect(wrapper.exists()).toBe(true);
  });

  it("should render 5 article sections", () => {
    const articles = wrapper.find('HomeArticle')
    
    expect(articles.length).toBe(5)
  })
});