import PsychologistsList from "@/components/PsychologistsList";

export default function Favorites() {
  return (
    <div className="container">
      <PsychologistsList isFavoritesOnly={true} />
    </div>
  );
}
