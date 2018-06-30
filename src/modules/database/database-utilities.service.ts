import { Injectable, Inject } from '@nestjs/common';
import { Model } from 'sequelize-typescript';

@Injectable()
export class DatabaseUtilitiesService {
    /**
     * @description: Assign new value in the model found in the database.
     *
     * @param {Model<T>} model The database model to be updated
     * @param {U} newValue An object containing updated values for the database model
     * @return {Model<T>} The database model with updates applied
     */
    public assign<T extends Model<T> = any, U = {}>(model: T, newModel: U): T {
        for (const key of Object.keys(model.dataValues)) {
            if (!newModel[key]) continue;
            if (model[key] !== newModel[key]) model[key] = newModel[key];
        }

        return model;
    }
}
