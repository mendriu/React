import client from './client';

export async function loginUser(email, password) {
  const params = new URLSearchParams();
  params.append('username', email);
  params.append('password', password);

  const { data } = await client.post('/auth/login', params, {
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
  });
  return data;
}

export async function registerUser(email, password) {
  const { data } = await client.post('/auth/register', { email, password });
  return data;
}

export async function getCurrentUser() {
  const { data } = await client.get('/auth/me');
  return data;
}
