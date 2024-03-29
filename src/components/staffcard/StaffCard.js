import { Box, Text } from "@chakra-ui/react";

const StaffCard = ({ Icon, labelColor, IconBorderColor, label, CardBgColor, Action }) => {
    return (
        <Box
            className='col-lg-5 my-3 d-flex flex-column gap-2 justify-content-center ps-4'
            borderRadius={'12px'}
            _hover={{ cursor: 'pointer' }}
            onClick={Action}
            h={'280px'} w='370px' bg={CardBgColor}>
            <Box
                borderRadius={'8px'}
                border="1px solid"
                borderColor={IconBorderColor}
                height="50px"
                width="50px"
                display={'flex'}
                justifyContent='center'
                alignItems={'center'}
            >
                {Icon}

            </Box>
            <Text fontSize={'14px'} color={labelColor}>
                {label}
            </Text>
        </Box>
    )
}
export default StaffCard;