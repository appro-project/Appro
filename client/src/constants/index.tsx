export interface MenuLinkInfo {
    name: string;
    url: string;
}

export interface ContactInfo {
    address: string;
    phone: string;
    copyright: string;
}

export const menuLinks: MenuLinkInfo[] = [
    { name: 'Главная', url: '/' },
    { name: 'Каталог домов', url: '/catalogue' },
    { name: 'Индивидуальный проект', url: '/individual' },
    { name: 'Реализованные проекты', url: '/finished' },
    { name: 'Дополнительные услуги', url: '/additional' },
    { name: 'О нас', url: '/about' },
];

export const contactInfo: ContactInfo = {
    address: 'г. Ирпень, ул. Героев Сталинграда, 13',
    phone: '+38 (066) 39-53-654',
    copyright: '© 2020 Архитектурное Бюро.',
};
