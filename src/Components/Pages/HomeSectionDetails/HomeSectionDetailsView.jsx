import React from "react";
import ViewModal from "../../Shared/Modal/ViewModal";
import { useGetHomeSectionDetailsByIdQuery } from "../../../store/api/app/HomeSection/homeSectionDetailsApiSlice";

const HomeSectionDetailsView = ({ isOpen, onClose, data }) => {
  console.log(data);

  const items = [
    {
      status: "Status",
      value: data?.status,
    },
    {
      title: `${data?.movie ? "Movie" : ""} ${data?.genre ? "Genre" : ""}`,
      value: `${data?.movie ? data?.movie?.title : ""} ${
        data?.genre ? data?.genre?.title : ""
      }`,
    },
    {
      title: "Home Section Id",
      value: data?.home_section_id,
    },
  ];
  return (
    <div>
      <ViewModal
        isOpen={isOpen}
        onClose={onClose}
        data={data}
        title="Home Section"
        items={items}
      />
    </div>
  );
};

export default HomeSectionDetailsView;
