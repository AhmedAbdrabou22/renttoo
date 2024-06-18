import AccountMenuSidebar from "./modules/AccountMenuSidebar";
import TableInvoices from "./modules/TableInvoices";

const Invoices = ({ id, type }) => {
  const accountLinks = [
    {
      text: "Account Information",
      url: "/account/user-information",
      icon: "icon-user",
    },
    {
      text: "My product",
      url: "/account/favProduct/Favourite",
      icon: "icon-papers",
      active: true,
    },
    {
      text: "Recent Viewed Product",
      url: "/account/recent-viewed-product",
      icon: "icon-store",
    },
    {
      text: "Wishlist",
      url: "/account/wishlist",
      icon: "icon-heart",
    },
  ];

  return (
    <section className="ps-my-account ps-page--account">
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div className="ps-page__left">
              <AccountMenuSidebar data={accountLinks} />
            </div>
          </div>
          <div className="col-lg-8">
            <div className="ps-page__content">
              <div className="ps-section--account-setting">
                <div className="ps-section__header">
                  <h3>User Items</h3>
                </div>
                <div className="ps-section__content">
                  <TableInvoices id={id} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Invoices;
