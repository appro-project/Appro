import React from 'react';
import classes from './VisitedProjects.module.scss';
import Container from '../hoc/Container';

import { Project } from '../../entity/Project';
import ProjectDetails from '../ProjectDetails';
import {getProjects, RootState} from "../../reducers";
import {compose} from "redux";
import {connect} from "react-redux";

interface StateProps {
  mockProjects: Project[];
}

type PropsType = StateProps;

class VisitedProjects extends React.PureComponent<PropsType, {}> {
  render() {
    const {mockProjects} = this.props;
    const data = [...mockProjects];
    data.push(mockProjects[0]);
    data.push(mockProjects[0]);

    return <section>
      <h2 className={ classes['visited-projects__title'] }>
        Просмотренные проекты
      </h2>

      <div className={ classes['visited-projects__items'] }>
        { data.map((project: Project, idx: number) =>
            (<div className={ classes.VisitedProjects_ProjectWrapper } key={ idx }>
              <ProjectDetails projectData={ project }/>
            </div>)) }
      </div>
    </section>;
  }
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    mockProjects: getProjects(state)
  }
}

export default compose(connect<StateProps, {}, {}, RootState>(mapStateToProps,
    {})
)(VisitedProjects);
