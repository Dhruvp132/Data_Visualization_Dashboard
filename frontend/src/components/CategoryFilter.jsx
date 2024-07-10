/* eslint-disable react/prop-types */
import 'bootstrap/dist/css/bootstrap.min.css';
import { Dropdown, DropdownButton, ButtonGroup } from 'react-bootstrap';
import "../App.css"
const CategoryFilter = ({ categories, selectedCategories, onCategoryChange }) => {
  const handleSelect = (eventKey) => {
    const newSelectedCategories = [...selectedCategories];
    if (newSelectedCategories.includes(eventKey)) {
      const index = newSelectedCategories.indexOf(eventKey);
      newSelectedCategories.splice(index, 1);
    } else {
      newSelectedCategories.push(eventKey);
    }
    onCategoryChange(newSelectedCategories);
  };

  return (
    <DropdownButton
      style={{marginLeft : "40px"}}
      as={ButtonGroup}
      title="Select Category"
      id="bg-nested-dropdown"
      variant="primary"
      onSelect={handleSelect}
    >
      {categories.map(category => (
        <Dropdown.Item
        variant="secondary"
          key={category}
          eventKey={category}
          active={selectedCategories.includes(category)}
        >
          {category}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

export default CategoryFilter;
