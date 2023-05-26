import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { FloorDto } from '@/entity/FloorDto'
import { DataService } from '@/services/server-data'
import { Project } from '@/entity/Project'

interface InitialProjectState {
	id?: number;
	title: string;
	description: string;
	generalArea: number | null;
	timeToCreate: number | null;
	projectPrice: number | null;
	livingArea: number | null;
	buildingArea: number | null;
	wallMaterial: string;
	wallThickness: number | null;
	foundation: string;
	ceiling: string;
	roof: string;
	buildingPrice: number | null;
	mainImage: File | string | null;
	images: string[] | null;
	photos: string[] | null;
	insulation: string;
	insulationThickness: number | null;
	length: number | null;
	width: number | null;
	style: string;
	isGaragePresent: boolean;
	bedroomCount: number | null;
	floorList: FloorDto[];
	edit?: boolean;
	add?: boolean;
	imagesToDelete: string[];
	photosToDelete: string[];
	imagesToAdd: FileList | null;
	photosToAdd: FileList | null;
}


const initialState: InitialProjectState = {
	title: '',
	description: '',
	generalArea: null,
	timeToCreate: null,
	projectPrice: null,
	livingArea: null,
	buildingArea: null,
	wallMaterial: '',
	wallThickness: null,
	foundation: '',
	ceiling: '',
	roof: '',
	buildingPrice: null,
	images: null,
	photos: null,
	mainImage: null,
	insulation: '',
	insulationThickness: null,
	length: null,
	width: null,
	style: '',
	isGaragePresent: false,
	bedroomCount: null,
	floorList: [] as FloorDto[],
	edit: false,
	add: false,
	imagesToDelete: [],
	imagesToAdd: null,
	photosToAdd: null,
	photosToDelete: []
}

const currentProjectSlice = createSlice({
	name: 'projects',
	initialState: initialState,
	reducers: {}
})



export default currentProjectSlice.reducer