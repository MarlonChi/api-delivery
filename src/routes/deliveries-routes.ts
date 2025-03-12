import { Router } from "express";

import { DeliveriesController } from "@/controllers/deliveries-controller";
import { DeliveriesStatusController } from "@/controllers/deliveries-status-controller";

import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

export const deliveriesRoutes = Router();
const deliveriesController = new DeliveriesController();
const deliveriesStatusController = new DeliveriesStatusController();

// Middleware de autenticação e autorização
deliveriesRoutes.use(ensureAuthenticated, verifyUserAuthorization(["sale"]));

/**
 * @swagger
 * /deliveries:
 *   post:
 *     summary: Cria uma nova entrega
 *     tags: [Entregas]
 *     security:
 *       - BearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: string
 *                 format: uuid
 *                 example: "550e8400-e29b-41d4-a716-446655440000"
 *               description:
 *                 type: string
 *                 example: "Entrega de documentos"
 *     responses:
 *       201:
 *         description: Entrega criada com sucesso
 *       400:
 *         description: Erro na validação dos dados enviados
 */
deliveriesRoutes.post("/", deliveriesController.create);

/**
 * @swagger
 * /deliveries:
 *   get:
 *     summary: Lista todas as entregas
 *     tags: [Entregas]
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Lista de entregas retornada com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     example: "123"
 *                   user:
 *                     type: object
 *                     properties:
 *                       name:
 *                         type: string
 *                         example: "João Silva"
 *                       email:
 *                         type: string
 *                         example: "joao@email.com"
 *                   description:
 *                     type: string
 *                     example: "Entrega de documentos"
 *       401:
 *         description: Não autorizado
 */
deliveriesRoutes.get("/", deliveriesController.index);

/**
 * @swagger
 * /deliveries/{id}/status:
 *   patch:
 *     summary: Atualiza o status de uma entrega
 *     tags: [Entregas]
 *     security:
 *       - BearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: ID da entrega
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               status:
 *                 type: string
 *                 example: "delivered"
 *     responses:
 *       200:
 *         description: Status da entrega atualizado com sucesso
 *       400:
 *         description: Erro na requisição
 *       404:
 *         description: Entrega não encontrada
 */
deliveriesRoutes.patch("/:id/status", deliveriesStatusController.update);
