import React, { useEffect, useState } from 'react';
import { withRouter } from './Wrapper';
import { userDelete, userEdit } from '../redux/Action';
import { connect } from 'react-redux';
import { Table } from 'antd';

function TableData({ tableData, userDetailsDelete, userDetailsEdit, navigate }) {
    const [userData, setUserData] = useState([]);

    useEffect(() => {
        setUserData(tableData);
    }, [tableData]);

    const handleDelete = (i) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this data?");
        if (confirmDelete) {
            userDetailsDelete(i);
        }
    };

    const handleEdit = (i) => {
        userDetailsEdit(i);
        navigate(`/edit/${i}`);
    };

    const handleBack = () => {
        navigate("/");
    };

    const columns = [
            {
                title: 'Firstname',
                dataIndex: 'firstName',
            },
            {
                title: 'Lastname',
                dataIndex: 'lastName',
            },
            {
                title: 'Country',
                dataIndex: 'country',
            },
            {
                title: 'Language',
                dataIndex: 'language',
            },
            {
                title: 'Interests',
                dataIndex: 'interests',
                render: interests => interests.join(' , '),
            },
            {
                title: 'Edit',
                render: (item, data, i) => {
                    return <button type="button" className="btn btn-sm btn-success mr-3" onClick={() => handleEdit(i)}><i className="fas fa-edit mr-1"></i> Edit</button>
                }
            },
            {
                title: 'Delete',
                render: (item, data, i) => {
                    return <button type="button" className="btn btn-sm btn-danger" onClick={() => handleDelete(i)}><i className="fas fa-trash mr-1"></i>Delete</button>
                }
            },
        ];

    return (
        <div className='container'>
            <h3 className="alert alert-primary text-center mt-4">Submitted Data</h3>
            <Table className="table-responsive" dataSource={userData} columns={columns} />
            <button type="button" className="btn btn-sm btn-success mt-3" onClick={handleBack}>
                <i className='fas fa-arrow-circle-left mr-2'></i>Back
            </button>
        </div>
    );
}

const mapStateToProps = (state) => {
    return {
        tableData: state?.data || [],
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        userDetailsDelete: (data) => dispatch(userDelete(data)),
        userDetailsEdit: (data) => dispatch(userEdit(data)),
    };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TableData));
