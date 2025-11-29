import React from "react";
import Header from "../../components/Header/Header";

const MainPage: React.FC = () => {
  return (
    <>
      <Header />
      <div style={{ padding: "20px" }}>
        <h2>Main content here</h2>
      </div>
    </>
  );
};

export default MainPage;
