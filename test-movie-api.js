import got from 'got';
import handler from './libs/handler-lib';

export const main = handler(async (event) => {
  const { title } = JSON.parse(event.body);

  try {
    const response = await got('https://movie-database-imdb-alternative.p.rapidapi.com/', {
      searchParams: {Search: "Genre", s: title, page: '1', r: 'json'},
      headers: {
        'x-rapidapi-key': '9d6a42fcc0msh503edc104ab11e1p130513jsn0996dc0fa553',
        'x-rapidapi-host': 'movie-database-imdb-alternative.p.rapidapi.com'
      }
    });

    console.log(response.body);
    //=> '<!doctype html> ...'
  } catch (error) {
    console.log(error.response.body);
    //=> 'Internal server error ...'
  };

  return { status: true };
});


// {"Title":"Avengers: Endgame","Year":"2019","imdbID":"tt4154796","Type":"movie","Poster":"https://m.media-amazon.com/images/M/MV5BMTc5MDE2ODcwNV5BMl5BanBnXkFtZTgwMzI2NzQ2NzM@._V1_SX300.jpg"}