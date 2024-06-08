import express from 'express';
import { AdminControllers } from './admin.controller';
import { updateAdminValidationSchema } from './admin.validation';
import validateRequest from '../../../app/middlewares/validateRequest';

const router = express.Router();

router.get('/get-admins', AdminControllers.getAllAdmins);

router.get('/get-admin/:id', AdminControllers.getSingleAdmin);

router.patch('/update-admin/:id', validateRequest(updateAdminValidationSchema), AdminControllers.updateAdmin);

router.delete('/delete-admin/:adminId', AdminControllers.deleteAdmin);

export const AdminRoutes = router;
