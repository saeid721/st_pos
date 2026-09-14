import React from "react";
import ViewModal from "../../Shared/Modal/ViewModal";
import { useGetBranchesByIdQuery } from "../../../store/api/app/Branch/branchApiSlice";
import { useParams } from "react-router-dom";

const BranchView = ({ isOpen, onClose, data }) => {
  const { id } = useParams();
  const { data: viewData } = useGetBranchesByIdQuery(id);
  const items = [
    {
      status: "Status",
      value: viewData?.data?.status,
    },
    {
      title: "Name",
      value: viewData?.data?.name,
    },
    {
      image: "Image",
      value: viewData?.data?.image,
    },
    {
      title: "Email",
      value: viewData?.data?.email	,
    },
    {
      title: "Mobile",
      value: viewData?.data?.mobile,
    },
    {
      title: "Address",
      value: viewData?.data?.address,
    },
    {
      title: "Info",
      value: viewData?.data?.info,
    },
    {
      title: "Note",
      value: viewData?.data?.note,
    },
  ];
  return (
    <div>
      <ViewModal
        isOpen={isOpen}
        onClose={onClose}
        data={data}
        title="Branch"
        items={items}
      />
    </div>
  );
};

export default BranchView;


// import React from 'react';

// const BranchView = () => {
//   return (
//     <div>
//       ajkldfj
//     </div>
//   );
// };

// export default BranchView;