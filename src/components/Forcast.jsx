import { Box, Icon, Text } from "@chakra-ui/react";
import { ForcastBox } from "./SmallComponents";
import { dateFormat } from "../helpers/extraFunctions";
import { ForcastModal } from "./ForcastModal";

export const Forcast = ({ data }) => {

    const { date, day } = dateFormat(data.dt);

    return (
        <Box>
            <ForcastBox >

                <Box p={'5px'} bg={'#5e82f4'}>
                    <Text fontWeight={500} color={'white'} fontSize={'18px'}>{date}</Text>
                    <Text fontWeight={500} color={'white'} fontSize={'18px'}>{day}</Text>
                </Box>

                <ForcastModal data={data} />

            </ForcastBox>
        </Box>
    );
};