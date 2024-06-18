import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { GetUserItems } from "../../../../store/userItems/actions";
import Product from "../../../../components/elements/products/Product";
import Imgg from "../../../../static/img/users/Animation - 1716196066837.gif";

const TableInvoices = (id) => {
  const dispatch = useDispatch();
  useEffect(() => {
    try {
      dispatch(GetUserItems(id.id)); // Pass the user ID from userInfo
    } catch (e) {
      console.log(e);
    }
  }, [id]); // Add userInfo to the dependency array

  const userItems = useSelector((state) => state.userItems.UserItems);
  if (userItems) {
    console.log(userItems.data);
  }
  return (
    <>
      <div className="ps-container">
        {userItems?.data?.items?.length > 0 ? (
          <div className="row">
            {userItems?.data?.items.map((viewItem) => {
              return (
                <div className="col-lg-4 col-md-6 col-sm-12 mb-5">
                  <Product product={viewItem} />
                </div>
              );
            })}
          </div>
        ) : (
          <div className=" d-flex justify-content-center align-items-center">
            <img src={Imgg} width="300px" height="300px" alt="Renttoo" />
          </div>
        )}
      </div>
    </>
  );
};

export default TableInvoices;
