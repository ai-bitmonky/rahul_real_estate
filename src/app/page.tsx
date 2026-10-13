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
import MobileHome from "@/components/mobile/MobileHome";
import { getDevice } from "@/lib/device";

export default async function Home() {
  // Phones get only the compact app Home. Desktop/tablet user-agents get the full page, plus the
  // app Home hidden by CSS so a narrow desktop window (< 700px) still shows the app layout.
  if ((await getDevice()) === "mobile") {
    return (
      <main id="main">
        <MobileHome priority />
      </main>
    );
  }
  return (
    <main id="main">
      <div className="only-desktop">
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
      </div>
      <MobileHome />
    </main>
  );
}
