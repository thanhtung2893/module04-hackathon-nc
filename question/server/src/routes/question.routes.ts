// src/components/question/router/question.router.ts
import express from 'express';
import { QuestionController } from '../controller/question.controller';

const router = express.Router();

router.get('/:id', QuestionController.getQuestionById);
router.get('/:id/answers', QuestionController.getQuestionWithAnswers);
router.get('/', QuestionController.getAllQuestions);
//router.get('/filtered', QuestionController.getFilteredQuestions);
router.post('/', QuestionController.createQuestion);

export default router;
