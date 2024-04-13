import React, { useState } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

interface RegionProps {
  region: any;
  setExpanded: React.Dispatch<React.SetStateAction<Set<number>>>;
  expanded: Set<number>;
  level: number;
}

const Column: React.FC<RegionProps> = ({
  region,
  level,
  setExpanded,
  expanded,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const loopChildren = (region: any, newExpanded: any) => {
    if (region.children)
      for (let child of region.children) {
        newExpanded.delete(child.id);
        loopChildren(child, newExpanded);
      }
  };

  const onClick = () => {
    if (
      !region.children ||
      !Array.isArray(region.children) ||
      region.children.length === 0
    )
      return;
    setIsExpanded((prev) => {
      const newExpanded = new Set(expanded);
      if (!prev) {
        newExpanded.add(region.id);

        for (let child of region.children) {
          newExpanded.add(child.id);
        }
      } else {
        loopChildren(region, newExpanded);
      }
      setExpanded(newExpanded);

      return !prev;
    });
  };

  return (
    <>
      <th onClick={onClick}>
        {region.name} {isExpanded ? <FaChevronLeft /> : <FaChevronRight />}
      </th>
      {isExpanded && region.children && region.children.length > 0 && (
        <>
          {region.children.map((child: any, index: number) => (
            <Column
              key={index}
              level={level + 1}
              region={child}
              setExpanded={setExpanded}
              expanded={expanded}
            />
          ))}
        </>
      )}
    </>
  );
};

export default Column;
