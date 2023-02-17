import { Container, Image } from "@chakra-ui/react";

export const Loading = () => {

    return (
        <div>
            <p>Loading Request</p>
            <div class="flow-root">
  <div class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full float-right" role="status">
  </div>
</div>
            <Container mt={['100px', '50px']} >
            <Image src='/images/loading.gif' />
            
        </Container>
        </div>
      
    );
};