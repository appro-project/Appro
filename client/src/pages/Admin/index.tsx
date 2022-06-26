import React from 'react';
import { Project } from '../../entity/Project';
import { Action, compose } from 'redux';
import { RouteComponentProps, withRouter } from 'react-router';
import { connect } from 'react-redux';
import { getProjects, getProjectsLoading, RootState } from '../../reducers';
// @ts-ignore
import { ThunkDispatch } from 'redux-thunk';
import { getProjectsFromDb } from '../../actions';
import { toggleIsShowOnMain } from '../../redux/actions';
import {
  Avatar,
  Button,
  CircularProgress,
  Collapse,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
} from '@material-ui/core';
import Container from '../../containers/hoc/Container';
import ProjectItem from './ProjectItem';
import classes from './Admin.module.scss';
import CheckProperty from './ViewAddEditProject/CheckProperty';

interface StateProps {
  projectsLoading: boolean;
  projects: Project[];
}

interface DispatchProps {
  getProjectsFromDb(): void;
  toggleIsShowOnMain(parameters: { id: number; show: boolean }): void;
}

interface State {
  openProjectId: number | null;
  editProjectId: number | null;
  addProjectOpen: boolean;
}

type PropsType = StateProps & DispatchProps;

class Admin extends React.Component<PropsType, State> {
  state = { openProjectId: null, editProjectId: null, addProjectOpen: false };

  componentDidMount() {
    this.props.getProjectsFromDb();
  }

  renderProject = (project: Project): React.ReactElement => {
    const open = this.state.openProjectId && this.state.openProjectId == project.id;

    const handleChangeVisible = () => {
      this.props.toggleIsShowOnMain({ id: project.id, show: !project.showOnMain });
    };

    return (
      <ListItem alignItems="flex-start" key={project.id}>
        <div className={classes['item-project-wrapper']}>
          <div className={classes['item-project-header']}>
            <ListItemAvatar>
              <Avatar alt={project.title} src={project.mainImage} />
            </ListItemAvatar>
            <ListItemText primary={`${project.id} - ${project.title}`} secondary={project.description} />
            <CheckProperty
              title={'Показывать на странице'}
              checked={project.showOnMain ?? false}
              handleProperty={handleChangeVisible}
            />
            <Button onClick={() => this.handleOpenProjectClick(project.id)}>{open ? 'Скрыть' : 'Подробнее'}</Button>
          </div>
          <Collapse key={project.id} in={open} timeout="auto" unmountOnExit>
            <List component="li" disablePadding key={project.id}>
              <ProjectItem project={project} />
            </List>
          </Collapse>
        </div>
      </ListItem>
    );
  };

  render() {
    const { projects, projectsLoading } = this.props;
    return (
      <Container>
        {projectsLoading ? (
          <CircularProgress />
        ) : (
          <>
            {this.renderNewProject()}
            <div>
              <h6 className={classes['title-project-created']}>Существующие проекты:</h6>
              <ul className={classes['list-wrapper']}>{projects.map((project) => this.renderProject(project))}</ul>
            </div>
          </>
        )}
      </Container>
    );
  }

  renderNewProject = () => {
    return (
      <>
        <Button
          variant="contained"
          color="primary"
          onClick={this.handleNewProjectClick}
          className={classes['button-add-project']}
        >
          Добавить новый проект
        </Button>
        <Collapse in={this.state.addProjectOpen} timeout="auto" unmountOnExit>
          <ProjectItem />
        </Collapse>
      </>
    );
  };

  handleNewProjectClick = () => {
    this.setState({ ...this.state, addProjectOpen: !this.state.addProjectOpen });
  };

  handleOpenProjectClick = (projectId: number) => {
    const { openProjectId } = this.state;
    if (openProjectId == projectId) {
      this.setState({ ...this.state, openProjectId: null });
    } else {
      this.setState({ ...this.state, openProjectId: projectId });
    }
  };
}

const mapStateToProps = (state: RootState): StateProps => {
  return {
    projectsLoading: getProjectsLoading(state),
    projects: getProjects(state),
  };
};

export default compose(
  withRouter,
  connect<StateProps, DispatchProps, {}, RootState>(
    mapStateToProps,
    (dispatch: ThunkDispatch<RootState, void, Action>): DispatchProps => ({
      getProjectsFromDb: () => dispatch(getProjectsFromDb.action({})),
      toggleIsShowOnMain: (parameters: { id: number; show: boolean }) => dispatch(toggleIsShowOnMain(parameters)),
      //      isChangeVisible: (id: number) => dispatch(isChangeVisible.action({id})),
    }),
  ),
)(Admin);
