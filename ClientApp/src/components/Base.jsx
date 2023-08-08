import CustomeNavbar from "./CustomeNavbar";
//import Footer from "./Footer";

const Base = ({ title = "welcome to our website", children }) => {
  return (
    <div className="container-fluid p-0 m-0">
      <CustomeNavbar />
      {children}
      {/* <Footer /> */}
    </div>
  );
};

export default Base;
