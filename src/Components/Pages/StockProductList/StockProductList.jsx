import React, { useEffect, useMemo, useState } from "react";
import CustomPaginationTable from "../../Shared/Tables/CustomPaginationTable";
import useDelete from "../../Shared/Constant/hooks/useDelete";
import { Loader } from "lucide-react";
import { useSelector } from "react-redux";
import StoreProductListView from "./StockProductListView";
import { useGetStockProductsByPaginationQuery } from "../../../store/api/app/StockProduct/stockProductApiSlice";

const StoreProductList = () => {
  const [selectedData, setSelectedData] = useState(null);
  const [paginationPage, setPaginationPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState("desc");
  const [search, setSearch] = useState("");

  const { isAuth, auth } = useSelector((state) => state.auth);
  const { store_id } = auth.user;

  console.log("auth", auth);

  const { data, isLoading, isError, error } = useGetStockProductsByPaginationQuery({
    page: paginationPage,
    limit: limit,
    order: order,
    // search: search,
    store_id: store_id,
  });

  console.log(data);
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
        Header: "Product",
        accessor: "product.name",
      },
      {
        Header: "Image",
        accessor: "product.main_image",
      },
      {
        Header: "Store",
        accessor: "store.store",
      },
      {
        Header: "Branch",
        accessor: "branch.name",
      },
      {
        Header: "Quantity",
        accessor: "stock_quantity",
      },
      {
        Header: "Purchase Price",
        accessor: "purchase_price",
      },
      {
        Header: "Regular Price",
        accessor: "product.regular_price",
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
            label: "Add Stock",
          }}
          showViewAction={true}
          showEditAction={true}
          showDeleteAction={true}
          handleView={handleView}
          handleEdit={() => {}}
          handleDelete={handleDelete}
          editPath="/store/dashboard/stock-product"
          paginationPage={paginationPage}
          pageCount={pageCount}
          onPageChange={(newPage) => setPaginationPage(newPage)}
          onSearch={handleSearch}
          path={"STOCK_PRODUCT"}
        />
      )}

      {/* <StoreProductListView isOpen={isModalOpen} onClose={handleCloseModal} data={selectedData} title="STOCK PRODUCT" /> */}
    </div>
  );
};

export default StoreProductList;
