import React, { useState } from "react";
import { Form, FormControl, Button } from "react-bootstrap";
import "./toggleSearch.css";

const SearchBar = (props) => {
  const [searchTerm, setSearchTerm] = useState("");

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    props.handleSearch(searchTerm);
  };

  return (
    <Form onSubmit={handleSubmit} className="d-flex">
      <FormControl
        type="text"
        placeholder="Search available bags..."
        className="mr-sm-2 search-bar"
        value={searchTerm}
        onChange={handleChange}
      />
      <Button variant="primary" type="submit" className="search-button">
        <span className="material-icons">Search</span>
      </Button>
    </Form>
  );
};

export default SearchBar;
