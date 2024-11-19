import { getToken } from './authService';

const API_URL = 'http://localhost:3000';

export const getCarrinho = async () => {
  const token = getToken();
  if (!token) throw new Error('Usuário não autenticado');

  const response = await fetch(`${API_URL}/carrinho`, {
    method: 'GET',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error('Erro ao buscar o carrinho');
  return response.json();
};

export const getTotalItensCarrinho = async () => {
    const token = getToken();
    if (!token) throw new Error('Usuário não autenticado');
  
    const response = await fetch(`${API_URL}/carrinho`, {
      method: 'GET',
      headers: { Authorization: `Bearer ${token}` },
    });
  
    if (!response.ok) throw new Error('Erro ao buscar o carrinho');
  
    const carrinho = await response.json();
  
    // Soma a quantidade de itens no carrinho
    return carrinho.items.reduce((total: number, item: { quantidade: number }) => total + item.quantidade, 0);
};

export const addItemToCarrinho = async (movelId: number, quantidade: number) => {
  const token = getToken();
  if (!token) throw new Error('Usuário não autenticado');

  const response = await fetch(`${API_URL}/carrinho/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ movelId, quantidade }),
  });

  if (!response.ok) throw new Error('Erro ao adicionar item no carrinho');
  return response.json();
};

export const removeItemFromCarrinho = async (carrinhoId: number, itemId: number) => {
  const token = getToken();
  if (!token) throw new Error('Usuário não autenticado');

  const response = await fetch(`${API_URL}/carrinho/${carrinhoId}/item/${itemId}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error('Erro ao remover item do carrinho');
};

export const clearCarrinho = async (carrinhoId: number) => {
  const token = getToken();
  if (!token) throw new Error('Usuário não autenticado');

  const response = await fetch(`${API_URL}/carrinho/${carrinhoId}/clear`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token}` },
  });

  if (!response.ok) throw new Error('Erro ao limpar carrinho');
};
