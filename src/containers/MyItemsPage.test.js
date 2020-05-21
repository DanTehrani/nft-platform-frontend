import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { MyItemsPage, styles } from './MyItemsPage.js';
import TokenCard from '../components/TokenCard.js';

Enzyme.configure({ adapter: new Adapter() });

const createTestProps = () => {
  return {
    myTokens: [ { title: 'title 1', description: 'description 1', image: 'image'} ],
    loadMyItemsPage: () => {},
    classes : styles
  }
};

describe('MyItemsPage', () => {
  let props;
  beforeEach(() => {
    props = createTestProps();
  });

  describe('TokenCard', () => {
    let browsePageWrapper;
    let tokenCardWrapper;
    let myToken;
    beforeEach(() => {
      browsePageWrapper = shallow(<MyItemsPage {...props} />);
      tokenCardWrapper = browsePageWrapper.find(TokenCard);
      myToken = props.myTokens[0];
    });

    it('should render token card', () => {
      expect(tokenCardWrapper).toHaveLength(1);
    });

    it('should render token title correctly', () => {
      const { title } = myToken;
      expect(tokenCardWrapper.prop('title')).toBe(title);
    });

    it('should render token description correctly', () => {
      const { description } = myToken;
      expect(tokenCardWrapper.prop('description')).toBe(description);
    });

    it('should render token image correctly', () => {
      const { image } = myToken;
      expect(tokenCardWrapper.prop('image')).toBe(image);
    });
  });
});
