// reportController.test.js
const reportController = require('../controllers/controller.reports');
const reportModel = require('../models/model.reports');

const req = {
  query: {
    startDate: '2024-01-01',
    endDate: '2024-02-01',
  },
};

const res = {
  status: jest.fn(() => res),
  json: jest.fn(),
};

// Mock the calcProfitLoss function
jest.mock('../models/model.reports', () => ({
  calcProfitLoss: jest.fn(),
  StockMomentReport: jest.fn(),
}));

describe('profitandloss function', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('responds with the calculated profit and loss', async () => {
    // Mock the calcProfitLoss function to return specific values
    reportModel.calcProfitLoss.mockResolvedValue({
      total_sale: 25,
      total_cost: 13,
      profit_loss: 12,
    });

    // Call the function with the mock request and response
    await reportController.profitandloss(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith({
      total_sale: 25,
      total_cost: 13,
      profit_loss: 12,
    });
  });

  it('handles the case where total_cost or total_sale is not available', async () => {
    // Mock the calcProfitLoss function to return undefined values
    reportModel.calcProfitLoss.mockResolvedValue({
      total_sale: undefined,
      total_cost: undefined,
      profit_loss: undefined,
    });

    // Call the function with the mock request and response
    await reportController.profitandloss(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Invoice Data Not exits',
    });
  });

  it('handles errors and responds with a 500 status', async () => {
    // Mock the calcProfitLoss function to throw an error
    reportModel.calcProfitLoss.mockRejectedValue(new Error('Test error'));

    // Call the function with the mock request and response
    await reportController.profitandloss(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Internel Server error',
    });
  });
});


describe('Checking Stock moment Report Validation', () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('Checking Stock moment result when undefine',async()=>{

    reportModel.calcProfitLoss.mockResolvedValue(undefined);

    await reportController.StockMoment(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({
      message: 'Error calculation Stock',
    });

  })

  it('responds with 200 and the stock report if StockMomentReport returns data', async () => {

    const fakeStockReport = [{ product: 'Fake Product', quantity: 10 }];
    reportModel.StockMomentReport.mockResolvedValue(fakeStockReport);

    await reportController.StockMoment(req, res);

    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(fakeStockReport);
  });

  it('responds with 500 if an error occurs during execution', async () => {

    reportModel.StockMomentReport.mockRejectedValue(new Error('Test error'));

    await reportController.StockMoment(req, res);

    // Assertions
    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: 'Internel Server error' });
  });
})
