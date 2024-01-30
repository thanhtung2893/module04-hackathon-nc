// src/components/question/controller/question.controller.ts
import { Request, Response } from 'express';
import { QuestionService } from '../services/question.service';

export const QuestionController = {
  getQuestionById: async (req: Request, res: Response) => {
    try {
      const questionId = parseInt(req.params.id, 10);
      const question = await QuestionService.getQuestionById(questionId);

      if (!question) {
        return res.status(404).json({ error: 'Question not found' });
      }

      res.json(question);
    } catch (error) {
      console.error('Error getting question by ID', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getQuestionWithAnswers: async (req: Request, res: Response) => {
    try {
      const questionId = parseInt(req.params.id, 10);
      const questionWithAnswers = await QuestionService.getQuestionWithAnswers(questionId);

      if (!questionWithAnswers) {
        return res.status(404).json({ error: 'Question not found or has no answers' });
      }

      res.json(questionWithAnswers);
    } catch (error) {
      console.error('Error getting question with answers', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

  getAllQuestions: async (req: Request, res: Response) => {
    try {
      const questions = await QuestionService.getAllQuestions();
      res.json(questions);
    } catch (error) {
      console.error('Error getting all questions', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },

 /*  getFilteredQuestions: async (req: Request, res: Response) => {
    
    try {
      const { category, level, limit } = req.query;
      const filteredQuestions = await QuestionService.getFilteredQuestions(category, level, limit);
      res.json(filteredQuestions);
    } catch (error) {
      console.error('Error getting filtered questions', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }, */

  createQuestion: async (req: Request, res: Response) => {
    try {
      const { category, content, level } = req.body;
      const newQuestion = await QuestionService.createQuestion(category, content, level);
      res.status(201).json(newQuestion);
    } catch (error) {
      console.error('Error creating question', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  },
};
