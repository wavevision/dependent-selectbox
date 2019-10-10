const NajaMock: Naja = {
  addEventListener: jest.fn(),
  defaultOptions: {
    selector: {
      name: '',
      query: '',
    },
  },
  fireEvent: jest.fn(),
  formsHandler: {
    netteForms: {
      validateForm: jest.fn(),
    },
  },
  snippetHandler: {
    addEventListener: jest.fn(),
  },
  initialize: jest.fn(),
  makeRequest: jest.fn(),
  registerExtension: jest.fn(),
  uiHandler: {
    clickElement: jest.fn(),
    selector: '.ajax',
    submitForm: jest.fn(),
  },
};

export default NajaMock;
