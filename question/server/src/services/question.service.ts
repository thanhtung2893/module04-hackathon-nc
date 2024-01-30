import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hackathon',
  port: 3306,
});

export const QuestionService = {
    //lay question theo question_id
  getQuestionById: async (questionId: number) => {
  const all=mysql.createPool(pool);
  const [result]=await all.execute('SELECT * FROM question WHERE question_id = ?', [questionId]);
  return result
  },
//phép lấy về một question với toàn bộ answers của question đó
  getQuestionWithAnswers: async (questionId: number)=> {
   const all=mysql.createPool(pool);
   const [result]=await all.execute(
    'SELECT * FROM question INNER JOIN answer ON question.question_id = answer.question_id WHERE question.question_id = ?', [questionId]
   )
   return result
  },
//lay toan bo question
  getAllQuestions: async () => {
    const all=mysql.createPool(pool);
    return all.execute('SELECT * FROM question');
  },
//
  getFilteredQuestions: async (category: number, level: string, limit: number) => {
    const all=mysql.createPool(pool);
    const [result]=await all.execute(
        'SELECT * FROM question WHERE category_id = ? AND level = ? LIMIT ?',
        [category, level, limit]        
    )
    return result
  },
//them moi 1 question
  createQuestion: async (category: number, content: string, level: string) => {
    const all=mysql.createPool(pool);
    const [result]=await all.execute(
        'INSERT INTO question (category_id, content, level) VALUES (?, ?, ?)',
        [category, content, level]
    )
    return result
  },
};
