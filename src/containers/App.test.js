import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { App, styles } from './App.js';
import ErrorMessage from '../components/ErrorMessage.js';
import ErrorPage from '../containers/ErrorPage.js';

Enzyme.configure({ adapter: new Adapter() });

const createTestProps = () => {
  return {
    address: '0xB16100f7187183568d7f05269fA7708c6AE34a65',
    balance: 100,
    metaMaskNetworkID: 5777,
    classes : styles
  }
};

describe('App', () => {
  let props;
  beforeEach(() => {
    props = createTestProps();
  });

  describe('error handling', () => {
    describe('when there is an error', () => {
      let appWrapper;
      beforeEach(() => {
        appWrapper = shallow(<App {...props} errorMessage={new Error('error')} />);
      });
      it('should redirect to error page', () => {
        expect(appWrapper.find(ErrorPage)).toHaveLength(1);
      });
    });

    describe('when there is no error', () => {
      let appWrapper;
      beforeEach(() => {
        appWrapper = shallow(<App {...props} />);
      });
      it('should not render error indicator', () => {
        expect(appWrapper.find(ErrorPage)).toHaveLength(0);
      });
    });

  });
});
