// Types
import { ICard } from 'types/card';

// Routes
import { listCharacters } from 'routes/Characters/Characters';
import { listComics } from 'routes/Comics/Comics';
import { listSeries } from 'routes/Series/Series';

const characters: ICard[] = listCharacters;
const comics: ICard[] = listComics;
const series: ICard[] = listSeries;

characters[0].comics?.push(comics[0]);
characters[1].comics?.push(comics[0]);
characters[1].comics?.push(comics[1]);
characters[2].comics?.push(comics[3]);
characters[2].comics?.push(comics[2]);
characters[3].comics?.push(comics[1]);
characters[4].comics?.push(comics[2]);
characters[4].comics?.push(comics[3]);

comics[0].characters?.push(characters[0]);
comics[0].characters?.push(characters[1]);
comics[1].characters?.push(characters[1]);
comics[1].characters?.push(characters[3]);
comics[2].characters?.push(characters[2]);
comics[2].characters?.push(characters[4]);
comics[3].characters?.push(characters[2]);
comics[3].characters?.push(characters[4]);

characters[0].series?.push(series[0]);
characters[0].series?.push(series[2]);
characters[1].series?.push(series[1]);
characters[2].series?.push(series[2]);
characters[3].series?.push(series[0]);
characters[3].series?.push(series[3]);
characters[4].series?.push(series[4]);

series[0].characters?.push(characters[0]);
series[0].characters?.push(characters[3]);
series[1].characters?.push(characters[1]);
series[2].characters?.push(characters[2]);
series[2].characters?.push(characters[0]);
series[3].characters?.push(characters[3]);
series[4].characters?.push(characters[4]);

comics[0].series?.push(series[1]);
comics[2].series?.push(series[3]);
comics[3].series?.push(series[4]);

series[1].comics?.push(comics[0]);
series[3].comics?.push(comics[2]);
series[4].comics?.push(comics[3]);

export { characters };
export { comics };
export { series };
