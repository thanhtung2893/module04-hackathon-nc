
import mysql from 'mysql2/promise';

const pool = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'hackathon',
  port: 3306,
});

export const CategoryService = {
  getCategoryById: async (categoryId: number) => {
   const all=mysql.createPool(pool);
   const [result]=await all.execute('SELECT * FROM category WHERE category_id = ?', [categoryId]);
   return result;
  },

  getAllCategories: async () => {
    const all=mysql.createPool(pool);
    return all.execute('SELECT * FROM category');
  },

  createCategory: async (categoryName: string) => {
   const all=mysql.createPool(pool);
   const [result]=await all.execute('INSERT INTO category (category_name) VALUES (?)', [categoryName]);
   return result;
  },
};
