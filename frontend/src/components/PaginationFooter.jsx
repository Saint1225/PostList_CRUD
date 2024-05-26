import { useState } from "react";
import { IconButton } from "@material-tailwind/react";

const PaginationFooter = ({ totalPages, setNewPageNumber }) => {
  const [active, setActive] = useState(1);

  const pagesNumberArray = Array.from(
    Array(totalPages).keys(),
    (_, i) => i + 1
  );

  const getItemProps = (index) => ({
    className:
      active === index ? "bg-yellow text-black text-md" : "bg-white text-md",
    variant: active === index ? "filled" : "text",
    color: "black",
    size: "sm",
    onClick: () => {
      setActive(index);
      setNewPageNumber(index);
    },
  });

  return (
    <div className="flex justify-center items-center gap-4 mt-auto mb-4">
      <div className="flex items-center gap-4">
        {pagesNumberArray.map((pageNumber) => (
          <IconButton key={pageNumber} {...getItemProps(pageNumber)}>
            {pageNumber}
          </IconButton>
        ))}
      </div>
    </div>
  );
};

export default PaginationFooter;
