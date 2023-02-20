import { Container, Image } from "@chakra-ui/react";

export const Loading = () => {

    return (
        <div>
            <p>Loading Request</p>
            <div class="flow-root">
            <div class="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-orange-600 rounded-full" role="status" aria-label="loading">
</div>
</div>
            <Container mt={['100px', '50px']} >
            <Image src='/images/loading.gif' />
            
        </Container>
        </div>
      
    );
};