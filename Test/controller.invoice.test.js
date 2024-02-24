const InvoiceController = require('../controllers/controller.invoice');
const InvoicetModel = require('../models/model.invoice');

const req = {
    body : {
        barcode : '12345'
    }
}

const res = {
    status: jest.fn(() => res),
    json: jest.fn(),
}

jest.mock('../models/model.invoice', ()=>({
    getItemPriceById: jest.fn(),
}));

describe('Invoice getItemPriceById function', () => {
    afterEach(() => {
      jest.clearAllMocks();
    });

    it('Checking The result is the return data is undefine', async()=>{
        InvoicetModel.getItemPriceById.mockResolvedValue(undefined);

        await InvoiceController.getItemPriceById(req, res)

        expect(res.status).toHaveBeenCalledWith(404);
        expect(res.json).toHaveBeenCalledWith({
          error: 'Items not found!',
        });
    })

    it('If a result have valide data should return 200', async()=>{
        const mockData = { barcode: '123', price: 10.99 };
        InvoicetModel.getItemPriceById.mockResolvedValue(mockData);

        await InvoiceController.getItemPriceById(req, res);

        expect(res.status).toHaveBeenCalledWith(200);
        expect(res.json).toHaveBeenCalledWith(mockData);
    })

    it('If any Error Return 500 with message',async()=>{
        InvoicetModel.getItemPriceById.mockRejectedValue(new Error('Invoice Error'));

        await InvoiceController.getItemPriceById(req, res);

        expect(res.status).toHaveBeenCalledWith(500);
        expect(res.json).toHaveBeenCalledWith({
            error: 'Error occured while read!',
        });
    })

})