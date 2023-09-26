import DateFilter from "@/components/DateFilter";
import ResultCard from "@/components/ResultCard";
import {
  fetchAllResults,
  fetchResultsByDate,
} from "@/lib/actions/result.actions";

export const revalidate = 0;

export const dynamic = "force-dynamic";

const fetchResults = async (date: string) => {
  if (!date) return null;

  const data = await fetchResultsByDate(new Date(date));
  // console.log(data);
  return data;
};
const AdminPage = async ({
  searchParams,
}: {
  searchParams?: { [key: string]: string | string[] | undefined };
}) => {
  const selectedSearch = searchParams?.selected ?? "";
  const selected = Array.isArray(selectedSearch)
    ? selectedSearch[0]
    : selectedSearch;

  const dateData = await fetchResults(selected);

  const resultsData = await fetchAllResults();

  const formatDate = (dateString: any) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "Asia/Kolkata",
    };
    return date.toLocaleDateString(undefined, options);
  };

  const uniqueDates = Array.from(
    new Set(resultsData.map((result) => formatDate(result.date)))
  );

  return (
    <div className="my-20">
      <div className="flex flex-col mb-3 mt-6">
        <DateFilter uniqueDates={uniqueDates} selected={selected || ""} />
        {resultsData.map((result) => (
          <ResultCard key={result._id.$oid} result={result} pathname="/admin" />
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
