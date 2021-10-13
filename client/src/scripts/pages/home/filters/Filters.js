import React, { useContext } from "react";
import { Sidenav, Dropdown, Nav, Icon, Checkbox } from "rsuite";

import filterList from "src/scripts/json/filters";
import topics from "src/scripts/json/topics";

import { HomeContext } from "src/scripts/pages/home/contexts";

import "src/styles/home/filters/Filters.scss";

function Filters() {
    const { update, filters, setFilters } = useContext(HomeContext);
    
    const props = {
        header: {
            className: "sidenav-header"
        },
        icon: {
            icon: "filter",
            size: "2x"
        },
        progress: { 
            title: "progress", 
            eventKey: 0
        },
        level: { 
            title: "level", 
            eventKey: 1
        },
        topics: {
            title: "topics",
            eventKey: 2
        }
    }
    
    const handleFilter = (value, type) => {
        setFilters(prevFilters => {
            if (prevFilters[type].includes(value)) {
                const index = prevFilters[type].indexOf(value);
                prevFilters[type].splice(index, 1);
            }
            else {
                prevFilters[type].push(value);
            }
            
            return prevFilters;
        });
        update();
    }
    
    const FilterComponent = ({ key, label, value, type }) => (
        <Dropdown.Item key={key}>
            <Checkbox 
                onChange={value => handleFilter(value, type)}
                value={value}
                checked={filters[type].includes(value)}
            >
                {label}
            </Checkbox>
        </Dropdown.Item>
    );
    
    return (
        <Sidenav component="filters">
            <Sidenav.Header>
                <div { ...props.header }>
                    <Icon { ...props.icon } /> Filters
                </div>
            </Sidenav.Header>
            <Sidenav.Body>
                <Nav>
                    <Dropdown { ...props.progress }>
                        {filterList["progress"].map((progress, key) => (
                            <FilterComponent 
                                key={key}
                                type="progress"
                                { ...progress } 
                            />
                        ))}
                    </Dropdown>
                    <Dropdown { ...props.level }>
                        {filterList["level"].map((level, key) => (
                            <FilterComponent 
                                key={key}
                                type="levels"
                                { ...level } 
                            />
                        ))}
                    </Dropdown>
                    <Dropdown { ...props.topics }>
                        {topics.map((topic, key) => (
                            <FilterComponent 
                                key={key}
                                type="topics"
                                { ...topic } 
                            />
                        ))}
                    </Dropdown>
                </Nav>
            </Sidenav.Body>
        </Sidenav> 
    )
}

export default Filters;
