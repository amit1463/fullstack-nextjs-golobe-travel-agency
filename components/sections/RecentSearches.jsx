import { EmptyResult } from "@/components/EmptyResult";
import SearchHistoryCard from "@/components/SearchHistoryCard";
import { parseFlightSearchParams } from "@/lib/utils";
export function RecentSearches({ searchesArr = [] }) {
  return (
    <section className="mb-[80px]">
      <div className="mb-[32px] text-[2rem] font-semibold text-secondary">
        Your recent searches
      </div>

      {searchesArr.length === 0 ? (
        <EmptyResult message="No recent searches" className={"w-full"} />
      ) : (
        <div className="grid gap-[16px] md:grid-cols-2 lg:grid-cols-3">
          {searchesArr.map((search, index) => {
            const sState = search.searchState;
            let data = {
              type: search.type,
              searchState: sState,
              searchedAt: search.createdAt,
            };

            if (search.type === "flight") {
              const parsedState = parseFlightSearchParams(sState);
              data = {
                ...data,
                tripType: parsedState.tripType,
                details: `${parsedState.from.city} (${parsedState.from.iataCode}) → ${parsedState.to.city} (${parsedState.to.iataCode})`,
                class: parsedState.class,
                passengers: Object.values(parsedState.passengers).reduce(
                  (acc, val) => acc + val,
                  0,
                ),
                departureDate: parsedState.desiredDepartureDate,
                returnDate: parsedState.desiredReturnDate,
              };
            }

            if (search.type === "hotel") {
              data = {
                ...data,
                details: `${sState.city}, ${sState.country}`,
                rooms: sState.rooms,
                guests: sState.guests,
                checkInDate: +sState.checkIn,
                checkOutDate: +sState.checkOut,
              };
            }

            return (
              <div
                key={search._id}
                className={index < 2 ? "opacity-40" : undefined}
              >
                <SearchHistoryCard search={data} />
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}
