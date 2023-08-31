import {NextApiRequest, NextApiResponse} from "next";
import {conn} from "@/utils/database";
import {message} from "@/utils/functions";
import {decodeHTML5} from "entities";

interface Category {
  id: number,
  name: string,
  father?: boolean
}

const removeAccents = (str: string) => {
  return str.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
}

const toCamelCase = (str: string): string => {
  // Quitar acentos antes de transformar a camel case
  str = removeAccents(str);

  return str
    .replace(/\s(.)/g, ($1) => {
      return $1.toUpperCase();
    })
    .replace(/\s/g, '')
    .replace(/^(.)/, ($1) => {
      return $1.toLowerCase();
    });
}


const Home = async (req: NextApiRequest, res: NextApiResponse) => {
  const {method} = req;

  let response: any = {
    categoriesPosts: {},
    lastPosts: [],
    news: []
  };

  switch (method) {
    case "GET":
      try {
        let responseTemp = await conn.query(`SELECT c.id, c.name, c.father
                                             FROM categories c
                                             WHERE c.id != 0 
                                                   AND c.active = true
                                             AND c.father IS NULL
                                             ORDER BY c.id; `)

        let categories: Category[] = responseTemp.rows;

        let categoriesPosts: any = {};

        for (let i = 0; i < categories.length; i++) {
          const {name, id} = categories[i];

          const categoryResponse = await conn.query(`SELECT p.id,
                                                            p.title,
                                                            p.img,
                                                            p.content,
                                                            c.url  as category,
                                                            c.name as category_name
                                                     FROM posts p
                                                              JOIN categories c on p.id_category = c.id
                                                     WHERE p.active = true
                                                       AND p.id_post_type = 1
                                                       AND p.id_category = '${id}'
                                                     ORDER BY p.id DESC LIMIT 5;`)

          if (categoryResponse.rows.length > 0) categoryResponse.rows.forEach((post: any) => post.content = decodeHTML5(post.content).replace(/<[^>]*>?/gm, ''));

          categoriesPosts[toCamelCase(name)] = categoryResponse.rows;
        }

        for (const key in categoriesPosts) if (categoriesPosts[key].length === 0) delete categoriesPosts[key];

        response.categoriesPosts = categoriesPosts;

        const lastPosts = await conn.query(`SELECT p.id,
                                                   p.title,
                                                   p.img,
                                                   p.content,
                                                   c.url  as category,
                                                   c.name as category_name
                                            FROM posts p
                                                     JOIN categories c on p.id_category = c.id
                                            WHERE p.active = true
                                              AND p.id_post_type = 1
                                            ORDER BY p.id DESC LIMIT 10;`)

        if (lastPosts.rows.length > 0) lastPosts.rows.forEach((post: any) => post.content = decodeHTML5(post.content).replace(/<[^>]*>?/gm, ''));

        response.lastPosts = lastPosts.rows;

        const categoriesNews = [2, 3, 5]

        let news: any = [];

        for (let i = 0; i < categoriesNews.length; i++) {
          const id = categoriesNews[i];

          const categoryResponse = await conn.query(`SELECT p.id,
                                                            p.title,
                                                            p.img,
                                                            p.content,
                                                            c.url  as category,
                                                            c.name as category_name
                                                     FROM posts p
                                                              JOIN categories c on p.id_category = c.id
                                                     WHERE p.active = true
                                                       AND p.id_post_type = 1
                                                       AND p.id_category = '${id}'
                                                     ORDER BY p.id DESC LIMIT 1;`)

          if (categoryResponse.rows.length > 0) categoryResponse.rows.forEach((post: any) => post.content = decodeHTML5(post.content).replace(/<[^>]*>?/gm, ''));

          news = [...news, ...categoryResponse.rows];
        }

        response.news = news;

        return res.status(200).json(message("Home consultado", response));
      } catch (e) {
        console.log(e);
        return res.status(500).json(message("Error, al consultar el home"));
      }
    default:
      return res.status(400).json(message("Method not allowed"));
  }
}

export default Home;