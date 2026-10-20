import { greetingData } from "@/content/greeting";
import { LetterExperience } from "@/components/letter-experience";

export default function HomePage() {
  return (
    <main className="scene-main">
      <LetterExperience greeting={greetingData} />
    </main>
  );
}
