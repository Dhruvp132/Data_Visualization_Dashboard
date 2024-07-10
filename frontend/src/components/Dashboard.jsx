import { useState } from 'react';
import CategoryFilter from './CategoryFilter';
import BarChart from './BarChart';
import LineChart from './LineChart';
import ScatterPlot from './ScatterPlot';

const data = [
  { category: "A", value: 30, date: new Date(2023, 0, 1) },
  { category: "B", value: 80, date: new Date(2023, 0, 2) },
  { category: "C", value: 45, date: new Date(2023, 0, 3) },
  { category: "A", value: 60, date: new Date(2023, 0, 4) },
  { category: "B", value: 20, date: new Date(2023, 0, 5) },
  { category: "C", value: 90, date: new Date(2023, 0, 6) },
  { category: "A", value: 50, date: new Date(2023, 0, 7) },
  { category: "B", value: 70, date: new Date(2023, 0, 8) },
  { category: "C", value: 40, date: new Date(2023, 0, 9) },
];

const categories = ["A", "B", "C"];

const Dashboard = () => {
    const [selectedCategories, setSelectedCategories] = useState(categories);
  
    const handleCategoryChange = (newSelectedCategories) => {
      setSelectedCategories(newSelectedCategories);
    };
  
    const filteredData = data.filter(d => selectedCategories.includes(d.category));
  
    return (
      <div style={{margin : "10px"}}>
        <CategoryFilter
          categories={categories}
          selectedCategories={selectedCategories}
          onCategoryChange={handleCategoryChange}
        />
        <hr />
        <div className="row mt-3">
          <div className="col-12 d-flex flex-wrap">
            <div className="flex-chart">
                <div style={{display : "flex", flexWrap : "wrap", alignContent : "row"}}>
              <LineChart data={filteredData} />
              <h4 style={{marginLeft : "10px", width : "40%", textAlign : "center"}}> <h2>Line Chart</h2> <br /> <br />Wanna Explore more zoom in to get more detailed view </h4>
              </div>
            <hr />
            </div>
            <div className="flex-chart">
            <div style={{display : "flex", flexWrap : "wrap", alignContent : "row"}}>
              <BarChart data={filteredData} />
              <h4 style={{marginLeft : "10px", width : "40%", textAlign : "center"}}> <h2>Bar Chart </h2><br /> <br /> To get filtered data select Category </h4>
              </div>
            <hr />
            </div>
          </div>
          <div className="col-12 mt-3">
          <div style={{display : "flex", flexWrap : "wrap", alignContent : "row"}}>
            <ScatterPlot data={filteredData} />
            <h4 style={{marginLeft : "10px", width : "40%", textAlign : "center"}}> <h2>Scatter Plot </h2> <br /> <br /> *Wanna Explore more zoom in.. </h4>
            </div>
          </div>
        </div>
      </div>
    );
  };
  
  export default Dashboard;
  
