import handler from "../../libs/handler-lib";
import got from 'got';

export const main = handler(async (event) => {
  const { title } = event.pathParameters;

  try {
    const response = await got('https://movie-database-imdb-alternative.p.rapidapi.com/', {
      searchParams: {s: decodeURIComponent(title), page: '1', r: 'json'},
      headers: {
        'x-rapidapi-key': `${process.env.RAPID_API_KEY}`,
        'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
      }
    });

    return response.body;
    //=> '<!doctype html> ...'
  } catch (error) {
    console.log('e', error.response);
    return error.response.body;
    //=> 'Internal server error ...'
  };
});