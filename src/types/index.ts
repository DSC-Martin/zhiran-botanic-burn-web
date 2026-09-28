export type FlavorCategory = 
  | '全部'
  | '青檸萊姆'
  | '薄荷芭樂'
  | '蜜桃白茶'
  | '刺五加草本'
  | '巨峰葡萄紫蘇';

export type SeriesCategory = 
  | '全部系列'
  | '等滲透壓補水'
  | '耐力長效燃燒'
  | '低卡輕盈'
  | '整箱特惠與禮盒';

export interface NutritionInfo {
  calories: number; // kcal
  carbs: number; // g
  sugar: number; // g
  sodium: number; // mg
  potassium: number; // mg
  magnesium: number; // mg
}

export interface Product {
  id: string;
  name: string;
  subName?: string;
  flavor: string;
  category: string;
  price: number;
  originalPrice?: number;
  volume: string;
  description: string;
  ingredients: string;
  activeBotanicals: string[];
  tag?: string;
  imageUrl: string;
  inStock: boolean;
  isFeatured?: boolean;
  sortOrder: number;
  colorTheme?: string;
  nutrition?: NutritionInfo;
  bestTiming?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ContactMessage {
  id?: string;
  name: string;
  email: string;
  phone?: string;
  subject?: string;
  message: string;
  type?: 'general' | 'wholesale' | 'sponsorship';
  status?: 'pending' | 'resolved';
  createdAt?: string;
}

export interface AdminUser {
  uid: string;
  email: string | null;
  displayName: string | null;
  isAdmin: boolean;
}
