import React, { useEffect, useMemo, useState } from "react";

import CustomPaginationTable from "../../Shared/Tables/CustomPaginationTable";
import useDelete from "../../Shared/Constant/hooks/useDelete";
import { Loader } from "lucide-react";
import { useSelector } from "react-redux";
import { useGetProductsByPaginationQuery } from "../../../store/api/app/Products/productsApiSlice";
import InventoryView from "./InventoryView";
import { FaExclamationCircle } from "react-icons/fa";
import InventoryPrint from "./InventoryPrint";
import InventoryPdf from "./InventoryPdf";
import { useGetStockProductsByPaginationQuery } from "../../../store/api/app/StockProduct/stockProductApiSlice";

const Inventory = () => {
  const [selectedData, setSelectedData] = useState(null);
  const [paginationPage, setPaginationPage] = useState(1);
  const [pageCount, setPageCount] = useState(1);
  const [limit, setLimit] = useState(10);
  const [order, setOrder] = useState("desc");
  const [search, setSearch] = useState("");
  const [printButtonClick, setPrintButtonClick] = useState(false);
  const [pdfButtonClick, setPdfButtonClick] = useState(false);

  const { isAuth, auth } = useSelector((state) => state.auth);
  const { store_id } = auth.user;

  console.log("auth", auth);

  const { data, isLoading, isError, error } = useGetStockProductsByPaginationQuery({
    page: paginationPage,
    limit: limit,
    order: order,
    store_id: store_id,
    search: search,
  });
  console.log("data,,,,", data);
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
        Header: "Image",
        accessor: "product.main_image",
      },
      {
        Header: "Product Code",
        accessor: "product.product_code",
      },
      {
        Header: "Name",
        accessor: "product.name",
      },
      {
        Header: "Model",
        accessor: "product.model",
      },
      {
        Header: "Stock",
        accessor: "stock_quantity",
        Cell: ({ row }) => {
          const inventoryCount = row.original.stock_quantity;
          const alertQty = row.original.product.alert_qty;

          return (
            <div className="flex items-center gap-1">
              {inventoryCount} {row.original.product.unit?.name}
              {inventoryCount < alertQty && (
                <div className="relative group">
                  <FaExclamationCircle className="text-red-500 cursor-pointer" />
                  <div className="absolute left-5 top-0 z-10 hidden w-max rounded bg-black p-1 text-xs text-white group-hover:block">
                    Stock is less than alert quantity
                  </div>
                </div>
              )}
            </div>
          );
        },
      },
      {
        Header: "Purchase Price",
        accessor: "purchase_price",
      },
      {
        Header: "Selling Price",
        accessor: "product.regular_price",
      },
      // {
      //   Header: "Inventory Value",
      //   accessor: "product.inventory_value",
      //   Cell: ({ row }) => {
      //     const purchasePrice = row.original.product.purchase_price || 0;
      //     const inventoryCount = row.original.stock_quantity || 0;
      //     const inventoryValue = purchasePrice * inventoryCount;

      //     return inventoryValue.toFixed(2); // shows 2 decimal points, like 1234.50
      //   },
      // }

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
            label: "Add Products",
          }}
          showViewAction={false}
          showEditAction={false}
          showDeleteAction={false}
          handleView={handleView}
          handleEdit={() => { }}
          handleDelete={handleDelete}
          editPath="/store/dashboard/product"
          paginationPage={paginationPage}
          pageCount={pageCount}
          onPageChange={(newPage) => setPaginationPage(newPage)}
          onSearch={handleSearch}
          path={"PRODUCT"}
          heading="Inventory"

          printButton={true}
          exportButton={true}
          setPrintButtonClick={setPrintButtonClick}
          setPdfButtonClick={setPdfButtonClick}
        />
      )}

      {
        printButtonClick && <InventoryPrint setPrintButtonClick={setPrintButtonClick} newColumns={columns} store_id={store_id} />
      }
      {
        pdfButtonClick && <InventoryPdf setPdfButtonClick={setPdfButtonClick} newColumns={columns} store_id={store_id} />
      }
    </div>
  );
};

export default Inventory;
