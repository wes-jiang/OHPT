import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Text,
  Input,
  Stack,
  Textarea,
} from '@chakra-ui/react'


export default function Contact() {
  return (
    <div className="contact">
      <Flex
        align={'center'}
        justify={'center'}
      >
        <Stack>
        </Stack>

        <Stack spacing={4}>
          <FormControl id='email'>
            <FormLabel>Email Address</FormLabel>
            <Input type='email' />
          </FormControl>

          <FormControl id='message'>
            <FormLabel>Message</FormLabel>
            <Textarea
              name='message'
              placeholder='Your Message'
              rows={6}
              resize='none'
            />
          </FormControl>

          <Button>
            Submit
          </Button>
        </Stack>

      </Flex>  
    </div>
  )
}