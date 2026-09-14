import React, { useEffect, useMemo, useState } from "react";

import CustomPaginationTable from "../../Shared/Tables/CustomPaginationTable";
import useDelete from "../../Shared/Constant/hooks/useDelete";
import { Loader } from "lucide-react";
import { useSelector } from "react-redux";
import { useGetProductsByPaginationQuery } from "../../../store/api/app/Products/productsApiSlice";
import ProductsView from "./ProductsView";
import ProductsPrint from "./ProductsPrint";
import ProductsPdf from "./ProductsPdf";

const Products = () => {
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

  const { data, isLoading, isError, error } = useGetProductsByPaginationQuery({
    page: paginationPage,
    limit: limit,
    order: order,
    store_id: store_id,
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
        Header: "Image",
        accessor: "main_image",
      },
      {
        Header: "Product Code",
        accessor: "product_code",
      },
      // {
      //   Header: "Model",
      //   accessor: "model",
      // },
      // {
      //   Header: "Barcode Symbology",
      //   accessor: "barcode_symbology",
      // },
      // {
      //   Header: "Tax Type",
      //   accessor: "tex_type",
      // },
      // {
      //   Header: "Purchase Price",
      //   accessor: "purchase_price",
      // },
      {
        Header: "Regular Price",
        accessor: "regular_price",
      },
      {
        Header: "Sale Price",
        accessor: "sale_price",
      },
      {
        Header: "discount",
        accessor: "discount",
      },
      // {
      //   Header: "Inventory Count",
      //   accessor: "inventory_count",
      // },
      {
        Header: "Alert Quantity",
        accessor: "alert_qty",
        Cell: ({ row }) => {
          const qty = row?.original?.alert_qty ?? "";
          const unit = row?.original?.unit?.name ?? "";
          return qty ? `${qty} ${unit}` : "";
        },
      },
      // {
      //   Header: "Note",
      //   accessor: "note",
      // },
      {
        Header: "Category",
        accessor: "category.name",
      },
      // {
      //   Header: "Sub Category",
      //   accessor: "sub_category.name",
      // },
      // {
      //   Header: "Brand",
      //   accessor: "brand.name",
      // },
      {
        Header: "Unit",
        accessor: "unit.name",
      },
      // {
      //   Header: "Tax",
      //   accessor: "tax.name",
      // },
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
          showViewAction={true}
          showEditAction={true}
          showDeleteAction={true}
          handleView={handleView}
          handleEdit={() => { }}
          handleDelete={handleDelete}
          editPath="/store/dashboard/product"
          paginationPage={paginationPage}
          pageCount={pageCount}
          onPageChange={(newPage) => setPaginationPage(newPage)}
          onSearch={handleSearch}
          path={"PRODUCT"}

          printButton={true}
          exportButton={true}
          setPrintButtonClick={setPrintButtonClick}
          setPdfButtonClick={setPdfButtonClick}
        />
      )}

      {
        printButtonClick && <ProductsPrint setPrintButtonClick={setPrintButtonClick} newColumns={columns} store_id={store_id} />
      }
      {
        pdfButtonClick && <ProductsPdf setPdfButtonClick={setPdfButtonClick} newColumns={columns} store_id={store_id} />
      }
    </div>
  );
};

export default Products;
