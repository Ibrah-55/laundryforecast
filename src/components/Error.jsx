import { Container, Image } from "@chakra-ui/react";
import { Link} from "react-router-dom";

export const Error = () => {

    return (
        <div>
            <p>Aw, Snap!
                <br /> City does not exist. <i className="text-red">Try refreshing page</i></p>


        <Container mt={['100px', '50px']} p={'50px'}>
            <Image src='/images/Error.gif' />
        </Container>

        </div>
    );
};