import client from './client';

export async function loginUser(username, password) {
  const params = new URLSearchParams();
  params.append('username', username);
  params.append('password', password);

  const { data } = await client.post('/token', params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  return data;
}

export async function registerUser(username, password) {
  const { data } = await client.post('/register', { username, password });
  return data;
}

export async function getCurrentUser() {
  const { data } = await client.get('/users/me');
  return data;
}
