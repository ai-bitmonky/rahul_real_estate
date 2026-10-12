import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import Categories from "@/components/Categories";
import Listings from "@/components/Listings";
import WhereWeBuild from "@/components/WhereWeBuild";
import Featured from "@/components/Featured";
import Why from "@/components/Why";
import HowItWorks from "@/components/HowItWorks";
import EmiCalculator from "@/components/EmiCalculator";
import Stories from "@/components/Stories";
import Advisors from "@/components/Advisors";
import Guides from "@/components/Guides";
import Faq from "@/components/Faq";
import BookVisit from "@/components/BookVisit";

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <TrustStrip />
      <Categories />
      <Listings />
      <WhereWeBuild />
      <Featured />
      <Why />
      <HowItWorks />
      <EmiCalculator />
      <Stories />
      <Advisors />
      <Guides />
      <Faq />
      <BookVisit />
    </main>
  );
}
