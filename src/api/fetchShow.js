import axios from 'axios';
import stripTags from 'striptags';

const formatSeasons = (allEpisodes) => {
  const seasons = [
    {id:0, name: "Season 1", episodes: []}, 
    {id:1, name: "Season 2", episodes: []}, 
    {id:2, name: "Season 3", episodes: []}
  ];

  allEpisodes.forEach((episode) => {
    seasons[episode.season-1].episodes.push({
      ...episode,
      summary: stripTags(episode.summary),
      image: episode.image ? episode.image.medium : null
    });
  });

  return seasons;
};


const fetchShow = () => {
  return axios
    .get("https://api.tvmaze.com/shows/1/episodes")
    .then(res => {
      const { data } = res;
      
      return {
        name: data.name,
        image: data.image,
        summary: stripTags(data.summary),
        seasons: formatSeasons(data.episodes)
      };
    });
};

export default fetchShow;