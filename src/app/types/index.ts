export interface Store {
  id: string;
  name: string;
  cnpj?: string;
  responsible: string;
  phone: string;
  address: string;
  openingHours: string;
  logo?: string;
  status: 'active' | 'inactive';
  createdAt: Date;
}

export interface Totem {
  id: string;
  name: string;
  storeId: string;
  serialNumber: string;
  appVersion: string;
  status: 'online' | 'offline' | 'maintenance';
  lastPing?: Date;
  operationMode: 'service' | 'catalog' | 'blocked';
  createdAt: Date;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  category: string;
  sku?: string;
  stock?: number;
  active: boolean;
  storeId: string;
  order: number;
  createdAt: Date;
}

export interface Order {
  id: string;
  totemId: string;
  storeId: string;
  items: OrderItem[];
  total: number;
  paymentMethod: 'pix' | 'credit_card' | 'debit_card' | 'cash';
  status: 'created' | 'pending_payment' | 'paid' | 'cancelled' | 'refunded';
  customerId?: string;
  customerName?: string;
  pointsGenerated?: number;
  createdAt: Date;
  paidAt?: Date;
  operatorId?: string;
}

export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'manager' | 'operator' | 'support';
  storeId?: string;
  active: boolean;
  pin?: string;
  createdAt: Date;
}

// Cliente do Programa Fast+
export interface Customer {
  id: string;
  name: string;
  cpf: string;
  phone: string;
  email?: string;
  points: number;
  totalPurchases: number;
  lastPurchaseDate?: Date;
  createdAt: Date;
  active: boolean;
}

// Histórico de pontos
export interface PointsHistory {
  id: string;
  customerId: string;
  orderId?: string;
  type: 'earned' | 'redeemed' | 'expired' | 'adjusted';
  points: number;
  description: string;
  createdAt: Date;
}

export interface DashboardStats {
  revenue: number;
  orders: number;
  averageTicket: number;
  approvedOrders: number;
  cancelledOrders: number;
  customersCount: number;
  totalPointsDistributed: number;
  topProducts: { name: string; revenue: number; quantity: number }[];
  paymentMethods: { method: string; revenue: number; quantity: number }[];
}