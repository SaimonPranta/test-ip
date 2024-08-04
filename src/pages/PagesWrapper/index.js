import React from "react";

const Index = ({ page }) => {
  return <div dangerouslySetInnerHTML={{ __html: page }} />;
};

export default Index;
