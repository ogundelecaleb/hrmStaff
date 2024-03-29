const Content = ({ activeButton }) => {
    const data = [
        {
            id: 1,
            img: "https://bit.ly/prosper-baba",
            name: "Daramola James",
            message: "Kindly indicate your guarantor",
            time: "1hr",
        },
        {
            id: 2,
            img: "https://bit.ly/prosper-baba",
            name: "Daramola James",
            message: "Kindly indicate your guarantor",
            time: "1hr",
        },
        {
            id: 3,
            img: "https://bit.ly/prosper-baba",
            name: "Daramola James",
            message: "Kindly indicate your guarantor",
            time: "1hr",
        },
        {
            id: 4,
            img: "https://bit.ly/prosper-baba",
            name: "Daramola James",
            message: "Kindly indicate your guarantor",
            time: "1hr",
        },
        {
            id: 5,
            img: "https://bit.ly/prosper-baba",
            name: "Daramola James",
            message: "Kindly indicate your guarantor",
            time: "1hr",
        },
        {
            id: 6,
            img: "https://bit.ly/prosper-baba",
            name: "Daramola James",
            message: "Kindly indicate your guarantor",
            time: "1hr",
        },
        {
            id: 7,
            img: "https://bit.ly/prosper-baba",
            name: "Daramola James",
            message: "Kindly indicate your guarantor",
            time: "1hr",
        },
        {
            id: 8,
            img: "https://bit.ly/prosper-baba",
            name: "Daramola James",
            message: "Kindly indicate your guarantor",
            time: "1hr",
        },
    ];

    return (
        <div>
            <div className='col-lg-8 pt-4 shadow rounded mb-5'>
                <div className='d-flex align-items-center border-bottom pb-3 justify-content-between px-2'>
                    <div className='d-flex align-items-center'>
                        <div className='mb-2'>
                            <input type='radio' />
                        </div>
                        <div>
                            {" "}
                            <p className='fw-semibold ps-3 fs-5 text-muted'>
                                Showing 1-50 of 2500
                            </p>
                        </div>
                    </div>
                    <div className=''>
                        <input
                            type='text'
                            className='form-control rounded-4'
                            placeholder='Search inbox'
                        />
                    </div>
                </div>
                <div className='table-responsive'>
                    <table className='table'>
                        <tbody>
                            {data.map((item, key) => (
                                <tr key={key}>
                                    <th scope='row'>
                                        <input type='radio' className='mt-3' />
                                    </th>
                                    <td>
                                        <img
                                            src={item.img}
                                            alt='/'
                                            height='50px'
                                            width='50px'
                                            className='rounded-5'
                                        />
                                    </td>
                                    <td className='pt-3 fw-semibold fs-5 text-muted'>
                                        {item.name}
                                    </td>
                                    <td className='pt-3 fs-5 text-muted'>{item.message}</td>
                                    <td className='pt-3 fw-semibold fs-5 text-muted'>
                                        {item.time}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='d-flex justify-content-end py-4 px-5'>
                <h1>
                    <nav aria-label='Page navigation example'>
                        <ul class='pagination'>
                            <li class='page-item'>
                                <p class='page-link' aria-label='Previous'>
                                    <span aria-hidden='true'>&laquo;</span>
                                    <span class='sr-only'>Previous</span>
                                </p>
                            </li>
                            <li class='page-item'>
                                <p class='page-link' href='#'>
                                    1
                                </p>
                            </li>
                            <li class='page-item'>
                                <p class='page-link' href='#'>
                                    2
                                </p>
                            </li>
                            <li class='page-item'>
                                <p class='page-link' href='#'>
                                    3
                                </p>
                            </li>
                            <li class='page-item'>
                                <p class='page-link' aria-label='Next'>
                                    <span aria-hidden='true'>&raquo;</span>
                                    <span class='sr-only'>Next</span>
                                </p>
                            </li>
                        </ul>
                    </nav>
                </h1>
            </div>
        </div>
    );
}
export default Content