import { Avatar } from "@chakra-ui/avatar";
import { Card, CardBody, CardFooter, CardHeader } from "@chakra-ui/card";
import { StarIcon } from "@chakra-ui/icons";
import { Box, Flex, Heading, Text } from "@chakra-ui/layout";

interface ReviewData {
  img: string;
  name: string;
  title: string;
  msg: string;
  rate: number;
}

interface ReviewProps {
  data: ReviewData;
}

const Reviews = ({ data }: ReviewProps) => {
  return (
    <Card textAlign="start" maxW="lg" p="1.5em" minW="20em" className="shadow-lg rounded-md" >
      <CardHeader>
        <Flex>
          <Flex flex="1" gap="7" alignItems="center" flexWrap="wrap">
            <Avatar name={data.name} src={data.img} className="w-[50px]" borderRadius={'50%'} />
            <Box>
              <Heading size="sm">{data.name}</Heading>
              <Text as="sup">{data.title}</Text>
            </Box>
          </Flex>
        </Flex>
      </CardHeader>
      <CardBody>
        <Text fontFamily='"Poppins", "sans-serif"' mt={'15px'} fontSize="14px" >
          {data.msg}
        </Text>
      </CardBody>
      <CardFooter>
        <Box display="flex" alignItems="center" gap={1}>
          <StarIcon fontSize="lg" color="orange" />
          <Text className="font-semibold text-sm ">{data.rate}</Text>
        </Box>
      </CardFooter>
    </Card>
  );
};

export default Reviews;
