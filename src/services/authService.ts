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
      imgSrc: `${API_URL}/${item.urlImagem}`,
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
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);
      throw new Error(errorData?.error || 'Erro ao buscar móveis do usuário');
    }

    const contentType = response.headers.get('Content-Type');

    if (contentType?.includes('application/json')) {
      const data = await response.json();

      console.log('Resposta da API:', data);

      data.map((item: any) => {
        console.log(`${item.urlImagem}`)
      })
      return data.map((item: any) => ({
        id: item.idMovel,
        name: item.nome,
        price: item.preco,
        imgSrc: `${API_URL}/${item.urlImagem}`,
      }));
    } else if (contentType?.includes('image/') || contentType?.includes('application/octet-stream')) {
      const blob = await response.blob();
      const urlImagem = URL.createObjectURL(blob);
      return [
        {
          id: null,
          name: 'Imagem associada ao usuário',
          price: null,
          imgSrc: urlImagem,
        },
      ];
    } else {
      throw new Error('Formato de resposta não suportado');
    }
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

    const urlBaseImagens = `${API_URL}`;
    return {
      id: data.idMovel,
      nome: data.nome,
      preco: data.preco,
      estado: data.estado,
      descricao: data.descricao,
      urlImagem: `${urlBaseImagens}/${data.urlImagem}`,
    };
  } catch (error: any) {
    throw new Error(error.message || 'Erro ao conectar com o servidor');
  }
};


export const updateMovel = async (id: number, updatedData: FormData) => {
  const token = getToken();

  if (!token) throw new Error('Usuário não autenticado');

  try {
    const response = await fetch(`${API_URL}/moveis/${id}`, {
      method: 'PUT',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: updatedData,
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


export const addMovel = async (movelData: FormData) => {
  const token = getToken();

  if (!token) throw new Error('Usuário não autenticado');

  try {
    const response = await fetch(`${API_URL}/moveis`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: movelData,
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

export const createServico = async (servicoData: any) => {
  const token = getToken();

  if (!token) throw new Error("Usuário não autenticado");

  try {
    const response = await fetch(`${API_URL}/servicos`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(servicoData),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erro ao criar serviço");
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || "Erro ao conectar com o servidor");
  }
};

export const listServicos = async () => {
  const token = getToken();

  if (!token) throw new Error("Usuário não autenticado");

  try {
    const response = await fetch(`${API_URL}/servicos`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || "Erro ao listar serviços");
    }

    return await response.json();
  } catch (error: any) {
    throw new Error(error.message || "Erro ao conectar com o servidor");
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
