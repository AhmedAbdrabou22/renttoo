import React, { useEffect, useState } from "react";
import BreadCrumb from "../../../../components/elements/BreadCrumb";
import FooterDefault from "../../../../components/shared/footers/FooterDefault";
import Newletters from "../../../../components/partials/commons/Newletters";
import PageContainer from "../../../../components/layouts/PageContainer";
import Invoices from "../../../../components/partials/account/Invoices";
import { GetUserInformation } from "../../../../store/auth/action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";

const Favourite = () => {
  const navigate = useNavigate();
  const [productId, setProductId] = useState(null);
  const [IdSegment, setIdSegment] = useState(null);
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.auth.InformationUser);
  const [loading, setLoading] = useState(false);
  const { id } = useParams(); // Get the id from the URL if it exists

  useEffect(() => {
    const fetchUserInformation = async () => {
      try {
        setLoading(true);
        await dispatch(GetUserInformation());
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    // If there's no ID in the URL, fetch user information
    if (!id) {
      fetchUserInformation();
    }
  }, [dispatch, id]);

  useEffect(() => {
    // If there's a valid ID segment in the URL, set it
    if (id && !isNaN(id)) {
      setIdSegment(id);
    }
  }, [id]);

  useEffect(() => {
    // If user info is available, set the product ID
    if (
      userInfo &&
      userInfo.data &&
      userInfo.data.user &&
      userInfo.data.user.id
    ) {
      setProductId(userInfo.data.user.id);
    }
  }, [userInfo]);

  const breadCrumb = [
    {
      text: "Home",
      url: "/",
    },
    {
      text: "Favourite",
    },
  ];

  return (
    <>
      <PageContainer footer={<FooterDefault />} title="Favourite">
        <div className="ps-page--my-account">
          <BreadCrumb breacrumb={breadCrumb} />
          {!loading && ( // Render Invoices only when loading is false
            <>
              <Invoices
                id={IdSegment || productId}
                type={IdSegment ? "seg" : "id"}
              />
            </>
          )}
        </div>
        <Newletters layout="container" />
      </PageContainer>
    </>
  );
};

export default Favourite;
