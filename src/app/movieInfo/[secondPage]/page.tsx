import { Footer } from "@/app/_components/Footer";
import { Header } from "@/app/_components/Header";

const SecondPage = ({
  params: { secondPage },
}: {
  params: { secondPage: string };
}) => {
  return (
    <div className="">
      <Header />
      {secondPage}
      <Footer />
    </div>
  );
};

export default SecondPage;
