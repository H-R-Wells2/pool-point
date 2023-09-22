import ResultCard from "@/components/ResultCard";
import { fetchAllResults } from "@/lib/actions/result.actions";

const page = async () => {
  const resultsData = await fetchAllResults();

  return (
    <div>
      <div className="flex flex-col mb-3 mt-6">
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
