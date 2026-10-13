"use client";

import { useSiteState } from "@/context/SiteState";
import BookVisit from "../BookVisit";
import Sheet from "./Sheet";

/** The single "Book a visit" sheet, opened by the centre tab and every Book button in the app shell. */
export default function BookSheet() {
  const { bookSheet, closeBook } = useSiteState();
  return (
    <Sheet open={bookSheet.open} onClose={closeBook} title="Book a free site visit">
      {bookSheet.n > 0 && <BookVisit key={bookSheet.n} variant="sheet" defaultProject={bookSheet.project} />}
    </Sheet>
  );
}
