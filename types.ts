import React from 'react';

export type MenuCategory = 'Ayam Geprek' | 'Paket' | 'Menu Lain' | 'Minuman';

export interface MenuItem {
  id: string;
  name: string;
  rank: 'S' | 'A' | 'B';
  element: 'Fire' | 'Cheese' | 'Garlic' | 'Toxic' | 'Physical' | 'Electric' | 'Ice' | 'Earth' | 'Nature';
  price: string;
  category: MenuCategory;
  description: string;
  image: string;
  stats: {
    spiciness: number;
    crunch: number;
    portion: number;
  };
}

export interface CartItem extends MenuItem {
  quantity: number;
  totalPrice: number;
}

export interface NavItem {
  id: string;
  label: string;
  icon: React.ReactNode;
}

export type OrderType = 'DINE_IN' | 'TAKEAWAY';