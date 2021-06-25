import handler from "../../libs/handler-lib";
import got from 'got';

export const main = handler(async (event) => {
  const { title } = JSON.parse(event.body);
  console.log('SECRET', process.env.STRIPE_SECRET_KEY);
  try {
    const response = await got('https://movie-database-imdb-alternative.p.rapidapi.com/', {
      searchParams: {s: title, page: '1', r: 'json'},
      headers: {
        'x-rapidapi-key': `${process.env.RAPID_API_KEY}`,
        'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
      }
    });

    return response.body;
    //=> '<!doctype html> ...'
  } catch (error) {
    return error.response.body;
    //=> 'Internal server error ...'
  };
});