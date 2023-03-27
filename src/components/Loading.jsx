import { Container, Image } from "@chakra-ui/react";

export const Loading = () => {

    return (
        <div>
            <p className="flex flex justify-center items-center text-red-500 ">
            <Image src='/images/loading.gif' placeholder="LOading Request" />

</p>
<p className="flex flex text-red-600 justify-center items-center">Loading Request...</p>

            <div class="flow-root">
            {/* <div class="animate-spin inline-block w-10 h-10 border-[3px] border-current border-t-transparent text-orange-600  rounded-full" role="status" aria-label="loading">
</div> */}
</div>
            <Container mt={['100px', '50px']} >
            {/* <Image src='/images/loading2.gif' /> */}
            
        </Container>
        </div>
      
    );
};