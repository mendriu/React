import client from './client';

export async function getItems() {
  const { data } = await client.get('/items/');
  return data;
}

export async function getItem(id) {
  const { data } = await client.get(`/items/${id}`);
  return data;
}

export async function createItem(item) {
  const { data } = await client.post('/items/', item);
  return data;
}

export async function updateItem(id, item) {
  const { data } = await client.put(`/items/${id}`, item);
  return data;
}

export async function deleteItem(id) {
  await client.delete(`/items/${id}`);
}
