import { Box, Button, Flex } from "@chakra-ui/react"

const CommonButton = ({ title, action, leftIcon, rightIcon }) => {
    return (
        <Box display={'flex'} justifyContent={'end'} mr='10' my='5'>
            <Flex>

                <Button
              
                    leftIcon={leftIcon}
                    rightIcon={rightIcon}
                    onClick={action}
                    className='btn py-2 px-4 me-2  text-white rounded-0'
                    bg={'#984779'}>
                    {title}
                </Button>

            </Flex>
        </Box>
    )
}
export default CommonButton