import { Box } from "@chakra-ui/react"
import { useNavigate } from "react-router-dom";
const InboxButton = ({ setActiveButton }) => {
    const navigate = useNavigate();
    const reuseableNavigation = (page) => {
        navigate(page);
        return;
    };
    const handleClick = (buttonId) => {
        setActiveButton(buttonId);
    };

    const reuseAbleBoxChildren = (bgColor, textColor, text, number, status, link) => {
        return (
            <div
                onClick={() => reuseableNavigation(link)}
                style={{ cursor: "pointer" }}
                className={`px-2 d-flex justify-content-between`}>
                <p className={`fw-${status ? "bold" : ""} fs-5`}>{text}</p>
                <p
                    className='rounded-3 fs-6 px-2 fw-semibold py-1'
                    style={{ backgroundColor: bgColor, color: textColor }}>
                    {number}
                </p>
            </div>
        );
    };
    return (
        <Box>
            <div
                className='col-lg-3 pt-4 shadow rounded-3 p-2'
                style={{ height: "240px" }}>
                {reuseAbleBoxChildren("#B9B5C0", "dark", "Inbox", 20, true, 'inbox-details')}
                {reuseAbleBoxChildren("#CAA1BB", "#B1749A", "Sent", 20)}
                {reuseAbleBoxChildren("#BAE69F", "#86D357", "Important", 5)}
                {reuseAbleBoxChildren("#FFB3B3", "#FF5959", "Draft", 99)}
            </div>
        </Box>
    )
}
export default InboxButton;