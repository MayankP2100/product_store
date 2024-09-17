import {useState} from "react";
import {
  Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack
} from "@chakra-ui/react";
import {useProductStore} from "../store/product.js";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "", price: "", image: "",
  });

  const toast = useToast()
  const {createProduct} = useProductStore()

  const handleAddProduct = async () => {
    const {success, message} = await createProduct(newProduct);
    if (!success) {
      toast({
        title: 'Error', description: message, status: 'error', duration: 3000, isClosable: true,
      })
    } else {
      toast({
        title: 'Success', description: message, status: 'success', duration: 3000, isClosable: true,
      })
    }
    setNewProduct({name: "", price: "", image: ""})
  }

  return <Container maxW={"container.sm"}>
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
          <Input m={2} p={6}
                 placeholder='Product Name'
                 name='name'
                 value={newProduct.name}
                 onChange={(e) => setNewProduct({
                   ...newProduct, [e.target.name]: e.target.value
                 })}
          />
          <Input m={2} p={6}
                 placeholder='Price'
                 name='price'
                 type='number'
                 value={newProduct.price}
                 onChange={(e) => setNewProduct({
                   ...newProduct, [e.target.name]: e.target.value
                 })}
          />
          <Input m={2} p={6}
                 placeholder='Image'
                 name='image'
                 value={newProduct.image}
                 onChange={(e) => setNewProduct({
                   ...newProduct, [e.target.name]: e.target.value
                 })}
          />
          <Button mt={8} mb={2} p={6}
                  colorScheme="blue"
                  onClick={handleAddProduct}
                  w="full"
          >Add Product</Button>
        </VStack>
      </Box>
    </VStack>
  </Container>
}

export default CreatePage;