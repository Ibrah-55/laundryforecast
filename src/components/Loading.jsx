import { Container, Image } from "@chakra-ui/react";

export const Loading = () => {

    return (
        <div>
            <p>Hang on as we verify your browser</p>
            <p className="text-red-500">Loading Request... <Image src='/images/loading.gif' />
</p>
            <div class="flow-root">
            {/* <div class="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-orange-600  rounded-full" role="status" aria-label="loading">
</div> */}
</div>
            <Container mt={['100px', '50px']} >
            <Image src='/images/loading2.gif' />
            
        </Container>
        </div>
      
    );
};