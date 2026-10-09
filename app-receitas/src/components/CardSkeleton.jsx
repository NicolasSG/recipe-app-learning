import Skeleton from "@mui/material/Skeleton";

function CardSkeleton() {
  return (
    <div className="skeleton-grid">
      {[0, 1, 2, 3].map((item) => (
        <div key={item} className="skeleton-item">
          <Skeleton animation="wave" variant="text" sx={{ fontSize: "20px" }} />
          <Skeleton
            animation="wave"
            variant="rounded"
            height={200}
            sx={{ borderRadius: "16px", mt: "15px" }}
          />
        </div>
      ))}
    </div>
  );
}

export default CardSkeleton;
