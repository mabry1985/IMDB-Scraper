const request = require("request-promise");
const cheerio = require("cheerio");
const Nightmare = require("nightmare");
const nightmare = Nightmare({ show: true });


const sampleResult = {
  title: "Bohmeian Rhapsody",
  rank: 1,
  imbdRating: 8.4,
  url: "https://www.imdb.com/title/tt1302006/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=ea4e08e1-c8a3-47b5-ac3a-75026647c16e&pf_rd_r=F537D8JEYZ04RWEV7NHA&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=moviemeter&ref_=chtmvm_tt_1",
  posterUrl: 'https://www.imdb.com/title/tt0083866/mediaviewer/rm1993282560?ref_=tt_ov_i',
  posterImageUrl:"https://m.media-amazon.com/images/M/MV5BMGUyM2ZiZmUtMWY0OC00NTQ4LThkOGUtNjY2NjkzMDJiMWMwXkEyXkFqcGdeQXVyMzY0MTE3NzU@._V1_SY1000_CR0,0,682,1000_AL_.jpg"
}

async function scrapeTitlesRanksAndRatings(){
  const result = await request.get("https://www.imdb.com/chart/moviemeter/?ref_=nv_mv_mpm");
  const $ = await cheerio.load(result);

  const movies = $("tr")
    .map((i, el) => {
      const title = $(el).find("td.titleColumn > a")
        .text();
      const imdbRating = $("td.ratingColumn.imdbRating")
        .text()
        .trim();
      const descriptionUrl = "https://www.imdb.com" + $(el).find("td.titleColumn > a").attr("href")
      return {title, imdbRating, rank: i, descriptionUrl};
    }).get();
  return movies;
}

async function scrapePosterUrl(movies) {
  const moviesWithPosterUrls = await Promise.all(
    movies.map(async movie => {
      try {
        const html = await request.get(movie.descriptionUrl);
        const $ = await cheerio.load(html);
        movie.posterUrl = "https://www.imdb.com" + $("div.poster > a").attr("href");
        return movie;
      } catch (err) {
        console.error(err);
      }
    })
  )
  return moviesWithPosterUrls;
}

async function scrapePosterImageUrl(movies) {
  for(var i = 0; i < movies.length; i++) {
    try {
    const posterImageUrl = await nightmare
    .goto(movies[i].posterUrl)
    .evaluate(() =>
      $("#photo-container > div > div:nth-child(3) > div > div.pswp__scroll-wrap > div.pswp__container > div:nth-child(2) > div > img:nth-child(2)").attr("src")
      );
    movies[i].posterImageUrl = posterImageUrl;
    console.log(movies[i]);
    } catch (err) {
      console.error(err);
    }
  }
  return movies;
}


async function main() {
  let movies = await scrapeTitlesRanksAndRatings();
  movies = await scrapePosterUrl(movies);
  movies = await scrapePosterImageUrl(movies)
  console.log(movies);
}

main();