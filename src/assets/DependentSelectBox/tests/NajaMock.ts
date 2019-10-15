import { Naja } from 'naja';

const NajaMock = {
  addEventListener: jest.fn(),
  defaultOptions: {},
  fireEvent: jest.fn(),
  initialize: jest.fn(),
  makeRequest: jest.fn(),
  registerExtension: jest.fn(),
};

export default (NajaMock as unknown) as Naja;
