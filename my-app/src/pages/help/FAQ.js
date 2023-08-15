import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  Box,
  Flex,
  Heading,
} from '@chakra-ui/react'

export default function FAQ() {
    return (
      <div className="faq">
        <Flex
          align={'center'}
          justify={'center'}
          w={'70'}
        >
          <Accordion allowMultiple allowToggle>
            <AccordionItem pb={10}>
                <AccordionButton>
                  <Box as="span" flex='1' textAlign='left'>
                    What is the purpose of this website?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              <AccordionPanel pb={4}>
                To make your life easier.
              </AccordionPanel>
            </AccordionItem>

            <AccordionItem>
              <Heading>
                <AccordionButton>
                  <Box as="span" flex='1' textAlign='left'>
                    What is the purpose of this website?
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </Heading>
              <AccordionPanel pb={4}>
                To make your life easier.
              </AccordionPanel>
            </AccordionItem>

          </Accordion>
        </Flex>
      </div>
    )
  }