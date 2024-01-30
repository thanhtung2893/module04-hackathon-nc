import express from 'express';
import { CategoryController } from '../controller/category.controller';

const router = express.Router();

router.get('/:id', CategoryController.getCategoryById);
router.get('/', CategoryController.getAllCategories);
router.post('/', CategoryController.createCategory);

export default router;
