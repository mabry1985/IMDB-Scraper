const request = require("request-promise");
const cheerio = require("cheerio");


const sampleResult = {
  title: "Bohmeian Rhapsody",
  rank: 1,
  imbdRating: 8.4,
  url: "https://www.imdb.com/title/tt1302006/?pf_rd_m=A2FGELUUNOQJNL&pf_rd_p=ea4e08e1-c8a3-47b5-ac3a-75026647c16e&pf_rd_r=F537D8JEYZ04RWEV7NHA&pf_rd_s=center-1&pf_rd_t=15506&pf_rd_i=moviemeter&ref_=chtmvm_tt_1",
  posterUrl: "https://m.media-amazon.com/images/M/MV5BMGUyM2ZiZmUtMWY0OC00NTQ4LThkOGUtNjY2NjkzMDJiMWMwXkEyXkFqcGdeQXVyMzY0MTE3NzU@._V1_SY1000_CR0,0,682,1000_AL_.jpg"
}

async function scrapeTitlesRanksAndRatings(){
  
}