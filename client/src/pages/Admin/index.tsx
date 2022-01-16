import React from "react";
import { Project } from "../../entity/Project";
import { Action, compose } from "redux";
import { RouteComponentProps, withRouter } from "react-router";
import { connect } from "react-redux";
import { getProjects, getProjectsLoading, RootState } from "../../reducers";
// @ts-ignore
import { ThunkDispatch } from "redux-thunk";
import { getProjectsFromDb } from "../../actions";
import {
    Avatar, Button,
    CircularProgress,
    Collapse,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    Typography,
} from "@material-ui/core";
import Container from "../../containers/hoc/Container";
import AddProject from "./AddProject";
import ProjectItem from "./ProjectItem";

interface StateProps {
    projectsLoading: boolean;
    projects: Project[];
}

interface DispatchProps {
    getProjectsFromDb(): void;
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
        
        return <ListItem alignItems="flex-start" key={ project.id }>
            <ListItemAvatar>
                <Avatar alt={ project.title } src={ project.mainImage }/>
            </ListItemAvatar>
            <ListItemText
                primary={ `${ project.id } - ${ project.title }` }
                secondary={ project.description }
            />
            <Button onClick={ () => this.handleOpenProjectClick(project.id) }>
                { open ? 'ExpandLess' : 'ExpandMore' }
            </Button>
            
            <Collapse
                key={ project.id }
                in={ open }
                timeout='auto'
                unmountOnExit
            >
                <List component='li' disablePadding key={ project.id }>
                    <ProjectItem project={ project }/>
                </List>
            </Collapse>
        </ListItem>
    }
    
    render() {
        const { projects, projectsLoading } = this.props;
        return <Container>
            { projectsLoading ? <CircularProgress/> :
                <>
                    { this.renderNewProject() }
                    <List>
                        { projects.map(project => this.renderProject(project)) }
                    </List>
                </>
            }
        </Container>
        
    }
    
    renderNewProject = () => {
        return <>
            <Button variant="contained"
                    color="primary"
                    onClick={ this.handleNewProjectClick }>
                Добавить новый проект
            </Button>
            <Collapse
                in={ this.state.addProjectOpen }
                timeout='auto'
                unmountOnExit
            >
                <ProjectItem />
            </Collapse>
        </>
    }
    
    handleNewProjectClick = () => {
        this.setState({...this.state, addProjectOpen: !this.state.addProjectOpen})
    }
    
    handleOpenProjectClick = (projectId: number) => {
        const { openProjectId } = this.state;
        if (openProjectId == projectId) {
            this.setState({ ...this.state, openProjectId: null })
        } else {
            this.setState({ ...this.state, openProjectId: projectId })
        }
    }
}

const mapStateToProps = (state: RootState): StateProps => {
    return {
        projectsLoading: getProjectsLoading(state),
        projects: getProjects(state),
    }
}

export default compose(withRouter, connect<StateProps, DispatchProps, {}, RootState>(mapStateToProps,
    (dispatch: ThunkDispatch<RootState, void, Action>): DispatchProps => ({
        getProjectsFromDb: () => dispatch(getProjectsFromDb.action({})),
    }),
))(Admin);
