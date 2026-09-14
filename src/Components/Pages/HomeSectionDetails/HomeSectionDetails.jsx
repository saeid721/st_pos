import React, { useMemo, useState, useCallback } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { Loader } from "lucide-react";
import CustomTable from "../../Shared/Tables/CustomTable";
import HomeSectionDetailsView from "./HomeSectionDetailsView";
import useDelete from "../../Shared/Constant/hooks/useDelete";
import { useGetHomeSectionDetailsQuery } from "../../../store/api/app/HomeSection/homeSectionDetailsApiSlice";

const HomeSectionDetails = () => {
  const { id } = useParams();
  const [selectedData, setSelectedData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const {
    data: HomesectiondetailsData,
    isLoading: isHomeSectionDetailsLoading,
    isError: isHomeSectionDetailsError,
    error: somesectiondetailsError,
  } = useGetHomeSectionDetailsQuery({ section_id: id });

  console.log("HomesectiondetailsData",HomesectiondetailsData);

  const { handleDelete } = useDelete();

  const handleView = (rowData) => {
    setSelectedData(rowData);
    setIsModalOpen(true);
  };
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const columns = useMemo(() => {
    const firstItem = HomesectiondetailsData?.data[0];
    let dataAccessor = null;
    let renderCell = () => null;
    let headerTitle = "Data"; // Default header title

    if (firstItem?.genre_id) {
      dataAccessor = "genre";
      renderCell = ({ value }) => value?.name;
      headerTitle = "Genre"; // Set header for genre
    } else if (firstItem?.movie_id) {
      dataAccessor = "movie";
      renderCell = ({ value }) => value?.title;
      headerTitle = "Movie"; // Set header for movie
    } else if (firstItem?.series_id) {
      dataAccessor = "series";
      renderCell = ({ value }) => value?.title;
      headerTitle = "Series"; // Set header for movie
    } else if (firstItem?.cast_id || firstItem?.director_id) {
      return [
        {
          Header: "Person",
          accessor: (row) => ({ cast: row.cast, director: row.director }),
          Cell: ({ value }) => {
            const castName = value.cast?.name;
            const directorName = value.director?.name;
            if (castName && directorName) {
              return `${castName} (Cast), ${directorName} (Director)`;
            } else if (castName) {
              return `${castName} (Cast)`;
            } else if (directorName) {
              return `${directorName} (Director)`;
            }
            return "N/A";
          },
        },
      ];
    }

    return [
      {
        Header: headerTitle, // Dynamically set the header
        accessor: dataAccessor,
        Cell: renderCell,
      },
    ];
  }, [HomesectiondetailsData]);

  const handleAddNew = () => {
    navigate(`${location.pathname}/new`);
  };

  if (isHomeSectionDetailsLoading) return <Loader />;
  if (isHomeSectionDetailsError)
    return <p>Error: {somesectiondetailsError.message}</p>;

  return (
    <>
      <CustomTable
        columns={columns}
        data={HomesectiondetailsData?.data || []}
        onAddNew={handleAddNew}
        showViewAction={true}
        showEditAction={true}
        showDeleteAction={true}
        handleView={handleView}
        handleDelete={handleDelete}
        editPath={location.pathname}
        showStatus={true}
        path={"homesection"}
        permissions={false}
      />
      <HomeSectionDetailsView
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        data={selectedData}
        title="HomeSectionDetails"
      />
    </>
  );
};

export default HomeSectionDetails;
