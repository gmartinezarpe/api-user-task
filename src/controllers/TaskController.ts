import { Request, Response} from "express"
import { CreateTaskDTO, TaskDTO, UpdateTaskDTO } from "../models/dto/TaskDTO"
import { createTaskSchema, updateTaskSchema } from "../models/validators/taskSchemas"

export default class TaskController{
public readonly getAll = async (_req: Request, res: Response) => {
    const tasks: TaskDTO[] = [
        {
        id: 1,
        tittle: 'hola',
        content: 'prueba',
        userid: 1
        }
        
    ]
    res.json(tasks)
}

public readonly getById = async (_req: Request, res: Response) => {
    const { id }= _req.params
    const task: TaskDTO = {
        id: parseInt(id),
        tittle: 'hola',
        content: 'prueba',
        userid: 1

        
    }
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
    
    
    res.json({
        id: 1,
        ...task
    })
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

    console.log(' esto debería editar', id, task)
    res.sendStatus(204)
}

public readonly delete = async (_req: Request, res: Response) => {
    const { id } = _req.params

    console.log('esto debería eliminar', id)
    res.sendStatus(204)
}

}