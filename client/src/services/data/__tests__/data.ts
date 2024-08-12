import {
	ProjectDto,
	WallMaterialOptions,
	FoundationOptions,
	CeilingOptions,
	RoofOptions,
	InsulationOptions,
	StyleOptions,
	FloorDto
} from '@/api/model'

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
	description: '',
	generalArea: 50,
	timeToCreate: 0,
	projectPrice: 10000,
	livingArea: 0,
	buildingArea: 100,
	wallMaterial: WallMaterialOptions.Brick,
	wallThickness: 0,
	foundation: FoundationOptions.Strip,
	ceiling: CeilingOptions.MonolithicConcreteSlab,
	roof: RoofOptions.BituminousShingles,
	buildingPrice: 1000000,
	insulation: InsulationOptions.MineralWool,
	insulationThickness: 0,
	length: 0,
	width: 0,
	style: StyleOptions.Classic,
	isGaragePresent: false,
	mainImage: undefined,
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
		style: StyleOptions.Modern,
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
		style: StyleOptions.Modern,
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
