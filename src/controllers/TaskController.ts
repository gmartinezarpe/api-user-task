import { Request, Response} from "express";
import { CreateTaskDTO, TaskDTO, UpdateTaskDTO } from "../models/dto/TaskDTO";
import { UserTokenPayload } from "../models/dto/UserDTO";
import TaskRepository from "../models/repositories/TaskRepository";
import { createTaskSchema, updateTaskSchema } from "../models/validators/taskSchemas";


export default class TaskController{
public readonly getAll = async (_req: Request, res: Response) => {
    const user = _req.user as UserTokenPayload
    const repository = new TaskRepository(user.sub)
    const tasks: TaskDTO[] = await repository.findAll()
   
    res.json(tasks)
}

public readonly getById = async (_req: Request, res: Response) => {
    const { id }= _req.params
    const user = _req.user as UserTokenPayload
    const repository = new TaskRepository(user.sub)
    const task = await repository.findById(parseInt(id))
    res.json({task})

}
public readonly create = async (_req: Request, res: Response) => { 
    const task = _req.body as CreateTaskDTO
    
    try{

        await createTaskSchema.validateAsync(task)

    }catch(error){
res.status(400).json({message: error.message})
return
    }
    const user = _req.user as UserTokenPayload
    
    const repository = new TaskRepository(user.sub)

    const NewTask = await repository.create(task)
    
    res.json(NewTask)
}

public readonly update = async (_req: Request, res: Response) => {
    const { id } = _req.params 
    const task = _req.body as UpdateTaskDTO

    try{

        await updateTaskSchema.validateAsync(task)

    }catch(error){
res.status(400).json({message: error.message})
return
    }
    const user = _req.user as UserTokenPayload

    const repository = new TaskRepository(user.sub)
    await repository.update(parseInt(id), task)

    res.sendStatus(204)
}

public readonly delete = async (_req: Request, res: Response) => {
    const { id } = _req.params
    const user = _req.user as UserTokenPayload
    const repository = new TaskRepository(user.sub)
    await repository.delete(parseInt(id))
    
    res.sendStatus(204)
}

}