import React from 'react'
import { Table, Header, Icon, Grid, Segment, Button, List, Container, Divider, Image } from 'semantic-ui-react'
import { connect } from 'react-redux'
import * as actions from './actions'
import * as helpers from './Helpers'
import {Link} from 'react-router-dom'

class HomePage extends React.Component {

  //formatting from other pages.
  constructor() {
    super()
    this.state = {
      loading: false
    }
  }

  handleClick = () => {
    this.setState({loading: !this.state.loading})
  }


  getNums = () => {

    let myNums = {
      yourRepSpending: "",
      yourDemSpending: "",
      totalRepSpending: "",
      totalDemSpending: ""
    }
    if (this.props.businesses != []) {
      let myOrgs = {
        repOrgs: this.props.businesses.filter(biz => biz.total_rep_pct > .5),
        demOrgs: this.props.businesses.filter(biz => biz.total_dem_pct > .5),
      }


      myNums = {
        yourRepSpending: helpers.floatFormatter.format(myOrgs.repOrgs.reduce((acc, biz) => acc += parseFloat(biz.user_total_spending), 0)),
        yourDemSpending: helpers.floatFormatter.format(myOrgs.demOrgs.reduce((acc, biz) => acc += parseFloat(biz.user_total_spending), 0)),
        totalRepSpending: helpers.intFormatter.format(myOrgs.repOrgs.reduce((acc, biz) => acc += parseInt(biz.total_rep), 0)),
        totalDemSpending: helpers.intFormatter.format(myOrgs.demOrgs.reduce((acc, biz) => acc += parseInt(biz.total_dem), 0))
      }

    }
    return myNums
  }



//   const getNumbers = () =>{
//     myOrgs.repOrgs = props.businesses.filter(biz => biz.total_rep_pct > .5)
//     nums.demOrgs = props.businesses.filter(biz => biz.total_dem_pct > .5)
//     let yourRepSpending = repOrgs.reduce((acc, biz) => acc += biz.user_total_spending)
// user_total_spending
//
// total_dem
//   }

render(){
  console.log("user props", this.props.user);

  let myNums = this.getNums()
  return (
    <React.Fragment >
      <Container>
      <Segment vertical padded >
    <Header as='h1' textAlign="center" style={{fontSize: 70, fontFamily: "Inconsolata, monospace"}} >
      <Header.Content>
        Follow  <span>&#8594;</span>  your  <span>&#8594;</span>  $
      </Header.Content>
    </Header>
  </Segment>

    <Segment vertical>
    <Header as='h1' block attached="top">
      <Icon name='visa' />
      <Header.Content as="h2">
        You've spent {myNums.yourRepSpending} at Republican-leaning businesses.
      </Header.Content>
    </Header>

    <Header as='h1' attached>
      <Icon name='money' />
      <Header.Content as="h2">
        They've given {myNums.totalRepSpending} to Republicans (2016-2018 cycles).
      </Header.Content>
    </Header>

    <br/>

    <Header as="h1" block attached="top">
      <Icon name='amex' size="massive" />
      <Header.Content as='h2'>
        You've spent {myNums.yourDemSpending} at Democrat-leaning businesses.
      </Header.Content>
    </Header>
    <Header as="h1" attached>
      <Icon name='money' size="massive" />
      <Header.Content as='h2'>
        They've given {myNums.totalDemSpending} to Democrats (2016-2018 cycles).
      </Header.Content>
    </Header>
    </Segment>

    <Segment padded="very" vertical>
    <Grid container stackable verticalAlign='middle'>
      <Grid.Row>
        <Grid.Column width={8}>
          <Header as='h3' style={{ fontSize: '2em' }}>Hello, {this.props.user.name}. You've analyzed {this.props.user.months_analyzed} months of transactions.</Header>
          <p style={{ fontSize: '1.33em' }}>
            That's {this.props.user.total_analyzed_transactions} total analyzed transactions. We found campaign finance data for {this.props.user.number_matched_transactions} of those transactions ({helpers.pctFormatter(parseFloat(this.props.user.percent_matched))}) at {this.props.user.business_count} businesses.
          </p>
          <Header as='h3' style={{ fontSize: '2em' }}>Analyze More Transactions!</Header>
          <p style={{ fontSize: '1.33em' }}>
            There are still {this.props.user.remaining_months_to_analyze} months of loaded data to analyze.  The next month to analyze is {this.props.user.next_month_to_analyze}.
          </p>
        </Grid.Column>
        <Grid.Column floated='right' width={6}>
          <Icon name="credit card alternative" size="massive"/>
        </Grid.Column>
      </Grid.Row>
      <Grid.Row>
        <Grid.Column textAlign='center'>
          <Button size='massive' loading={this.state.loading} onClick={this.handleClick} primary><Icon name='calendar' />Analyze another month's transactions</Button>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>


    <Segment style={{ padding: '0em' }} vertical>
      <Grid celled='internally' columns='equal' stackable>
        <Grid.Row textAlign='center'>
          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>View your analyzed <Link to="/transactions">Transactions</Link></Header>
            <Link to="/transactions"><Icon name="grid layout" size="massive" /></Link>
          </Grid.Column>

          <Grid.Column style={{ paddingBottom: '5em', paddingTop: '5em' }}>
            <Header as='h3' style={{ fontSize: '2em' }}>Learn about the <Link to="/transactions">Businesses</Link> you shop at</Header>
            <p style={{ fontSize: '1.33em' }}>
              <Link to="/transactions"><Icon name="building outline" size="massive" /></Link>
              </p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </Segment>

    <Segment padded="very" vertical>
    <Grid container stackable verticalAlign='middle'>
      <Grid.Row>
        <Grid.Column width={8}>
          <Header as='h3' style={{ fontSize: '2em' }}><Link to="/analytics">Visualize </Link>where your money is going</Header>
          <p style={{ fontSize: '1.33em' }}>
            See how much a business donates to each party, and how much <i>you've</i> spent there.
          </p>
        </Grid.Column>
        <Grid.Column floated='right' width={8}>
          <Link to="/analytics"><Icon name="bar graph" size="massive" style={{margin: 50}} /></Link><Link to="/analytics"><Icon name="area graph" size="massive"/><br/></Link>
          <Link to="/analytics"><Icon name="line graph" size="massive" style={{margin: 50}}/></Link> <Link to="/analytics"><Icon name="pie graph" size="massive"/></Link>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  </Segment>





    <Segment style={{ padding: '8em 0em' }} vertical>
      <Container text>
        <Header as='h3' style={{ fontSize: '2em' }}>Our Data Comes from OpenSecrets.org</Header>
        <p style={{ fontSize: '1.33em' }}>
          OpenSecrets.org is the premier online source for tracking money in politics, with extensive data drawn directly from official Federal Election Commission disclosure filings.
        </p>
        <p style={{ fontSize: '1.33em' }}>Search OpenSecrets.org's Organizations data <a href="https://www.opensecrets.org/orgs/" target="blank">here.</a>
        </p>
        <Grid columns="equal"><Grid.Row><Grid.Column><a href="https://www.opensecrets.org/about"><Image src="https://www.opensecrets.org/assets/logo.svg" size="medium"/></a> </Grid.Column>
        <Grid.Column verticalAlign="bottom"><Button as='a' href="https://www.opensecrets.org/about/" target="blank" size='large'>Read More</Button></Grid.Column>
        </Grid.Row>
        </Grid>
        <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          <span>Campaign Finance 101</span>
        </Divider>
        <Header as='h3' style={{ fontSize: '2em' }}>Money Follows Power</Header>
        <p style={{ fontSize: '1.33em' }}>
          While some businesses consistently donate along ideological lines, others give to whichever party is in power, or split their donations evenly between Democrats and Republicans.
        </p>
        <p style={{ fontSize: '1.33em' }}>
          Learn the basics in OpenSecrets.org's <a href="https://www.opensecrets.org/resources/dollarocracy/" target="blank">"The Top 10 Things Every Voter Should Know About Money-In-Politics"</a>.
        </p>
        <Button as='a' size='large' href="https://www.opensecrets.org/resources/dollarocracy/" target="blank">Learn The Facts About Campaign Finance In The U.S.</Button>
        <Divider
          as='h4'
          className='header'
          horizontal
          style={{ margin: '3em 0em', textTransform: 'uppercase' }}
        >
          <span>About the Data</span>
        </Divider>
        <Header as='h3' style={{ fontSize: '2em' }}>All Employee Donations Over $200 are Included</Header>
        <p style={{ fontSize: '1.33em' }}>
          As OpenSecrets.org explains, <i>"The organizations themselves did not donate, rather the money came from the organizations' PACs (Political Action Committees), their individual members or employees or owners, and those individuals' immediate families. Organization totals may include subsidiaries and affiliates."</i>
        </p>
        <p style={{ fontSize: '1.33em' }}>Data for the current election cycle was released by the Federal Election Commission on May 16, 2017.</p>
        <Button as='a' size='large' href="https://www.opensecrets.org/orgs/methodology.php" target="blank">Learn More About the Data</Button>
      </Container>
    </Segment>


    </Container>
    <Segment inverted vertical style={{ padding: '5em 0em' }}>
     <Container>
       <Grid divided inverted stackable>
         <Grid.Row>
           <Grid.Column width={4}>
             <Header inverted as='h4' content='About' />
             <List link inverted>
               <List.Item as='a' href="https://www.opensecrets.org/orgs/methodology.php" target="blank">Organization Data Methodology</List.Item>
               <List.Item as='a' href="https://www.opensecrets.org/resources/faq/" target="blank">OpenSecrets.org FAQ</List.Item>
               <List.Item as='a' href="https://www.opensecrets.org/about/" target="blank">About OpenSecrets.Org</List.Item>
               <List.Item as='a' href="https://www.opensecrets.org/donate/" target="blank">Donate to Opensecrets.org</List.Item>
             </List>
           </Grid.Column>
           <Grid.Column width={5}>
             <Header inverted as='h4' content='Resources' />
             <List link inverted>
               <List.Item as='a' href="https://www.opensecrets.org/orgs/" target="blank">Search OpenSecrets.org's Organization Data</List.Item>
               <List.Item as='a' href="https://www.opensecrets.org/orgs/list.php?cycle=ALL" target="blank">Top Donors from All Election Cycles</List.Item>
               <List.Item as='a' href="https://www.opensecrets.org/resources/dollarocracy/" target="blank">Learn Campaign Finance Basics</List.Item>
               <List.Item as='a' href="https://www.opensecrets.org/donor-lookup" target="blank">Search Individual Donors</List.Item>
               <List.Item as='a' href="https://www.opensecrets.org/news/" target="blank">Campaign Finance News & Analysis</List.Item>
             </List>
           </Grid.Column>
           <Grid.Column width={7}>
             <Header as='h4' inverted>Disclaimer</Header>
             <p>Federal law prohibits the use of contributor information for the purpose of soliciting contributions or for any commercial purpose.</p>
           </Grid.Column>
         </Grid.Row>
       </Grid>
     </Container>
   </Segment>



    </React.Fragment>
  )
}

}

const mapStateToProps = (state) =>{
  return {
    businesses: state.businesses.all,
    column: state.businesses.column,
    direction: state.businesses.direction,
    user: state.user.info
  }
}


export default connect(mapStateToProps, actions)(HomePage)
