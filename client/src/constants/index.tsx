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
	{ name: 'header.main_link', path: '/' },
	{ name: 'header.catalogue_link', path: '/catalogue' },
	{ name: 'header.individual_project_link', path: '/individual-project' },
	// { name: 'Реализованные проекты', path: '/finished' },
	{ name: 'header.additional_link', path: '/additional' },
	{ name: 'header.about_us_link', path: '/about' },
	{ name: 'header.example_project_link', path: '/example-project' }
]

export const contactInfo: ContactInfo = {
	address: 'footer.address_link',
	phone: '+38 (066) 39-53-654',
	copyright: 'footer.copyright'
}
