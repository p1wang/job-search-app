import Pagination from "@mui/material/Pagination";
import { useRouter } from "next/router";

function PaginationComp({ pageCount }) {
  const router = useRouter();
  const { page, take, search } = router.query;

  const handleChange = (event, value) => {
    search
      ? router.push(`?search=${search}&page=${value}&take=${take || 10}`)
      : router.push(`?page=${value}&take=${take || 10}`);
  };

  return (
    <Pagination
      // siblingCount={1}
      sx={{
        "& > *": {
          justifyContent: "center",
          display: "flex",
        },
      }}
      count={pageCount}
      page={parseInt(page) || 1}
      onChange={handleChange}
    />
  );
}

export default PaginationComp;
