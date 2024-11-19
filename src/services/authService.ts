const API_URL = 'http://localhost:3000';

export const login = async (email: string, password: string) => {
  try {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, senha: password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erro ao fazer login');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    console.log(data.token);
    return data.token;
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao conectar com o servidor');
  }
};

export const register = async (userData: any) => {
  try {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erro ao registrar');
    }

    const data = await response.json();
    localStorage.setItem('token', data.token);
    return data.token;
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao conectar com o servidor');
  }
};


export const getProfile = async () => {
  const token = getToken();

  if (!token) throw new Error('Usuário não autenticado');

  try {
    const response = await fetch(`${API_URL}/users/profile`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erro ao buscar perfil');
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao conectar com o servidor');
  }
};

export const getAllMoveis = async () => {
  try {
    const response = await fetch(`${API_URL}/moveis`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erro ao buscar todos os móveis');
    }

    const data = await response.json();

    return data.map((item: any) => ({
      id: item.idMovel,
      name: item.nome,
      price: item.preco,
      imgSrc: item.urlImagem,
    }));
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao conectar com o servidor');
  }
};

export const getMovelByUser = async () => {
  const token = getToken();

  if (!token) throw new Error('Usuário não autenticado');

  try {
    const response = await fetch(`${API_URL}/moveis/usuario`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erro ao buscar móvel');
    }

    const data = await response.json();

    console.log('Resposta da API:', data);

    return data.map((item: any) => ({
      id: item.idMovel,
      name: item.nome,
      price: item.preco,
      imgSrc: item.urlImagem,
    }));
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao conectar com o servidor');
  }
};

export const getMovelById = async (id: number) => {
  if (isNaN(id)) {
    throw new Error('ID inválido fornecido para a busca de móvel');
  }

  const token = getToken();
  if (!token) throw new Error('Usuário não autenticado');

  try {
    const response = await fetch(`${API_URL}/moveis/${id}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erro ao buscar móvel por ID');
    }

    const data = await response.json();
    return {
      id: data.idMovel,
      nome: data.nome,
      preco: data.preco,
      estado: data.estado,
      descricao: data.descricao,
      urlImagem: data.urlImagem,
    };
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao conectar com o servidor');
  }
};

export const updateMovel = async (id: number, updatedData: any) => {
  const token = getToken();

  if (!token) throw new Error('Usuário não autenticado');

  try {
    const response = await fetch(`${API_URL}/moveis/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(updatedData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erro ao atualizar móvel');
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao conectar com o servidor');
  }
};

export const addMovel = async (movelData: any) => {
  const token = getToken();

  if (!token) throw new Error('Usuário não autenticado');

  try {
    const response = await fetch(`${API_URL}/moveis`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(movelData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erro ao adicionar móvel');
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao conectar com o servidor');
  }
};


export const deleteMovel = async (id: number) => {
  const token = getToken();

  if (!token) throw new Error('Usuário não autenticado');

  try {
    const response = await fetch(`${API_URL}/moveis/${id}`, {
      method: 'DELETE',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Erro ao excluir o móvel');
    }
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao conectar com o servidor');
  }
};

export const logout = () => {
  localStorage.removeItem('token');
};

export const getToken = () => {
  return localStorage.getItem('token');
};

export const isAuthenticated = () => {
  return !!getToken();
};
