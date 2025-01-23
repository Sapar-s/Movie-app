import { Footer } from "./Footer";
import { Header } from "./Header";
import { Hero } from "./Hero";
import { Popular } from "./PopularMovie";
import { TopRated } from "./TopRatedMovies";
import { Upcoming } from "./UpcomingMovie";

export const HomePage = () => {
  return (
    <div>
      <Header />
      <Hero />
      <Upcoming />
      <Popular />
      <TopRated />
      <Footer />
    </div>
  );
};
