import {FC, memo, useEffect, useState} from 'react'
import classes from '../Catalogue.module.scss'
import {Container} from '@/containers/hoc/Container/Container'
import {Breadcrumbs} from '@/components/UI/Breadcrumbs/Breadcrumbs'
import {FilterList} from '../FilterList/FilterList'
import {CatalogueHeader} from '../CatalogueHeader/CatalogueHeader'
import {ProjectList} from '../ProjectList/ProjectList'
import {Pagination} from '@/components/UI/Pagination/Pagination'
import {VisitedProjects} from '@/containers/VisitedProjects/VisitedProjects'
import {SortDetails} from '@/constants/sortData/catalogueSortInfo'
import {Button} from '@/components/UI/Button/Button'
import {ProjectDto} from "@/api/model";
import {Box, Drawer} from "@mui/material";

interface PropsType {
    applyFilter: (searchParams: URLSearchParams) => void;
    currentProjects: ProjectDto[];
    sortDetails: SortDetails | undefined;
    applySort: (searchParams: URLSearchParams) => void;
    currentProjectsPaged: ProjectDto[];
    currentPage: number;
    projectsPerPage: number;
    handlePageChange: (nextPage: number) => void;
}

const CatalogueItem: FC<PropsType> = memo(
    ({
         applyFilter,
         currentProjects,
         sortDetails,
         applySort,
         currentProjectsPaged,
         currentPage,
         projectsPerPage,
         handlePageChange,
     }) => {
        const [openFilter, setOpenFilter] = useState(false);

        useEffect(() => {
            if (window.screen.width < 1200) {
                setOpenFilter(true);
            } else {
                setOpenFilter(false);
            }
        }, [document.documentElement.clientWidth]);

        return (
            <div className={classes.Catalogue}>
                <Container>
                    <div className={classes.Catalogue_Breadcrumbs}>
                        <Breadcrumbs/>
                    </div>
                    <div>
                        <h1 className={classes['catalogue__title']}>КАТАЛОГ ДОМОВ</h1>
                    </div>
                    <div className={classes['catalogue-main']}>
                        <div className={classes['filter-wrapper']}>
                            <div className={classes['filter-button']}>
                                <Button actionHandler={() => setOpenFilter(true)} title={'Фильтры'}/>
                            </div>
                            <Drawer open={openFilter} onClose={() => setOpenFilter(false)}>
                                {openFilter && <FilterList applyFilter={applyFilter}/>}
                            </Drawer>
                            <Box sx={{display: {xs: 'none', lg: 'block'}}}>
                                <FilterList applyFilter={applyFilter}/>
                            </Box>
                        </div>
                        <div>
                            <CatalogueHeader count={currentProjects.length} sortDetails={sortDetails}
                                             applySort={applySort}/>
                            <ProjectList projects={currentProjectsPaged}/>
                            <Pagination
                                itemsLength={currentProjects.length}
                                currentPage={currentPage}
                                itemsPerPage={projectsPerPage}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>

                    <VisitedProjects/>
                </Container>
            </div>
        );
    },
);

export default CatalogueItem;
