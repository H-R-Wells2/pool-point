import DateFilter from "@/components/DateFilter";
import ResultCard from "@/components/ResultCard";
import { fetchAllResults } from "@/lib/actions/result.actions";

export const revalidate = 0;

const AdminPage = async () => {
  const resultsData = await fetchAllResults();


  return (
    <div className="my-20">
      <div className="flex flex-col mb-3 mt-6">
      <DateFilter />
        {resultsData.map((result) => (
          <ResultCard
            key={result._id.$oid}
            result={result}
            pathname="/admin"
          />
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
