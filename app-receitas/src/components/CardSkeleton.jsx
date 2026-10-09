import Skeleton from "@mui/material/Skeleton";

// cores via variáveis CSS, para funcionar nos temas claro e escuro
const skeletonSx = {
  bgcolor: "var(--color-skeleton)",
  "&::after": {
    background:
      "linear-gradient(90deg, transparent, var(--color-skeleton-wave), transparent)",
  },
};

function CardSkeleton() {
  return (
    <div className="skeleton-grid">
      {[0, 1, 2, 3].map((item) => (
        <div key={item} className="skeleton-item">
          <Skeleton
            animation="wave"
            variant="text"
            sx={{ fontSize: "20px", ...skeletonSx }}
          />
          <Skeleton
            animation="wave"
            variant="rounded"
            height={200}
            sx={{ borderRadius: "16px", mt: "15px", ...skeletonSx }}
          />
        </div>
      ))}
    </div>
  );
}

export default CardSkeleton;
