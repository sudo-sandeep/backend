import { Router } from "express";
import { CREATE_TODO, DELETE_TODO, GET_TODO, GET_TODOS, UPDATE_TODO } from "../controllers/todo.js";

const todoRouter = Router();

todoRouter.post("/create-todo", CREATE_TODO);
todoRouter.get("/get-todo", GET_TODO);
todoRouter.get("/get-todos", GET_TODOS);
todoRouter.patch("/update-todo", UPDATE_TODO);
todoRouter.delete("/delete-todo", DELETE_TODO);

export default todoRouter