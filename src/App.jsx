import {
  Input,
  Label,
  Grid,
  GridRow,
  GridColumn,
  Container,
  Header,
  Message,
  MessageHeader,
  Dropdown,
} from "semantic-ui-react";
import { useState, useEffect } from "react";

export default function App() {
  const [deposit, setDeposit] = useState(0);
  const [interestRate, setInterestRate] = useState(0);
  const [investmentTerm, setInvestmentTerm] = useState(0);
  const [interestPaid, setInterestPaid] = useState(0);
  const [interest, setInterest] = useState(0);
  const [finalBalance, setFinalBalance] = useState(0);

  const interestOptions = [
    { key: 0, text: "Monthly", value: 12 },
    { key: 1, text: "Quarterly", value: 4 },
    { key: 2, text: "Annually", value: 12 },
    { key: 3, text: "At Maturity", value: 1 },
  ];

  function handleChange(event) {
    switch (event.target.name) {
      case "deposit":
        setDeposit(event.target.value);
        break;
      case "interestRate":
        setInterestRate(event.target.value);
        break;
      case "term":
        setInvestmentTerm(event.target.value);
        break;
      default:
        console.log("default");
    }

  }

  function handleDropdown(event, data) {
    // TODO: calculate for annually and at maturity
    setInterestPaid(data.value);
  }

  useEffect(() => {
    calculateInterest(deposit, interestRate, investmentTerm, interestPaid);
  }, [deposit, interestRate, investmentTerm, interestPaid]);

  function calculateInterest(
    deposit,
    interestRate,
    investmentTerm,
    interestPaid
  ) {
    let interestEarned = 0;
    const dividedInterestRate = interestRate / 100;
    // TODO: Seperate equation needed for at maturity
    const calcBalance =
      deposit *
      Math.pow(
        1 + dividedInterestRate / interestPaid,
        interestPaid * investmentTerm
      );
    interestEarned = calcBalance - deposit;
    setFinalBalance(Math.floor(calcBalance));
    setInterest(Math.floor(interestEarned));
  }

  return (
    <Container>
      <Header as="h2" style={{ marginTop: "5rem" }}>
        Compound Interest
      </Header>
      <Grid columns="equal">
        <GridRow>
          <GridColumn>
            <Header as="h4">Start deposit amount: </Header>
            <Input labelPosition="right" type="text" placeholder="10 000">
              <Label basic>$</Label>
              <input type="number" name="deposit" onChange={handleChange} />
              <Label>.00</Label>
            </Input>
          </GridColumn>
          <GridColumn>
            <Header as="h4">Interest rate: </Header>
            <Input labelPosition="right" type="text" placeholder="1.10">
              <input
                type="number"
                name="interestRate"
                onChange={handleChange}
              />
              <Label>% p.a.</Label>
            </Input>
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn>
            <Header as="h4">Investment term: </Header>
            <Input labelPosition="right" type="text" placeholder="3">
              <input type="number" name="term" onChange={handleChange} />
              <Label>years</Label>
            </Input>
          </GridColumn>
          <GridColumn>
            <Header as="h4">Interest paid:</Header>
            <Dropdown
              selection
              options={interestOptions}
              onChange={(e, data) => handleDropdown(e, data)}
              placeholder="Interest paid"
            />
          </GridColumn>
        </GridRow>
        <GridRow>
          <GridColumn>
            <Message>
              <MessageHeader>Final Balance:</MessageHeader>
              <p>{`$ ${finalBalance}`}</p>
            </Message>
          </GridColumn>
          <GridColumn>
            <Message>
              <MessageHeader>Interest Earned:</MessageHeader>
              <p>{`$ ${interest}`}</p>
            </Message>
          </GridColumn>
        </GridRow>
      </Grid>
    </Container>
  );
}
