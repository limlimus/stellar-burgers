export const loginUser = jest.fn().mockResolvedValue({
  success: true,
  user: {
    email: 'test@gmail.com',
    name: 'test'
  },
  accessToken:
    'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3Zjk0ZTZkZThlNjFkMDAxY2VjMWVmNiIsImlhdCI6MTc0NDM5MTc4OSwiZXhwIjoxNzQ0MzkyOTg5fQ.GgXHAI89QcJATl-78U8aX785aXO0ekiu09y1E3SZMpk',
  refreshToken:
    '2e09fd11ae313078edff5d7ca056e9bb6521a69d745678358f7eb1d409e8d1ba8d6d6de4991a627d'
});
