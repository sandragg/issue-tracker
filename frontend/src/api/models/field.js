import {
    apiConfig,
    getApiPath
} from 'api/config';
import { BaseModel } from './base';

class FieldModel extends BaseModel {
    API_PATH = getApiPath(apiConfig, 'field');
}

export const Field = new FieldModel();
