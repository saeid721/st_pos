import React, { useEffect, useMemo, useState } from "react";
import CustomPaginationTable from "../../Shared/Tables/CustomPaginationTable";
import useDelete from "../../Shared/Constant/hooks/useDelete";
import { Loader } from "lucide-react";
import { useSelector } from "react-redux";
import { useGetFeaturesByPaginationQuery } from "../../../store/api/app/Features/featuresApiSlice";
import AssetTypesView from "./AssetTypesView";
import { useGetAssetTypesByPaginationQuery } from "../../../store/api/app/AssetTypesApi/featuresApiSlice";
import AssetTypesPrint from "./AssetTypesPrint";
import AssetTypesPdf from "./AssetTypesPdf";

const AssetTypes = () => {
  const [selectedData, setSelectedData] = useState(null);
  const [paginationPage, setPaginationPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState("desc");
  const [search, setSearch] = useState("");
  const [printButtonClick, setPrintButtonClick] = useState(false);
  const [pdfButtonClick, setPdfButtonClick] = useState(false);

  const { isAuth, auth } = useSelector((state) => state.auth);

  console.log("auth", auth);

  const { data, isLoading, isError, error } = useGetAssetTypesByPaginationQuery({
    page: paginationPage,
    limit: limit,
    order: order,
    search: search,
  });
  const { handleDelete } = useDelete();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleView = (rowData) => {
    setSelectedData(rowData);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const columns = useMemo(
    () => [
      {
        Header: "Name",
        accessor: "name",
      },
      {
        Header: "Note",
        accessor: "note",
      },
    ],
    []
  );

  useEffect(() => {
    if (data?.data?.pagination) {
      setPageCount(data?.data?.pagination?.total_page);
    }
  }, [data]);

  const handleLimitChange = (newLimit) => {
    setLimit(newLimit);
  };

  const handleSearch = (value) => {
    setSearch(value);
  };

  return (
    <div>
      {isLoading && <Loader />}
      {isError && <p>Error: {error.message}</p>}
      {!isLoading && !isError && data && (
        <CustomPaginationTable
          limit={limit}
          onLimitChange={handleLimitChange}
          columns={columns}
          data={data?.data?.result}
          sortDirection={order}
          setSortDirection={setOrder}
          addNewButton={{
            label: "Add Asset Type",
          }}
          showViewAction={false}
          showEditAction={true}
          showDeleteAction={true}
          handleView={handleView}
          handleEdit={() => { }}
          handleDelete={handleDelete}
          editPath="/store/dashboard/asset-types"
          paginationPage={paginationPage}
          pageCount={pageCount}
          onPageChange={(newPage) => setPaginationPage(newPage)}
          onSearch={handleSearch}
          path={"ASSET_TYPES"}

          printButton={true}
          exportButton={true}
          setPrintButtonClick={setPrintButtonClick}
          setPdfButtonClick={setPdfButtonClick}
        />
      )}

      {
        printButtonClick && <AssetTypesPrint setPrintButtonClick={setPrintButtonClick} newColumns={columns} />
      }
      {
        pdfButtonClick && <AssetTypesPdf setPdfButtonClick={setPdfButtonClick} newColumns={columns} />
      }
    </div>
  );
};

export default AssetTypes;
