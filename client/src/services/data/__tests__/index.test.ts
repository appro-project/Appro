import { getProjectsByFilters } from '@/services/data/index'
import { projects } from '@/services/data/__tests__/data'

describe('Filter by one filter', () => {
	it('Should return all projects when no filters are applied', () => {
		const filters = new URLSearchParams()
		const result = getProjectsByFilters(projects, filters)
		expect(result.length).toEqual(projects.length)
	})
	it('Should filter projects based on bedroom=2, return id=2', () => {
		const filters = new URLSearchParams('bedroom=2')
		const result = getProjectsByFilters(projects, filters)
		expect(result.map(p => p.id)).toEqual([2])
	})
	it('Should filter projects based on bedroom=1,2,3, return id=1,2,3', () => {
		const filters = new URLSearchParams('bedroom=1,2,3')
		const result = getProjectsByFilters(projects, filters)
		expect(result.map(p => p.id)).toEqual([1, 2, 3])
	})
	it('Should filter projects based on bedroom=>4, return id=4,5', () => {
		const filters = new URLSearchParams('bedroom=>4')
		const result = getProjectsByFilters(projects, filters)
		expect(result.map(p => p.id)).toEqual([4, 5])
	})
	it('Should filter projects based on floor=1, return id=1,2,4,5', () => {
		const filters = new URLSearchParams('floor=1-floor')
		const result = getProjectsByFilters(projects, filters)
		expect(result.map(p => p.id)).toEqual([1, 2, 4, 5])
	})
	it('Should filter projects based on floor=2, return id=3', () => {
		const filters = new URLSearchParams('floor=2-floor')
		const result = getProjectsByFilters(projects, filters)
		expect(result.map(p => p.id)).toEqual([3])
	})
	it('Should filter projects based on floor=3, return zero projects', () => {
		const filters = new URLSearchParams('floor=3-floor')
		const result = getProjectsByFilters(projects, filters)
		expect(result.map(p => p.id)).toEqual([])
	})
	it('Should filter projects based on floor=3,attic,basement, return id=4,5', () => {
		const filters = new URLSearchParams('floor=3-floor,attic,basement')
		const result = getProjectsByFilters(projects, filters)
		expect(result.map(p => p.id)).toEqual([4, 5])
	})
	it('Should filter projects based on floor=2,attic,basement, return id=4,5', () => {
		const filters = new URLSearchParams('floor=2-floor,attic,basement')
		const result = getProjectsByFilters(projects, filters)
		expect(result.map(p => p.id)).toEqual([3, 4, 5])
	})
	it('Should filter projects based garage return id=5', () => {
		const filters = new URLSearchParams('garage=true')
		const result = getProjectsByFilters(projects, filters)
		expect(result.map(p => p.id)).toEqual([2, 5])
	})
	it('Should filter projects based on projectPrice=11000-20000, return id=5', () => {
		const filters = new URLSearchParams('projectPrice=11000-30000')
		const result = getProjectsByFilters(projects, filters)
		expect(result.map(p => p.id)).toEqual([4, 5])
	})
	it('Should filter projects based on projectPrice=1000-15000, return id=1,2,3,4', () => {
		const filters = new URLSearchParams('projectPrice=1000-15000')
		const result = getProjectsByFilters(projects, filters)
		expect(result.map(p => p.id)).toEqual([1, 2, 3])
	})
	it('Should filter projects based on projectPrice=1000-9000, return zero projects', () => {
		const filters = new URLSearchParams('projectPrice=1000-9000')
		const result = getProjectsByFilters(projects, filters)
		expect(result.map(p => p.id)).toEqual([])
	})
	it('Should filter projects based on moder style, id=1,3', () => {
		const filters = new URLSearchParams('style=modern')
		const result = getProjectsByFilters(projects, filters)
		expect(result.map(p => p.id)).toEqual([1, 3])
	})
	it('Should filter projects based on buildong area, return id=1,4', () => {
		const filters = new URLSearchParams('area=50-150')
		const result = getProjectsByFilters(projects, filters)
		expect(result.map(p => p.id)).toEqual([1, 4])
	})
})

describe('Filter by multiple filter', () => {
	it('Should filter projects based on floor=2 and with garage return id=2,5', () => {
		const filters = new URLSearchParams()
		filters.append('bedroom', '2')
		filters.append('garage', 'true')
		const result = getProjectsByFilters(projects, filters)
		expect(result.map(p => p.id)).toEqual([2])
	})
	it('Should filter projects based on projectPrice=19000-26000 and buildingPrice=1500000-3500000, return id=4,5', () => {
		const filters = new URLSearchParams()
		filters.append('projectPrice', '19000-26000')
		filters.append('buildingPrice', '1500000-3500000')
		const result = getProjectsByFilters(projects, filters)
		expect(result.map(p => p.id)).toEqual([4])
	})
	it('Should filter projects based on buildong area, garage, with atic and bedrooms >4, return id=5', () => {
		const filters = new URLSearchParams()
		filters.append('area', '150-500')
		filters.append('garage', 'true')
		filters.append('floor', 'attic')
		filters.append('bedroom', '>4')
		const result = getProjectsByFilters(projects, filters)
		expect(result.map(p => p.id)).toEqual([5])
	})
})
