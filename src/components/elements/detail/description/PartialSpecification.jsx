import React from 'react';
import { useTranslation } from 'react-i18next';

const PartialSpecification = ({product}) => {
    const [t , i18n] = useTranslation()
    const textAlign = i18n.language === 'ar' ? 'right' : 'left';

  return (
    <div>
        <div className="table-responsive" style={{textAlign}}>
        {product && product.data && product.data.item ? (
            <table className="table table-bordered ps-table ps-table--specification">
                <tbody>
                    <tr>
                        <td>{t('name')} </td>
                        <td>{product.data.item.owner_name}</td>
                    </tr>
                    <tr>
                        <td>{t("phone")}</td>
                        <td>{product.data.item.owner_phone}</td>
                    </tr>
                    <tr>
                        <td>{t("emailAccount")}</td>
                        <td>{product.data.item.owner_email}</td>
                    </tr>
                </tbody>
            </table>
        ) : null}
    </div>
    </div>
  )
}

export default PartialSpecification