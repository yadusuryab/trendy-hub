import React from "react";

interface BrandProps {
  small?: boolean;
  className?: string;
}

const Brand: React.FC<BrandProps> = () => {
  return (
    <div>
      <h2 className="uppercase">{process.env.NEXT_PUBLIC_APP_NAME}</h2>
    </div>
  );
};

export default Brand;
