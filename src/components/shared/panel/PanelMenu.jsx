import React, { useEffect } from "react";
import { Menu } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { GetAllCategories } from "../../../store/categories/action";

const PanelMenu = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(GetAllCategories());
  }, [dispatch]);

  const categories = useSelector((state) => state.categories.Categories);

  const generateMenuItems = (categories) => {
    return categories.map((category) => {
      const menuItem = {
        key: category.id,
        label: category.name,
        slug: `/category/${category.id}`, // Assuming the slug format
      };

      // If the category has sub-categories, recursively generate menu items for them
      if (category.subcategories && category.subcategories.length > 0) {
        menuItem.children = generateMenuItems(category.subcategories);
      }

      return menuItem;
    });
  };

  const items = categories?.data?.categories ? generateMenuItems(categories.data.categories) : [];

  const handleMenuItemClick = ({ key }) => {
    if(key !== ""){
        window.location.href=`/category/subcategory/${key}`
        
    }
  };

  return (
    <Menu
      style={{
        width: "100%",
      }}
      mode="inline"
      items={items}
      onClick={handleMenuItemClick}
    />
  );
};

export default PanelMenu;
