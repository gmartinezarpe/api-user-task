import { Request, Response } from "express";
import bcrypt from 'bcryptjs';
import { generateToken } from "../lib/jwt";
import UserRepository from "../models/repositories/UserRepository";
import { CreateUserDTO, UpdateUserDTO, UserDTO } from "../models/dto/UserDTO";
import { loginSchema, registerSchema } from "../models/validators/userSchemas";




export default class AuthController {
  public readonly login = async (req: Request, res: Response) => {
    const credentials = req.body

    try {
      await loginSchema.validateAsync(credentials)
    } catch (err) {
      res.status(400).json({ error: err.message })
      return
    }

    const repository = new UserRepository()
    try {
      const UserFromDB = await repository.findByEmail(credentials.email)

      if (!UserFromDB || !bcrypt.compareSync(credentials.password, UserFromDB.password)) {
        res.status(401).json({ error: 'Invalid credentials' })
        return
      }
  
        const token = generateToken(UserFromDB)
        res.json({ token });



     
       
    } catch (error) {
      console.log(error.message)
      res.status(500).json({ message: 'Something went wrong' })
    }
      
   
  }




  public readonly register = async (req: Request, res: Response) => {
    const user = req.body as CreateUserDTO

    const repository = new UserRepository()

    try {
      await registerSchema.validateAsync(user)
    } catch (error) {
      res.status(400).json({ error: error.message })
      return
    }

    const hashedPassword = bcrypt.hashSync(user.password, 10)

    try {
      const newUser = await repository.create({ ...user, password: hashedPassword })
      res.status(201).json(newUser)
    } catch (error) {
      if (error.code = 'P2002') {
        res.status(409).json({ message: 'User already exists' })
        return
      }
      res.status(500).json({ message: 'Something went wrong' })
    }
  }

  public readonly findAll = async (_req: Request, res: Response) => {
    
    const repository = new UserRepository()
    const users: UserDTO[] = await repository.findAll()
   
    res.json(users)
  }


  public readonly Update = async (_req: Request, res: Response) => {
  

    const { id } = _req.params 
    const user = _req.body as UpdateUserDTO
  
    try{
  
        await loginSchema.validateAsync(user)
  
    }catch(error){
  res.status(400).json({message: error.message})
  return
    }

    if( user.admin == true){
    
      const repository = new UserRepository() 
      await repository.update(parseInt(id), user)
    
      res.sendStatus(204)

    }else{

      res.json("no eres administrador")
     
    }

  
  }
  
}