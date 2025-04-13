export const mockOrder = jest.fn().mockResolvedValue({
  success: true,
  order: {
    _id: '67f8fe3be8e61d001cec1d79',
    name: 'Тестовый бургер',
    number: 74268
  }
});

export const mockPayload = {
  success: true,
  orders: [{ _id: '1', name: 'Order 1' }],
  total: 100,
  totalToday: 10
};
