export interface BaseUserDTO {
  id?: number
  firstName: string
  lastName: string
  email: string
  admin:boolean

 
}

export interface UserDTO extends BaseUserDTO {
  id: number
  admin: boolean
  
 
}

export interface CreateUserDTO extends BaseUserDTO {
  password: string
 
}

export type UpdateUserDTO = Partial<CreateUserDTO>

export interface LoginUserDTO extends UserDTO {
password: string 
}

export interface UserTokenPayload {
  sub: number
  email: string
  admin: boolean
  exp: number
  iat: number
}