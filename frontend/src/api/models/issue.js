import {
    apiConfig,
    getApiPath
} from "../config";
import { BaseModel } from "./base";

class IssueModel extends BaseModel {
    API_PATH = getApiPath(apiConfig, 'issue');
}

export const Issue = new IssueModel();
