import { Container, Image } from "@chakra-ui/react";

export const Loading = () => {

    return (
        <div>
            <p>Loading Request</p>
            <Container mt={['100px', '50px']} >
            <Image src='/images/loading.gif' />
        </Container>
        </div>
      
    );
};