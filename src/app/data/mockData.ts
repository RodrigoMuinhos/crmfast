import { Store, Totem, Product, Order, User, DashboardStats, Customer, PointsHistory } from '../types';

export const mockStores: Store[] = [
  {
    id: '1',
    name: 'Loja Centro',
    cnpj: '12.345.678/0001-90',
    responsible: 'João Silva',
    phone: '(11) 98765-4321',
    address: 'Av. Paulista, 1000 - São Paulo, SP',
    openingHours: '08:00 - 20:00',
    status: 'active',
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '2',
    name: 'Loja Shopping Norte',
    cnpj: '12.345.678/0002-71',
    responsible: 'Maria Santos',
    phone: '(11) 98765-4322',
    address: 'Shopping Norte - Rua das Flores, 500 - São Paulo, SP',
    openingHours: '10:00 - 22:00',
    status: 'active',
    createdAt: new Date('2024-02-10'),
  },
  {
    id: '3',
    name: 'Loja Aeroporto',
    cnpj: '12.345.678/0003-52',
    responsible: 'Pedro Costa',
    phone: '(11) 98765-4323',
    address: 'Aeroporto de Guarulhos - Terminal 2',
    openingHours: '24 horas',
    status: 'active',
    createdAt: new Date('2024-03-05'),
  },
];

export const mockTotems: Totem[] = [
  {
    id: '1',
    name: 'Totem 01 - Recepção',
    storeId: '1',
    serialNumber: 'TM-2024-001',
    appVersion: '2.5.1',
    status: 'online',
    lastPing: new Date(),
    operationMode: 'service',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '2',
    name: 'Totem 02 - Corredor A',
    storeId: '1',
    serialNumber: 'TM-2024-002',
    appVersion: '2.5.1',
    status: 'online',
    lastPing: new Date(Date.now() - 120000),
    operationMode: 'service',
    createdAt: new Date('2024-01-20'),
  },
  {
    id: '3',
    name: 'Totem 01 - Entrada Principal',
    storeId: '2',
    serialNumber: 'TM-2024-003',
    appVersion: '2.5.0',
    status: 'offline',
    lastPing: new Date(Date.now() - 3600000),
    operationMode: 'service',
    createdAt: new Date('2024-02-15'),
  },
  {
    id: '4',
    name: 'Totem 02 - Praça de Alimentação',
    storeId: '2',
    serialNumber: 'TM-2024-004',
    appVersion: '2.5.1',
    status: 'online',
    lastPing: new Date(),
    operationMode: 'catalog',
    createdAt: new Date('2024-02-15'),
  },
  {
    id: '5',
    name: 'Totem 01 - Embarque',
    storeId: '3',
    serialNumber: 'TM-2024-005',
    appVersion: '2.4.8',
    status: 'maintenance',
    lastPing: new Date(Date.now() - 7200000),
    operationMode: 'blocked',
    createdAt: new Date('2024-03-10'),
  },
];

export const mockProducts: Product[] = [
  // Bebidas
  {
    id: '1',
    name: 'Coca-Cola 2L',
    description: 'Refrigerante Coca-Cola 2 litros',
    price: 8.99,
    image: 'https://images.unsplash.com/photo-1648569883125-d01072540b4c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2NhJTIwY29sYSUyMGJvdHRsZXxlbnwxfHx8fDE3Njc4MDU0OTN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Bebidas',
    sku: 'BEB-001',
    stock: 45,
    active: true,
    storeId: '1',
    order: 1,
    createdAt: new Date('2025-12-01'),
  },
  {
    id: '2',
    name: 'Água Mineral 500ml',
    description: 'Água mineral sem gás 500ml',
    price: 2.50,
    image: 'https://images.unsplash.com/photo-1602143407151-7111542de6e8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx3YXRlciUyMGJvdHRsZXxlbnwxfHx8fDE3Njc2OTc0Mzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Bebidas',
    sku: 'BEB-002',
    stock: 120,
    active: true,
    storeId: '1',
    order: 2,
    createdAt: new Date('2025-12-01'),
  },
  {
    id: '3',
    name: 'Energético 250ml',
    description: 'Energético lata 250ml',
    price: 9.99,
    image: 'https://images.unsplash.com/photo-1741519735476-cfc8bf0b2ae4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlbmVyZ3klMjBkcmluayUyMGNhbnxlbnwxfHx8fDE3Njc3NTgzODF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Bebidas',
    sku: 'BEB-003',
    stock: 60,
    active: true,
    storeId: '1',
    order: 3,
    createdAt: new Date('2025-12-01'),
  },
  {
    id: '4',
    name: 'Suco Natural 300ml',
    description: 'Suco natural 300ml',
    price: 6.50,
    image: 'https://images.unsplash.com/photo-1570831739435-6601aa3fa4fb?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxqdWljZSUyMGJvdHRsZXxlbnwxfHx8fDE3Njc3ODI4ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Bebidas',
    sku: 'BEB-004',
    stock: 30,
    active: true,
    storeId: '1',
    order: 4,
    createdAt: new Date('2025-12-01'),
  },
  {
    id: '5',
    name: 'Café Expresso',
    description: 'Café expresso tradicional',
    price: 4.50,
    image: 'https://images.unsplash.com/photo-1485808191679-5f86510681a2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxlc3ByZXNzbyUyMGNvZmZlZXxlbnwxfHx8fDE3Njc3NzU5MDF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Bebidas',
    sku: 'BEB-005',
    stock: 999,
    active: true,
    storeId: '1',
    order: 5,
    createdAt: new Date('2025-12-01'),
  },
  {
    id: '6',
    name: 'Refrigerante Lata',
    description: 'Refrigerante lata 350ml',
    price: 5.50,
    image: 'https://images.unsplash.com/photo-1696739696220-8d2e27465662?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzb2RhJTIwY2FufGVufDF8fHx8MTc2NzgwNjMyOHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Bebidas',
    sku: 'BEB-006',
    stock: 80,
    active: true,
    storeId: '1',
    order: 6,
    createdAt: new Date('2025-12-01'),
  },

  // Snacks
  {
    id: '7',
    name: 'Salgadinho 100g',
    description: 'Salgadinho sabor tradicional 100g',
    price: 5.99,
    image: 'https://images.unsplash.com/photo-1613919113640-25732ec5e61f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwb3RhdG8lMjBjaGlwc3xlbnwxfHx8fDE3Njc3OTkwNDJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Snacks',
    sku: 'SNK-001',
    stock: 75,
    active: true,
    storeId: '1',
    order: 7,
    createdAt: new Date('2025-12-01'),
  },
  {
    id: '8',
    name: 'Chocolate 90g',
    description: 'Barra de chocolate ao leite 90g',
    price: 7.50,
    image: 'https://images.unsplash.com/photo-1623660053975-cf75a8be0908?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaG9jb2xhdGUlMjBiYXJ8ZW58MXx8fHwxNzY3NzEwOTIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Snacks',
    sku: 'SNK-002',
    stock: 50,
    active: true,
    storeId: '1',
    order: 8,
    createdAt: new Date('2025-12-01'),
  },
  {
    id: '9',
    name: 'Biscoito Recheado',
    description: 'Biscoito recheado sabor chocolate',
    price: 4.99,
    image: 'https://images.unsplash.com/photo-1611945008668-76b643f43454?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb29raWVzJTIwYmlzY3VpdHxlbnwxfHx8fDE3Njc4MDYzMjl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Snacks',
    sku: 'SNK-003',
    stock: 65,
    active: true,
    storeId: '1',
    order: 9,
    createdAt: new Date('2025-12-01'),
  },
  {
    id: '10',
    name: 'Amendoim 150g',
    description: 'Amendoim torrado e salgado 150g',
    price: 7.99,
    image: 'https://images.unsplash.com/photo-1766085683509-e3e23700b37c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwZWFudXRzJTIwc25hY2t8ZW58MXx8fHwxNzY3ODA2MzMwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Snacks',
    sku: 'SNK-004',
    stock: 40,
    active: true,
    storeId: '1',
    order: 10,
    createdAt: new Date('2025-12-01'),
  },
  {
    id: '11',
    name: 'Bala Sortida 500g',
    description: 'Bala sortida sabores variados 500g',
    price: 6.99,
    image: 'https://images.unsplash.com/photo-1693665429986-82e7dab2636b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjYW5keSUyMHN3ZWV0fGVufDF8fHx8MTc2NzY5ODgxMHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Snacks',
    sku: 'SNK-005',
    stock: 35,
    active: true,
    storeId: '1',
    order: 11,
    createdAt: new Date('2025-12-01'),
  },

  // Doces
  {
    id: '12',
    name: 'Sorvete 1L',
    description: 'Sorvete sabor creme 1 litro',
    price: 15.90,
    image: 'https://images.unsplash.com/photo-1497034825429-c343d7c6a68f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxpY2UlMjBjcmVhbXxlbnwxfHx8fDE3Njc3NDk2ODZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Doces',
    sku: 'DOC-001',
    stock: 25,
    active: true,
    storeId: '1',
    order: 12,
    createdAt: new Date('2025-12-01'),
  },
  {
    id: '13',
    name: 'Croissant',
    description: 'Croissant artesanal',
    price: 8.50,
    image: 'https://images.unsplash.com/photo-1712723246766-3eaea22e52ff?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm9pc3NhbnQlMjBwYXN0cnl8ZW58MXx8fHwxNzY3ODAyOTM1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Doces',
    sku: 'DOC-002',
    stock: 20,
    active: true,
    storeId: '1',
    order: 13,
    createdAt: new Date('2025-12-01'),
  },
  {
    id: '14',
    name: 'Chiclete',
    description: 'Chiclete sabor menta',
    price: 2.99,
    image: 'https://images.unsplash.com/photo-1629431136420-23bbe56141a5?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaGV3aW5nJTIwZ3VtfGVufDF8fHx8MTc2NzgwNjMzMXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Doces',
    sku: 'DOC-003',
    stock: 100,
    active: true,
    storeId: '1',
    order: 14,
    createdAt: new Date('2025-12-01'),
  },

  // Alimentos
  {
    id: '15',
    name: 'Sanduíche Natural',
    description: 'Sanduíche natural fresco',
    price: 12.90,
    image: 'https://images.unsplash.com/photo-1763647814142-b1eb054d42f1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW5kd2ljaCUyMGZyZXNofGVufDF8fHx8MTc2Nzc3NTA2MXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Alimentos',
    sku: 'ALI-001',
    stock: 15,
    active: true,
    storeId: '1',
    order: 15,
    createdAt: new Date('2025-12-01'),
  },

  // Outros
  {
    id: '16',
    name: 'Cigarro',
    description: 'Cigarro maço',
    price: 12.00,
    image: 'https://images.unsplash.com/photo-1627449543657-ab677b2105cf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjaWdhcmV0dGUlMjBwYWNrfGVufDF8fHx8MTc2Nzc5ODYyMXww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Outros',
    sku: 'OUT-001',
    stock: 90,
    active: true,
    storeId: '1',
    order: 16,
    createdAt: new Date('2025-12-01'),
  },
  {
    id: '17',
    name: 'Isqueiro',
    description: 'Isqueiro descartável',
    price: 3.50,
    image: 'https://images.unsplash.com/photo-1576682631235-90941f11cf04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaWdodGVyJTIwZmlyZXxlbnwxfHx8fDE3Njc4MDYzMzJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Outros',
    sku: 'OUT-002',
    stock: 150,
    active: true,
    storeId: '1',
    order: 17,
    createdAt: new Date('2025-12-01'),
  },
  {
    id: '18',
    name: 'Pilha AA',
    description: 'Pilha alcalina AA (par)',
    price: 9.90,
    image: 'https://images.unsplash.com/photo-1706166987972-5c772443f29a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiYXR0ZXJpZXMlMjBhYXxlbnwxfHx8fDE3Njc4MDYzMzN8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'Outros',
    sku: 'OUT-003',
    stock: 70,
    active: true,
    storeId: '1',
    order: 18,
    createdAt: new Date('2025-12-01'),
  },
];

export const mockOrders: Order[] = [
  {
    id: '1',
    totemId: '1',
    storeId: '1',
    items: [
      { productId: '1', productName: 'Coca-Cola 2L', quantity: 2, price: 8.99 },
      { productId: '2', productName: 'Água Mineral 500ml', quantity: 2, price: 2.50 },
    ],
    total: 22.98,
    paymentMethod: 'pix',
    status: 'paid',
    createdAt: new Date('2026-01-07T10:30:00'),
    paidAt: new Date('2026-01-07T10:31:00'),
  },
  {
    id: '2',
    totemId: '1',
    storeId: '1',
    items: [
      { productId: '3', productName: 'Energético 250ml', quantity: 1, price: 9.99 },
      { productId: '5', productName: 'Café Expresso', quantity: 1, price: 4.50 },
      { productId: '4', productName: 'Suco Natural 300ml', quantity: 1, price: 6.50 },
    ],
    total: 20.98,
    paymentMethod: 'credit_card',
    status: 'paid',
    createdAt: new Date('2026-01-07T11:15:00'),
    paidAt: new Date('2026-01-07T11:16:00'),
  },
  {
    id: '3',
    totemId: '2',
    storeId: '1',
    items: [
      { productId: '7', productName: 'Salgadinho 100g', quantity: 1, price: 5.99 },
    ],
    total: 5.99,
    paymentMethod: 'debit_card',
    status: 'paid',
    createdAt: new Date('2026-01-07T12:00:00'),
    paidAt: new Date('2026-01-07T12:01:00'),
  },
  {
    id: '4',
    totemId: '1',
    storeId: '1',
    items: [
      { productId: '1', productName: 'Coca-Cola 2L', quantity: 3, price: 8.99 },
      { productId: '2', productName: 'Água Mineral 500ml', quantity: 3, price: 2.50 },
      { productId: '5', productName: 'Café Expresso', quantity: 2, price: 4.50 },
    ],
    total: 40.47,
    paymentMethod: 'pix',
    status: 'paid',
    createdAt: new Date('2026-01-07T13:45:00'),
    paidAt: new Date('2026-01-07T13:46:00'),
  },
  {
    id: '5',
    totemId: '4',
    storeId: '2',
    items: [
      { productId: '3', productName: 'Energético 250ml', quantity: 1, price: 9.99 },
    ],
    total: 9.99,
    paymentMethod: 'credit_card',
    status: 'pending_payment',
    createdAt: new Date('2026-01-07T14:20:00'),
  },
];

export const mockUsers: User[] = [
  {
    id: '1',
    name: 'Admin Master',
    email: 'admin@fastmarket.com',
    role: 'admin',
    active: true,
    createdAt: new Date('2024-01-01'),
  },
  {
    id: '2',
    name: 'João Silva',
    email: 'joao.silva@fastmarket.com',
    role: 'manager',
    storeId: '1',
    active: true,
    createdAt: new Date('2024-01-15'),
  },
  {
    id: '3',
    name: 'Maria Santos',
    email: 'maria.santos@fastmarket.com',
    role: 'manager',
    storeId: '2',
    active: true,
    createdAt: new Date('2024-02-10'),
  },
  {
    id: '4',
    name: 'Carlos Operador',
    email: 'carlos@fastmarket.com',
    role: 'operator',
    storeId: '1',
    active: true,
    createdAt: new Date('2024-03-01'),
  },
];

// Clientes Fast+
export const mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'João Silva',
    cpf: '123.456.789-00',
    phone: '(11) 98765-4321',
    email: 'joao.silva@email.com',
    points: 3450,
    totalPurchases: 12580.50,
    lastPurchaseDate: new Date('2026-01-06T14:30:00'),
    createdAt: new Date('2025-10-15'),
    active: true,
  },
  {
    id: '2',
    name: 'Maria Santos',
    cpf: '987.654.321-00',
    phone: '(11) 97654-3210',
    email: 'maria.santos@email.com',
    points: 8920,
    totalPurchases: 28450.00,
    lastPurchaseDate: new Date('2026-01-07T10:15:00'),
    createdAt: new Date('2025-09-20'),
    active: true,
  },
  {
    id: '3',
    name: 'Pedro Oliveira',
    cpf: '456.789.123-00',
    phone: '(11) 96543-2109',
    points: 1250,
    totalPurchases: 5680.00,
    lastPurchaseDate: new Date('2026-01-05T16:45:00'),
    createdAt: new Date('2025-11-10'),
    active: true,
  },
  {
    id: '4',
    name: 'Ana Costa',
    cpf: '789.123.456-00',
    phone: '(11) 95432-1098',
    email: 'ana.costa@email.com',
    points: 15670,
    totalPurchases: 52340.00,
    lastPurchaseDate: new Date('2026-01-07T09:20:00'),
    createdAt: new Date('2025-08-05'),
    active: true,
  },
  {
    id: '5',
    name: 'Carlos Mendes',
    cpf: '321.654.987-00',
    phone: '(11) 94321-0987',
    points: 420,
    totalPurchases: 1890.00,
    lastPurchaseDate: new Date('2026-01-04T18:30:00'),
    createdAt: new Date('2025-12-20'),
    active: true,
  },
];

export const mockPointsHistory: PointsHistory[] = [
  {
    id: '1',
    customerId: '1',
    orderId: '1',
    type: 'earned',
    points: 450,
    description: 'Compra de R$ 45,00',
    createdAt: new Date('2026-01-06T14:30:00'),
  },
  {
    id: '2',
    customerId: '2',
    orderId: '2',
    type: 'earned',
    points: 820,
    description: 'Compra de R$ 82,00',
    createdAt: new Date('2026-01-07T10:15:00'),
  },
  {
    id: '3',
    customerId: '4',
    type: 'adjusted',
    points: 500,
    description: 'Bônus por cadastro',
    createdAt: new Date('2025-08-05T10:00:00'),
  },
];

/**
 * Banco de dados mockado para apresentação (VP)
 * - Aumenta o volume dos dados sem quebrar as referências entre entidades.
 * - Mantém os IDs originais e cria clones com sufixo "-N".
 */
const MOCK_SCALE = 5;
const MOCK_REVENUE_TARGET = 150000;

const cloneId = (baseId: string, cloneIndex: number) =>
  cloneIndex === 0 ? baseId : `${baseId}-${cloneIndex + 1}`;

const cloneEmail = (email: string, cloneIndex: number) => {
  if (cloneIndex === 0) return email;
  const [user, domain] = email.split('@');
  if (!domain) return `${email}+${cloneIndex + 1}`;
  return `${user}+${cloneIndex + 1}@${domain}`;
};

const cloneCnpj = (cnpj: string | undefined, cloneIndex: number) => {
  if (!cnpj || cloneIndex === 0) return cnpj;
  // Troca apenas o sufixo "000X-YY" para evitar colisões visuais.
  return cnpj.replace(/\/\d{4}-\d{2}$/, `/${String(cloneIndex + 1).padStart(4, '0')}-00`);
};

const clonePhone = (phone: string, cloneIndex: number) => {
  if (cloneIndex === 0) return phone;
  // incrementa o último dígito apenas para parecer único
  const digits = phone.replace(/\D/g, '');
  if (digits.length === 0) return phone;
  const last = Number(digits[digits.length - 1] ?? '0');
  const next = (last + cloneIndex) % 10;
  return phone.replace(/\d(?=\D*$)/, String(next));
};

const cloneDate = (date: Date, cloneIndex: number, itemIndex: number, baseMs = 1000 * 60 * 30) => {
  // espalha datas levemente: +30min por item + algumas horas/dias por clone
  const offsetMs = (cloneIndex * 24 + itemIndex) * baseMs;
  return new Date(date.getTime() + offsetMs);
};

function expandMockData(scale: number) {
  if (scale <= 1) return;

  const baseStores = mockStores.slice();
  const baseTotems = mockTotems.slice();
  const baseProducts = mockProducts.slice();
  const baseOrders = mockOrders.slice();
  const baseUsers = mockUsers.slice();
  const baseCustomers = mockCustomers.slice();
  const basePoints = mockPointsHistory.slice();

  // 1) Clona lojas
  for (let c = 1; c < scale; c += 1) {
    baseStores.forEach((s, idx) => {
      mockStores.push({
        ...s,
        id: cloneId(s.id, c),
        name: `${s.name} - Filial ${c + 1}`,
        cnpj: cloneCnpj(s.cnpj, c),
        responsible: `${s.responsible} (${c + 1})`,
        phone: clonePhone(s.phone, c),
        address: `${s.address} • Bloco ${c + 1}`,
        createdAt: cloneDate(s.createdAt, c, idx, 1000 * 60 * 60 * 24 * 7),
      });
    });
  }

  // 2) Clona totems (mantendo relação com lojas)
  for (let c = 1; c < scale; c += 1) {
    baseTotems.forEach((t, idx) => {
      const storeId = cloneId(t.storeId, c);
      mockTotems.push({
        ...t,
        id: cloneId(t.id, c),
        name: `${t.name} (${c + 1})`,
        storeId,
        serialNumber: `${t.serialNumber}-${c + 1}`,
        appVersion: t.appVersion,
        lastPing: t.lastPing ? cloneDate(t.lastPing, c, idx, 1000 * 60 * 12) : undefined,
        createdAt: cloneDate(t.createdAt, c, idx, 1000 * 60 * 60 * 24 * 10),
      });
    });
  }

  // 3) Clona produtos (mantendo relação com lojas)
  for (let c = 1; c < scale; c += 1) {
    baseProducts.forEach((p, idx) => {
      const storeId = cloneId(p.storeId, c);
      const stock = typeof p.stock === 'number' ? Math.max(0, p.stock + (c * 7 - 10) + (idx % 5)) : p.stock;

      mockProducts.push({
        ...p,
        id: cloneId(p.id, c),
        storeId,
        sku: p.sku ? `${p.sku}-${c + 1}` : p.sku,
        order: p.order + c * baseProducts.length,
        stock,
        createdAt: cloneDate(p.createdAt, c, idx, 1000 * 60 * 60 * 24),
      });
    });
  }

  // 4) Clona usuários (mantendo relação com lojas quando existir)
  for (let c = 1; c < scale; c += 1) {
    baseUsers.forEach((u, idx) => {
      mockUsers.push({
        ...u,
        id: cloneId(u.id, c),
        name: u.role === 'admin' ? `${u.name} (${c + 1})` : `${u.name} - Filial ${c + 1}`,
        email: cloneEmail(u.email, c),
        storeId: u.storeId ? cloneId(u.storeId, c) : undefined,
        createdAt: cloneDate(u.createdAt, c, idx, 1000 * 60 * 60 * 24 * 15),
      });
    });
  }

  // 5) Clona clientes
  for (let c = 1; c < scale; c += 1) {
    baseCustomers.forEach((cu, idx) => {
      const cpfDigits = cu.cpf.replace(/\D/g, '').padStart(11, '0');
      const suffix = String((Number(cpfDigits.slice(-2)) + c) % 100).padStart(2, '0');
      const newCpfDigits = `${cpfDigits.slice(0, 9)}${suffix}`;
      const cpfFormatted = newCpfDigits.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');

      mockCustomers.push({
        ...cu,
        id: cloneId(cu.id, c),
        name: `${cu.name} (${c + 1})`,
        cpf: cpfFormatted,
        phone: clonePhone(cu.phone, c),
        email: cu.email ? cloneEmail(cu.email, c) : cu.email,
        // dá variação leve para não ficar tudo igual
        points: Math.max(0, Math.round(cu.points * (0.85 + c * 0.05))),
        totalPurchases: Math.max(0, Number((cu.totalPurchases * (0.9 + c * 0.03)).toFixed(2))),
        lastPurchaseDate: cu.lastPurchaseDate ? cloneDate(cu.lastPurchaseDate, c, idx, 1000 * 60 * 60 * 6) : undefined,
        createdAt: cloneDate(cu.createdAt, c, idx, 1000 * 60 * 60 * 24 * 20),
      });
    });
  }

  // 6) Clona pedidos (mantendo relação com lojas/totems/produtos)
  for (let c = 1; c < scale; c += 1) {
    baseOrders.forEach((o, idx) => {
      const clonedTotemId = cloneId(o.totemId, c);
      const clonedStoreId = cloneId(o.storeId, c);
      const clonedItems = o.items.map((it) => ({
        ...it,
        productId: cloneId(it.productId, c),
      }));

      mockOrders.push({
        ...o,
        id: cloneId(o.id, c),
        totemId: clonedTotemId,
        storeId: clonedStoreId,
        items: clonedItems,
        createdAt: cloneDate(o.createdAt, c, idx, 1000 * 60 * 45),
        paidAt: o.paidAt ? cloneDate(o.paidAt, c, idx, 1000 * 60 * 45) : undefined,
      });
    });
  }

  // 7) Clona histórico de pontos (mantendo relação com clientes/pedidos)
  for (let c = 1; c < scale; c += 1) {
    basePoints.forEach((ph, idx) => {
      mockPointsHistory.push({
        ...ph,
        id: cloneId(ph.id, c),
        customerId: cloneId(ph.customerId, c),
        orderId: ph.orderId ? cloneId(ph.orderId, c) : undefined,
        createdAt: cloneDate(ph.createdAt, c, idx, 1000 * 60 * 60 * 12),
        description: `${ph.description} (Filial ${c + 1})`,
      });
    });
  }

  // 8) Enriquecimento: vincula pedidos a clientes e gera pontos (melhor para demo)
  //    - Evita que a aba "Clientes" fique sem histórico.
  let autoPointsId = mockPointsHistory.length + 1;
  const activeCustomers = mockCustomers.filter((c) => c.active);
  const activeUsers = mockUsers.filter((u) => u.active);

  mockOrders.forEach((order, idx) => {
    // Não altera pedidos cancelados/refunded.
    if (order.status === 'cancelled' || order.status === 'refunded') return;

    const customer = activeCustomers[idx % activeCustomers.length];
    if (customer) {
      order.customerId = customer.id;
      order.customerName = customer.name;
      // R$ 1,00 = 10 pontos (arredondado)
      order.pointsGenerated = Math.max(0, Math.round(order.total * 10));
    }

    const operator = activeUsers[(idx + 1) % activeUsers.length];
    if (operator) {
      order.operatorId = operator.id;
    }

    // Cria um registro de pontos para pedidos pagos.
    if (order.customerId && order.status === 'paid' && order.pointsGenerated) {
      mockPointsHistory.push({
        id: String(autoPointsId++),
        customerId: order.customerId,
        orderId: order.id,
        type: 'earned',
        points: order.pointsGenerated,
        description: `Compra de ${new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(order.total)}`,
        createdAt: order.paidAt ?? order.createdAt,
      });
    }
  });
}

function computePaidRevenue() {
  return mockOrders
    .filter((o) => o.status === 'paid')
    .reduce((sum, o) => sum + o.total, 0);
}

function ensureRevenueTarget(targetRevenue: number) {
  if (!Number.isFinite(targetRevenue) || targetRevenue <= 0) return;

  const activeCustomers = mockCustomers.filter((c) => c.active);
  const activeUsers = mockUsers.filter((u) => u.active);

  // Base para IDs novos (garante string e não colide com IDs tipo "1-2")
  let nextOrderId = mockOrders.length + 1000;
  let nextPointsId = mockPointsHistory.length + 5000;

  const paymentPool: Array<Order['paymentMethod']> = [
    // distribuição razoável para demo
    'pix',
    'pix',
    'pix',
    'credit_card',
    'credit_card',
    'debit_card',
  ];

  const now = new Date();
  let paidRevenue = computePaidRevenue();

  // Evita loop infinito caso algo esteja errado
  const maxNewOrders = 2000;
  let created = 0;

  while (paidRevenue < targetRevenue && created < maxNewOrders) {
    const totem = mockTotems[created % mockTotems.length];
    const storeId = totem?.storeId ?? mockStores[0]?.id ?? '1';

    // Pega produtos preferencialmente da mesma loja. Ordena por preço para
    // deixar os pedidos mais "encorpados" e atingir o alvo com menos registros.
    const storeProducts = mockProducts
      .filter((p) => p.storeId === storeId && p.active)
      .sort((a, b) => b.price - a.price);
    const productsPool = storeProducts.length > 0 ? storeProducts : [...mockProducts].sort((a, b) => b.price - a.price);

    const itemsCount = 3 + (created % 4); // 3..6 itens variando
    const items = Array.from({ length: itemsCount }).map((_, i) => {
      // mistura índices para não repetir sempre o topo
      const p = productsPool[(created * 5 + i * 7) % productsPool.length];
      // quantidades maiores para ticket médio de demonstração
      const quantity = 1 + ((created + i * 2) % 6); // 1..6
      return {
        productId: p.id,
        productName: p.name,
        quantity,
        price: p.price,
      };
    });

    let total = items.reduce((sum, it) => sum + it.quantity * it.price, 0);

    // Ajusta o último pedido para bater exatamente o alvo
    const remaining = targetRevenue - paidRevenue;
    if (remaining < total) {
      // Ajuste mínimo: mexe na quantidade do primeiro item até aproximar, e usa o total como "fechamento".
      // Para demo, manteremos consistência do total com os itens.
      const first = items[0];
      if (first) {
        const unit = first.price;
        const neededUnits = Math.max(1, Math.round(remaining / unit));
        first.quantity = neededUnits;
        total = items.reduce((sum, it) => sum + it.quantity * it.price, 0);
      }
    }

    const createdAt = new Date(now.getTime() - created * 1000 * 60 * 47);
    const paidAt = new Date(createdAt.getTime() + 1000 * 60 * 2);

    const paymentMethod = paymentPool[created % paymentPool.length];
    const customer = activeCustomers.length > 0 ? activeCustomers[created % activeCustomers.length] : undefined;
    const operator = activeUsers.length > 0 ? activeUsers[(created + 1) % activeUsers.length] : undefined;

    const order: Order = {
      id: String(nextOrderId++),
      totemId: totem?.id ?? '1',
      storeId,
      items,
      total: Number(total.toFixed(2)),
      paymentMethod,
      status: 'paid',
      customerId: customer?.id,
      customerName: customer?.name,
      pointsGenerated: Math.max(0, Math.round(total * 10)),
      createdAt,
      paidAt,
      operatorId: operator?.id,
    };

    mockOrders.push(order);
    paidRevenue += order.total;
    created += 1;

    if (order.customerId && order.pointsGenerated) {
      mockPointsHistory.push({
        id: String(nextPointsId++),
        customerId: order.customerId,
        orderId: order.id,
        type: 'earned',
        points: order.pointsGenerated,
        description: `Compra de ${new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL',
        }).format(order.total)}`,
        createdAt: order.paidAt ?? order.createdAt,
      });
    }
  }
}

function computeDashboardStats(): DashboardStats {
  const paidOrders = mockOrders.filter((o) => o.status === 'paid');
  const revenue = paidOrders.reduce((sum, o) => sum + o.total, 0);
  const orders = mockOrders.length;
  const approvedOrders = paidOrders.length;
  const cancelledOrders = mockOrders.filter((o) => o.status === 'cancelled').length;
  const averageTicket = approvedOrders > 0 ? revenue / approvedOrders : 0;

  const customersCount = mockCustomers.filter((c) => c.active).length;
  const totalPointsDistributed = mockCustomers.reduce((sum, c) => sum + c.points, 0);

  const paymentLabel: Record<Order['paymentMethod'], string> = {
    pix: 'PIX',
    credit_card: 'Cartão de Crédito',
    debit_card: 'Cartão de Débito',
    cash: 'Dinheiro',
  };

  const paymentAgg = new Map<string, { method: string; revenue: number; quantity: number }>();
  for (const o of paidOrders) {
    const label = paymentLabel[o.paymentMethod];
    const current = paymentAgg.get(label) ?? { method: label, revenue: 0, quantity: 0 };
    current.revenue += o.total;
    current.quantity += 1;
    paymentAgg.set(label, current);
  }
  const paymentMethods = Array.from(paymentAgg.values()).sort((a, b) => b.revenue - a.revenue);

  const productAgg = new Map<string, { name: string; revenue: number; quantity: number }>();
  for (const o of paidOrders) {
    for (const it of o.items) {
      const key = it.productName;
      const current = productAgg.get(key) ?? { name: it.productName, revenue: 0, quantity: 0 };
      current.quantity += it.quantity;
      current.revenue += it.quantity * it.price;
      productAgg.set(key, current);
    }
  }
  const topProducts = Array.from(productAgg.values())
    .sort((a, b) => b.revenue - a.revenue)
    .slice(0, 5);

  return {
    revenue: Number(revenue.toFixed(2)),
    orders,
    averageTicket: Number(averageTicket.toFixed(2)),
    approvedOrders,
    cancelledOrders,
    customersCount,
    totalPointsDistributed,
    topProducts,
    paymentMethods,
  };
}

expandMockData(MOCK_SCALE);

// Garante um fluxo de apresentação com faturamento pago de ~R$ 15.000,00
ensureRevenueTarget(MOCK_REVENUE_TARGET);

export const mockDashboardStats: DashboardStats = computeDashboardStats();