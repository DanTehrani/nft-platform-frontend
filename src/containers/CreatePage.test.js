import React from 'react';
import Enzyme, { shallow, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { CreatePage, styles } from './CreatePage.js';
import TokenCard from '../components/TokenCard.js';
import { Button } from '@material-ui/core';

Enzyme.configure({ adapter: new Adapter() });

const createTestProps = () => {
  return {
    createToken: () => {},
    uploading: true,
    classes: styles
  }
};

describe('CreatePage', () => {
  let props;
  beforeEach(() => {
    props = createTestProps();
  });

  describe('when create is clicked', () => {
    let createPageWrapper;
    let createButton;
    let createTokenMock;

    beforeEach(() => {
      createTokenMock = jest.fn();
      createPageWrapper = mount(<CreatePage {...props} createToken={createTokenMock}/>);
      createButton = createPageWrapper.find(Button).at(1);
    });

    it('should handle click event', () => {
      createButton.simulate('click');
      expect(createTokenMock).toHaveBeenCalled();
    });
  });

  describe('when cancel upload is clicked', () => {
    let createPageWrapper;
    let createButton;
    let cancelCreateTokenMock;

    beforeEach(() => {
      cancelCreateTokenMock = jest.fn();
      createPageWrapper = mount(<CreatePage {...props} cancelCreateToken={cancelCreateTokenMock}/>);
      createButton = createPageWrapper.find('div.dialog').find(Button);
    });

    it('should handle click event', () => {
      createButton.simulate('click');
      expect(cancelCreateTokenMock).toHaveBeenCalled();
    });
  });
});
