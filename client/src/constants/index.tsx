export interface MenuLinkInfo {
  name: string;
  path: string;
}

export interface ContactInfo {
  address: string;
  phone: string;
  copyright: string;
}

export const menuLinks: MenuLinkInfo[] = [
  { name: 'Главная', path: '/' },
  { name: 'Каталог домов', path: '/catalogue' },
  { name: 'Индивидуальный проект', path: '/individual-project' },
  // { name: 'Реализованные проекты', path: '/finished' },
  { name: 'Дополнительные услуги', path: '/additional' },
  { name: 'О нас', path: '/about' },
];

export const contactInfo: ContactInfo = {
	address: 'footer.address_link',
	phone: '+38 (066) 39-53-654',
	copyright: 'footer.copyright'
}
