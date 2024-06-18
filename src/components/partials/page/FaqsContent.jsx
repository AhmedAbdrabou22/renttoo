import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { GetFaq } from "../../../store/faq/action";

const FaqsContent = () => {
  const [t, i18n] = useTranslation();
  const dispatch = useDispatch();
  const [loading, setLaoding] = useState(false);

  // Get ALL Categories Data
  const getFaqs = async () => {
    try {
      setLaoding(true);
      await dispatch(GetFaq(i18n.language));
    } catch (e) {
      console.log(e);
    } finally {
      setLaoding(false);
    }
  };

  useEffect(() => {
    getFaqs();
  }, [dispatch]);
  const faqs = useSelector((state) => state.faq.FAQ);

  return (
    <div className="table-responsive">
      <table className="table ps-table--faqs">
        <tbody>
          {faqs?.data?.data.map((item, index) => (
            <tr key={item.id}>
              <td className="heading">
                <h4>{item.question}</h4>
              </td>

              <td>{item.answer}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FaqsContent;
