// pages/HallOfFamePage.jsx
import RankingBoard from "@/components/Ranking/RankingBoard";
import RankingList from "@/components/Ranking/RankingList";

export default function HallOfFamePage() {
    return (
        <div className="w-full max-h-screen flex flex-col min-h-screen">
            <div className="ranking-board-wrapper">
                <RankingBoard />
            </div>
            <div className="ranking-list-wrapper flex-grow pt-5">
                <RankingList />
            </div>
        </div>
    );
}