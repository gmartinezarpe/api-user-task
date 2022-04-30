import Joi from "Joi"
import { CreateTaskDTO, UpdateTaskDTO } from "../dto/TaskDTO";

export const createTaskSchema: Joi.ObjectSchema<CreateTaskDTO> = Joi.object().keys({
    tittle: Joi.string().required(),
    content: Joi.string().required(),
    done:Joi.boolean().required(),
    
})

export const updateTaskSchema: Joi.ObjectSchema<UpdateTaskDTO> = Joi.object().keys({
    tittle: Joi.string(),
    content: Joi.string(),
    done: Joi.boolean(),
})