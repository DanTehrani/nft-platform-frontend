import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { BrowsePage, styles } from './BrowsePage.js';
import TokenCard from '../components/TokenCard.js';

Enzyme.configure({ adapter: new Adapter() });

const createTestProps = () => {
  return {
    tokens: [ { title: 'title 1', description: 'description 1', image: 'image'} ],
    loadBrowsePage: () => {},
    classes : styles
  }
};

describe('BrowsePage', () => {
  let props;
  beforeEach(() => {
    props = createTestProps();
  });

  describe('TokenCard', () => {
    let browsePageWrapper;
    let tokenCardWrapper;
    let token;
    beforeEach(() => {
      browsePageWrapper = shallow(<BrowsePage {...props} />);
      tokenCardWrapper = browsePageWrapper.find(TokenCard);
      token = props.tokens[0];
    });

    it('should render token card', () => {
      expect(tokenCardWrapper).toHaveLength(1);
    });

    it('should render token title correctly', () => {
      const { title } = token;
      expect(tokenCardWrapper.prop('title')).toBe(title);
    });

    it('should render token description correctly', () => {
      const { description } = token;
      expect(tokenCardWrapper.prop('description')).toBe(description);
    });

    it('should render token image correctly', () => {
      const { image } = token;
      expect(tokenCardWrapper.prop('image')).toBe(image);
    });
  });
});
