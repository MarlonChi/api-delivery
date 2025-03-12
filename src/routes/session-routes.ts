import { Router } from "express";
import { SessionsController } from "@/controllers/sessions-controller";

export const sessionsRoutes = Router();
const sessionsController = new SessionsController();

/**
 * @swagger
 * /sessions:
 *   post:
 *     summary: Autentica um usuário e retorna um token JWT
 *     tags: [Sessões]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *                 format: email
 *                 example: "joao@email.com"
 *               password:
 *                 type: string
 *                 format: password
 *                 example: "123456"
 *     responses:
 *       200:
 *         description: Usuário autenticado com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *                   example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                 user:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       example: "550e8400-e29b-41d4-a716-446655440000"
 *                     name:
 *                       type: string
 *                       example: "João Silva"
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "joao@email.com"
 *                     role:
 *                       type: string
 *                       example: "customer"
 *       401:
 *         description: Email ou senha inválidos
 */
sessionsRoutes.post("/", sessionsController.create);
