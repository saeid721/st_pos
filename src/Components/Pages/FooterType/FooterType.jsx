import React, { useMemo } from 'react';
import { CiViewList } from 'react-icons/ci';
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom';
import CustomTable from '../../Shared/Tables/CustomTable';

const FooterType = () => {

	const location = useLocation();
	const navigate = useNavigate();

    const footerTypes = [
        {
            id: 1,
            type: 'explore'
        },
        {
            id: 2,
            type: 'company'
        },
        {
            id: 3,
            type: 'popular_series'
        },
        {
            id: 4,
            type: 'popular_movies'
        }

    ]


	const columns = useMemo(
		() => [
			{
				Header: 'Footer Type',
				accessor: 'type',
			},
			
			{
				Header: 'Details',
				Cell: (row) => {
					return (
						<div className="">
							<Link
								to={`/admin/footer-type/${row?.cell?.row?.original?.type}`}
							>
								<CiViewList className="hover:text-green-500 text-xl" />
							</Link>
						</div>
					);
				},
			},
		],
		[]
	);



	return (
		<>
			<CustomTable
				columns={columns}
				data={footerTypes}
				showViewAction={false}
				showEditAction={false}
				showDeleteAction={false}
                showAddNewButton={false}
			
				editPath={location.pathname}
				showStatus={false}
				path={'footer'}
			/>
		</>
	);
};

export default FooterType;
