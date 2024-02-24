// const { createCustomer, readCustomer } = require('../controllers/controller.customer');

// describe('Customer Controller', () => {
// //   test('should create a new customer', async () => {
// //     const data = {
// //         title: 'Mr',
// //         fullname: 'John Doe',
// //         email: 'john.doe@example.com',
// //         nic: '123456789',
// //         contactno: '1234567890',
// //         street1: '123 Main St',
// //         street2: 'Apt 456',
// //         city: 'Cityville',
// //         country: 'Countryland',
// //         vatno: 'VAT123'
// //     };

// //     const result = await createCustomer({ body: data });
// //     expect(result.statusCode).toBe(201);
// //     expect(result.body.message).toBe('Customer created successfully');
// //     expect(result.body.customerId).toBeDefined();
// //   });

//   test('should read a customer', async () => {
//     const customerId = 19;

//     const result = await readCustomer({ params: { id: customerId } });
//     expect(result.statusCode).toBe(200);
//     expect(result.body).toBeDefined();
//   });
// });
