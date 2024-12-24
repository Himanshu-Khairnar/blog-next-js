import AllBlog from "@/component/AllBlog";
import { LandingPage } from "@/component/LandingPage";
import LatestBlog from "@/component/LatestBlog";
import PopularBlog from "@/component/PopularBlog";
import SearchInput from "@/component/SearchInput";
import Topics from "@/component/Topics";

export default async function Home() {
  return (
    <div className="w-full px-4 md:px-8 lg:px-12">
      <SearchInput />
      <LandingPage />
      <LatestBlog />
      <PopularBlog />
      <Topics />
      <AllBlog />
    </div>
  );
}
