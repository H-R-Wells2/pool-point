import DateFilter from "@/components/DateFilter";
import ResultCard from "@/components/ResultCard";
import { fetchAllResults, fetchResultsByDate } from "@/lib/actions/result.actions";

export const revalidate = 0;

const page = async () => {

  const resultsData = await fetchAllResults();
  // const uniqueDates = Array.from(new Set(resultsData.map((result) => result.date)));
  
  const formatDate = (dateString:any) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "short",
      day: "numeric",
      timeZone: "Asia/Kolkata"
    };
    return date.toLocaleDateString(undefined, options);
  };

  
  const uniqueDates = Array.from(new Set(resultsData.map((result) => formatDate(result.date))));
  
  const handleDateClick = async (selectedDate: string) => {
    const date = new Date(selectedDate);
    const dateData = await fetchResultsByDate(date);

    console.log("Data for selected date:", dateData);
  };

  return (
    <div className="my-20">
      <div className="flex flex-col mb-3 mt-6">
        <DateFilter uniqueDates={uniqueDates}/>
        {resultsData.map((result) => (
          <ResultCard
            key={result._id.$oid}
            result={result}
            pathname="/results"
          />
        ))}
      </div>
    </div>
  );
};

export default page;
