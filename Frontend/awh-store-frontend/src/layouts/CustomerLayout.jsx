import CustomerNavbar from "../components/customer/CustomerNavbar";

function CustomerLayout({ children }) {
  return (
    <>
      <CustomerNavbar />
      <main className="customer-main">{children}</main>
    </>
  );
}

export default CustomerLayout;
