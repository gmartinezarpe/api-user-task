import Joi from "joi";
import { CreateTaskDTO, UpdateTaskDTO } from "../dto/TaskDTO";

export const createTaskSchema: Joi.ObjectSchema<CreateTaskDTO> = Joi.object().keys({
    tittle: Joi.string().required(),
    content: Joi.string().required(),
    
})

export const updateTaskSchema: Joi.ObjectSchema<UpdateTaskDTO> = Joi.object().keys({
    tittle: Joi.string().required(),
    content: Joi.string().required(),
    
})