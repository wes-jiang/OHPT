import { Grid } from '@chakra-ui/react'
import Toggle from '../components/Toggle'

export default function Team() {
    return (
      <div>
        <h1>Team</h1>
        <h3>Learn about the originators of OHPT.</h3>
        <Toggle />
        <Grid className="lyna">
        </Grid>
      </div>
      
    )
  }