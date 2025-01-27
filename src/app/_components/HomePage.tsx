import { Hero } from "./Hero";
import { Popular } from "./PopularMovie";
import { TopRated } from "./TopRatedMovies";
import { Upcoming } from "./UpcomingMovie";

export const HomePage = () => {
  return (
    <div>
      <Hero />
      <Upcoming />
      <Popular />
      <TopRated />
    </div>
  );
};
