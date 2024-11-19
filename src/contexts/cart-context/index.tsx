import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { getCarrinho, addItemToCarrinho, removeItemFromCarrinho, clearCarrinho } from '../../services/carrinhoService';

interface Item {
  id: number;
  movelId: number;
  quantidade: number;
  nome: string;
  preco: number;
  urlImagem: string | null; // Adicionado campo para a URL da imagem
}

interface CarrinhoContextProps {
  itens: Item[];
  totalItens: number;
  total: number;
  adicionarAoCarrinho: (movelId: number, quantidade: number) => Promise<void>;
  removerDoCarrinho: (itemId: number) => Promise<void>;
  limparCarrinho: () => Promise<void>;
}

interface CarrinhoProviderProps {
  children: ReactNode;
}

const CarrinhoContext = createContext<CarrinhoContextProps | undefined>(undefined);

export const CarrinhoProvider: React.FC<CarrinhoProviderProps> = ({ children }) => {
  const [itens, setItens] = useState<Item[]>([]);

  useEffect(() => {
    const carregarCarrinho = async () => {
        try {
          const carrinho = await getCarrinho();
          setItens(carrinho.itens || []);
        } catch (err) {
          console.error('Erro ao carregar o carrinho:', err);
          setItens([]);
        }
    };
    carregarCarrinho();
  }, []);

  const adicionarAoCarrinho = async (movelId: number, quantidade: number) => {
    const item = await addItemToCarrinho(movelId, quantidade);
    setItens((prev) => [...prev, item]);
  };

  const removerDoCarrinho = async (itemId: number) => {
    await removeItemFromCarrinho(1, itemId);
    setItens((prev) => prev.filter((item) => item.id !== itemId));
  };

  const limparCarrinho = async () => {
    await clearCarrinho(1);
    setItens([]);
  };

  const totalItens = itens.reduce((acc, item) => acc + item.quantidade, 0);
  const total = itens.reduce((acc, item) => acc + item.quantidade * item.preco, 0);

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        totalItens,
        total,
        adicionarAoCarrinho,
        removerDoCarrinho,
        limparCarrinho,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
};

export const useCarrinho = () => {
  const context = useContext(CarrinhoContext);
  if (!context) throw new Error('useCarrinho deve ser usado dentro de CarrinhoProvider');
  return context;
};
