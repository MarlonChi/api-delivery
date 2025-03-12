import { Router } from "express";
import { DeliveryLogsController } from "@/controllers/delivery-logs-controller";
import { ensureAuthenticated } from "@/middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "@/middlewares/verify-user-authorization";

export const deliveryLogsRoutes = Router();
const deliveryLogsController = new DeliveryLogsController();

/**
 * @swagger
 * /delivery-logs:
 *   post:
 *     summary: Cria um novo log de entrega
 *     tags: [Delivery Logs]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               delivery_id:
 *                 type: string
 *                 format: uuid
 *                 example: "550e8400-e29b-41d4-a716-446655440000"
 *               description:
 *                 type: string
 *                 example: "Pedido está sendo preparado."
 *     responses:
 *       201:
 *         description: Log de entrega criado com sucesso
 *       404:
 *         description: Pedido não encontrado ou não pode ser alterado
 */
deliveryLogsRoutes.post(
  "/",
  ensureAuthenticated,
  verifyUserAuthorization(["sale"]),
  deliveryLogsController.create
);

/**
 * @swagger
 * /delivery-logs/{delivery_id}/show:
 *   get:
 *     summary: Exibe o log de uma entrega específica
 *     tags: [Delivery Logs]
 *     parameters:
 *       - in: path
 *         name: delivery_id
 *         required: true
 *         schema:
 *           type: string
 *           format: uuid
 *         description: ID da entrega
 *     responses:
 *       200:
 *         description: Log de entrega exibido com sucesso
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   example: "550e8400-e29b-41d4-a716-446655440000"
 *                 user:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                       example: "João Silva"
 *                     email:
 *                       type: string
 *                       format: email
 *                       example: "joao@email.com"
 *                 logs:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         example: "123e4567-e89b-12d3-a456-426614174000"
 *                       description:
 *                         type: string
 *                         example: "Pedido enviado."
 *       401:
 *         description: O usuário não tem permissão para acessar este pedido
 *       404:
 *         description: Pedido não encontrado
 */
deliveryLogsRoutes.get(
  "/:delivery_id/show",
  ensureAuthenticated,
  verifyUserAuthorization(["sale", "customer"]),
  deliveryLogsController.show
);
