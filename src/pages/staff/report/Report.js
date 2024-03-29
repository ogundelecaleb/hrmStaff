import React from "react";
import { Box, Button, Flex, Tab, TabList, TabPanel, TabPanels, Tabs, Text, } from "@chakra-ui/react";
import Chart from "chart.js/auto";
import { Bar } from "react-chartjs-2";
const Report = () => {
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", 'Sun'];

  const data = {
    labels: labels,
    datasets: [
      {
        label: "My First dataset",
        backgroundColor: "#984779",
 
        data: [45, 30, 30, 42, 20, 30, 45],
      },
    ],
  };
  return (
    <Box style={{ width: "100%" }}>

      <Box display={'flex'} alignItems='center' justifyContent={'space-between'} py='2' px='10' borderBottom='1px solid #EBEAED'>
        <Box>
          <Text color='#25324B' fontSize={'56.42px'} fontWeight='medium'>
            Work statistics
          </Text>
          <Text color={'#7C8493'} fontSize={'21.94px'} fontWeight='normal'>
            Showing  Jul 19-25
          </Text>
        </Box>

        <Flex bg='#E9EBFD' p='2'>
          <Button borderRadius={0} _focus={{ bg: 'white' }} color='#984779'>Week</Button>
          <Button borderRadius={0} _focus={{ bg: 'white' }} color='#984779'>Month</Button>
          <Button borderRadius={0} _focus={{ bg: 'white' }} color='#984779'>Year</Button>
        </Flex>


      </Box>
      <Box  py='2' px='10'>
        <Bar data={data} />
      </Box>
    </Box>
  )
};

export default Report;
