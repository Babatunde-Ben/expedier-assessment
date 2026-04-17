import { BalanceSection } from "./BalanceSection";
import { SpendingTrendCard } from "./SpendingTrendCard";
import { AmazingOffersCard } from "./AmazingOffersCard";
import { ExchangeRatesCard } from "./ExchangeRatesCard";

export function DashboardView() {
  return (
    <div>
      {/* Welcome + Balance */}
      <BalanceSection
        businessName="RCCG Church"
        date="Monday, October 14, 2024"
        balance={10000}
      />

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_430px]">
        <SpendingTrendCard />
        <div className="flex flex-col gap-6 p-4 md:py-8 md:px-10">
          <AmazingOffersCard />
          <ExchangeRatesCard />
        </div>
      </div>
    </div>
  );
}
