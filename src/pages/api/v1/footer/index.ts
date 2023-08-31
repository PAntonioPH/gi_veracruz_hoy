import {NextApiRequest, NextApiResponse} from "next";
import {conn} from "@/utils/database";
import {message} from "@/utils/functions";
import {decodeHTML5} from "entities";

const Home = async (req: NextApiRequest, res: NextApiResponse) => {
  const {method} = req;

  let response: any = {};

  switch (method) {
    case "GET":
      try {
        const categoriesNews = [
          {
            id: 1,
            limit: 1,
            name: "estado"
          },
          {
            id: null,
            limit: 5,
            name: null
          }
        ]

        for (let i = 0; i < categoriesNews.length; i++) {
          const {limit, id, name} = categoriesNews[i];

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
                                                         ${id ? ` AND p.id_category = '${id}' ` : ""}
                                                     ORDER BY p.id DESC ${limit ? ` LIMIT ${limit}` : ""};`)

          if (categoryResponse.rows.length > 0) categoryResponse.rows.forEach((post: any) => post.content = decodeHTML5(post.content).replace(/<[^>]*>?/gm, ''));

          response[name ? name : "lastPosts"] = categoryResponse.rows;
        }


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