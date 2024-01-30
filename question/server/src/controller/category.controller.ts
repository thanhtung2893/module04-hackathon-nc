
import { Request, Response } from 'express';
import { CategoryService } from '../services/category.service';

export const CategoryController = {
  getCategoryById: async (req: Request, res: Response) => {
    try {
      const categoryId = parseInt(req.params.id, 10);
      const category = await CategoryService.getCategoryById(categoryId);

      if (!category) {
        return res.status(404).json({ error: 'Category not found' });
      }

      res.json(category);
    } catch (error) {
      console.error('Error getting category by ID', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getAllCategories: async (req: Request, res: Response) => {
    try {
      const categories = await CategoryService.getAllCategories();
      res.json(categories);
    } catch (error) {
      console.error('Error getting all categories', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  createCategory: async (req: Request, res: Response) => {
    try {
      const { category_name } = req.body;
      const newCategory = await CategoryService.createCategory(category_name);
      res.status(201).json(newCategory);
    } catch (error) {
      console.error('Error creating category', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
