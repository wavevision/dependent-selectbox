import { Naja } from 'naja';

const NajaMock = {
  addEventListener: jest.fn(),
  defaultOptions: {},
  dispatchEvent: jest.fn(),
  initialize: jest.fn(),
  makeRequest: jest.fn(),
  registerExtension: jest.fn(),
  snippetHandler: {
    addEventListener: jest.fn(),
  },
};

export default (NajaMock as unknown) as Naja;
