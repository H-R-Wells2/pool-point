import ResultCard from "@/components/ResultCard";
import { fetchAllResults } from "@/lib/actions/result.actions";

export const revalidate = 0;

const AdminPage = async () => {
  const resultsData = await fetchAllResults();


  return (
    <div>
      <div className="flex flex-col mb-3 mt-6">
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
