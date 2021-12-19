import React from 'react';
import classes from '../Catalogue.module.scss';
import Container from '../../../containers/hoc/Container';
import Breadcrumbs from '../../../components/UI/Breadcrumbs';
import FilterList from '../FilterList';
import CatalogueHeader from '../CatalogueHeader';
import ProjectList from '../ProjectList';
import Pagination from '../../../components/UI/Pagination';
import VisitedProjects from '../../../containers/VisitedProjects';
import { Project } from '../../../entity/Project';
import { SortDetails } from '../../../constants/sortData/catalogueSortInfo';

interface PropsType {
  applyFilter: (searchParams: URLSearchParams) => void;
  currentProjects: Project[];
  sortDetails: SortDetails | undefined;
  applySort: (searchParams: URLSearchParams) => void;
  currentProjectsPaged: Project[];
  currentPage: number;
  projectsPerPage: number;
  handlePageChange: (nextPage: number) => void;
}

const CatalogueItem: React.FC<PropsType> = React.memo(
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
    return (
      <div className={classes.Catalogue}>
        <Container>
          <div className={classes.Catalogue_Breadcrumbs}>
            <Breadcrumbs />
          </div>
          <div>
            <h1 className={classes['catalogue__title']}>КАТАЛОГ ДОМОВ</h1>
          </div>
          <div className={classes['catalogue-main']}>
            <FilterList applyFilter={applyFilter} />
            <div>
              <CatalogueHeader count={currentProjects.length} sortDetails={sortDetails} applySort={applySort} />
              <div>
                <ProjectList projects={currentProjectsPaged} />
                <Pagination
                  itemsLength={currentProjects.length}
                  currentPage={currentPage}
                  itemsPerPage={projectsPerPage}
                  onPageChange={handlePageChange}
                />
              </div>
            </div>
          </div>

          {/*todo: check if can be extracted above*/}
          <VisitedProjects />
        </Container>
      </div>
    );
  },
);

export default CatalogueItem;
