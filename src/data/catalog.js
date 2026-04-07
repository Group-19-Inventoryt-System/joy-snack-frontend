import chipsImg from '../assets/images/products/chips.png';
import juiceImg from '../assets/images/products/juice.png';
import pieImg from '../assets/images/products/pie.png';
import samosaImg from '../assets/images/products/samosa.png';
import springRollCategoryImg from '../assets/images/products/spring_roll_category.jpg';
import sausageCategoryImg from '../assets/images/products/sausageroll.jpg';
import soboloJuice from '../assets/images/products/sobolo_juice.png';
import pineappleJuice from '../assets/images/products/pineable_juice.jpg';
import gingerJuice from '../assets/images/products/ginger_juice.jpg';
import gingermelonJuice from '../assets/images/products/gingermelon_juice.jpg';
import sweetgreenJuice from '../assets/images/products/sweetgreen_juice.jpg';

export const CURRENCY_SYMBOL = 'GH₵';

export const formatCurrency = (value) => `${CURRENCY_SYMBOL} ${Number(value).toFixed(2)}`;

export const parseCurrency = (value) => {
  if (typeof value === 'number') {
    return value;
  }

  const normalized = String(value ?? '').replace(/[^0-9.]/g, '');
  return Number.parseFloat(normalized || '0');
};

export const productImageMap = {
  soboloJuice,
  pineappleJuice,
  gingerJuice,
  gingermelonJuice,
  sweetgreenJuice,
  chipsImg,
  pieImg,
  samosaImg,
  springRollCategoryImg,
  sausageCategoryImg,
  juiceImg,
};

export const productImageOptions = [
  { key: 'soboloJuice', label: 'Sobolo Juice' },
  { key: 'pineappleJuice', label: 'Pineapple Juice' },
  { key: 'gingerJuice', label: 'Ginger Pine Juice' },
  { key: 'gingermelonJuice', label: 'Ginger Melon Juice' },
  { key: 'sweetgreenJuice', label: 'Sweet Green Juice' },
  { key: 'chipsImg', label: 'Chips Pack' },
  { key: 'pieImg', label: 'Meat Pie' },
  { key: 'samosaImg', label: 'Samosa' },
  { key: 'springRollCategoryImg', label: 'Spring Roll' },
  { key: 'sausageCategoryImg', label: 'Sausage Roll' },
];

export const categories = [
  { id: 'chips', name: 'Chips', image: chipsImg },
  { id: 'juice', name: 'Juice', image: juiceImg },
  { id: 'pie', name: 'Meat Pie', image: pieImg },
  { id: 'samosa', name: 'Samosa', image: samosaImg },
  { id: 'springroll', name: 'Spring Roll', image: springRollCategoryImg },
  { id: 'sausage', name: 'Sausage Roll', image: sausageCategoryImg },
];

export const defaultProducts = [
  {
    id: 1,
    name: 'Sobolo Juice',
    category: 'juice',
    imageKey: 'soboloJuice',
    description: 'Refreshing hibiscus drink with a bold Ghanaian flavor profile.',
    featured: true,
    sizes: [
      { size: '250ml', price: 4 },
      { size: '1.5L', price: 35 },
      { size: '5L', price: 80 },
    ],
  },
  {
    id: 2,
    name: 'Pineapple Juice',
    category: 'juice',
    imageKey: 'pineappleJuice',
    description: 'Freshly pressed pineapple juice that is naturally sweet and bright.',
    featured: false,
    sizes: [
      { size: '250ml', price: 4 },
      { size: '1.5L', price: 35 },
      { size: '5L', price: 95 },
    ],
  },
  {
    id: 3,
    name: 'Ginger Pine Juice',
    category: 'juice',
    imageKey: 'gingerJuice',
    description: 'A lively pineapple blend with a warm ginger finish.',
    featured: false,
    sizes: [
      { size: '250ml', price: 6 },
      { size: '1.5L', price: 55 },
      { size: '5L', price: 105 },
    ],
  },
  {
    id: 4,
    name: 'Ginger Melon Juice',
    category: 'juice',
    imageKey: 'gingermelonJuice',
    description: 'A smooth melon-forward drink with a light ginger kick.',
    featured: false,
    sizes: [
      { size: '250ml', price: 8 },
      { size: '1.5L', price: 60 },
      { size: '5L', price: 125 },
    ],
  },
  {
    id: 5,
    name: 'Sweet Green Juice',
    category: 'juice',
    imageKey: 'sweetgreenJuice',
    description: 'A fresh green blend made to feel healthy and satisfying.',
    featured: false,
    sizes: [
      { size: '250ml', price: 8 },
      { size: '1.5L', price: 60 },
      { size: '5L', price: 125 },
    ],
  },
  {
    id: 101,
    name: 'Chips',
    category: 'chips',
    imageKey: 'chipsImg',
    description: 'Crispy chips prepared for solo snacking or bigger gatherings.',
    featured: true,
    sizes: [
      { size: 'Mini pack', price: 20 },
      { size: 'Super pack', price: 50 },
      { size: 'Family pack', price: 100 },
      { size: 'Party time', price: 150 },
    ],
  },
  {
    id: 201,
    name: 'Meat Pie',
    category: 'pie',
    imageKey: 'pieImg',
    description: 'A flaky pastry with a savory meat filling and rich seasoning.',
    featured: true,
    sizes: [
      { size: '10 pieces', price: 50 },
      { size: '15 pieces', price: 80 },
      { size: '40 pieces', price: 190 },
    ],
  },
  {
    id: 301,
    name: 'Fresh Pack Samosa',
    category: 'samosa',
    imageKey: 'samosaImg',
    description: 'Golden samosas with a crunchy bite and satisfying filling.',
    featured: false,
    sizes: [
      { size: '5 pieces', price: 20 },
      { size: '10 pieces', price: 35 },
      { size: '40 pieces', price: 135 },
    ],
  },
  {
    id: 401,
    name: 'Fresh Pack Spring Roll',
    category: 'springroll',
    imageKey: 'springRollCategoryImg',
    description: 'Crisp spring rolls that work equally well for events and daily treats.',
    featured: false,
    sizes: [
      { size: '6 pieces', price: 18 },
      { size: '12 pieces', price: 31 },
      { size: '40 pieces', price: 100 },
    ],
  },
  {
    id: 501,
    name: 'Sausage Roll',
    category: 'sausage',
    imageKey: 'sausageCategoryImg',
    description: 'Tender sausage wrapped in pastry for a familiar crowd favorite.',
    featured: false,
    sizes: [
      { size: '10 pieces', price: 50 },
      { size: '15 pieces', price: 80 },
      { size: '40 pieces', price: 190 },
    ],
  },
];

export const defaultUsers = [
  {
    id: 1,
    fullName: 'Ama Boateng',
    email: 'ama@joysnack.com',
    phone: '+233 24 111 2222',
    role: 'admin',
    status: 'active',
    joinedAt: '2026-03-01',
  },
  {
    id: 2,
    fullName: 'Kwame Mensah',
    email: 'kwame@example.com',
    phone: '+233 20 333 4444',
    role: 'customer',
    status: 'active',
    joinedAt: '2026-03-10',
  },
  {
    id: 3,
    fullName: 'Esi Owusu',
    email: 'esi@example.com',
    phone: '+233 55 555 6666',
    role: 'customer',
    status: 'inactive',
    joinedAt: '2026-03-14',
  },
];

export const hydrateProduct = (product) => ({
  ...product,
  image: productImageMap[product.imageKey] ?? chipsImg,
});
