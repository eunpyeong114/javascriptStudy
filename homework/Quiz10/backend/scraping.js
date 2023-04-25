import cheerio from "cheerio";
import axios from "axios";
// createMessage()를 통해 scraping한 값 넣을 객체

// prefer 주소 값을 통해 scraping 후 객체에 담기
export const createOg = async ({ userPrefer }) => {
  const openGraph = {};
  console.log(userPrefer);
  const result = await axios.get(userPrefer);

  const $ = cheerio.load(result.data);
  const og = $("meta").each((i, el) => {
    if ($(el).attr("property") && $(el).attr("property").includes("og:")) {
      const key = $(el).attr("property").split(":")[1];
      const value = $(el).attr("content");
      openGraph[key] = value;
    }
  });
  console.log(openGraph);
  return openGraph;
};
