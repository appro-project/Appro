import actionCreatorFactory from "typescript-fsa";
import asyncFactory from "typescript-fsa-redux-thunk";
import {DataService} from "../services/server-data";


const create = actionCreatorFactory('DATA');

const createAsync = asyncFactory(create);

export const saveProject = createAsync<{ project: any }, {}>(
    'SAVE_PROJECT',
    async (params) => {
        // eslint-disable-next-line no-debugger
        debugger
        await DataService.axiosSaveProject(params)
    }
);