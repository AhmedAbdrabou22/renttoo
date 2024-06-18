import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { TermsAndConditions } from "../../../store/TermsAndConditions/action";

const Blank = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(true);

  const gettermsAndConditions = async () => {
    try {
      await dispatch(TermsAndConditions());
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    gettermsAndConditions();
  }, [dispatch]);

  const termsAndConditions = useSelector(
    (state) => state.TermsAndConditions.termsAndConditions
  );

  if (loading) {
    return <p>Loading...</p>;
  }

  if (!termsAndConditions) {
    return <p>No terms and conditions available.</p>;
  }

  return (
    <div className="p-5">
      <div dangerouslySetInnerHTML={{ __html: termsAndConditions.data }} />
    </div>
  );
};

export default Blank;
