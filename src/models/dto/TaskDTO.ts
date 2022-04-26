interface BaseTaskDTO{
  id?: number
  tittle: string
  content: string

  
 
}

export interface TaskDTO extends BaseTaskDTO{
id: number
userid: number | null
}

export interface CreateTaskDTO extends BaseTaskDTO{
}

export interface UpdateTaskDTO extends Partial<BaseTaskDTO> {}

