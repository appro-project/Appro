import { ProjectDto, FloorDto } from '@/api/model'

const defaultFloor: FloorDto = {
	id: 1,
	index: 1,
	area: 30,
	height: 2,
	planningImage: undefined,
	isAttic: false,
	isBasement: false
}

const defaultProject: ProjectDto = {
	id: 0,
	title: '',
	bedroomCount: 0,
	descriptionRU: '',
	descriptionUA: '',
	generalArea: 50,
	timeToCreate: 0,
	projectPrice: 10000,
	livingArea: 0,
	buildingArea: 100,
	terraceArea: 0,
	wallMaterial: "brick",
	wallThickness: 0,
	foundation: "pile",
	ceiling: 'monolithic',
	roof: "bitumen_tile",
	buildingPrice: 1000000,
	insulation: "mineral_wool",
	insulationThickness: 0,
	length: 0,
	width: 0,
	style: "classic",
	isGaragePresent: false,
	mainImage: undefined,
	videoUrl: '',
	images: [],
	photos: [],
	floors: [defaultFloor],
	showOnMain: false,
	isFinished: false
}

export const projects: ProjectDto[] = [
	{
		...defaultProject,
		id: 1,
		title: 'A-01',
		bedroomCount: 1,
		style: "modern",
		buildingArea: 150
	},
	{
		...defaultProject,
		id: 2,
		title: 'A-02',
		bedroomCount: 2,
		isGaragePresent: true,
		buildingArea: 200
	},
	{
		...defaultProject,
		id: 3,
		title: 'A-03',
		bedroomCount: 3,
		floors: [defaultFloor, defaultFloor],
		style: "modern",
		buildingArea: 300
	},
	{
		...defaultProject,
		id: 4,
		title: 'A-04',
		bedroomCount: 4,
		projectPrice: 25000,
		buildingPrice: 3000000,
		floors: [{ ...defaultFloor, isBasement: true }]
	},
	{
		...defaultProject,
		id: 5,
		title: 'A-05',
		bedroomCount: 5,
		projectPrice: 20000,
		floors: [{ ...defaultFloor, isAttic: true }],
		isGaragePresent: true,
		buildingArea: 450
	}
]
