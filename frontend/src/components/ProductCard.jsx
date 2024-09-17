import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  useColorModeValue,
  Text,
  useToast,
  Modal,
  useDisclosure,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  VStack,
  Input,
  Button,
  ModalFooter
} from "@chakra-ui/react";
import {DeleteIcon, EditIcon} from "@chakra-ui/icons";
import {useProductStore} from "../store/product.js";
import {useState} from "react";

const ProductCard = (product) => {
  const textColor = useColorModeValue("gray.600", "gray.200");
  const bg = useColorModeValue("white", "gray.800");
  const [updatedProduct, setUpdatedProduct] = useState(product.product);
  const {updateProduct, deleteProduct} = useProductStore()
  const {isOpen, onOpen, onClose} = useDisclosure()

  const toast = useToast()

  const handleDeleteProduct = async (productId) => {
    const {success, message} = await deleteProduct(productId);
    if (!success) {
      toast({
        title: 'Error', description: message, status: 'error', duration: 3000, isClosable: true,
      })
    } else {
      toast({
        title: 'Success', description: message, status: 'success', duration: 3000, isClosable: true,
      })
    }
  }

  const handleUpdateProduct = async (productId, updatedProduct) => {
    const {success, message} = await updateProduct(productId, updatedProduct);
    if (!success) {
      toast({
        title: 'Error', description: message, status: 'error', duration: 3000, isClosable: true,
      })
    } else {
      toast({
        title: 'Success', description: message, status: 'success', duration: 3000, isClosable: true,
      })
    }
    onClose();
  }

  return (<Box
    shadow="lg"
    rounded="lg"
    overflow="hidden"
    transition="all 0.3s"
    _hover={{transform: "translateY(-5px)", shadow: "xl"}}
    bg={bg}
  >
    <Image src={product.product.image} alt={product.product.name} h={48} w='full' objectFit='cover'/>
    <Box p={4}>
      <Heading as='h3' size='md' mb={2}>
        {product.product.name}
      </Heading>
      <Text
        fontWeight="bold"
        fontSize={'xl'}
        color={textColor}
        mb={4}
      >
        ${product.product.price}
      </Text>
      <HStack spacing={2}>
        <IconButton icon={<EditIcon/>} onClick={onOpen} colorScheme={'blue'} aria-label={'Edit'}/>
        <IconButton icon={<DeleteIcon/>} onClick={() => handleDeleteProduct(product.product._id)} colorScheme={'red'}
                    aria-label={'Delete'}/>
      </HStack>
    </Box>

    <Modal isOpen={isOpen} onClose={onClose} size='2xl'>
      <ModalOverlay/>
      <ModalContent>
        <ModalHeader>Update Product</ModalHeader>
        <ModalCloseButton></ModalCloseButton>
        <ModalBody>
          <VStack spacing={8} alignItems="center">
            <Heading as="h1" size="2xl" textAlign="center" mb={8} mt={8} fontWeight="Handjet">
              Create New Product
            </Heading>

            <Box
              w="full"
              bg={useColorModeValue("white", "gray.800")}
              p={8}
              rounded="lg"
              shadow="md"
            >
              <VStack>
                <Input
                  m={2} p={6}
                  placeholder='Product Name'
                  name='name'
                  value={updatedProduct.name}
                  onChange={(e) => setUpdatedProduct({
                    ...updatedProduct, [e.target.name]: e.target.value
                  })}
                />
                <Input
                  m={2} p={6}
                  placeholder='Price'
                  name='price'
                  type='number'
                  value={updatedProduct.price}
                  onChange={(e) => setUpdatedProduct({
                    ...updatedProduct, [e.target.name]: e.target.value
                  })}
                />
                <Input
                  m={2} p={6}
                  placeholder='Image'
                  name='image'
                  value={updatedProduct.image}
                  onChange={(e) => setUpdatedProduct({
                    ...updatedProduct, [e.target.name]: e.target.value
                  })}
                />
              </VStack>
            </Box>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <Button colorScheme='blue' mr={3} onClick={() => handleUpdateProduct(product.product._id, updatedProduct)}>
            Update
          </Button>
          <Button variant='ghost' onClick={onClose}>Close</Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  </Box>);
}

export default ProductCard;